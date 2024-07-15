import 'reflect-metadata';

function MinLength(length: number) {
    return function (target: any, propertyKey: string) {
        Reflect.defineMetadata('minLength', length, target, propertyKey);
    };
}

class User {
    @MinLength(5)
    name: string;

    constructor(name: string) {
        this.name = name;
    }
}

function validate(user: User) {
    const minLength = Reflect.getMetadata('minLength', user, 'name');
    if (user.name.length < minLength) {
        throw new Error(`Name must be at least ${minLength} characters long.`);
    }
}

const user = new User('John');
try {
    validate(user);
} catch (error) {
    console.error(error.message); // Output: Name must be at least 5 characters long.
}
