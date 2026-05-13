import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useRouterState,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

import appCss from "../styles.css?url";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { SiteLoader } from "@/components/SiteLoader";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Lovable App" },
      { name: "description", content: "Lovable Generated Project" },
      { name: "author", content: "Lovable" },
      { property: "og:title", content: "Lovable App" },
      { property: "og:description", content: "Lovable Generated Project" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:site", content: "@Lovable" },
    ],
    links: [
      { rel: "icon", type: "image/png", href: "/favicon.png" },
      { rel: "apple-touch-icon", href: "/favicon.png" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap",
      },
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const isNavigating = useRouterState({
    select: (state) => {
      const resolvedPathname = state.resolvedLocation?.pathname ?? state.location.pathname;
      const isRouteChange = state.location.pathname !== resolvedPathname;

      if (!isRouteChange) {
        return false;
      }

      return state.isLoading || state.isTransitioning || state.status === "pending";
    },
  });
  const [isBooting, setIsBooting] = useState(true);
  const [showRouteLoader, setShowRouteLoader] = useState(false);
  const routeLoaderStartedAt = useRef<number | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    let timeout = 0;

    const finishBoot = () => {
      timeout = window.setTimeout(() => setIsBooting(false), 500);
    };

    if (document.readyState === "complete") {
      finishBoot();
    } else {
      window.addEventListener("load", finishBoot, { once: true });
    }

    return () => {
      window.removeEventListener("load", finishBoot);
      if (timeout) {
        window.clearTimeout(timeout);
      }
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    let timeout = 0;

    if (isNavigating) {
      if (routeLoaderStartedAt.current == null) {
        routeLoaderStartedAt.current = Date.now();
      }

      setShowRouteLoader(true);
      return;
    }

    if (routeLoaderStartedAt.current == null) {
      setShowRouteLoader(false);
      return;
    }

    const elapsed = Date.now() - routeLoaderStartedAt.current;
    const remaining = Math.max(1000 - elapsed, 0);

    timeout = window.setTimeout(() => {
      setShowRouteLoader(false);
      routeLoaderStartedAt.current = null;
    }, remaining);

    return () => {
      if (timeout) {
        window.clearTimeout(timeout);
      }
    };
  }, [isNavigating]);

  return (
    <QueryClientProvider client={queryClient}>
      <SiteLoader active={isBooting || showRouteLoader} />
      <Outlet />
      <WhatsAppButton />
    </QueryClientProvider>
  );
}
