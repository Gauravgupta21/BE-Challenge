import * as express from 'express';
import App from '../../src/app';
import Environment from '../../src/environment/environment';
import {Environments} from '../../src/environment/environment.constant';

export default class IntegrationHelpers {
    public static appInstance: express.Application;
    public static async getApp(): Promise<express.Application> {
        if (this.appInstance) {
            return this.appInstance;
        }
        const env: Environment = new Environment(Environments.LOCAL);
        const app: App = new App();
        await app.init();
        this.appInstance = app.express;
        return this.appInstance;
    }
    public clearDatabase(): void {
        console.log('clear the database');
    }
}