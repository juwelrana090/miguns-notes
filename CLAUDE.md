# CLAUDE.md — AI Agent Knowledge File

_Last updated: 2026-04-08_

## Project Overview

**miguns-call-notes** is a React Native Expo app (EAS custom build, Android only).
It floats over call apps (Google Meet, Zoom) and transcribes speech in real time.
Supports Bangla (default), English, and 13 other languages via BCP-47 codes.
Fully offline — no backend, no API, no authentication.
Opens directly to the session list home screen.

## Project Identity

| Key              | Value                  |
| ---------------- | ---------------------- |
| Project name     | `miguns-call-notes`    |
| App display name | `Miguns Call Notes`    |
| Android package  | `com.miguns.callnotes` |
| Expo slug        | `miguns-call-notes`    |
| Expo scheme      | `miguns-call-notes`    |

## Architecture

| Layer        | Technology                                    |
| ------------ | --------------------------------------------- |
| Framework    | React Native 0.81.5 + Expo SDK 54             |
| Navigation   | Expo Router v3 (file-based)                   |
| Language     | TypeScript strict mode                        |
| Database     | expo-sqlite v15 (async API)                   |
| Speech       | @react-native-voice/voice (auto-restart loop) |
| Audio        | expo-av (HIGH_QUALITY recording)              |
| Screen awake | expo-keep-awake                               |
| Export       | expo-sharing + expo-file-system               |
| Build        | EAS custom build — Expo Go NOT supported      |
| Icons        | @expo/vector-icons (Ionicons)                 |

## Project File Structure

```
miguns-call-notes/
├── app/
│   ├── _layout.tsx         # Root layout — initDB, Stack navigator, no auth
│   ├── index.tsx           # Home: session list, FAB, pull-to-refresh
│   ├── recording.tsx       # Live recording + transcript + language picker
│   └── session/
│       └── [id].tsx        # Session review + export
├── components/
│   ├── FloatingControls.tsx # Timer, speaker toggle, stop button
│   ├── TranscriptBubble.tsx # You / Caller / Note bubbles
│   └── NoteInput.tsx        # Manual note input bar
├── db/
│   └── database.ts          # SQLite init + CRUD (sessions + notes tables)
├── hooks/
│   ├── useSpeechToText.ts   # Continuous speech loop, dynamic import, crash-safe
│   ├── useAudioRecorder.ts  # expo-av recording with permission handling
│   └── useTimer.ts          # MM:SS interval timer
├── utils/
│   └── exportNotes.ts       # .txt export + share
├── constants/
│   └── languages.ts         # 15 languages, default bn-BD (Bangla)
├── CLAUDE.md                # This file
└── .context                 # Machine-readable project state
```

## Language Support

- Default: Bangla Bangladesh (`bn-BD`)
- BCP-47 codes defined in `constants/languages.ts`
- Language stored per session in SQLite (`sessions.language` column)
- `useSpeechToText` receives the BCP-47 code and passes it to Android SpeechRecognizer
- Bangla transcription requires Google Speech pack installed on device

## Database Schema

```sql
sessions: id, title, date, duration, language, created_at
notes:    id, session_id, text, speaker, timestamp, is_manual, language
```

- `speaker` values: `'You'` | `'Caller'` | `'Note'`
- `is_manual`: 0 = transcript, 1 = manually typed note

## Current Status

- Phase: MVP — migration complete
- Auth: fully removed (no login, register, OTP)
- Redux/Firebase: fully removed
- All 21 core files written
- Next: native build + device testing

## Completed Features

- Session list home screen
- Live recording screen with language picker
- Real-time speech-to-text (auto-restart loop)
- Speaker labeling (You / Caller)
- Manual note input during call
- Session review screen
- Export session as .txt
- SQLite persistence
- 15-language support (Bangla default)

## Pending / Next Session

- Test Bangla transcription on real Android device
- Floating overlay (SYSTEM_ALERT_WINDOW) — requires additional native module
- Search across all sessions/notes
- Audio playback of recorded session

## Known Limitations

- Caller voice cannot be transcribed (mic captures only your voice)
- Floating overlay above other apps requires EAS build + SYSTEM_ALERT_WINDOW
- Bangla accuracy depends on Google's speech model quality
- expo-sqlite v15 uses async API — do NOT use the old synchronous `db.transaction()` pattern

## Permissions Required

```
RECORD_AUDIO
FOREGROUND_SERVICE
FOREGROUND_SERVICE_MICROPHONE
SYSTEM_ALERT_WINDOW
RECEIVE_BOOT_COMPLETED
```

## Build Notes

- Must use EAS custom build
- Android package: `com.miguns.callnotes`
- After any app.json change run: `npx expo prebuild --clean`
- Build command: `eas build --platform android --profile development`

## Do NOT Touch (stable files)

- `constants/languages.ts` — complete, all 15 languages correct
- `hooks/useTimer.ts` — complete and working
- `utils/exportNotes.ts` — complete and working

## Files Modified — Migration Session

- Removed: `app/auth/`, `app/(tabs)/`, `app/welcome.tsx`, `shared/`
- Written: all 21 files listed in structure above
- Renamed: `call-notes-app` → `miguns-call-notes` everywhere
