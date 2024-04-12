export function shortHash(hash: string) {
  return `
    ${hash.slice(0, 6)}...${hash.slice(-6)}`;
}

export function bytesToMB(sizeInBytes: number) {
  const bytesInMB = sizeInBytes / (1024 * 1024);
  return Math.round(bytesInMB * 10) / 10 + " MB";
}

export function formatISO(date: Date) {
  return date.toISOString();
}
