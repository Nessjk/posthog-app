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
import my_career_hub_md from "../content/my_carrer_hub.md?raw";
import many_more_md from "../content/many_more.md?raw";
import clean_podium_md from "../content/clean_podium.md?raw";

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
    children: [
      "clean-podium",
      "pinstation",
      "my-career-hub",
      "ticker-lab",
      "finviz-financial-scraper",
      "many-more",
    ],
    level: "desktop",
  },
  {
    id: "demo",
    name: "demo.mov",
    kind: "link",
    icon: "multimedia-icon",
    url: "https://drive.google.com/file/d/1Jd9xnzxBMM9X1C4DpNiKpS5p1f98UgPg/view?usp=sharing",
    level: "desktop",
  },
  {
    id: "my-career-hub",
    name: "Job Board - 2023 ",
    kind: "doc",
    icon: "coffin-icon",
    initialMarkdown: my_career_hub_md,
    level: "nested",
  },
  {
    id: "clean-podium",
    name: "Clean Podium - 2025",
    // name: "Product Ingredients Insight - 2025 ",
    kind: "doc",
    icon: "word-icon",
    initialMarkdown: clean_podium_md,
    level: "nested",
  },

  {
    id: "ticker-lab",
    name: "Stock Trading Review App - 2022 ",
    kind: "doc",
    icon: "coffin-icon",
    // initialMarkdown: my_career_hub_md,
    level: "nested",
  },

  // {
  //   id: "pinstation",
  //   name: "Pinterest Keyword Planner - 2025 ",
  //   kind: "doc",
  //   icon: "word-icon",
  //   // initialMarkdown: my_career_hub_md,
  //   level: "nested",
  // },

  {
    id: "finviz-financial-scraper",
    name: "Daily Financial Scraper - 2021",
    kind: "doc",
    icon: "coffin-icon",
    // initialMarkdown: my_career_hub_md,
    level: "nested",
  },
  {
    id: "many-more",
    name: "Many more...",
    kind: "doc",
    icon: "coffin-icon",
    initialMarkdown: many_more_md,
    level: "nested",
  },

  {
    id: "handy-links",
    name: "Handy links",
    kind: "folder",
    icon: "folder-icon",
    children: ["github-profile", "figjam-link"],
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
