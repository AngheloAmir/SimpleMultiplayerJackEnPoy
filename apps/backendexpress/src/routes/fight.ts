import { Router, Request, Response } from "express";

const router = Router();

interface FightRequest {
    team: 'red' | 'blue';
    gesture: 'rock' | 'paper' | 'scissors';
}

router.post("/", (req: Request, res: Response) => {
    const { team, gesture } = req.body as FightRequest;

    console.log("========================================");
    console.log("🎮 FIGHT REQUEST RECEIVED!");
    console.log("========================================");
    console.log(`Team: ${team === 'red' ? '🔴 Red' : '🔵 Blue'}`);
    console.log(`Gesture: ${getGestureEmoji(gesture)} ${gesture?.toUpperCase()}`);
    console.log(`Timestamp: ${new Date().toISOString()}`);
    console.log("========================================");

    res.json({
        success: true,
        message: `Fight received! Team ${team} played ${gesture}`,
        team,
        gesture,
        timestamp: new Date().toISOString()
    });
});

function getGestureEmoji(gesture: string): string {
    switch (gesture) {
        case 'rock': return '✊';
        case 'paper': return '✋';
        case 'scissors': return '✌️';
        default: return '🤚';
    }
}

export default router;
