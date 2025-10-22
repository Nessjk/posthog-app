import posthog from "posthog-js";

const key = import.meta.env.VITE_POSTHOG_KEY as string | undefined;

if (key) {
  posthog.init(key, {
    api_host: "https://us.i.posthog.com",
    autocapture: false,
    capture_pageview: false,
  });
}

export function trackPageview() {
  posthog.capture("$pageview");
}

export function trackItemOpen(props: {
  id: string;
  name: string;
  kind: "folder" | "doc" | "link";
  url?: string;
}) {
  console.log("Tracking item open", props);
  posthog.capture("item_opened", props);
}
