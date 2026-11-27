import type { AppState } from '../models/types';

// The type for our subscribers (callbacks)
type Listener = (state: AppState) => void;

class Store {
  private state: AppState = {
    groups: [],
    currentScreen: 'groups', // 'groups' | 'group-details' | 'create-group' | 'create-operation'
    activeGroupId: null,
  };

  private listeners: Listener[] = [];

  // Get current state
  getState(): AppState {
    return structuredClone(this.state);
  }

  // Update state and notify all listeners
  setState(newState: Partial<AppState>): void {
    this.state = { ...this.state, ...newState };
    this.notify();
  }

  // Subscribe to changes
  subscribe(listener: Listener): void {
    this.listeners.push(listener);
  }

  // Notify all subscribers
  private notify(): void {
    this.listeners.forEach((listener) => listener(this.state));
  }
}

export const store = new Store();
