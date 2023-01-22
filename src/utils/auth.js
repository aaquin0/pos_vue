import Cookies from 'js-cookie'
const tokenKey = 'Auth-Token'
const isLoggedIn = 'isLoggedIn'

export function getToken() {
  return Cookies.get(tokenKey)
}

export function setToken(token) {
  return Cookies.set(tokenKey, token)
}

export function removeToken() {
  return Cookies.remove(tokenKey)
}

export function getIsLoggedIn() {
  return Cookies.get(isLoggedIn)
}

export function setIsLoggedIn(token) {
  return Cookies.set(isLoggedIn, token)
}

export function removeIsLoggedIn() {
  return Cookies.remove(isLoggedIn)
}
