import 'reflect-metadata';

function CacheResult(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    const cacheKey = `__cache__${propertyKey}`;

    descriptor.value = function (...args: any[]) {
        if (!Reflect.hasMetadata(cacheKey, target)) {
            const result = originalMethod.apply(this, args);
            Reflect.defineMetadata(cacheKey, result, target);
            return result;
        }
        return Reflect.getMetadata(cacheKey, target);
    };
}


class Calculator {
    @CacheResult
    expensiveCalculation(num: number): number {
        console.log('Executing expensive calculation...');
        return num * num;
    }
}

const calculator = new Calculator();
console.log(calculator.expensiveCalculation(5)); // Executing expensive calculation... 25
console.log(calculator.expensiveCalculation(5)); // 25
