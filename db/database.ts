import * as SQLite from 'expo-sqlite';

export interface Session {
  id: number;
  title: string;
  date: string;
  duration: number;
  language: string;
  created_at: number;
}

export interface Note {
  id: number;
  session_id: number;
  text: string;
  speaker: string;
  timestamp: number;
  is_manual: number;
  language: string;
}

let db: SQLite.SQLiteDatabase | null = null;

async function getDb(): Promise<SQLite.SQLiteDatabase> {
  if (!db) {
    db = await SQLite.openDatabaseAsync('call_notes.db');
  }
  return db;
}

export async function initDB(): Promise<void> {
  const database = await getDb();
  await database.execAsync(`
    PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS sessions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      date TEXT NOT NULL,
      duration INTEGER DEFAULT 0,
      language TEXT DEFAULT 'bn-BD',
      created_at INTEGER NOT NULL
    );
    CREATE TABLE IF NOT EXISTS notes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      session_id INTEGER NOT NULL,
      text TEXT NOT NULL,
      speaker TEXT DEFAULT 'You',
      timestamp INTEGER NOT NULL,
      is_manual INTEGER DEFAULT 0,
      language TEXT DEFAULT 'bn-BD'
    );
  `);
}

export async function createSession(title: string, language: string): Promise<number> {
  const database = await getDb();
  const now = Date.now();
  const date = new Date(now).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
  const result = await database.runAsync(
    'INSERT INTO sessions (title, date, duration, language, created_at) VALUES (?, ?, ?, ?, ?)',
    [title || 'Untitled Call', date, 0, language, now]
  );
  return result.lastInsertRowId;
}

export async function getSessions(): Promise<Session[]> {
  const database = await getDb();
  return await database.getAllAsync<Session>(
    'SELECT * FROM sessions ORDER BY created_at DESC'
  );
}

export async function getSessionById(id: number): Promise<Session | null> {
  const database = await getDb();
  return await database.getFirstAsync<Session>(
    'SELECT * FROM sessions WHERE id = ?',
    [id]
  );
}

export async function updateSessionDuration(id: number, duration: number): Promise<void> {
  const database = await getDb();
  await database.runAsync(
    'UPDATE sessions SET duration = ? WHERE id = ?',
    [duration, id]
  );
}

export async function deleteSession(id: number): Promise<void> {
  const database = await getDb();
  await database.runAsync('DELETE FROM notes WHERE session_id = ?', [id]);
  await database.runAsync('DELETE FROM sessions WHERE id = ?', [id]);
}

export async function saveNote(
  sessionId: number,
  text: string,
  speaker: string,
  isManual: boolean,
  language: string
): Promise<number> {
  const database = await getDb();
  const result = await database.runAsync(
    'INSERT INTO notes (session_id, text, speaker, timestamp, is_manual, language) VALUES (?, ?, ?, ?, ?, ?)',
    [sessionId, text, speaker, Date.now(), isManual ? 1 : 0, language]
  );
  return result.lastInsertRowId;
}

export async function getNotesBySession(sessionId: number): Promise<Note[]> {
  const database = await getDb();
  return await database.getAllAsync<Note>(
    'SELECT * FROM notes WHERE session_id = ? ORDER BY timestamp ASC',
    [sessionId]
  );
}

export async function searchNotes(query: string): Promise<Note[]> {
  const database = await getDb();
  return await database.getAllAsync<Note>(
    "SELECT * FROM notes WHERE text LIKE ? ORDER BY timestamp DESC",
    [`%${query}%`]
  );
}
