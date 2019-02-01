const resolve = require('path').resolve
const { requireContents, regex } = require('@/utils/requireContents')

describe('requireIndex module run success', function () {
  describe('regex test', () => {
    it('should match failed', () => {
      expect(regex.test('README')).toBeFalsy()
      expect(regex.test('README.')).toBeFalsy()
    })

    it('should match success', () => {
      expect(regex.exec('README.md')[0]).toEqual('README')
      expect(regex.exec('hello,world.md')[0]).toEqual('hello,world')
      expect(regex.exec('hello-world.md')[0]).toEqual('hello-world')
      expect(regex.exec('1.2.3.4.md')[0]).toEqual('1.2.3.4')
      expect(regex.exec('1-2-3-4.md')[0]).toEqual('1-2-3-4')
      expect(regex.exec('1-2.3-f<5>6.md')[0]).toEqual('1-2.3-f<5>6')
    })
  })

  describe('base test', () => {
    it('should throw error', () => {
      expect(() => requireContents()).toThrowError(/nullable/)
      expect(() => requireContents(null)).toThrowError(/nullable/)
      expect(() => requireContents(undefined)).toThrowError(/nullable/)
      expect(() => requireContents('')).toThrowError()
    })

    it('should load files success', () => {
      const testDir = resolve(__dirname, '__mock__')
      const mds = requireContents(testDir)
      expect(mds[0].value.toString()).toMatch(/README.md/)
    })
  })
})
