import 'jest';
import { Environments } from '../../src/environment/environment.constant';
import Environment  from '../../src/environment/environment';


describe('Environment', () => {
    let instance: Environment;

    beforeEach(() => {
        instance = new Environment('local');
    });

    it('should get the current environment', async () => {
        expect(instance).toBeInstanceOf(Environment);
        const environment = instance.getCurrentEnvironment();
        expect(environment).toBeDefined();
        expect(environment).toBe(Environments.LOCAL);
    });

    it('should check if environement is production or not', async () => {
        const result = instance.isProductionEnvironment();
        expect(result).toBe(false);
    });



    it('should set the current environment', async () => {
        instance.setEnvironment('local');
        const environment = instance.getCurrentEnvironment();
        expect(environment).toBeDefined();
        expect(environment).toBe(Environments.LOCAL);
    });
});