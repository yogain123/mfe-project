import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log error details for debugging
    console.error("MFE Error Boundary caught an error:", error, errorInfo);

    this.setState({
      error: error,
      errorInfo: errorInfo,
    });

    // In production, you might want to log this to an error reporting service
    // Example: Sentry.captureException(error);
  }

  render() {
    if (this.state.hasError) {
      // Render fallback UI
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="error-boundary">
          <h2>🚨 Something went wrong with this micro frontend</h2>
          <details style={{ whiteSpace: "pre-wrap", marginTop: "10px" }}>
            <summary>Error Details (for debugging)</summary>
            <p>
              <strong>Error:</strong>{" "}
              {this.state.error && this.state.error.toString()}
            </p>
            <p>
              <strong>Stack Trace:</strong>
            </p>
            <pre>{this.state.errorInfo.componentStack}</pre>
          </details>
          <div className="error-actions">
            <button
              onClick={() => window.location.reload()}
              className="retry-button"
            >
              🔄 Reload Page
            </button>
            <button
              onClick={() =>
                this.setState({ hasError: false, error: null, errorInfo: null })
              }
              className="retry-button"
            >
              🔄 Try Again
            </button>
          </div>
        </div>
      );
    }

    // No error, render children normally
    return this.props.children;
  }
}

export default ErrorBoundary;
