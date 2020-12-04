export const formatFieldName = (name: string) => {
  const words = name.match(/[A-Z]+[^A-Z]*|[^A-Z]+/g)
  if (words) {
    return words.join(' ')
  } else {
    return name
  }
}
