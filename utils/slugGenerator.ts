const slugGenerator = (str: string) => {
  const slug = str
    .replace(/[:,;!@#$%*()&_]/g, "")
    .trim()
    .replace(/\s+/g, " ")
    .split(" ")
    .join("-")
    .toLowerCase()
  return slug
}

export default slugGenerator
