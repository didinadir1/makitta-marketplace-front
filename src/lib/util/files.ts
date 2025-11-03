export default async function areFilesIdentical(file1?: File, file2?: File) {
  // Convert files to ArrayBuffers
  const buffer1 = await file1?.arrayBuffer();
  const buffer2 = await file2?.arrayBuffer();

  if (!buffer1 || !buffer2) return false;

  // Compare byte-by-byte
  if (buffer1.byteLength !== buffer2.byteLength) return false;

  const view1 = new Uint8Array(buffer1);
  const view2 = new Uint8Array(buffer2);

  for (let i = 0; i < view1.length; i++) {
    if (view1[i] !== view2[i]) return false;
  }

  return true;
}

interface FileComparisonResult {
  keptImagesUrls: { url: string }[];
  newFiles: File[];
}

export async function compareImageArrays(
  defaultImages: { url: string; file: File }[] = [],
  updatedImages: File[] = []
): Promise<FileComparisonResult> {
  const keptImagesUrls = [];
  const newFiles: File[] = [];

  for (const updatedFile of updatedImages) {
    let isIdentical = false;

    for (const {url, file} of defaultImages) {
      if (await areFilesIdentical(file, updatedFile)) {
        keptImagesUrls.push({url});
        isIdentical = true;
        break;
      }
    }

    if (!isIdentical) {
      newFiles.push(updatedFile);
    }
  }

  return {keptImagesUrls, newFiles};
}