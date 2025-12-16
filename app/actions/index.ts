/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

export const fetchPost = async (url: string, payload: Record<string, any>) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/${url}`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(payload),
    })
    const data = await res.json()
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
    })
    const data = await res.json()
    return data
  } catch (error) {
    console.log(error)
  }
}
