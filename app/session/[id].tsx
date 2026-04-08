import TranscriptBubble from '@/components/TranscriptBubble';
import { exportAsTxt } from '@/utils/exportNotes';
import { getNotesBySession, getSessionById, Note, Session } from '@/db/database';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect, useLocalSearchParams, useNavigation } from 'expo-router';
import React, { useCallback, useLayoutEffect, useState } from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

export default function SessionScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const navigation = useNavigation();
  const [session, setSession] = useState<Session | null>(null);
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    if (!id) return;
    try {
      const [s, n] = await Promise.all([
        getSessionById(Number(id)),
        getNotesBySession(Number(id)),
      ]);
      setSession(s);
      setNotes(n);
    } catch (error) {
      console.error('Failed to load session:', error);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useFocusEffect(
    useCallback(() => {
      load();
    }, [load])
  );

  useLayoutEffect(() => {
    if (!session) return;
    navigation.setOptions({
      title: session.title,
      headerRight: () => (
        <TouchableOpacity
          onPress={() => session && exportAsTxt(session, notes)}
          style={{ marginRight: 12 }}
        >
          <Ionicons name="share-outline" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      ),
    });
  }, [navigation, session, notes]);

  if (loading) {
    return (
      <View style={s.center}>
        <ActivityIndicator size="large" color="#6366F1" />
      </View>
    );
  }

  if (!session) {
    return (
      <View style={s.center}>
        <Text style={s.notFound}>Session not found.</Text>
      </View>
    );
  }

  return (
    <View style={s.container}>
      {/* Metadata header */}
      <View style={s.meta}>
        <View style={s.metaRow}>
          <Text style={s.metaLabel}>Date</Text>
          <Text style={s.metaValue}>{session.date}</Text>
        </View>
        <View style={s.metaRow}>
          <Text style={s.metaLabel}>Duration</Text>
          <Text style={s.metaValue}>{formatDuration(session.duration)}</Text>
        </View>
        <View style={s.metaRow}>
          <Text style={s.metaLabel}>Language</Text>
          <Text style={s.metaValue}>{session.language}</Text>
        </View>
        <View style={s.metaRow}>
          <Text style={s.metaLabel}>Entries</Text>
          <Text style={s.metaValue}>{notes.length}</Text>
        </View>
      </View>

      {/* Notes */}
      <ScrollView style={s.scroll} contentContainerStyle={s.scrollContent}>
        {notes.length === 0 ? (
          <View style={s.empty}>
            <Text style={s.emptyText}>No transcript entries for this session.</Text>
          </View>
        ) : (
          notes.map((note) => (
            <TranscriptBubble
              key={note.id}
              text={note.text}
              speaker={note.speaker}
              timestamp={note.timestamp}
              isManual={note.is_manual === 1}
            />
          ))
        )}
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  notFound: { fontSize: 16, color: '#6B7280' },
  meta: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  metaLabel: { fontSize: 13, color: '#6B7280' },
  metaValue: { fontSize: 13, fontWeight: '600', color: '#111827' },
  scroll: { flex: 1 },
  scrollContent: { paddingVertical: 12, paddingBottom: 40 },
  empty: { alignItems: 'center', paddingTop: 60 },
  emptyText: { fontSize: 15, color: '#9CA3AF', fontStyle: 'italic' },
});
