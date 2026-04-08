# TASK: Rename Project — `call-notes-app` → `miguns-call-notes`

## WHO YOU ARE

You are a Senior React Native Expo developer.
You do not describe what you will do. You OPEN the file, CHANGE it, SAVE it.
After every file: state "✅ FILE SAVED: [filepath]"

---

## THE ONLY TASK

The project name `call-notes-app` must be replaced with `miguns-call-notes` everywhere.

---

## STEP 1 — SEARCH FIRST

Before touching any file, run a full-text search across the entire project for these exact strings:

```
"call-notes-app"
"call_notes_app"
"callnotesapp"
"call-notes"
"CallNotes"
"Call Notes"
"com.yourname.callnotes"
```

List every file that contains any of these strings.
Do NOT start editing until the search is complete.

---

## STEP 2 — EDIT EACH FILE

For every file found in the search, do this:

1. READ the full file
2. REPLACE every occurrence:

| Old value                | New value              |
| ------------------------ | ---------------------- |
| `call-notes-app`         | `miguns-call-notes`    |
| `call_notes_app`         | `miguns_call_notes`    |
| `callnotesapp`           | `migunsCallNotes`      |
| `Call Notes`             | `Miguns Call Notes`    |
| `CallNotes`              | `MigunsCallNotes`      |
| `com.yourname.callnotes` | `com.miguns.callnotes` |

3. WRITE the complete updated file
4. CONFIRM: "✅ FILE SAVED: [filepath]"

---

## KNOWN FILES THAT DEFINITELY NEED UPDATING

Check these files first — they almost certainly contain the old name:

```
package.json           →  "name": "miguns-call-notes"
app.json               →  "name", "slug", "scheme", "package"
CLAUDE.md              →  project name in overview section
.context               →  "project" field
app/_layout.tsx        →  any hardcoded app name string
```

---

## STEP 3 — VERIFY

After all files are updated:

1. Search the entire project again for `call-notes-app`
2. If any result found — fix it
3. If zero results — state: "✅ RENAME COMPLETE — no remaining references to call-notes-app"

---

## STEP 4 — UPDATE KNOWLEDGE FILES

**Update `CLAUDE.md`:**

- READ the file
- Change project name to `miguns-call-notes` everywhere it appears
- Add one line under "Build Notes":
  ```
  Android package: com.miguns.callnotes
  ```
- WRITE the complete file
- CONFIRM: "✅ FILE SAVED: CLAUDE.md"

**Update `.context`:**

- READ the file
- Change `"project"` field value to `"miguns-call-notes"`
- Change `"android_package"` to `"com.miguns.callnotes"` (add field if missing)
- WRITE the complete file
- CONFIRM: "✅ FILE SAVED: .context"

---

## AFTER THE RENAME — RUN THIS

Tell the user to run:

```bash
npx expo prebuild --clean
```

> This is required because `app.json` slug and package name changed.
> The old `android/` and `ios/` native folders must be regenerated.

---

## STEP 5 — FULL CLAUDE.md REWRITE

- READ the current `CLAUDE.md`
- REWRITE it completely with the updated content below:

```markdown
# CLAUDE.md — AI Agent Knowledge File

_Last updated: [TODAY'S DATE]_

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
| Expo scheme      | `migunsCallNotes`      |

## Architecture

| Layer        | Technology                                    |
| ------------ | --------------------------------------------- |
| Framework    | React Native 0.74 + Expo SDK 51               |
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
│ ├── \_layout.tsx # Root layout — initDB, Stack navigator, no auth
│ ├── index.tsx # Home: session list, FAB, pull-to-refresh
│ ├── recording.tsx # Live recording + transcript + language picker
│ └── session/
│ └── [id].tsx # Session review + export
├── components/
│ ├── FloatingControls.tsx # Timer, speaker toggle, stop button
│ ├── TranscriptBubble.tsx # You / Caller / Note bubbles
│ └── NoteInput.tsx # Manual note input bar
├── db/
│ └── database.ts # SQLite init + CRUD (sessions + notes tables)
├── hooks/
│ ├── useSpeechToText.ts # Continuous speech loop, dynamic import, crash-safe
│ ├── useAudioRecorder.ts # expo-av recording with permission handling
│ └── useTimer.ts # MM:SS interval timer
├── utils/
│ └── exportNotes.ts # .txt export + share
├── constants/
│ └── languages.ts # 15 languages, default bn-BD (Bangla)
├── CLAUDE.md # This file
└── .context # Machine-readable project state

````

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
````

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

````

- WRITE the complete file
- CONFIRM: "✅ FILE SAVED: CLAUDE.md"

---

## STEP 6 — FULL .context REWRITE

- READ the current `.context`
- REWRITE it completely:

```json
{
  "project": "miguns-call-notes",
  "display_name": "Miguns Call Notes",
  "type": "floating-overlay-transcription",
  "platform": "android",
  "sdk": "expo-51",
  "react_native": "0.74",
  "build_type": "eas_development",
  "expo_go_compatible": false,
  "android_package": "com.miguns.callnotes",
  "expo_slug": "miguns-call-notes",
  "expo_scheme": "migunsCallNotes",
  "has_authentication": false,
  "has_backend": false,
  "has_redux": false,
  "has_firebase": false,
  "database": "expo-sqlite-v15-async",
  "default_language": "bn-BD",
  "supported_languages": [
    "bn-BD", "bn-IN", "en-US", "en-GB",
    "hi-IN", "ar-SA", "zh-CN", "fr-FR",
    "de-DE", "es-ES", "pt-BR", "ru-RU",
    "ja-JP", "ko-KR", "tr-TR"
  ],
  "last_updated": "YYYY-MM-DD",
  "status": "mvp_complete",
  "completed_features": [
    "session-list-home-screen",
    "live-recording-screen",
    "language-picker-15-languages",
    "speech-to-text-auto-restart-loop",
    "speaker-labeling-you-caller",
    "manual-note-input",
    "session-review-screen",
    "txt-export-and-share",
    "sqlite-persistence",
    "remove-auth-completely",
    "remove-redux-firebase"
  ],
  "pending_features": [
    "floating-overlay-system-alert-window",
    "search-across-sessions",
    "audio-playback",
    "bangla-device-testing"
  ],
  "known_bugs": [],
  "critical_files": [
    "db/database.ts",
    "hooks/useSpeechToText.ts",
    "app/recording.tsx",
    "constants/languages.ts",
    "app.json"
  ],
  "do_not_touch": [
    "constants/languages.ts",
    "hooks/useTimer.ts",
    "utils/exportNotes.ts"
  ],
  "permissions_required": [
    "RECORD_AUDIO",
    "FOREGROUND_SERVICE",
    "FOREGROUND_SERVICE_MICROPHONE",
    "SYSTEM_ALERT_WINDOW",
    "RECEIVE_BOOT_COMPLETED"
  ],
  "key_dependencies": {
    "@react-native-voice/voice": "speech-recognition",
    "expo-av": "audio-recording",
    "expo-sqlite": "v15-local-database",
    "expo-keep-awake": "screen-on-during-call",
    "expo-sharing": "export-notes",
    "expo-file-system": "write-txt-file"
  },
  "build_commands": {
    "install": "npm install",
    "prebuild": "npx expo prebuild --clean",
    "run_android": "npx expo run:android",
    "eas_build": "eas build --platform android --profile development"
  }
}
````

- WRITE the complete file
- CONFIRM: "✅ FILE SAVED: .context"

---

## WHAT YOU MUST NOT DO

```
❌ Do not change any logic, components, or functionality
❌ Do not add or remove any features
❌ Do not rename files or folders — only content inside files
❌ Do not skip the search step — there may be files not listed above
```

---

## HOW TO START

Say this exactly:

> "Searching project for all occurrences of call-notes-app now."

Then list every file found. Then begin Step 2.
