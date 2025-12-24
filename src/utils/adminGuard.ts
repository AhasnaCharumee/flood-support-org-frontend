export const isAdmin = () => {
  if (typeof window === 'undefined') return false
  const token = localStorage.getItem('token')
  const role = localStorage.getItem('role')
  return !!(token && role === 'admin')
}

export const getToken = () => {
  if (typeof window === 'undefined') return null
  return localStorage.getItem('token')
}

export const logout = () => {
  if (typeof window === 'undefined') return
  localStorage.removeItem('token')
  localStorage.removeItem('role')
}
