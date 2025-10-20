export type ItemKind = "doc" | "folder" | "link";

export type ItemLevel = "desktop" | "nested";

export type DesktopItem = {
  id: string;
  name: string;
  kind: ItemKind;
  icon: string;
  children?: string[];
  initialMarkdown?: string; // for docs
  initialContent?: string; // HTML fallback
  url?: string; // for links
  level?: ItemLevel; // for folders
};

import why_me_md from "../content/why_me.md?raw";

export const allItems: DesktopItem[] = [
  {
    id: "why-me",
    name: "Why me?",
    kind: "doc",
    icon: "posthog-icon",
    initialMarkdown: why_me_md,
    level: "desktop",
  },
  {
    id: "side-projects",
    name: "Side Projects",
    kind: "folder",
    icon: "folder-icon",
    children: ["figjam-link", "github-profile"],
    level: "desktop",
  },
  {
    id: "figjam-link",
    name: "Figjam Posthog Website Like Application",
    kind: "link",
    icon: "link-icon",
    url: "https://www.google.com",
    level: "nested",
  },
  {
    id: "github-profile",
    name: "GitHub Projects",
    kind: "link",
    icon: "link-icon",
    url: "https://github.com/Nessjk",
    level: "nested",
  },
];

// Only exports the items for the desktop, those containing children are not included
export const desktopItems: DesktopItem[] = allItems.filter(
  (item) => item.level === "desktop"
);

// Get an item by its id, crucial so that the doument or folder window knows what to render
export const itemById = (id: string): DesktopItem | undefined =>
  allItems.find((item) => item.id === id);
