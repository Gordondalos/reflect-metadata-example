import 'reflect-metadata';

function Injectable() {
    return function (target: any) {
        Reflect.defineMetadata('injectable', true, target);
    };
}

@Injectable()
class Engine {
    start() {
        console.log('Engine started');
    }
}

@Injectable()
class Car {
    constructor(public engine: Engine) {}

    drive() {
        this.engine.start();
        console.log('Car is driving');
    }
}

function resolveDependencies(target: any) {
    const paramTypes = Reflect.getMetadata('design:paramtypes', target) || [];
    const dependencies = paramTypes.map((paramType: any) => new paramType());
    return new target(...dependencies);
}

const car = resolveDependencies(Car);
car.drive();
// Output:
// Engine started
// Car is driving
