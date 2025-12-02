"use client";
import { useState } from "react";

export default function useSpeech() {
  const [isSpeaking, setIsSpeaking] = useState(false);

  const speak = (text) => {
    if (typeof window === "undefined" || !window.speechSynthesis) {
      alert("Speech synthesis not supported in this browser.");
      return;
    }

    // stop existing speech before starting new
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US"; // or "ur-PK" for Urdu, etc.
    utterance.rate = 1;
    utterance.pitch = 1;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  const stop = () => {
    if (typeof window !== "undefined") {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  return { speak, stop, isSpeaking };
}
