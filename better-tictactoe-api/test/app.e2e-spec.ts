import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { UpdateInfoUserRequest } from 'src/info-user/interfaces';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  // it('/ (GET)', () => {
  //   return request(app.getHttpServer())
  //     .get('/')
  //     .expect(200)
  //     .expect('Hello World!');
  // });
  
 it('/info-user/validate (POST) - valid data', async () => {
    const payload: Partial<UpdateInfoUserRequest> = {
      name: 'Nadiaaaaa',
      age: 23,
      married: true,
      dateOfBirth: '2001-12-12' as any, //TODO: find a way to fix the fact that it is passed as a string
    };

    return request(app.getHttpServer())
      .post('/info-user/validate')
      .send(payload)
      .expect(201)
      .expect(res => {
        expect(res.body.success).toBe(true);
      });
  });

  it('/info-user/validate (POST) - invalid data', async () => {
    const payload: Partial<UpdateInfoUserRequest> = {
      name: 'Nad', // too short
      age: 0,      // invalid
      married: false,
      dateOfBirth: '2025-01-01' as any, // future date
    };

    return request(app.getHttpServer())
      .post('/info-user/validate')
      .send(payload)
      .expect(400)
      .expect(res => {
        expect(res.body.message).toBeDefined();
      });
  });

   afterAll(async () => {
    await app.close();
  });
  
});
