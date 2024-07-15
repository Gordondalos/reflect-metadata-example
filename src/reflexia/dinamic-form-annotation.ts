import 'reflect-metadata';

function FormField(label: string) {
    return function (target: any, propertyKey: string) {
        Reflect.defineMetadata('formField', label, target, propertyKey);
    };
}

class User {
    @FormField('Имя')
    name: string;

    @FormField('Возраст')
    age: number;

    @FormField('Email')
    email: string;

    constructor(name: string, age: number, email: string) {
        this.name = name;
        this.age = age;
        this.email = email;
    }
}

function createForm(instance: any): HTMLFormElement {
    const form = document.createElement('form');
    const properties = Object.getOwnPropertyNames(instance);

    properties.forEach(property => {
        const label = Reflect.getMetadata('formField', instance, property);
        if (label) {
            const formGroup = document.createElement('div');

            const formLabel = document.createElement('label');
            formLabel.textContent = label;
            formGroup.appendChild(formLabel);

            const formInput = document.createElement('input');
            formInput.name = property;
            formInput.value = instance[property];
            formGroup.appendChild(formInput);

            form.appendChild(formGroup);
        }
    });

    return form;
}


const user = new User('John Doe', 30, 'john.doe@example.com');
const form = createForm(user);

document.body.appendChild(form);
