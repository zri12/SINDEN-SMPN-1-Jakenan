const allowedExtensions = [".pdf", ".doc", ".docx", ".ppt", ".pptx", ".xls", ".xlsx", ".jpg", ".jpeg", ".png", ".txt", ".zip", ".rar", ".7z", ".7zip"];
const maxSizeMb = 10;

export function validateFile(file: File) {
  const extension = `.${file.name.split(".").pop()?.toLowerCase()}`;
  if (!allowedExtensions.includes(extension)) {
    return "Format file tidak didukung.";
  }

  if (file.size > maxSizeMb * 1024 * 1024) {
    return `Ukuran file terlalu besar. Maksimal ${maxSizeMb} MB.`;
  }

  return null;
}

export function sanitizeFileName(fileName: string) {
  return fileName
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9._-]/g, "");
}
