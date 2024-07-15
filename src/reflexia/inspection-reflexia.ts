import 'reflect-metadata';

class Person {
    constructor(public name: string, public age: number) {}
}

const person = new Person('Alice', 25);

// Инспекция свойств объекта
const properties = Object.getOwnPropertyNames(person);
console.log(properties); // ["name", "age"]

// Инспекция типов свойств
properties.forEach(property => {
    console.log(`${property}: ${typeof (person as any)[property]}`);
});
// Output:
// name: string
// age: number
