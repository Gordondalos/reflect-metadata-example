import 'reflect-metadata';

function Log(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    Reflect.defineMetadata('log', true, target, propertyKey);
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
        console.log(`Calling ${propertyKey} with arguments:`, args);
        const result = originalMethod.apply(this, args);
        console.log(`Result of ${propertyKey}:`, result);
        return result;
    };
}

class Calculator {
    @Log
    add(a: number, b: number) {
        return a + b;
    }
}

const calculator = new Calculator();
calculator.add(1, 2);
// Output:
// Calling add with arguments: [ 1, 2 ]
// Result of add: 3
