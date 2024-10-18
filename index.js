require("dotenv").config();

const { OpenAI } = require("openai");

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

async function main() {

        const prompt = "Banana"

        const schema = {
            type: "object",
            properties: {
                fruit: { type: "string" },
                color: { type: "string" },
                origin: { type: "string" },
                weight: { type: "number" },
                weightUnit: { type: "string" }
            },
            required: ["fruit", "color", "origin", "weight", "weightUnit"],
            additionalProperties: false
        };

        const requestBody = {
            model: "gpt-4o-mini",
            messages: [{ role: "user", content: prompt }],
            temperature: 0.0,
            response_format:  {
                "type": "json_schema",
                "json_schema": {
                  "name": "response",
                  "strict": true,
                  "schema": schema
                }
              }
        };

        const response = await openai.chat.completions.create(requestBody);
        console.log(response.choices);

}


main()
