export const AVATAR_PALETTE = [
  "#B23A5B", // wine
  "#4F7965", // sage
  "#7C5CBF", // violet
  "#C97D2E", // amber
  "#2E7CB2", // sky
  "#B24F2E", // rust
];

/**
 * Picks a color deterministically from a person's name, so the same
 * name always gets the same avatar color instead of a random one on
 * every add/edit.
 */
export function pickAvatarColor(seed: string): string {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = seed.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % AVATAR_PALETTE.length;
  return AVATAR_PALETTE[index];
}

export function getInitials(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}
