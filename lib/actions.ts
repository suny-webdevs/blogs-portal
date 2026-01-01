/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import { revalidateTag } from "next/cache"

export const fetchPost = async (
  url: string,
  payload: Record<string, any>,
  tag?: string
) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/${url}`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(payload),
      cache: "no-store",
    })
    const data = await res.json()
    if (data.success && tag) {
      revalidateTag(tag, "")
    }
    return data
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const fetchGet = async (url: string) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/${url}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
      next: { tags: ["news"] },
    })
    const data = await res.json()
    return data
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const fetchDelete = async (url: string, tag?: string) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/${url}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
      cache: "no-store",
    })
    const data = await res.json()
    if (data.success && tag) {
      revalidateTag(tag, "")
    }
    return data
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const loginSubmit = async () => {}
