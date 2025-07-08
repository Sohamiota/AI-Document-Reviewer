export async function extractTextFromFile(file: File): Promise<string> {
  const fileType = file.type.toLowerCase()

  if (fileType === "text/plain") {
    return await file.text()
  }

  if (fileType === "application/pdf") {
    // In a real implementation, you'd use a library like pdf-parse
    // For now, return sample content
    return `
SERVICE AGREEMENT

This Service Agreement ("Agreement") is entered into on [DATE] between [CLIENT NAME] ("Client") and [SERVICE PROVIDER NAME] ("Provider").

1. SERVICES
Provider agrees to perform the services described in Exhibit A attached hereto and incorporated by reference ("Services").

2. PAYMENT TERMS
Payment shall be due within thirty (30) days of invoice date. Late payments may incur interest charges at the rate of 1.5% per month.

3. TERM AND TERMINATION
This Agreement shall commence on [START DATE] and continue until [END DATE], unless terminated earlier in accordance with this Agreement.

Either party may terminate this Agreement at any time with or without cause by providing thirty (30) days written notice to the other party.

4. LIABILITY
In no event shall either party be liable for any indirect, incidental, special, or consequential damages, regardless of the form of action.

5. CONFIDENTIALITY
Each party acknowledges that it may have access to confidential information of the other party.
    `
  }

  // For other file types, return a placeholder
  return `Document content extracted from ${file.name}`
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 Bytes"
  const k = 1024
  const sizes = ["Bytes", "KB", "MB", "GB"]
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
}

export function getFileIcon(filename: string): string {
  const extension = filename.split(".").pop()?.toLowerCase()
  switch (extension) {
    case "pdf":
      return "📄"
    case "doc":
    case "docx":
      return "📝"
    case "txt":
      return "📋"
    default:
      return "📄"
  }
}
