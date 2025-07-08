import { type NextRequest, NextResponse } from "next/server"
import { put } from "@vercel/blob"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const files = formData.getAll("files") as File[]

    if (!files || files.length === 0) {
      return NextResponse.json({ error: "No files provided" }, { status: 400 })
    }

    const uploadResults = []

    for (const file of files) {
      // Upload to Vercel Blob
      const blob = await put(file.name, file, {
        access: "public",
        handleUploadUrl: "/api/upload/callback",
      })

      // Extract text content for analysis (simplified for demo)
      let textContent = ""
      if (file.type === "text/plain") {
        textContent = await file.text()
      } else {
        // For PDF/DOC files, you'd typically use a library like pdf-parse
        textContent = `Sample document content for ${file.name}`
      }

      uploadResults.push({
        id: crypto.randomUUID(),
        filename: file.name,
        url: blob.url,
        size: file.size,
        type: file.type,
        textContent,
        uploadedAt: new Date().toISOString(),
      })
    }

    return NextResponse.json({
      success: true,
      files: uploadResults,
      message: `Successfully uploaded ${files.length} file(s)`,
    })
  } catch (error) {
    console.error("Upload error:", error)
    return NextResponse.json({ error: "Failed to upload files" }, { status: 500 })
  }
}
