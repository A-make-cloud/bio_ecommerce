const { unescape } = require('../../../src/middelwares/unescapeJson')
test('unescape properly a string', () => {
    //entry data
    const a1 = 'l&#x27;année'
    const a2 = "&quot;"
    const a3 = "&amp;"
    //output data
    const b1 = "l'année"
    const b2 = '"'
    const b3 = '&'
    //test of the function
    expect(unescape(a1)).toBe(b1)
    expect(unescape(a2)).toBe(b2)
    expect(unescape(a3)).toBe(b3)
    expect(unescape(a1 + a2 + a3)).toBe(b1 + b2 + b3)
})
