import type { Message, User } from "./types";

const STORAGE_KEY = "whatsapp-conversations";

export function loadConversationsFromStorage(): Record<string, Message[]> {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      const converted: Record<string, Message[]> = {};
      for (const [userId, messages] of Object.entries(parsed)) {
        converted[userId] = (messages as any[]).map((msg) => ({
          ...msg,
          timestamp: new Date(msg.timestamp),
        }));
      }
      return converted;
    }
  } catch (error) {
    console.error("Failed to load conversations:", error);
  }
  return {};
}

export function saveConversationsToStorage(
  conversations: Record<string, Message[]>
): void {
  try {
    const serializable: Record<
      string,
      (Omit<Message, "timestamp"> & { timestamp: string })[]
    > = {};
    for (const [userId, messages] of Object.entries(conversations)) {
      serializable[userId] = messages.map((msg) => ({
        ...msg,
        timestamp: msg.timestamp.toISOString(),
      }));
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(serializable));
  } catch (error) {
    console.error("Failed to save conversations:", error);
  }
}

export function loadConnectionsFromStorage(): User[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const conversations = JSON.parse(stored);
      const userKeys = Object.keys(conversations);
      return userKeys.map((userKey) => JSON.parse(userKey) as User);
    }
  } catch (error) {
    console.error("Failed to load connections:", error);
  }
  return [];
}

export function createUserKey(user: User): string {
  return JSON.stringify(user);
}

export function extractUserId(userKey: string): string {
  const user = JSON.parse(userKey) as User;
  return user.id;
}
