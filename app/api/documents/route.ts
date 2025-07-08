import { type NextRequest, NextResponse } from "next/server"
import { list } from "@vercel/blob"

export async function GET(request: NextRequest) {
  try {
    const { blobs } = await list()

    // Transform blob data into document format
    const documents = blobs.map((blob) => ({
      id: blob.pathname.replace(/[^a-zA-Z0-9]/g, "-"),
      name: blob.pathname,
      url: blob.url,
      size: blob.size,
      uploadedAt: blob.uploadedAt,
      type: getDocumentType(blob.pathname),
      status: "completed",
      riskLevel: Math.random() > 0.5 ? "medium" : "low", // Demo data
      collaborators: Math.floor(Math.random() * 5) + 1,
    }))

    return NextResponse.json({ documents })
  } catch (error) {
    console.error("Failed to fetch documents:", error)
    return NextResponse.json({ error: "Failed to fetch documents" }, { status: 500 })
  }
}

function getDocumentType(filename: string): string {
  const extension = filename.split(".").pop()?.toLowerCase()
  switch (extension) {
    case "pdf":
      return "Contract"
    case "doc":
    case "docx":
      return "Agreement"
    case "txt":
      return "Document"
    default:
      return "Unknown"
  }
}
