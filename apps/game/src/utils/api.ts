const API_BASE_URL = 'https://simple-multiplayer-jack-en-poy-back.vercel.app';

export interface FightRequest {
  team: 'red' | 'blue';
  gesture: 'rock' | 'paper' | 'scissors';
}

export interface FightResponse {
  success: boolean;
  message: string;
  result?: 'Won' | 'Lost' | 'Draw';
  opponentGesture?: string;
}

export async function sendFight(data: FightRequest): Promise<FightResponse> {
  try {
    // Normalize URL to prevent double slashes
    const baseUrl = API_BASE_URL.replace(/\/+$/, ''); // Remove trailing slashes
    const response = await fetch(`${baseUrl}/fight`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error sending fight request:', error);
    throw error;
  }
}
