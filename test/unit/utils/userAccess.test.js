const { regex } = require('@/utils/userAccess')

describe('userAccess unit test', () => {
  it('should match failed', () => {
    expect(regex.test('/img/icons/favicon.png')).toBeFalsy()
    expect(regex.test('/1.js')).toBeFalsy()
    expect(regex.test('/1.json')).toBeFalsy()
  })

  it('should match success', () => {
    expect(regex.test('/api/login')).toBeTruthy()
    expect(regex.test('/api/login')).toBeTruthy()
    expect(regex.test('/about')).toBeTruthy()
    expect(regex.test('/')).toBeTruthy()
  })
})
