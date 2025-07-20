"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const common_1 = require("@nestjs/common");
const request = require("supertest");
const auth_module_1 = require("../src/modules/auth/auth.module");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../src/modules/users/3-domain/entities/user.entity");
describe('AuthController (e2e)', () => {
    let app;
    beforeAll(async () => {
        const moduleFixture = await testing_1.Test.createTestingModule({
            imports: [
                auth_module_1.AuthModule,
                typeorm_1.TypeOrmModule.forRoot({
                    type: 'sqlite',
                    database: ':memory:',
                    entities: [user_entity_1.User],
                    synchronize: true,
                }),
            ],
        }).compile();
        app = moduleFixture.createNestApplication();
        app.useGlobalPipes(new common_1.ValidationPipe());
        await app.init();
    });
    afterAll(async () => {
        await app.close();
    });
    it('/auth/register (POST) - should register a new user', () => {
        return request(app.getHttpServer())
            .post('/auth/register')
            .send({
            email: 'test@example.com',
            password: 'password123',
            firstName: 'Test',
            lastName: 'User',
            role: 'MANAGER',
        })
            .expect(201)
            .then((res) => {
            expect(res.body).toHaveProperty('id');
            expect(res.body.email).toEqual('test@example.com');
            expect(res.body).not.toHaveProperty('password_hash');
        });
    });
    it('/auth/register (POST) - should fail if email already exists', () => {
        return request(app.getHttpServer())
            .post('/auth/register')
            .send({
            email: 'test@example.com',
            password: 'password123',
            firstName: 'Test',
            lastName: 'User',
            role: 'MANAGER',
        })
            .expect(500);
    });
    it('/auth/login (POST) - should login and return a JWT', () => {
        return request(app.getHttpServer())
            .post('/auth/login')
            .send({ email: 'test@example.com', password: 'password123' })
            .expect(201)
            .then((res) => {
            expect(res.body).toHaveProperty('access_token');
        });
    });
    it('/auth/login (POST) - should fail with wrong password', () => {
        return request(app.getHttpServer())
            .post('/auth/login')
            .send({ email: 'test@example.com', password: 'wrongpassword' })
            .expect(401);
    });
    it('/auth/profile (GET) - should return user profile with valid token', async () => {
        const loginResponse = await request(app.getHttpServer())
            .post('/auth/login')
            .send({ email: 'test@example.com', password: 'password123' });
        const token = loginResponse.body.access_token;
        return request(app.getHttpServer())
            .get('/auth/profile')
            .set('Authorization', `Bearer ${token}`)
            .expect(200)
            .then((res) => {
            expect(res.body).toHaveProperty('userId');
            expect(res.body.email).toEqual('test@example.com');
        });
    });
    it('/auth/profile (GET) - should fail without a token', () => {
        return request(app.getHttpServer()).get('/auth/profile').expect(401);
    });
});
//# sourceMappingURL=auth.e2e-spec.js.map