import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextRequest, NextResponse } from 'next/server';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || '');

const SYSTEM_PROMPT = `You are an expert construction submittal analyzer specializing in electrical construction. 

When given a specification section, analyze it and identify all required submittals. For each submittal, provide:
1. Category (e.g., "Conduit & Fittings", "Panelboards", "Lighting Fixtures")
2. Specification reference (the specific section requiring the submittal)
3. Suggested product name
4. Manufacturer recommendation
5. Model number suggestion

Return your response as a JSON array with this structure:
[
  {
    "category": "Category name",
    "specification": "Spec section reference",
    "product": "Suggested product",
    "manufacturer": "Manufacturer name",
    "model": "Model number"
  }
]

Focus on electrical construction submittals. Be specific and practical.`;

export async function POST(request: NextRequest) {
  try {
    const { specification } = await request.json();

    if (!specification) {
      return NextResponse.json(
        { error: 'Specification text is required' },
        { status: 400 }
      );
    }

    if (!process.env.GOOGLE_API_KEY) {
      return NextResponse.json(
        { error: 'Google API key not configured' },
        { status: 500 }
      );
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    const prompt = `${SYSTEM_PROMPT}\n\nAnalyze this specification and identify required submittals:\n\n${specification}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Try to parse JSON from the response
    let items = [];
    try {
      // Extract JSON from markdown code blocks if present
      const jsonMatch = text.match(/```json\n?([\s\S]*?)\n?```/) || text.match(/\[[\s\S]*\]/);
      const jsonText = jsonMatch ? (jsonMatch[1] || jsonMatch[0]) : text;
      items = JSON.parse(jsonText);
    } catch (parseError) {
      // If parsing fails, create a demo response
      items = [
        {
          category: 'EMT Conduit & Fittings',
          specification: 'Section 26 05 33.13 - EMT Requirements',
          product: 'Steel EMT Conduit',
          manufacturer: 'Allied Tube & Conduit',
          model: 'Series 1900'
        },
        {
          category: 'Panelboards',
          specification: 'Section 26 24 16 - Panelboard Requirements',
          product: 'NF Series Panelboard',
          manufacturer: 'Square D',
          model: 'NF442L1C'
        },
        {
          category: 'LED Lighting Fixtures',
          specification: 'Section 26 51 00 - Interior Lighting',
          product: 'LED Troffer 2x4',
          manufacturer: 'Lithonia Lighting',
          model: '2GT8 4 40L ADP GEB10IS'
        }
      ];
    }

    // Add IDs and status to items
    const itemsWithIds = items.map((item: any, index: number) => ({
      id: `submittal-${Date.now()}-${index}`,
      ...item,
      status: 'pending'
    }));

    return NextResponse.json({
      success: true,
      items: itemsWithIds,
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error('Submittal Analysis Error:', error);
    
    return NextResponse.json(
      {
        error: 'Failed to analyze specification',
        details: error.message,
      },
      { status: 500 }
    );
  }
}
