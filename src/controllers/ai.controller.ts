import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { groqClient } from "../services/groq/groqclient";
import { PrismaClient } from "@prisma/client";
import responseStatus from "../utils/responseStatus";
import { verifyToken } from "../utils/jwt";
const prisma = new PrismaClient();

export const completion = asyncHandler(async (req: Request, res: Response) => {
    // bearer token from request
    const session_id = req.headers.authorization?.split(" ")[1];
    if (!session_id) {
        responseStatus.unauthorized(res, "unauthorized session_id not found");
        return;
    }
    const session_user = verifyToken(session_id);
    if (!session_user) {
        responseStatus.unauthorized(res, "unauthorized user not found");
        return;
    }

    const { history_id, user_message, user_image } = req.body;

    //
    let user_prompt = "";

    if (user_message && !user_image) {
        user_prompt = user_message;
    } else if (!user_message && user_image) {
        user_prompt = `${"image_to_textContext(user_image)"}`; //image converted to text context using ai
    } else if (user_message && user_image) {
        user_prompt = `${"image_to_textContext(user_image)"} ${user_message}`; //image converted to text context using ai
    }

    // Set headers for streaming
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    //

    const messageHistory = await prisma.history.findUnique({
        where: {
            id: history_id,
            user: {
                id: session_user.id,
            },
        },
        include: {
            messages: true,
        },
    });
    if (!messageHistory) {
        responseStatus.badRequest(res, "Message History not found");
        return;
    }
    const userMessages = messageHistory.messages.map((message) => {
        return {
            role: message.role,
            content: message.content,
        };
    });
    const stream = await groqClient.chat.completions.create({
        messages: [
            {
                role: "system",
                content: "you are a helpful assistant.",
            },
            ...(userMessages as { role: "system" | "user" | "assistant"; content: string }[]),
            {
                role: "user",
                content: user_prompt,
            },
        ],
        model: "llama3-8b-8192",
        temperature: 0.5,
        max_tokens: 1024,
        stream: true,
    });

    let accumulated = "";
    // Stream response to client
    for await (const chunk of stream) {
        const content = chunk?.choices[0]?.delta?.content || "";
        if (content) {
            res.write(`data: ${JSON.stringify({ content })}\n\n`);
            accumulated += content;
        }
    }
    await prisma.history.update({
        where: {
            id: history_id,
        },
        data: {
            messages: {
                create: [
                    {
                        role: "user",
                        content: user_prompt,
                    },
                    {
                        role: "assistant",
                        content: accumulated,
                    },
                ],
            },
        },
    });
    // Signal end of stream
    res.write("data: [DONE]\n\n");
    res.end();
});
