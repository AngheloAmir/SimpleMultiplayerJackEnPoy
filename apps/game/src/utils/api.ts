const API_BASE_URL = 'http://localhost:3500';

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
    const response = await fetch(`${API_BASE_URL}/fight`, {
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
