const storageHandler = (key: string, value?: string) => {
  if (typeof window !== 'undefined') {
    if (value) localStorage.setItem(key, value)
    else
      return localStorage.getItem(key)
        ? localStorage.getItem(key)
        : localStorage.setItem(key, '')
  }
}

export default storageHandler
