// put audio url inside of audio tag
export function audioWrapper(url: string): string {
  return `<audio src="${url}" />`;
}
