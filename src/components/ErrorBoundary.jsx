import { Component } from "react";

class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("Chatbot Error:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return <div>Chatbot is temporarily unavailable</div>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
