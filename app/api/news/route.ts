import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"

export const POST = async (req: Request) => {
  try {
    const payload = await req.json()
    const res = await prisma.news.create({ data: payload })
    return NextResponse.json(
      { success: true, message: "News created successfully", data: res },
      { status: 201 }
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

export const GET = async () => {
  try {
    const res = await prisma.news.findMany()
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
