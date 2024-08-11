const request = require("supertest");
const server = require("../index");

describe("Operaciones CRUD de cafes", () => {
    it('should return 200 and an array of cafes', async () => {
        const response = await request(server).get('/cafes');
        expect(response.statusCode).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
        expect(response.body.length).toBeGreaterThan(0);
        expect(response.body[0]).toBeInstanceOf(Object);
    });
it('should return 404 when trying to delete a non-existent cafe', async () => {
    const token = 'tu-token-de-autorizacion';
    const response = await request(server)
        .delete('/cafes/1000')
        .set("Authorization", token);
    expect(response.statusCode).toBe(404);
    expect(response.body).toEqual({ message: "No se encontró ningún cafe con ese id" });
});

});
