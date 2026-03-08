import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

interface GeminiPayload {
  contents: { parts: { text: string }[] }[];
  system_instruction?: { parts: { text: string }[] };
}

interface GeminiRequestBody {
  prompt: string;
  systemInstruction?: string;
}

export async function POST(request: NextRequest) {
    try {
        const { prompt, systemInstruction } = await request.json() as GeminiRequestBody;

        if (!prompt) {
            return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
        }

        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
            console.error('GEMINI_API_KEY environment variable is not set');
            return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
        }

        // Correct Gemini API endpoint with API key in query parameter
        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

        // Correct request format for Gemini API
        const payload: GeminiPayload = {
            contents: [{ parts: [{ text: prompt }] }]
        };

        if (systemInstruction) {
            payload.system_instruction = { parts: [{ text: systemInstruction }] };
        }

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error(`Gemini API Error (${response.status}):`, errorData);
            return NextResponse.json(
                {
                    error: `Gemini API error: ${errorData.error?.message || 'Unknown error'}`,
                    status: response.status,
                    details: errorData
                },
                { status: response.status }
            );
        }

        const data = await response.json();

        // Correct response parsing for Gemini API
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "No response generated.";

        return NextResponse.json({ text });
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        console.error('Server error:', error);
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}