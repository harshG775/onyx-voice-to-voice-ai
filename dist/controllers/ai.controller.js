"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.completion = void 0;
const asyncHandler_1 = require("../utils/asyncHandler");
const groqclient_1 = require("../services/groq/groqclient");
exports.completion = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const { user_prompt } = req.body;
    // Set headers for streaming
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");
    const stream = await groqclient_1.groqClient.chat.completions.create({
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
