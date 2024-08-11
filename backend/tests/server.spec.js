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
it('should add a new cafe and return 201', async () => {
    const newCafe = {
      id: 5,
      nombre: 'Latte'
    };
    const response = await request(server)
      .post('/cafes')
      .send(newCafe);
    expect(response.statusCode).toBe(201);
    expect(response.body).toEqual(expect.arrayContaining([newCafe]));
  });
  it('should return 400 when trying to update a cafe with different id in params and payload', async () => {
    const cafeToUpdate = {
      id: 4,
      nombre: 'Latte'
    };
    const response = await request(server)
      .put('/cafes/6') // id en params es diferente al id en payload
      .send(cafeToUpdate);
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({
      message: "El id del parámetro no coincide con el id del café recibido"
    });
  });
});
