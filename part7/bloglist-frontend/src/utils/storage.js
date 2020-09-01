// /bloglist-frontend/src/utils/storage.js
const storageKey = 'loggedBlogAppUser'

const saveUser = (user) => {
  // console.log('uesr in save ', user)
  localStorage.setItem(storageKey, JSON.stringify(user))
  // console.log('reacherd here ?')

}

const loadUser = () =>
  JSON.parse(localStorage.getItem(storageKey))

const logoutUser = () =>
  localStorage.removeItem(storageKey)

export default {
  saveUser,
  loadUser,
  logoutUser
}