import FloatingControls from '@/components/FloatingControls';
import NoteInput from '@/components/NoteInput';
import TranscriptBubble from '@/components/TranscriptBubble';
import { DEFAULT_LANGUAGE, Language, SUPPORTED_LANGUAGES } from '@/constants/languages';
import {
  createSession,
  getNotesBySession,
  Note,
  saveNote,
  updateSessionDuration,
} from '@/db/database';
import { useAudioRecorder } from '@/hooks/useAudioRecorder';
import { useSpeechToText } from '@/hooks/useSpeechToText';
import { useTimer } from '@/hooks/useTimer';
import { useKeepAwake } from 'expo-keep-awake';
import { useRouter } from 'expo-router';
import React, { useCallback, useRef, useState } from 'react';
import {
  Alert,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export default function RecordingScreen() {
  useKeepAwake();
  const router = useRouter();

  // Session state
  const [isStarted, setIsStarted] = useState(false);
  const [sessionId, setSessionId] = useState<number | null>(null);
  const [sessionTitle, setSessionTitle] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState<Language>(DEFAULT_LANGUAGE);
  const [currentSpeaker, setCurrentSpeaker] = useState<'You' | 'Caller'>('You');
  const [showLangModal, setShowLangModal] = useState(false);
  const [notes, setNotes] = useState<Note[]>([]);
  const scrollRef = useRef<ScrollView>(null);

  // Hooks
  const timer = useTimer();
  const recorder = useAudioRecorder();

  const handleTranscript = useCallback(
    async (text: string) => {
      if (!sessionId) return;
      try {
        const id = await saveNote(sessionId, text, currentSpeaker, false, selectedLanguage.code);
        const newNote: Note = {
          id,
          session_id: sessionId,
          text,
          speaker: currentSpeaker,
          timestamp: Date.now(),
          is_manual: 0,
          language: selectedLanguage.code,
        };
        setNotes((prev) => [...prev, newNote]);
        setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 100);
      } catch (error) {
        console.error('Failed to save transcript:', error);
      }
    },
    [sessionId, currentSpeaker, selectedLanguage.code]
  );

  const speech = useSpeechToText({
    languageCode: selectedLanguage.code,
    onResult: handleTranscript,
  });

  const handleStart = useCallback(async () => {
    try {
      const title = sessionTitle.trim() || `Call ${new Date().toLocaleTimeString()}`;
      const id = await createSession(title, selectedLanguage.code);
      setSessionId(id);
      setNotes([]);
      setIsStarted(true);
      timer.start();
      await recorder.startRecording();
      await speech.startListening();
    } catch (error) {
      console.error('Failed to start session:', error);
      Alert.alert('Error', 'Could not start recording. Please try again.');
    }
  }, [sessionTitle, selectedLanguage.code, timer, recorder, speech]);

  const handleStop = useCallback(() => {
    Alert.alert('End Session?', 'Stop recording and save this session?', [
      { text: 'Continue', style: 'cancel' },
      {
        text: 'End Session',
        style: 'destructive',
        onPress: async () => {
          timer.stop();
          await speech.stopListening();
          await recorder.stopRecording();
          if (sessionId) {
            await updateSessionDuration(sessionId, timer.seconds);
          }
          router.replace(`/session/${sessionId}`);
        },
      },
    ]);
  }, [timer, speech, recorder, sessionId, router]);

  const handleManualNote = useCallback(
    async (text: string) => {
      if (!sessionId) return;
      try {
        const id = await saveNote(sessionId, text, 'Note', true, selectedLanguage.code);
        const newNote: Note = {
          id,
          session_id: sessionId,
          text,
          speaker: 'Note',
          timestamp: Date.now(),
          is_manual: 1,
          language: selectedLanguage.code,
        };
        setNotes((prev) => [...prev, newNote]);
        setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 100);
      } catch (error) {
        console.error('Failed to save manual note:', error);
      }
    },
    [sessionId, selectedLanguage.code]
  );

  const toggleSpeaker = useCallback(() => {
    setCurrentSpeaker((prev) => (prev === 'You' ? 'Caller' : 'You'));
  }, []);

  // Pre-start UI
  if (!isStarted) {
    return (
      <View style={s.container}>
        <View style={s.setupContainer}>
          <Text style={s.setupTitle}>New Call Session</Text>

          {/* Title input */}
          <View style={s.field}>
            <Text style={s.label}>Session Title (optional)</Text>
            <TextInput
              style={s.input}
              value={sessionTitle}
              onChangeText={setSessionTitle}
              placeholder="e.g. Client Meeting, Team Standup"
              placeholderTextColor="#9CA3AF"
            />
          </View>

          {/* Language picker */}
          <View style={s.field}>
            <Text style={s.label}>Transcription Language</Text>
            <TouchableOpacity
              style={s.languagePicker}
              onPress={() => setShowLangModal(true)}
              activeOpacity={0.8}
            >
              <Text style={s.languagePickerText}>
                {selectedLanguage.nativeLabel} — {selectedLanguage.label}
              </Text>
              <Text style={s.chevron}>▼</Text>
            </TouchableOpacity>
          </View>

          {/* Hint */}
          <Text style={s.hint}>
            💡 Open Google Meet or Zoom after tapping Start
          </Text>

          {/* Permission error */}
          {recorder.permissionError && (
            <Text style={s.errorText}>{recorder.permissionError}</Text>
          )}
          {speech.error && (
            <Text style={s.errorText}>{speech.error}</Text>
          )}

          {/* Start button */}
          <TouchableOpacity style={s.startButton} onPress={handleStart} activeOpacity={0.85}>
            <Text style={s.startButtonText}>🎙 Start Recording</Text>
          </TouchableOpacity>
        </View>

        {/* Language selection modal */}
        <Modal
          visible={showLangModal}
          transparent
          animationType="slide"
          onRequestClose={() => setShowLangModal(false)}
        >
          <View style={s.modalOverlay}>
            <View style={s.modalContent}>
              <Text style={s.modalTitle}>Select Language</Text>
              <ScrollView>
                {SUPPORTED_LANGUAGES.map((lang) => (
                  <TouchableOpacity
                    key={lang.code}
                    style={[
                      s.langOption,
                      selectedLanguage.code === lang.code && s.langOptionSelected,
                    ]}
                    onPress={() => {
                      setSelectedLanguage(lang);
                      setShowLangModal(false);
                    }}
                  >
                    <Text style={s.langNative}>{lang.nativeLabel}</Text>
                    <Text style={s.langLabel}>{lang.label}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
              <TouchableOpacity
                style={s.modalClose}
                onPress={() => setShowLangModal(false)}
              >
                <Text style={s.modalCloseText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    );
  }

  // Active recording UI
  return (
    <View style={s.container}>
      <FloatingControls
        isListening={speech.isListening}
        isStarted={isStarted}
        timerFormatted={timer.formatted}
        onStart={handleStart}
        onStop={handleStop}
        onToggleSpeaker={toggleSpeaker}
        currentSpeaker={currentSpeaker}
      />

      <ScrollView
        ref={scrollRef}
        style={s.transcriptScroll}
        contentContainerStyle={s.transcriptContent}
        onContentSizeChange={() => scrollRef.current?.scrollToEnd({ animated: true })}
      >
        {notes.length === 0 && (
          <View style={s.waitingContainer}>
            <Text style={s.waitingText}>Listening… start speaking</Text>
          </View>
        )}
        {notes.map((note) => (
          <TranscriptBubble
            key={note.id}
            text={note.text}
            speaker={note.speaker}
            timestamp={note.timestamp}
            isManual={note.is_manual === 1}
          />
        ))}
        {speech.partialTranscript ? (
          <TranscriptBubble
            key="partial"
            text={speech.partialTranscript}
            speaker={currentSpeaker}
            timestamp={Date.now()}
            isManual={false}
            isPartial
          />
        ) : null}
      </ScrollView>

      <NoteInput onSubmit={handleManualNote} disabled={!isStarted} />
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },
  setupContainer: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  setupTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#111827',
    marginBottom: 32,
    textAlign: 'center',
  },
  field: { marginBottom: 20 },
  label: { fontSize: 13, fontWeight: '600', color: '#374151', marginBottom: 8 },
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 15,
    color: '#111827',
  },
  languagePicker: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  languagePickerText: { fontSize: 15, color: '#111827' },
  chevron: { fontSize: 12, color: '#6B7280' },
  hint: {
    fontSize: 13,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 18,
  },
  errorText: {
    fontSize: 13,
    color: '#EF4444',
    textAlign: 'center',
    marginBottom: 12,
  },
  startButton: {
    backgroundColor: '#6366F1',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
  },
  startButtonText: { color: '#FFFFFF', fontSize: 18, fontWeight: '700' },
  transcriptScroll: { flex: 1 },
  transcriptContent: { paddingVertical: 12, paddingBottom: 20 },
  waitingContainer: { alignItems: 'center', paddingTop: 40 },
  waitingText: { fontSize: 15, color: '#9CA3AF', fontStyle: 'italic' },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 16,
    textAlign: 'center',
  },
  langOption: {
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderRadius: 10,
    marginBottom: 4,
  },
  langOptionSelected: { backgroundColor: '#EEF2FF' },
  langNative: { fontSize: 16, fontWeight: '600', color: '#111827' },
  langLabel: { fontSize: 13, color: '#6B7280', marginTop: 2 },
  modalClose: {
    marginTop: 12,
    paddingVertical: 14,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  modalCloseText: { fontSize: 16, color: '#EF4444', fontWeight: '600' },
});
