import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

export const askGemini = async (req, res) => {
    
    try {
        const { prompt } = req.body;
        const { listingSummary } = req.body;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,

            config: {
                systemInstruction: `
                    You are an AI travel assistant for an Airbnb application.

                    RULES:
                    0. If user say hello or thank you after your reply greet them also when they say some greeting
                    1. You can recommend ONLY properties present in the provided listing data.
            
                    2. Understand the user's requirements, such as:
                       - City
                       - Landmark
                       - Budget
                       - Property title
                       - Category
            
                    3. Recommend the most suitable listings based on the user's query.
            
                    4. Never invent property names, prices, locations, ratings,
                       availability or other listing details.
            
                    5. If no listing matches the user's requirements, respond:
                       "Sorry, no suitable listings are available for your request."
            
                    6. If the user asks something unrelated to Airbnb listings,
                       politely explain that you can only help with available listings.
            
                    7. Keep your answers short, friendly and conversational.
            
                    AVAILABLE LISTINGS:
                    ${JSON.stringify(listingSummary)}
                `
            }
        });

        return res.status(200).json({
            response: response.text
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: error.message
        });
    }
};