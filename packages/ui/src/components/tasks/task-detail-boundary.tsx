import { Component, type ErrorInfo, type ReactNode } from 'react';

/** Keeps task detail rendering failures inside the page; its task ID key resets recovery. */
export class TaskDetailBoundary extends Component<{ children: ReactNode; fallback: ReactNode }, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError(): { failed: boolean } {
    return { failed: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    console.error('Task detail rendering failed', error, info.componentStack);
  }

  render(): ReactNode {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}
