import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface FloatingControlsProps {
  isListening: boolean;
  isStarted: boolean;
  timerFormatted: string;
  onStart: () => void;
  onStop: () => void;
  onToggleSpeaker: () => void;
  currentSpeaker: string;
}

export default function FloatingControls({
  isListening,
  isStarted,
  timerFormatted,
  onStart,
  onStop,
  onToggleSpeaker,
  currentSpeaker,
}: FloatingControlsProps) {
  if (!isStarted) {
    return null; // Pre-start UI is handled in recording.tsx
  }

  return (
    <View style={s.container}>
      <View style={s.pill}>
        {/* Timer */}
        <View style={s.timerSection}>
          <View style={[s.dot, isListening ? s.dotActive : s.dotIdle]} />
          <Text style={s.timer}>{timerFormatted}</Text>
        </View>

        {/* Speaker toggle */}
        <TouchableOpacity
          onPress={onToggleSpeaker}
          style={s.speakerButton}
          activeOpacity={0.8}
        >
          <Text style={s.speakerText}>
            {currentSpeaker === 'You' ? '🎙 You' : '👤 Caller'}
          </Text>
        </TouchableOpacity>

        {/* Stop */}
        <TouchableOpacity onPress={onStop} style={s.stopButton} activeOpacity={0.8}>
          <Text style={s.stopText}>■ Stop</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 4,
    backgroundColor: '#6366F1',
  },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 24,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  timerSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  dotActive: {
    backgroundColor: '#4ADE80',
  },
  dotIdle: {
    backgroundColor: '#FCA5A5',
  },
  timer: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
    fontVariant: ['tabular-nums'],
  },
  speakerButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  speakerText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '600',
  },
  stopButton: {
    backgroundColor: '#EF4444',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  stopText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },
});
