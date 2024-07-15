import 'reflect-metadata';

function Serializable(target: any) {
    Reflect.defineMetadata('serializable', true, target);
}

function Serialize(target: any, propertyKey: string) {
    const properties = Reflect.getOwnMetadata('serializedProperties', target) || [];
    properties.push(propertyKey);
    Reflect.defineMetadata('serializedProperties', properties, target);
}

function serialize(instance: any): string {
    const constructor = instance.constructor;
    if (!Reflect.getMetadata('serializable', constructor)) {
        throw new Error(`Class ${constructor.name} is not serializable`);
    }

    const properties: string[] = Reflect.getMetadata('serializedProperties', constructor.prototype) || [];
    const json: any = {};

    properties.forEach(property => {
        json[property] = instance[property];
    });

    return JSON.stringify(json);
}

function deserialize<T>(json: string, constructor: { new(...args: any[]): T }): T {
    const instance = new constructor();
    const parsed = JSON.parse(json);

    Object.keys(parsed).forEach(key => {
        instance[key] = parsed[key];
    });

    return instance;
}

@Serializable
class User {
    @Serialize
    name: string;

    @Serialize
    age: number;

    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }
}

const user = new User('John', 30);
const serializedUser = serialize(user);
console.log(serializedUser); // {"name":"John","age":30}

const deserializedUser = deserialize<User>(serializedUser, User);
console.log(deserializedUser); // User { name: 'John', age: 30 }
