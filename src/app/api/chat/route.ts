import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextRequest, NextResponse } from 'next/server';

// Initialize the Gemini API
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || '');

// Construction-specific system prompt
const SYSTEM_PROMPT = `You are ConstructionCody, an expert AI assistant specializing in electrical construction and project management. Your knowledge includes:

- National Electrical Code (NEC) requirements and best practices
- Conduit, raceway, and wiring specifications
- Panel schedules, load calculations, and circuit design
- RFI (Request for Information) creation and management
- Submittal package requirements and compliance
- Daily log best practices
- Drawing coordination and specifications
- Construction project management

When answering:
1. Be specific and cite NEC articles when applicable
2. Provide practical, actionable advice
3. Consider safety first
4. Explain technical concepts clearly
5. Suggest related topics the user might need to know
6. Keep responses concise but thorough

If asked about something outside electrical construction, politely redirect to construction-related topics.`;

export async function POST(request: NextRequest) {
  try {
    const { message, conversationHistory } = await request.json();

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    if (!process.env.GOOGLE_API_KEY) {
      return NextResponse.json(
        { error: 'Google API key not configured' },
        { status: 500 }
      );
    }

    // Use Gemini Pro model
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    // Build conversation context
    let prompt = SYSTEM_PROMPT + '\n\n';
    
    // Add conversation history if provided
    if (conversationHistory && conversationHistory.length > 0) {
      prompt += 'Previous conversation:\n';
      conversationHistory.forEach((msg: any) => {
        prompt += `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.content}\n`;
      });
      prompt += '\n';
    }
    
    prompt += `User: ${message}\n\nAssistant:`;

    // Generate response
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({
      success: true,
      response: text,
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error('Gemini API Error:', error);
    
    return NextResponse.json(
      {
        error: 'Failed to generate response',
        details: error.message,
      },
      { status: 500 }
    );
  }
}

// Handle OPTIONS for CORS
export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
