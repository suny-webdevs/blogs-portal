/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server"
import cloudinary from "@/lib/cloudinary"
import HSC from "http-status-codes"

export async function POST(req: Request) {
  try {
    const formData = await req.formData()
    const file = formData.get("file") as File | null

    if (!file) {
      return NextResponse.json(
        { error: "No file provided" },
        { status: HSC.NOT_FOUND }
      )
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    const uploadResult: any = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder: "blog-portal",
            resource_type: "image",
          },
          (error, result) => {
            if (error) reject(error)
            resolve(result)
          }
        )
        .end(buffer)
    })

    return NextResponse.json(
      {
        success: true,
        message: "Image upload successfully",
        data: { url: uploadResult.secure_url },
      },
      { status: HSC.OK }
    )
  } catch (error) {
    console.error("Cloudinary upload error:", error)
    return NextResponse.json(
      { success: false, message: "Upload image failed", error },
      { status: HSC.INTERNAL_SERVER_ERROR }
    )
  }
}
