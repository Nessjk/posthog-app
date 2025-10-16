const modules = import.meta.glob("/src/assets/icons/*.png", {
  eager: true, // no lazy loading
  as: "url", // not sure but seem to return optimised public url for each img
}) as Record<string, string>;

// helper function: give the "doc" key returns doc.png
export const iconUrl = (key: string): string | undefined =>
  modules[`/src/assets/icons/${key}.png`];
