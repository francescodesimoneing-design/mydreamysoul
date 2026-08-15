type AttachmentMetadata = {
  name: string;
  size: number;
  type: string;
};

export const quoteAttachmentLimits = {
  maxFiles: 2,
  maxFileSizeBytes: 2 * 1024 * 1024,
  maxTotalSizeBytes: 4 * 1024 * 1024,
} as const;

export const quoteAttachmentAccept =
  ".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp";

const allowedExtensions: Record<string, string[]> = {
  "image/jpeg": ["jpg", "jpeg"],
  "image/png": ["png"],
  "image/webp": ["webp"],
};

function getFileExtension(filename: string) {
  return filename.split(".").pop()?.toLowerCase() || "";
}

export function getQuoteAttachmentError(files: readonly AttachmentMetadata[]) {
  if (files.length > quoteAttachmentLimits.maxFiles) {
    return `Puoi allegare al massimo ${quoteAttachmentLimits.maxFiles} immagini.`;
  }

  let totalSize = 0;

  for (const file of files) {
    if (!file.size) {
      return `Il file ${file.name} e vuoto e non puo essere allegato.`;
    }

    const extensions = allowedExtensions[file.type];

    if (!extensions || !extensions.includes(getFileExtension(file.name))) {
      return `Il file ${file.name} non e supportato. Usa JPEG, PNG o WebP.`;
    }

    if (file.size > quoteAttachmentLimits.maxFileSizeBytes) {
      return `Il file ${file.name} supera il limite di 2 MB.`;
    }

    totalSize += file.size;
  }

  if (totalSize > quoteAttachmentLimits.maxTotalSizeBytes) {
    return "Le immagini selezionate superano il limite totale di 4 MB.";
  }

  return null;
}

export function formatAttachmentSize(size: number) {
  if (size < 1024 * 1024) {
    return `${Math.max(1, Math.round(size / 1024))} KB`;
  }

  return `${(size / (1024 * 1024)).toFixed(1)} MB`;
}
