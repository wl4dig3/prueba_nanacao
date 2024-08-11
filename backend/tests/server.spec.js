const request = require("supertest");
const server = require("../index");

describe("Operaciones CRUD de cafes", () => {
it('should test GET /cafes', async () => {
    const response = await request(server).get('/cafes');
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual([
        {
            id: 1,
            nombre: 'Cortado'
        },
        {
            id: 2,
            nombre: 'Americano'
        },
        {
            id: 3,
            nombre: 'Mocacino'
        },
        {
            id: 4,
            nombre: 'Cappuccino'
        }
    ]);
})
});
