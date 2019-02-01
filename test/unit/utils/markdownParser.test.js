const {
  removeMeta, parseMeta, markdownParser,
  metaRegex, metaLeftRegex, metaRightRegex
} = require('@/utils/markdownParser')


describe('metaRegex unit test', function () {
  const markdown1 = `---
    title: how to she bao darkflames
    author: himself65
    ---
    # AWSL
    
    ---
    shouldn't get this part
    ---
    `
  const meta1 = `title: hello, world
    author: himself65`
  describe('mataRegex unit test', () => {
    it('should match none', () => {
      expect(metaRegex.test('---')).toBeFalsy()
      expect(metaRegex.test('---123---')).toBeFalsy()
      expect(metaRegex.test('---\n---')).toBeFalsy()
      expect(metaRegex.test('\n---\nname: himself65\n---')).toBeFalsy()
    })

    it('should match success', () => {
      expect(metaRegex.test(markdown1)).toBeTruthy()
    })
  })

  describe('metaLeftRegex unit test', () => {
    it('should match none', () => {
      expect(metaLeftRegex.test(':')).toBeFalsy()
      expect(metaLeftRegex.test('')).toBeFalsy()
      expect(metaLeftRegex.test('\n')).toBeFalsy()
      expect(metaLeftRegex.test('foo')).toBeFalsy()
      expect(metaLeftRegex.test(':foo')).toBeFalsy()
    })

    it('should match success', () => {
      expect(metaLeftRegex.exec('foo:')).toBeTruthy()
      expect(metaLeftRegex.exec('foo:foo')).toBeTruthy()
    })
  })

  describe('metaRightRegex unit test', () => {
    it('should match none', () => {
      expect(metaRightRegex.test(':')).toBeFalsy()
      expect(metaRightRegex.test('')).toBeFalsy()
      expect(metaRightRegex.test('\n')).toBeFalsy()
      expect(metaRightRegex.test('foo:')).toBeFalsy()
    })

    it('should match success', () => {
      expect(metaRightRegex.exec(':foo')).toBeTruthy()
      expect(metaRightRegex.exec('foo:foo')).toBeTruthy()
    })
  })

  describe('parseMeta unit test', () => {
    it('should parse correct type', () => {
      const data = parseMeta(meta1)
      expect(typeof data).toBe('object')
    })

    it('should parse correct value', () => {
      const data = parseMeta(`title: bread\nauthor: himself65`)
      expect(data.title).toEqual('bread')
      expect(data.author).toEqual('himself65')
    })
  })

  describe('removeMeta unit test', () => {
    it('should remove correct value', () => {
      expect(markdown1).toEqual(`# AWSL
        
        ---
        shouldn't get this part
        ---`)
    })
  })
})
