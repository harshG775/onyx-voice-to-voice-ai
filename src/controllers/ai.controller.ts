import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import responseStatus from "../utils/responseStatus";
import { groqClient } from "../services/groq/groqclient";

export const completion = asyncHandler(async (req: Request, res: Response) => {
    const { user_prompt } = req.body;

    // Set headers for streaming
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    const stream = await groqClient.chat.completions.create({
        messages: [
            {
                role: "system",
                content: "you are a helpful assistant.",
            },
            // ...userMessages,
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

    // Stream response to client
    for await (const chunk of stream) {
        const content = chunk?.choices[0]?.delta?.content || "";
        if (content) {
            res.write(`data: ${JSON.stringify({ content })}\n\n`);
        }
    }

    // Signal end of stream
    res.write("data: [DONE]\n\n");
    res.end();
});
