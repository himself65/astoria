import requestQuery from '../../src/middleware/requestQuery'

const regex = /^X-.*-Type/

it('should pass regex', function () {
  expect(regex.test('X-Himself65-Type')).toBeTruthy()
})

it('should return content-only', async () => {
  const func = requestQuery()
  const ctx = {
    is: (_0, _1) => {
      return regex.test(_0) && _1 === 'content-only'
    },
    originalUrl: '/posts/1'
  }
  // @ts-ignore
  await func(ctx, async () => {
    console.log('firstly')
  }).then(() => {
    expect(ctx.originalUrl === '/api/posts/1').toBeTruthy()
  })
})
