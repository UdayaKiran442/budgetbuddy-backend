// Clean the extracted text
export function cleanExtractedText(text: string) {
    return text
        // Remove encoding artifacts and special characters
        .replace(/[^         .replace(/[^\x20-~        .replace(/[^\x20-\x7E\n]/g, '')
        // Remove extra spaces
        .replace(/\s+/g, ' ')
        // Fix broken words at line breaks
        .replace(/-\s+/g, '')
        // Remove excessive newlines (keep meaningful ones)
        .replace(/\n{2,}/g, '\n')
        // Remove unwanted headers or footers (modify as needed)
        .replace(/Budget at a Glance/g, '')
        // Trim spaces at start and end
        .trim();
}