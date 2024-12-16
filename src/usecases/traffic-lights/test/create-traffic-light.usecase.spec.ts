import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from 'src/app.module';
import { INestApplication } from '@nestjs/common';
import { JwtAuthGuard } from 'src/infrastructure/common/guards/jwtAuth.guard';
import { AdminGuard } from 'src/infrastructure/common/guards/admin.guard';

describe('TrafficLightController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalGuards(new JwtAuthGuard(), new AdminGuard());
    await app.init();
  });

  it('should create traffic light if user is admin', async () => {
    const adminToken = 'jwt-admin-token';

    const response = await request(app.getHttpServer())
      .post('/traffic-lights')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        latitude: 40.7128,
        longitude: -74.0060,
        type: 'traffic-light',
        department: 'NY',
        province: 'New York',
        district: 'Manhattan',
      })
      .expect(201);

    expect(response.body).toHaveProperty('id');

  it('should return 403 if user is not admin', async () => {
    const userToken = 'jwt-user-token';

    const response = await request(app.getHttpServer())
      .post('/traffic-lights')
      .set('Authorization', `Bearer ${userToken}`)
      .send({
        latitude: 40.7128,
        longitude: -74.0060,
        type: 'traffic-light',
        department: 'NY',
        province: 'New York',
        district: 'Manhattan',
      })
      .expect(403);
  });

  afterAll(async () => {
    await app.close();
  });
})
})
