const formatDate = (date: Date) => {
  const numPostDate = String(date)?.split("T")[0]
  return new Date(numPostDate).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  })
}

export default formatDate
