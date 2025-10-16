const modules = import.meta.glob("/src/assets/icons/*.png", {
  eager: true,
  as: "url",
}) as Record<string, string>;

export const iconUrl = (key: string): string | undefined =>
  modules[`/src/assets/icons/${key}.png`];
