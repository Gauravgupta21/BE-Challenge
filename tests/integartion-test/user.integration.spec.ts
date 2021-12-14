import 'jest';
import IntegrationHelpers from '../integration-helper/integration-helper';
import { StatusCodes } from 'http-status-codes';
import * as express from 'express';
import request from 'supertest';
describe('status integration tests', () => {
    let app: express.Application;
    beforeAll(async() => {
        app = await IntegrationHelpers.getApp();
    });
    it('can get health chcek', async () => {
        await request(app)
            .get('/api/v1/healthChcek')
            .set('Accept', 'application/json')
            .expect((res: request.Response) => {
                // eslint-disable-next-line no-console
                console.log(res.text);
            })
            .expect(StatusCodes.OK);
    });
    it('should get the error', async () => {
        await request(app)
            .get('/api/v1/healthChcek')
            .set('Accept', 'application/json')
            .expect(StatusCodes.BAD_REQUEST);
    });
});