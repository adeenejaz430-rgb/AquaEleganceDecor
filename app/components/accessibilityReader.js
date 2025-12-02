"use client";

import { useEffect, useState, useCallback } from "react";
import { FiVolume2, FiVolumeX } from "react-icons/fi";

export default function AccessibilityReader() {
  const [enabled, setEnabled] = useState(false);
  const [isReady, setIsReady] = useState(false);

  // Wait for voices to load
  useEffect(() => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;

    const checkVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      if (voices.length > 0) {
        setIsReady(true);
        console.log("Speech synthesis ready with", voices.length, "voices");
      }
    };

    checkVoices();
    
    // For Chrome - voices load async
    window.speechSynthesis.onvoiceschanged = checkVoices;

    return () => {
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, []);

  const speak = useCallback((text) => {
    if (!text || !text.trim()) {
      console.warn("No text to speak");
      return;
    }

    console.log("Starting speech...");

    const utterance = new SpeechSynthesisUtterance(text);
    
    // Get English voice
    const voices = window.speechSynthesis.getVoices();
    const englishVoice = voices.find(v => v.lang.includes('en-US') || v.lang.includes('en'));
    
    if (englishVoice) {
      utterance.voice = englishVoice;
      console.log("Using voice:", englishVoice.name);
    }
    
    utterance.lang = "en-US";
    utterance.rate = 0.9;
    utterance.pitch = 1;
    utterance.volume = 1;

    utterance.onstart = () => {
      console.log("✓ Speech started successfully");
    };

    utterance.onend = () => {
      console.log("✓ Speech completed");
    };

    utterance.onerror = (event) => {
      // Ignore "interrupted" errors - they're expected when stopping
      if (event.error !== "interrupted" && event.error !== "canceled") {
        console.error("Speech error:", event.error);
      }
    };

    window.speechSynthesis.speak(utterance);
  }, []);

  const stop = useCallback(() => {
    window.speechSynthesis.cancel();
    console.log("Speech stopped");
  }, []);

  const handleToggle = () => {
    const newEnabled = !enabled;
    setEnabled(newEnabled);

    if (newEnabled) {
      // Cancel any existing speech first
      window.speechSynthesis.cancel();
      
      // Wait a moment then start new speech
      setTimeout(() => {
        const content = document.querySelector("main")?.innerText || document.body.innerText;
        
        if (content && content.trim()) {
          // Clean and limit content length for testing
          const cleanContent = content.replace(/\s+/g, ' ').trim().substring(0, 500);
          console.log("Content to speak:", cleanContent.substring(0, 100) + "...");
          speak(cleanContent);
        } else {
          console.warn("No content found");
          alert("No content found to read");
          setEnabled(false);
        }
      }, 200);
    } else {
      stop();
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (typeof window !== "undefined") {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  if (!isReady) {
    return null; // Don't show button until speech is ready
  }

  return (
    <button
      onClick={handleToggle}
      className="fixed bottom-5 right-5 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-all z-50"
      aria-label={enabled ? "Stop voice narration" : "Start voice narration"}
      title={enabled ? "Stop Reading" : "Read Page Content"}
    >
      {enabled ? <FiVolumeX size={22} /> : <FiVolume2 size={22} />}
    </button>
  );
}