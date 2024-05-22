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

export function convertBigIntsToNumbers(obj: any): any {
  if (typeof obj === "bigint") {
    return Number(obj);
  } else if (typeof obj === "object" && obj !== null) {
    for (const key in obj) {
      obj[key] = convertBigIntsToNumbers(obj[key]);
    }
  }
  return obj;
}

export function formatNumber(number: number) {
  const abs = Math.abs(number);
  const billion = 1000000000;
  const million = 1000000;
  const thousand = 1000;

  if (abs >= billion) {
    return (number / billion).toFixed(0) + "B";
  } else if (abs >= million) {
    return (number / million).toFixed(0) + "M";
  } else if (abs >= thousand) {
    return (number / thousand).toFixed(0) + "K";
  } else {
    return number;
  }
}
