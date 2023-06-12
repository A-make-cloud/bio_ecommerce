const {sum} = require('../../../src/controllers/ProductController')
//jest.useFakeTimers()
test('properly add 2 numbers', ()=>{
    expect( sum(2,3) ).toBe(5)
})
