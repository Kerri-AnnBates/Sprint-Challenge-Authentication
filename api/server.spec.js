const request = require('supertest');
const server = require('./server.js');
const authenticate = require('../auth/authenticate-middleware.js');
const Users = require('../users/users-model');
const db = require('../database/dbConfig');

describe('server.js', () => {

   describe('jokes route', () => {
      it('should return OK 401 status to the /api/jokes route when not logged in', async () => {
         const response = await request(server).get('/api/jokes');
         expect(response.status).toBe(401);
      })

      it.skip('should log in user, allow access to jokes after log in', async () => {
         return await request(server)
            .post('/api/auth/login')
            .send({ username: 'john', password: 'test' })
            .then(res => {
               const token = res.body.token;

               return request(server)
                  .get('/api/jokes')
                  .set("Authorization", token)
                  .then(res => {
                     expect(res.status).toBe(200);
                     expect(Array.isArray(res.body)).toBe(true);
                  });
            });
      });
   });

   describe('jokes route', () => {
      it('should return json', () => {
         request(server).get('/api/jokes').then(res => {
            expect(res.type).toMatch(/json/gi);
         });
      })
   });

   describe('login route', () => {
      it('responds with json', function (done) {
         request(server)
            .post('/api/auth/login')
            .send({ username: 'john', password: 'test' })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/gi)
            .end(function (err, res) {
               if (err) return done(err);
               done();
            });
      });
      // it('respond 200 OK status', async function () {
         it('succeeds with correct credentials', async () => {
            const demoUser = {username: 'john', password: 'test'}
            const response = await request(server).post(`/api/auth/login`, demoUser)
               .expect(200);
            expect(res.body.username).toBe(demoUser.username);
         });
      });
   // });

   describe('POST /api/auth/register', function () {
      it('responds with json and 201 CREATED status', function (done) {
         request(server)
            .post('/api/auth/register')
            .send({ username: 'john', password: 'test' })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/gi)
            .expect(201)
            .end(function (err, res) {
               if (err) return done(err);
               done();
            });
      });
   });

})