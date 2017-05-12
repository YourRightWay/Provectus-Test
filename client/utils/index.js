export function createElem( type, props, ...children) {
    return { type, props, children };
}

export function cloneObject(obj) {
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }

    let temp = obj.constructor();
    for (var key in obj) {
        temp[key] = cloneObject(obj[key]);
    }

    return temp;
}
