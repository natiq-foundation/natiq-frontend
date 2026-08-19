import { Component, type ErrorInfo, type ReactNode } from "react";

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
    state: State = { hasError: false };

    static getDerivedStateFromError(): State {
        return { hasError: true };
    }

    componentDidCatch(error: Error, info: ErrorInfo) {
        console.error("[ErrorBoundary] Uncaught render error:", error, info.componentStack);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        height: "100vh",
                        fontFamily: "sans-serif",
                        textAlign: "center",
                        padding: 24,
                    }}
                >
                    <h1 style={{ marginBottom: 8 }}>Something went wrong</h1>
                    <p style={{ color: "#666", maxWidth: 420 }}>
                        The app hit a configuration error. Details have been logged to the browser console.
                    </p>
                </div>
            );
        }

        return this.props.children;
    }
}