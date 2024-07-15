import 'reflect-metadata';

function Test(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    Reflect.defineMetadata('test', true, target, propertyKey);
}

function runTests(target: any) {
    const instance = new target();
    const properties = Object.getOwnPropertyNames(target.prototype);

    properties.forEach(property => {
        if (Reflect.getMetadata('test', target.prototype, property)) {
            try {
                target.prototype[property].call(instance);
                console.log(`Test ${property} passed`);
            } catch (error) {
                console.error(`Test ${property} failed: ${error.message}`);
            }
        }
    });
}

class TestSuite {
    @Test
    test1() {
        console.assert(1 + 1 === 2, '1 + 1 should equal 2');
    }

    @Test
    test2() {
        console.assert(2 * 2 === 4, '2 * 2 should equal 4');
    }

    @Test
    test3() {
        console.assert(2 - 2 === 0, '2 - 2 should equal 0');
    }
}

runTests(TestSuite);
// Output:
// Test test1 passed
// Test test2 passed
// Test test3 passed
