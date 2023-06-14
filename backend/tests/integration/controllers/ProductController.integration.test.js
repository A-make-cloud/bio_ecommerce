const request = require('supertest');
const app = require('../../../app')
describe('GET /products/find-all', ()=>{
    it('GET /products/find-all properly get a product batch for customer', async () => {
        const limit = 10
        const response = await request(app).get('/products/find-all?offset=0&limit=' + limit)
        expect(response.statusCode).toBe(200);
        expect(response.body).toBeDefined();
        expect(response.body.data).toBeDefined();
        expect(response.body.data.length).toBe(limit);
    })
})


// Ajoutez vos assertions supplémentaires selon les propriétés attendues de la réponse
//"test": "jest --coverage" dans package.json pour plus de détails
//lancer "npm test" pour lancer les testes
