import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AuthModule } from '../src/modules/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../src/modules/users/3-domain/entities/user.entity';

describe('AuthController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        AuthModule,
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          entities: [User],
          synchronize: true,
        }),
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
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
      .expect(500); // Or 409 Conflict, depending on error handling
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
