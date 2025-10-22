import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./store";
import "./index.css";
import App from "./App.tsx";

import { PostHogProvider } from "posthog-js/react";
import posthog from "posthog-js";
import { trackPageview } from "./analytics/helper.ts";

posthog.init(import.meta.env.VITE_PUBLIC_POSTHOG_KEY, {
  api_host:
    import.meta.env.VITE_PUBLIC_POSTHOG_HOST || "https://app.posthog.com",
});

// Load the pageview from posthog when the page loads
trackPageview();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <PostHogProvider client={posthog}>
      <Provider store={store}>
        <App />
      </Provider>
    </PostHogProvider>
  </StrictMode>
);
