import { NextRequest, NextResponse } from 'next/server';

const TELEGRAM_BOT_TOKEN = '7633496733:AAG362566TEsuf-8iDDNzaeZ8fMr8_m9wGo';
const TELEGRAM_CHAT_ID = '-5060349312';

export async function POST(request: NextRequest) {
  const startTime = Date.now();
  console.log('[Telegram API] Request received at:', new Date().toISOString());
  
  try {
    const parseStart = Date.now();
    const body = await request.json();
    const parseTime = Date.now() - parseStart;
    console.log('[Telegram API] Body parsed in', parseTime, 'ms');

    const { message, type } = body;

    if (!message) {
      console.error('[Telegram API] Validation error: message is required');
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    const telegramMessage = type === 'training' 
      ? `🎓 ${message}`
      : `📋 ${message}`;

    console.log('[Telegram API] Message type:', type);
    console.log('[Telegram API] Message length:', telegramMessage.length);
    console.log('[Telegram API] Sending to Telegram API...');
    
    const telegramStart = Date.now();
    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
    
    const fetchStart = Date.now();
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
    const fetchTime = Date.now() - fetchStart;
    console.log('[Telegram API] Fetch request completed in', fetchTime, 'ms');

    const parseDataStart = Date.now();
    const data = await response.json();
    const parseDataTime = Date.now() - parseDataStart;
    console.log('[Telegram API] Response parsed in', parseDataTime, 'ms');

    const totalTime = Date.now() - startTime;
    console.log('[Telegram API] Total request time:', totalTime, 'ms');

    if (!response.ok || !data.ok) {
      console.error('[Telegram API] Error response:', {
        status: response.status,
        statusText: response.statusText,
        data,
      });
      return NextResponse.json(
        { error: 'Failed to send message to Telegram', details: data },
        { status: 500 }
      );
    }

    console.log('[Telegram API] Success! Message ID:', data.result?.message_id);
    return NextResponse.json({ success: true, data });
  } catch (error) {
    const totalTime = Date.now() - startTime;
    console.error('[Telegram API] Exception after', totalTime, 'ms:', error);
    console.error('[Telegram API] Error stack:', error instanceof Error ? error.stack : 'No stack trace');
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

