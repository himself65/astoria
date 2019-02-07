const { astoria } = require('@/index')

describe('astoria base run unit test', () => {
  it('should run success', (done) => {
    astoria.run()
  })
})
