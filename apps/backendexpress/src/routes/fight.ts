import { Router, Request, Response } from "express";
import { supabase } from "../config/supabase";

const router = Router();

interface FightRequest {
    team: 'red' | 'blue';
    gesture: 'rock' | 'paper' | 'scissors';
}

router.post("/", async (req: Request, res: Response) => {
    const { team, gesture } = req.body as FightRequest;

    console.log("========================================");
    console.log("🎮 FIGHT REQUEST RECEIVED!");
    console.log(`Team: ${team} | Gesture: ${gesture}`);

    const teamName = team === 'red' ? 'Team Red' : 'Team Blue';
    const opponentTeamName = team === 'red' ? 'Team Blue' : 'Team Red';
    
    // DB expects Capitalized gestures (Rock, Paper, Scissors)
    const dbGesture = gesture.charAt(0).toUpperCase() + gesture.slice(1);

    try {
        // 1. Update user's team gesture
        const { error: updateError } = await supabase
            .from('playerteam')
            .update({ gesture: dbGesture })
            .eq('team_name', teamName);

        if (updateError) {
            console.error('Error updating gesture:', updateError);
            res.status(500).json({ success: false, message: 'Failed to update gesture' });
            return;
        }

        // 2. Fetch opponent's gesture
        const { data: opponentData, error: fetchError } = await supabase
            .from('playerteam')
            .select('gesture')
            .eq('team_name', opponentTeamName)
            .single();

        if (fetchError || !opponentData) {
            console.error('Error fetching opponent:', fetchError);
            res.status(500).json({ success: false, message: 'Failed to fetch opponent' });
            return;
        }

        const opponentGesture = opponentData.gesture.toLowerCase(); // user's gesture is already lowercase from body

        // 3. Determine Result
        let result: 'Won' | 'Lost' | 'Draw' = 'Draw';

        if (gesture === opponentGesture) {
            result = 'Draw';
        } else if (
            (gesture === 'rock' && opponentGesture === 'scissors') ||
            (gesture === 'paper' && opponentGesture === 'rock') ||
            (gesture === 'scissors' && opponentGesture === 'paper')
        ) {
            result = 'Won';
        } else {
            result = 'Lost';
        }

        console.log(`Result: ${result} (Opponent: ${opponentGesture})`);
        console.log("========================================");

        res.json({
            success: true,
            result,
            opponentGesture,
            message: `Result: ${result}`
        });

    } catch (error) {
        console.error('Unexpected error:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

export default router;
