export function debounce (task: any, ms: number) {
    let t = { promise: null, cancel: _ => void 0 }
    return async (...args: any) => {
        try {
            // @ts-ignore
            t.cancel()
            t = deferred(ms)
            await t.promise
            await task(...args)
        }
        catch (_) { /* prevent memory leak */ }
    }
}

export function deferred (ms: number) {
    let cancel, promise = new Promise((resolve, reject) => {
        cancel = reject
        setTimeout(resolve, ms)
    })
    return { promise, cancel }
}