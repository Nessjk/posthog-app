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
import do_more_weird_md from "../content/do_more_weird.md?raw";
import candidate_hand_md from "../content/candidate-hand.md?raw";
import candidate_foot_md from "../content/candidate-foot.md?raw";
import pizza_preference_md from "../content/pizza-preference.md?raw";

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
    id: "my-documents",
    name: "My Documents",
    kind: "folder",
    icon: "folder-icon",
    children: ["why-me-2", "do-more-weird", "pizza-preference"],
    level: "desktop",
  },
  {
    id: "figjam-link",
    name: "This website planning",
    kind: "link",
    icon: "figma-icon",
    url: "https://www.figma.com/board/iU5MIReElcxwqgCUMWRnHN/Posthog?node-id=0-1&t=QeXLdzlg8Yu8pFIG-1",
    level: "nested",
  },
  {
    id: "github-profile",
    name: "GitHub Profile",
    kind: "link",
    icon: "github-icon",
    url: "https://github.com/Nessjk",
    level: "nested",
  },
  {
    id: "why-me-2",
    name: "Why me?",
    kind: "doc",
    icon: "posthog-icon",
    initialMarkdown: why_me_md,
    level: "nested",
  },

  {
    id: "trash",
    name: "Trash",
    kind: "folder",
    icon: "trash-icon",
    children: ["candidate-hand", "candidate-foot", "resume-2011"],
    level: "desktop",
  },
  {
    id: "candidate-hand",
    name: "candidate-hand.md",
    kind: "doc",
    icon: "word-icon",
    initialMarkdown: candidate_hand_md,
    level: "nested",
  },
  {
    id: "candidate-foot",
    name: "candidate-foot.md",
    kind: "doc",
    icon: "word-icon",
    initialMarkdown: candidate_foot_md,
    level: "nested",
  },
  {
    id: "do-more-weird",
    name: "do-more-weird.docx",
    kind: "doc",
    icon: "word-icon",
    initialMarkdown: do_more_weird_md,
    level: "nested",
  },
  {
    id: "pizza-preference",
    name: "pizza-preference.docx",
    kind: "doc",
    icon: "word-icon",
    initialMarkdown: pizza_preference_md,
    level: "nested",
  },

  {
    id: "resume-2011",
    name: "resume_2011_final_final_2.pdf",
    kind: "link",
    icon: "pdf-icon",
    url: "https://drive.google.com/file/d/1jXHx4tlUlwR5wUzit5Xn34HQrEhbKGKU/view?usp=sharing",
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
