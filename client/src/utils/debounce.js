let timeout

export const debounce = (func, delay) => {
    clearTimeout(timeout)
    timeout = setTimeout(func, delay)
}
