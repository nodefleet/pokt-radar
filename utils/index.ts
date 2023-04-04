export function shortHash(hash: string) {
  return `
    ${hash.slice(0, 6)}...${hash.slice(-6)}`;
}
