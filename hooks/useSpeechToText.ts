import { useCallback, useEffect, useRef, useState } from 'react';

interface SpeechToTextOptions {
  languageCode: string;
  onResult: (text: string) => void;
}

interface SpeechToTextReturn {
  partialTranscript: string;
  isListening: boolean;
  error: string | null;
  startListening: () => Promise<void>;
  stopListening: () => Promise<void>;
}

export function useSpeechToText({
  languageCode,
  onResult,
}: SpeechToTextOptions): SpeechToTextReturn {
  const [partialTranscript, setPartialTranscript] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const activeRef = useRef(false);
  const onResultRef = useRef(onResult);

  useEffect(() => {
    onResultRef.current = onResult;
  }, [onResult]);

  const getVoice = useCallback(async () => {
    try {
      const Voice = (await import('@react-native-voice/voice')).default;
      return Voice;
    } catch {
      return null;
    }
  }, []);

  const startListening = useCallback(async (): Promise<void> => {
    const Voice = await getVoice();
    if (!Voice) {
      setError('Speech recognition not available on this device.');
      return;
    }

    activeRef.current = true;

    const restart = async () => {
      if (!activeRef.current) return;
      try {
        await Voice.start(languageCode);
      } catch {
        // ignore restart errors
      }
    };

    Voice.onSpeechResults = (e: { value?: string[] }) => {
      const text = e.value?.[0] ?? '';
      if (text.trim()) {
        onResultRef.current(text.trim());
        setPartialTranscript('');
      }
      if (activeRef.current) {
        setTimeout(restart, 300);
      }
    };

    Voice.onSpeechPartialResults = (e: { value?: string[] }) => {
      setPartialTranscript(e.value?.[0] ?? '');
    };

    Voice.onSpeechError = () => {
      if (activeRef.current) {
        setTimeout(restart, 500);
      }
    };

    Voice.onSpeechStart = () => {
      setIsListening(true);
      setError(null);
    };

    Voice.onSpeechEnd = () => {
      // onSpeechResults handles restart
    };

    try {
      await Voice.start(languageCode);
      setIsListening(true);
    } catch (err) {
      setError('Could not start speech recognition.');
      activeRef.current = false;
    }
  }, [languageCode, getVoice]);

  const stopListening = useCallback(async (): Promise<void> => {
    activeRef.current = false;
    const Voice = await getVoice();
    if (Voice) {
      try {
        await Voice.stop();
        await Voice.destroy();
      } catch {
        // ignore
      }
      Voice.onSpeechResults = undefined;
      Voice.onSpeechPartialResults = undefined;
      Voice.onSpeechError = undefined;
      Voice.onSpeechStart = undefined;
      Voice.onSpeechEnd = undefined;
    }
    setIsListening(false);
    setPartialTranscript('');
  }, [getVoice]);

  useEffect(() => {
    return () => {
      activeRef.current = false;
      getVoice().then((Voice) => {
        if (Voice) {
          Voice.destroy().catch(() => {});
        }
      });
    };
  }, [getVoice]);

  return { partialTranscript, isListening, error, startListening, stopListening };
}
