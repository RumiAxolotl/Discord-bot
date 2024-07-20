const { HarmBlockThreshold, HarmCategory, GoogleGenerativeAI } = require("@google/generative-ai");

module.exports = {
    name: "gpt",
    desciption: "use gpt to answer prompt",

    async run(client, message, args) {
        input_prompt = args.join(" ");

        // Access your API key as an environment variable (see "Set up your API key" above)
        const genAI = new GoogleGenerativeAI(process.env.API_KEY);
        const safetySettings = [
            {
                category: HarmCategory.HARM_CATEGORY_HARASSMENT,
                threshold: HarmBlockThreshold.BLOCK_NONE,
            },
            {
                category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
                threshold: HarmBlockThreshold.BLOCK_NONE,
            },
            {
                category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
                threshold: HarmBlockThreshold.BLOCK_NONE,
            },
            {
                category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
                threshold: HarmBlockThreshold.BLOCK_NONE,
            },
        ];

        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash", safetySettings });
        try {
            const result = await model.generateContent(input_prompt);
            const response = await result.response;

            const msg = response.text();

            const MAX_MESSAGE_LENGTH = 2000;

            if (msg.length <= MAX_MESSAGE_LENGTH) {
                message.channel.send(msg);
            } else {
                function splitMessage(msg) {
                    const MAX_LENGTH = 2000;
                    const delimiter = '```';
                    let chunks = [];
                    let startIndex = 0;

                    while (startIndex < msg.length) {
                        let endIndex = startIndex + MAX_LENGTH;
                        let chunk = msg.substring(startIndex, endIndex);

                        // Check if we're cutting inside a code block
                        let lastDelimiterIndex = chunk.lastIndexOf(delimiter);
                        if (lastDelimiterIndex !== -1) {
                            // Adjust the chunk to end at the last complete code block
                            endIndex = startIndex + lastDelimiterIndex + delimiter.length;
                            chunk = msg.substring(startIndex, endIndex);
                        }

                        chunks.push(chunk);
                        startIndex = endIndex;
                    }

                    return chunks;
                }

                const chunks = splitMessage(msg);
                chunks.forEach(chunk => {
                    message.channel.send(chunk);
                });
            }
        } catch (error) {
            console.error(error);
            message.channel.send("An error occurred while processing your request. Please try again later");
        }
    }
}