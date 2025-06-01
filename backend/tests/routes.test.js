// routes.test.js
const request = require('supertest');
const app = require('../app'); // ✅ use the new test-friendly file

let server;

beforeAll((done) => {
  server = app.listen(4000, () => {
    console.log('✅ Test server running on port 4000');
    done();
  });
});

afterAll((done) => {
  server.close(() => {
    console.log('🛑 Test server closed');
    done();
  });
});

describe('API Endpoints', () => {
  test('GET /api/health returns 200 and success message', async () => {
    const res = await request(server).get('/api/health');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('success', true);
    expect(res.body).toHaveProperty('message', 'Server is running');
  });
});
