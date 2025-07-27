import { Component } from "react";
export class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false,
            errorId: Date.now().toString(36).toUpperCase(),
        };
    }

    static getDerivedStateFromError(error) {
        return {
            hasError: true,
            error,
            errorId: Date.now().toString(36).toUpperCase(),
        };
    }

    componentDidCatch(error, errorInfo) {
        console.error("Error caught by boundary:", error, errorInfo);
        this.setState({ error, errorInfo });

        // Log additional info for developers
        console.group("🚨 Error Boundary Caught Error");
        console.error("Error:", error);
        console.error("Error Info:", errorInfo);
        console.error("Component Stack:", errorInfo.componentStack);
        console.error("Error Stack:", error.stack);
        console.groupEnd();
    }

    handleReset = () => {
        this.setState({
            hasError: false,
            error: undefined,
            errorInfo: undefined,
            errorId: Date.now().toString(36).toUpperCase(),
        });
    };

    handleReload = () => {
        window.location.reload();
    };

    handleGoHome = () => {
        window.location.href = "/";
    };

    render() {
        if (this.state.hasError) {
            if (this.props.fallback) {
                return this.props.fallback;
            }

            const isDevelopment = import.meta.env.MODE === "development";

            return (
                <div className="min-h-screen bg-background flex items-center justify-center p-4">
                    <div className="w-full max-w-4xl mx-auto">
                        {/* Main Error Card */}
                        <div className="bg-card rounded-lg shadow-lg border border-destructive/20 overflow-hidden">
                            {/* Header */}
                            <div className="bg-destructive/5 border-b border-destructive/20 px-6 py-8 text-center">
                                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
                                    <svg
                                        className="h-8 w-8 text-destructive"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 18.5c-.77.833.192 2.5 1.732 2.5z"
                                        />
                                    </svg>
                                </div>
                                <h1 className="text-3xl font-bold text-foreground mb-2">Oops! Something went wrong</h1>
                                <p className="text-muted-foreground text-lg max-w-md mx-auto">
                                    We encountered an unexpected error. Don't worry, it's not your fault.
                                </p>
                            </div>

                            {/* Content */}
                            <div className="px-6 py-6 space-y-6">
                                {/* Error Summary */}
                                {this.state.error && (
                                    <div className="bg-destructive/5 border border-destructive/20 rounded-lg p-4">
                                        <div className="flex items-start">
                                            <svg
                                                className="h-5 w-5 text-destructive mt-0.5 mr-3 flex-shrink-0"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                                />
                                            </svg>
                                            <div className="flex-1">
                                                <h3 className="text-sm font-medium text-destructive mb-1">
                                                    Error Details
                                                </h3>
                                                <p className="text-sm text-destructive font-mono break-all">
                                                    {this.state.error.message}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* User Instructions */}
                                <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                                    <h3 className="text-sm font-medium text-primary mb-3">What you can do:</h3>
                                    <ul className="text-sm text-primary/90 space-y-2">
                                        <li className="flex items-start">
                                            <span className="inline-block w-1.5 h-1.5 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                            Refresh the page to try again
                                        </li>
                                        <li className="flex items-start">
                                            <span className="inline-block w-1.5 h-1.5 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                            Go back to the homepage
                                        </li>
                                        <li className="flex items-start">
                                            <span className="inline-block w-1.5 h-1.5 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                            Check your internet connection
                                        </li>
                                        <li className="flex items-start">
                                            <span className="inline-block w-1.5 h-1.5 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                            Contact support if the problem persists
                                        </li>
                                    </ul>
                                </div>

                                {/* Development Information */}
                                {isDevelopment && (
                                    <div className="bg-warning/5 border border-warning/20 rounded-lg p-4">
                                        <div className="flex items-center mb-4">
                                            <svg
                                                className="h-5 w-5 text-warning mr-2"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                                                />
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                                />
                                            </svg>
                                            <h3 className="text-sm font-medium text-warning-foreground">
                                                Development Information
                                            </h3>
                                        </div>

                                        <div className="space-y-4">
                                            {/* Error Message */}
                                            <div>
                                                <h4 className="text-xs font-semibold text-warning-foreground uppercase tracking-wide mb-2">
                                                    Error Message
                                                </h4>
                                                <div className="bg-background border border-warning/30 rounded p-3">
                                                    <code className="text-xs text-destructive font-mono break-all">
                                                        {this.state.error?.message || "Unknown error"}
                                                    </code>
                                                </div>
                                            </div>

                                            {/* Error Name & Type */}
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div>
                                                    <h4 className="text-xs font-semibold text-warning-foreground uppercase tracking-wide mb-2">
                                                        Error Type
                                                    </h4>
                                                    <div className="bg-background border border-warning/30 rounded p-3">
                                                        <code className="text-xs text-foreground font-mono">
                                                            {this.state.error?.name || "Error"}
                                                        </code>
                                                    </div>
                                                </div>
                                                <div>
                                                    <h4 className="text-xs font-semibold text-warning-foreground uppercase tracking-wide mb-2">
                                                        Error ID
                                                    </h4>
                                                    <div className="bg-background border border-warning/30 rounded p-3">
                                                        <code className="text-xs text-foreground font-mono">
                                                            {this.state.errorId}
                                                        </code>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Component Stack */}
                                            {this.state.errorInfo?.componentStack && (
                                                <div>
                                                    <h4 className="text-xs font-semibold text-warning-foreground uppercase tracking-wide mb-2">
                                                        Component Stack
                                                    </h4>
                                                    <div className="bg-background border border-warning/30 rounded p-3 max-h-40 overflow-y-auto">
                                                        <pre className="text-xs text-foreground font-mono whitespace-pre-wrap">
                                                            {this.state.errorInfo.componentStack.trim()}
                                                        </pre>
                                                    </div>
                                                </div>
                                            )}

                                            {/* Error Stack */}
                                            {this.state.error?.stack && (
                                                <div>
                                                    <h4 className="text-xs font-semibold text-warning-foreground uppercase tracking-wide mb-2">
                                                        Error Stack Trace
                                                    </h4>
                                                    <div className="bg-background border border-warning/30 rounded p-3 max-h-60 overflow-y-auto">
                                                        <pre className="text-xs text-foreground font-mono whitespace-pre-wrap">
                                                            {this.state.error.stack}
                                                        </pre>
                                                    </div>
                                                </div>
                                            )}

                                            {/* Additional Debug Info */}
                                            <div>
                                                <h4 className="text-xs font-semibold text-warning-foreground uppercase tracking-wide mb-2">
                                                    Debug Information
                                                </h4>
                                                <div className="bg-background border border-warning/30 rounded p-3">
                                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                                                        <div>
                                                            <span className="font-semibold">Timestamp:</span>{" "}
                                                            {new Date().toISOString()}
                                                        </div>
                                                        <div>
                                                            <span className="font-semibold">User Agent:</span>{" "}
                                                            {navigator.userAgent.slice(0, 50)}...
                                                        </div>
                                                        <div>
                                                            <span className="font-semibold">URL:</span>{" "}
                                                            {window.location.href}
                                                        </div>
                                                        <div>
                                                            <span className="font-semibold">Viewport:</span>{" "}
                                                            {window.innerWidth}x{window.innerHeight}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Actions */}
                            <div className="bg-muted/50 border-t border-border px-6 py-4">
                                <div className="flex flex-col sm:flex-row gap-3">
                                    <button
                                        onClick={this.handleReset}
                                        className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-primary-foreground bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ring transition-colors"
                                    >
                                        <svg
                                            className="mr-2 h-4 w-4"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                                            />
                                        </svg>
                                        Try Again
                                    </button>
                                    <button
                                        onClick={this.handleReload}
                                        className="inline-flex items-center justify-center px-4 py-2 border border-input text-sm font-medium rounded-md text-foreground bg-background hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ring transition-colors"
                                    >
                                        <svg
                                            className="mr-2 h-4 w-4"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                                            />
                                        </svg>
                                        Reload Page
                                    </button>
                                    <button
                                        onClick={this.handleGoHome}
                                        className="inline-flex items-center justify-center px-4 py-2 border border-input text-sm font-medium rounded-md text-foreground bg-background hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ring transition-colors"
                                    >
                                        <svg
                                            className="mr-2 h-4 w-4"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                                            />
                                        </svg>
                                        Go Home
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Footer Info */}
                        <div className="mt-6 text-center">
                            <p className="text-xs text-muted-foreground">
                                Error ID: <span className="font-mono">{this.state.errorId}</span> • Occurred at{" "}
                                {new Date().toLocaleString()}
                            </p>
                        </div>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}
