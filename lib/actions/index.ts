/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import { revalidatePath } from "next/cache"

export const fetchPost = async (
  url: string,
  payload: Record<string, any>,
  revalidateUrl?: string
) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/${url}`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(payload),
    })
    const data = await res.json()
    if (data.success && revalidateUrl) {
      revalidatePath(revalidateUrl)
    }
    return data
  } catch (error) {
    console.log(error)
  }
}

export const fetchGet = async (url: string) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/${url}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
      cache: "force-cache",
      next: { revalidate: 10 },
    })
    const data = await res.json()
    return data
  } catch (error) {
    console.log(error)
  }
}

export const loginSubmit = async () => {}
