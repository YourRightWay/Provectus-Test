export function warning (target, rules, text) {
    rules.forEach((item) => {
        if (typeof target === item) {
            throw new Error(`Arguments for ${text} must not be ${item === 'object' ? 'an' : 'a'} ${item}`)
        }
    })
}

export function getLocalStorage (key) {
    return JSON.parse(localStorage.getItem(key))
}

export function setLocalStorage (key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}


