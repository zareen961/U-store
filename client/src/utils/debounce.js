export const DEBOUNCE_TIME = 2000

let timeout

export const debounce = (func, delay) => {
    clearTimeout(timeout)
    timeout = setTimeout(func, delay)
}
