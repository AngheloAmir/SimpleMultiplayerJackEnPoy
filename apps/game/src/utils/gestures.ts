import { Finger, FingerCurl, FingerDirection, GestureDescription } from 'fingerpose';

// Rock Gesture - All fingers curled (fist)
export const rockGesture = new GestureDescription('rock');

// Thumb curled
rockGesture.addCurl(Finger.Thumb, FingerCurl.HalfCurl, 1.0);
rockGesture.addCurl(Finger.Thumb, FingerCurl.FullCurl, 1.0);

// All other fingers fully curled
for (const finger of [Finger.Index, Finger.Middle, Finger.Ring, Finger.Pinky]) {
  rockGesture.addCurl(finger, FingerCurl.FullCurl, 1.0);
  rockGesture.addCurl(finger, FingerCurl.HalfCurl, 0.9);
}

// Paper Gesture - All fingers extended (open palm)
export const paperGesture = new GestureDescription('paper');

// All fingers extended with no curl
for (const finger of [Finger.Thumb, Finger.Index, Finger.Middle, Finger.Ring, Finger.Pinky]) {
  paperGesture.addCurl(finger, FingerCurl.NoCurl, 1.0);
}

// Fingers pointing up or diagonally
paperGesture.addDirection(Finger.Index, FingerDirection.VerticalUp, 1.0);
paperGesture.addDirection(Finger.Index, FingerDirection.DiagonalUpLeft, 0.9);
paperGesture.addDirection(Finger.Index, FingerDirection.DiagonalUpRight, 0.9);

// Scissors Gesture - Index + Middle extended, others curled
export const scissorsGesture = new GestureDescription('scissors');

// Index and Middle fingers extended
scissorsGesture.addCurl(Finger.Index, FingerCurl.NoCurl, 1.0);
scissorsGesture.addCurl(Finger.Middle, FingerCurl.NoCurl, 1.0);

// Ring and Pinky curled
scissorsGesture.addCurl(Finger.Ring, FingerCurl.FullCurl, 1.0);
scissorsGesture.addCurl(Finger.Ring, FingerCurl.HalfCurl, 0.9);
scissorsGesture.addCurl(Finger.Pinky, FingerCurl.FullCurl, 1.0);
scissorsGesture.addCurl(Finger.Pinky, FingerCurl.HalfCurl, 0.9);

// Thumb can be either curled or half-curled
scissorsGesture.addCurl(Finger.Thumb, FingerCurl.HalfCurl, 1.0);
scissorsGesture.addCurl(Finger.Thumb, FingerCurl.FullCurl, 0.9);
scissorsGesture.addCurl(Finger.Thumb, FingerCurl.NoCurl, 0.5);

export const allGestures = [rockGesture, paperGesture, scissorsGesture];

export type GestureType = 'rock' | 'paper' | 'scissors' | null;
