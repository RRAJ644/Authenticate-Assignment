export const capitalizeFirstLetter = (str) =>
  str.charAt(0).toUpperCase() + str.slice(1)

export const saveToLocalStorage = (key, state) => {
  try {
    const serializedState = JSON.stringify(state)
    localStorage.setItem(key, serializedState)
  } catch (error) {
    console.error('Error saving to local storage:', error)
  }
}

export const loadFromLocalStorage = (key) => {
  try {
    const serializedState = localStorage.getItem(key)
    return serializedState ? JSON.parse(serializedState) : undefined
  } catch (error) {
    return undefined
  }
}

export const removeFromLocalStorage = (key) => {
  try {
    localStorage.removeItem(key)
  } catch (error) {
    console.error('Error removing from local storage:', error)
  }
}
