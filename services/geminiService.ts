import { GoogleGenAI, Type } from "@google/genai";
import type { Puzzle, ImagePart } from '../types';

// This is a workaround for esm.sh compatibility issues with process.env
declare const process: { env: { [key: string]: string | undefined } };

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const puzzleSchema = {
    type: Type.OBJECT,
    properties: {
        puzzles: {
            type: Type.ARRAY,
            description: "A list of varied puzzles (multiple choice, true/false, fill-in-the-blank).",
            items: {
                type: Type.OBJECT,
                properties: {
                    puzzleType: {
                        type: Type.STRING,
                        enum: ['MULTIPLE_CHOICE', 'TRUE_FALSE', 'FILL_IN_THE_BLANK'],
                        description: "The type of the puzzle."
                    },
                    question: {
                        type: Type.STRING,
                        description: "The main question or instruction for the puzzle."
                    },
                    options: {
                        type: Type.ARRAY,
                        description: "For MULTIPLE_CHOICE puzzles, a list of 4 possible answers.",
                        items: { type: Type.STRING }
                    },
                    correctAnswer: {
                        type: Type.STRING, // Using string for all to simplify. Booleans will be "true" or "false".
                        description: "The correct answer. For MULTIPLE_CHOICE, it's one of the options. For TRUE_FALSE, it's 'true' or 'false'. For FILL_IN_THE_BLANK, it's the word that fills the blank."
                    },
                    sentence: {
                        type: Type.STRING,
                        description: "For FILL_IN_THE_BLANK puzzles, a sentence with a blank represented by '___'."
                    }
                },
                required: ["puzzleType", "question", "correctAnswer"]
            }
        }
    },
    required: ["puzzles"]
};


type Part = { text: string } | { inlineData: { mimeType: string; data: string; } };

export const generatePuzzles = async (payload: { text?: string; images?: ImagePart[] }): Promise<Puzzle[]> => {
    try {
        const parts: Part[] = [];
        let prompt = "";
        
        const hasImages = payload.images && payload.images.length > 0;
        const hasText = payload.text && payload.text.trim();

        if (!hasImages && !hasText) {
            console.warn("generatePuzzles called with no text or images.");
            return [];
        }

        if (hasImages) {
            payload.images?.forEach(image => {
                 parts.push({
                    inlineData: {
                        mimeType: image.mimeType,
                        data: image.data
                    }
                });
            });
            prompt = `Analyze the content of these images. If there is text, use it. If it's a diagram or picture, describe it. Based on all content, create a series of fun puzzles for a 10-year-old. `;
            if (hasText) {
                prompt += `Use the following text as additional context: "${payload.text}"`;
            }
        } else if (hasText) {
            prompt = `Based on the following text, create a series of fun puzzles for a 10-year-old. Here is the text: "${payload.text}"`;
        }

        prompt += "\n\nPlease generate a mix of puzzle types including MULTIPLE_CHOICE, TRUE_FALSE, and FILL_IN_THE_BLANK."

        parts.push({ text: prompt });

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: { parts: parts },
            config: {
                systemInstruction: "You are a fun and engaging teacher who creates educational puzzles for children aged 6-14. Your goal is to transform any text or image provided into a series of multiple-choice, true/false, and fill-in-the-blank questions. Always return the data in the specified JSON format.",
                responseMimeType: "application/json",
                responseSchema: puzzleSchema,
            }
        });

        const jsonText = response.text.trim();
        const result = JSON.parse(jsonText);

        if (result && Array.isArray(result.puzzles)) {
             // Post-processing to conform to our stricter types
            return result.puzzles.map((p: any) => {
                if (p.puzzleType === 'TRUE_FALSE') {
                    return { ...p, correctAnswer: p.correctAnswer.toLowerCase() === 'true' };
                }
                return p;
            }) as Puzzle[];
        }
        return [];

    } catch (error) {
        console.error("Error generating puzzles:", error);
        throw new Error("Failed to generate puzzles from AI.");
    }
};
