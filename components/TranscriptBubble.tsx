import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface TranscriptBubbleProps {
  text: string;
  speaker: string;
  timestamp: number;
  isManual: boolean;
  isPartial?: boolean;
}

function formatTime(ts: number): string {
  const d = new Date(ts);
  const h = String(d.getHours()).padStart(2, '0');
  const m = String(d.getMinutes()).padStart(2, '0');
  const s = String(d.getSeconds()).padStart(2, '0');
  return `${h}:${m}:${s}`;
}

export default function TranscriptBubble({
  text,
  speaker,
  timestamp,
  isManual,
  isPartial = false,
}: TranscriptBubbleProps) {
  const isCaller = speaker === 'Caller';

  const containerStyle = [
    s.container,
    isCaller ? s.callerContainer : s.youContainer,
    isManual && s.manualContainer,
    isPartial && s.partialContainer,
  ];

  const bubbleStyle = [
    s.bubble,
    isCaller ? s.callerBubble : s.youBubble,
    isManual && s.manualBubble,
  ];

  const textStyle = [
    s.text,
    isPartial && s.partialText,
  ];

  const speakerIcon = isManual ? '📝' : isCaller ? '👤' : '🎙';
  const speakerLabel = isManual ? 'Note' : speaker;

  return (
    <View style={containerStyle}>
      <View style={bubbleStyle}>
        <View style={s.header}>
          <Text style={s.speakerLabel}>
            {speakerIcon} {speakerLabel}
          </Text>
          <Text style={s.timestamp}>{formatTime(timestamp)}</Text>
        </View>
        <Text style={textStyle}>{text}</Text>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  container: {
    marginVertical: 4,
    marginHorizontal: 12,
    alignItems: 'flex-start',
  },
  callerContainer: {
    alignItems: 'flex-end',
  },
  youContainer: {
    alignItems: 'flex-start',
  },
  manualContainer: {
    alignItems: 'flex-start',
  },
  partialContainer: {
    opacity: 0.5,
  },
  bubble: {
    maxWidth: '80%',
    borderRadius: 12,
    padding: 10,
    borderLeftWidth: 3,
  },
  youBubble: {
    backgroundColor: '#EEF2FF',
    borderLeftColor: '#6366F1',
  },
  callerBubble: {
    backgroundColor: '#F0FFF4',
    borderLeftColor: '#22C55E',
  },
  manualBubble: {
    backgroundColor: '#FFFBEB',
    borderLeftColor: '#F59E0B',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  speakerLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: '#6B7280',
    marginRight: 8,
  },
  timestamp: {
    fontSize: 10,
    color: '#9CA3AF',
  },
  text: {
    fontSize: 15,
    color: '#1F2937',
    lineHeight: 22,
  },
  partialText: {
    fontStyle: 'italic',
    color: '#6B7280',
  },
});
