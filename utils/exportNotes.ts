import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { Note, Session } from '../db/database';

function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

function formatTimestamp(ts: number): string {
  const d = new Date(ts);
  const h = String(d.getHours()).padStart(2, '0');
  const m = String(d.getMinutes()).padStart(2, '0');
  const s = String(d.getSeconds()).padStart(2, '0');
  return `${h}:${m}:${s}`;
}

function speakerTag(note: Note): string {
  if (note.is_manual) return '📝 Note [MANUAL]';
  if (note.speaker === 'Caller') return '👤 Caller [TRANSCRIPT]';
  return '🎙 You [TRANSCRIPT]';
}

export async function exportAsTxt(session: Session, notes: Note[]): Promise<void> {
  const lines: string[] = [
    `CALL NOTES — ${session.title}`,
    `Date: ${session.date}`,
    `Duration: ${formatDuration(session.duration)}`,
    `Language: ${session.language}`,
    `Total entries: ${notes.length}`,
    '========================================',
    '',
  ];

  for (const note of notes) {
    lines.push(`[${formatTimestamp(note.timestamp)}] ${speakerTag(note)}`);
    lines.push(note.text);
    lines.push('');
  }

  const content = lines.join('\n');
  const filename = `miguns-call-notes-${session.id}-${Date.now()}.txt`;
  const path = `${FileSystem.documentDirectory}${filename}`;

  await FileSystem.writeAsStringAsync(path, content, {
    encoding: FileSystem.EncodingType.UTF8,
  });

  const canShare = await Sharing.isAvailableAsync();
  if (canShare) {
    await Sharing.shareAsync(path, {
      mimeType: 'text/plain',
      dialogTitle: `Export: ${session.title}`,
    });
  }
}
