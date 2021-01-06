export const getCookie = (variable) => {
  const allcookies = document.cookie
  const pos = allcookies.indexOf(`${variable}=`)
  if (pos !== -1) {
    var start = pos + variable.length + 1
    var end = allcookies.indexOf(';', start)

    if (end === -1) {
      end = allcookies.length
    }

    const value = allcookies.substring(start, end)
    return value
  }
}

