import 'reflect-metadata';

// Декоратор, добавляющий метод fly
function AddFlyMethod<T extends { new(...args: any[]): {} }>(constructor: T) {
    return class extends constructor {
        constructor(...args: any[]) {
            super(...args);
            Object.defineProperty(constructor, 'fly', {
                value: function() {
                    console.log('I can fly!');
                },
                writable: true,
                enumerable: true,
                configurable: true
            });
        }
    };
}

// Класс Duck
@AddFlyMethod
class Duck {
    quack() {
        console.log('Quack!');
    }
}

// Проверка
const duck = new Duck() as any;
duck.quack(); // Вывод: Quack!
duck.fly();   // Вывод: I can fly!
