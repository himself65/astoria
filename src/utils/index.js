export function handleError (fn) {
  return async (ctx) => {
    try {
      await fn(ctx)
    } catch (err) {
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

export function handleAPI (fn) {
  return async (ctx) => {
    const query = ctx.request.query
    const response = ctx.response
    try {
      const res = await fn(query)
      response.statusCode = 200
      response.body = {
        status: 200,
        data: res
      }
    } catch (e) {
      if (e.response) {
        response.statusCode = e.response.status
        response.body = {
          status: e.response.status,
          data: `${e.response.data}`
        }
      } else {
        response.statusCode = 500
        response.body = {
          status: 500,
          data: `${e.message || e}`
        }
      }
    }
  }
}
