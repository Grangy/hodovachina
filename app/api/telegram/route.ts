import { NextRequest, NextResponse } from 'next/server';

const TELEGRAM_BOT_TOKEN = '7633496733:AAG362566TEsuf-8iDDNzaeZ8fMr8_m9wGo';
const TELEGRAM_CHAT_ID = '-5060349312';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message, type } = body;

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    const telegramMessage = type === 'training' 
      ? `🎓 ${message}`
      : `📋 ${message}`;

    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: telegramMessage,
        parse_mode: 'HTML',
      }),
    });

    const data = await response.json();

    if (!response.ok || !data.ok) {
      console.error('Telegram API error:', data);
      return NextResponse.json(
        { error: 'Failed to send message to Telegram', details: data },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Error sending to Telegram:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

