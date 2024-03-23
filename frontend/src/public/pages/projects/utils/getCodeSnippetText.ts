export function decodeBase64Utf8(encodedText: string) {
  const binaryString = window.atob(encodedText);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return new TextDecoder().decode(bytes);
}

export function getCodeSnippetText(encodedText: string, startLine: undefined | string, endLine: undefined | string) {
  const decodedText = decodeBase64Utf8(encodedText);
  if (!startLine || !endLine || isNaN(parseInt(startLine)) || isNaN(parseInt(endLine))) {
    return decodedText;
  }
  return decodedText.split("\n").slice(parseInt(startLine) - 1, parseInt(endLine)).join("\n");
}
