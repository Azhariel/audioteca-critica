const cookieHandler = (cookieName: string, cookieValue?: string) => {
  if (typeof document !== 'undefined') {
    if (cookieValue) {
      document.cookie = `${cookieName}=${cookieValue}`
    } else {
      const cookies = document.cookie.split(';')
      const cookieRegex = new RegExp(`${cookieName}\\b`)
      const cookie = cookies.find((c) => c.match(cookieRegex))
      if (cookie) {
        return cookie.split('=')[1]
      }
    }
  }
}

export default cookieHandler
