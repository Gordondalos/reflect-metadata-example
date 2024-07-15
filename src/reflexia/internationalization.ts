import 'reflect-metadata';

function LocalizedString(language: string, translation: string) {
    return function (target: any, propertyKey: string) {
        Reflect.defineMetadata(`localized_${language}`, translation, target, propertyKey);
    };
}


class Messages {
    @LocalizedString('en', 'Hello')
    @LocalizedString('es', 'Hola')
    greeting: string;

    @LocalizedString('en', 'Goodbye')
    @LocalizedString('es', 'Adiós')
    farewell: string;
}

function getLocalizedString(instance: any, propertyKey: string, language: string): string {
    return Reflect.getMetadata(`localized_${language}`, instance, propertyKey) || instance[propertyKey];
}

const messages = new Messages();

console.log(getLocalizedString(messages, 'greeting', 'en')); // Hello
console.log(getLocalizedString(messages, 'greeting', 'es')); // Hola
console.log(getLocalizedString(messages, 'farewell', 'en')); // Goodbye
console.log(getLocalizedString(messages, 'farewell', 'es')); // Adiós
