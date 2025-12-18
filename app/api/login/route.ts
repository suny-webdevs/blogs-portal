import prisma from "@/lib/prisma"
import { generateSessionToken } from "@/utils/jwtToken"
import { NextResponse } from "next/server"

export const POST = async (req: Request) => {
  try {
    const { email, password } = await req.json()

    if (!email || !password) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid credentials",
        },
        { status: 409 }
      )
    }

    const user = await prisma.user.findUnique({
      where: { email },
    })

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 404 }
      )
    }

    if (password !== user.password) {
      return NextResponse.json(
        {
          success: false,
          message: "Password did not match",
        },
        { status: 409 }
      )
    }

    const jwtPayload = {
      id: user.id,
      email: user.email,
      role: user.role!,
    }

    const sessionToken = generateSessionToken(jwtPayload)

    return NextResponse.json(
      {
        success: true,
        message: "Login successful",
        data: { token: sessionToken },
      },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong",
        error,
      },
      { status: 500 }
    )
  }
}
