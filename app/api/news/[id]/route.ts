import prisma from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"

export const GET = async (
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    const { id } = await params
    const res = await prisma.news.findUnique({ where: { id } })
    return NextResponse.json(
      { success: true, message: "News fetched successfully", data: res },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong!",
        error,
      },
      { status: 500 }
    )
  }
}
