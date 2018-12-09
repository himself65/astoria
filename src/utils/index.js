export function handleError (fn) {
  return async (ctx) => {
    try {
      await fn(ctx)
    } catch (err) {
      console.error(err)
      const res = ctx.response
      if (err.response) {
        res.statusCode = err.response.status
        res.body = err.response.data
      } else {
        res.statusCode = 500
        res.body = err.response.data
      }
    }
  }
}
