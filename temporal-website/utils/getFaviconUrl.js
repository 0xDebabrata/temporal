export const getFaviconUrl = (url) => {
  const parts = url.split("://")
  if (!parts[1]) {
    return null
  }

  if (parts[1].includes("www")) {
    return parts[1].split("www.")[1]
  } else {
    return parts[1]
  }
}

