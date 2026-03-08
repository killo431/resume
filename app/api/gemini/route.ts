import { NextResponse } from 'next/server';

export async function POST(request) {
    const { input } = await request.json();
    try {
        const response = await fetch('https://google.generativeai.googleapis.com/v1alpha2/models/gemini:generateContent', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.GEMINI_API_KEY}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ input }),
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.error || 'Unknown error');
        }
        return NextResponse.json({ text: data.output });
    } catch (error) {
        return NextResponse.json({ error: error.message, details: error }, { status: 500 });
    }
}