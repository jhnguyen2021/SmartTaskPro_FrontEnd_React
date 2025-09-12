import React from 'react';

type State = { hasError: boolean };
export class ErrorBoundary extends React.Component<{ children: React.ReactNode }, State> {
  //The component expects to wrap around other React nodes (like <ErrorBoundary><App/></ErrorBoundary>).
  state: State = { hasError: false };
  static getDerivedStateFromError() {
    return { hasError: true };

    //Static lifecycle method used only for error boundaries.
    //When a child component throws an error, React calls this method.
    //Updates the state so that hasError becomes true.
  }
  componentDidCatch(err: Error) {
    console.error('ErrorBoundary', err);
  }

  render() {
    if (this.state.hasError) return <div className="p-6 text-red-600">Something went wrong.</div>;
    return this.props.children;
  }
}
