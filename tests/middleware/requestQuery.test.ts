import requestQuery from '../../src/middleware/requestQuery'

const regex = /^x-.*-type/

it('should pass regex', function () {
  expect(regex.test('x-himself65-type')).toBeTruthy()
})

it('should return content-only', async () => {
  const func = requestQuery()
  const ctx = {
    headers: {
      'x-himself65-type': 'content-only'
    },
    url: '/posts/1'
  }
  // @ts-ignore
  await func(ctx, async () => {
    expect.assertions(1)
  }).then(() => {
    expect(ctx.url === '/api/posts/1').toBeTruthy()
  })
})
