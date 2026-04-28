import React from "react";
import { Button } from "@/components/ui/button";

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error("ErrorBoundary caught:", error, info.componentStack);

    // Auto-recover from stale-deploy chunk load failures (one-shot via sessionStorage flag)
    const msg = String(error?.message || "");
    const isChunkError =
      /Failed to fetch dynamically imported module/i.test(msg) ||
      /Loading chunk \d+ failed/i.test(msg) ||
      /Importing a module script failed/i.test(msg) ||
      /error loading dynamically imported module/i.test(msg) ||
      error?.name === "ChunkLoadError";

    if (isChunkError) {
      try {
        const FLAG = "lovable:chunk-reload-attempted";
        if (sessionStorage.getItem(FLAG) !== "1") {
          sessionStorage.setItem(FLAG, "1");
          window.location.reload();
        }
      } catch {
        window.location.reload();
      }
    }
  }

  handleReload = () => {
    window.location.reload();
  };

  handleGoHome = () => {
    window.location.href = "/it";
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-background p-6">
          <div className="max-w-md text-center space-y-6">
            <h1 className="text-3xl font-bold text-foreground">
              Qualcosa è andato storto
            </h1>
            <p className="text-muted-foreground">
              Si è verificato un errore imprevisto. Ricarica la pagina o torna alla home.
            </p>
            <div className="flex gap-4 justify-center">
              <Button onClick={this.handleReload} variant="default">
                Ricarica pagina
              </Button>
              <Button onClick={this.handleGoHome} variant="outline">
                Torna alla Home
              </Button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
