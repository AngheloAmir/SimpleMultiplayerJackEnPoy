import * as handPoseDetection from '@tensorflow-models/hand-pose-detection';
import '@tensorflow/tfjs-core';
import '@tensorflow/tfjs-backend-webgl';
import * as fp from 'fingerpose';
import { allGestures } from './gestures';
import type { GestureType } from './gestures';

let detector: handPoseDetection.HandDetector | null = null;
let gestureEstimator: fp.GestureEstimator | null = null;

export async function initializeHandDetector(): Promise<void> {
  if (detector) return;

  // Use MediaPipe Hands model with lite configuration for performance
  const model = handPoseDetection.SupportedModels.MediaPipeHands;
  const detectorConfig: handPoseDetection.MediaPipeHandsMediaPipeModelConfig = {
    runtime: 'mediapipe',
    solutionPath: 'https://cdn.jsdelivr.net/npm/@mediapipe/hands',
    modelType: 'lite', // Use lite model for better performance
    maxHands: 1, // Only detect one hand
  };

  detector = await handPoseDetection.createDetector(model, detectorConfig);
  gestureEstimator = new fp.GestureEstimator(allGestures);
}

export async function detectGesture(video: HTMLVideoElement): Promise<GestureType> {
  if (!detector || !gestureEstimator) {
    return null;
  }

  try {
    const hands = await detector.estimateHands(video, {
      flipHorizontal: false,
    });

    if (hands.length === 0) {
      return null;
    }

    const hand = hands[0];
    
    // Filter out low confidence detections (often faces misidentified as hands)
    if (hand.score && hand.score < 0.9) {
      return null;
    }
    
    // Convert keypoints to the format expected by fingerpose
    // fingerpose expects [[x, y, z], ...] format
    const landmarks = hand.keypoints3D 
      ? hand.keypoints3D.map(kp => [kp.x, kp.y, kp.z || 0])
      : hand.keypoints.map(kp => [kp.x, kp.y, 0]);

    const gesture = gestureEstimator.estimate(landmarks as [number, number, number][], 8.5);

    if (gesture.gestures.length > 0) {
      // Sort by confidence and get the highest
      const sortedGestures = gesture.gestures.sort((a, b) => b.score - a.score);
      const detectedGesture = sortedGestures[0];
      
      if (detectedGesture.score > 9.0) {
        return detectedGesture.name as GestureType;
      }
    }

    return null;
  } catch (error) {
    console.error('Error detecting gesture:', error);
    return null;
  }
}

export function disposeDetector(): void {
  if (detector) {
    detector.dispose();
    detector = null;
  }
  gestureEstimator = null;
}
