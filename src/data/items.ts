export type ItemKind = "doc" | "folder" | "link";
export type DesktopItem = {
  id: string;
  name: string;
  kind: ItemKind;
  icon: string;
  children?: string[];
  initialMarkdown?: string; // for docs
  initialContent?: string; // HTML fallback
};

import why_me_md from "../content/why_me.md?raw";

export const desktopItems: DesktopItem[] = [
  {
    id: "why-me",
    name: "Why me?",
    kind: "doc",
    icon: "doc",
    initialMarkdown: why_me_md,
  },
  {
    id: "side-projects",
    name: "Side Projects",
    kind: "folder",
    icon: "folder",
    children: ["link", "link2", "doc"],
  },
];

export const itemById = (id: string): DesktopItem | undefined =>
  desktopItems.find((item) => item.id === id);
