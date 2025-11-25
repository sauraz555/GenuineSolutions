"use client";

import { useEffect, useState } from "react";

export function useSessionId() {
  const [sessionId, setSessionId] = useState<string>("");

  useEffect(() => {
    let id = localStorage.getItem("gs-session-id");

    if (!id) {
      id = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem("gs-session-id", id);
    }

    setSessionId(id);
  }, []);

  return sessionId;
}
