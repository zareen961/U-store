export const getViewportWidth = () =>
    Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)

export const getViewportHeight = () =>
    Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
