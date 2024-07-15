import 'reflect-metadata';

function EventListener(eventName: string) {
    return function (target: any, propertyKey: string) {
        const listeners = Reflect.getOwnMetadata('eventListeners', target) || [];
        listeners.push({ eventName, methodName: propertyKey });
        Reflect.defineMetadata('eventListeners', listeners, target);
    };
}

class EventBus {
    private listeners: { [eventName: string]: Function[] } = {};

    register(target: any) {
        const listeners = Reflect.getOwnMetadata('eventListeners', target) || [];
        listeners.forEach((listener: { eventName: string, methodName: string }) => {
            if (!this.listeners[listener.eventName]) {
                this.listeners[listener.eventName] = [];
            }
            this.listeners[listener.eventName].push((target as any)[listener.methodName].bind(target));
        });
    }

    emit(eventName: string, ...args: any[]) {
        const listeners = this.listeners[eventName] || [];
        listeners.forEach(listener => listener(...args));
    }
}

class MyComponent {
    @EventListener('dataReceived')
    onDataReceived(data: any) {
        console.log('Data received:', data);
    }

    @EventListener('errorOccurred')
    onError(error: Error) {
        console.log('Error occurred:', error.message);
    }
}

const eventBus = new EventBus();
const myComponent = new MyComponent();

eventBus.register(myComponent);

eventBus.emit('dataReceived', { id: 1, name: 'Test' });
// Output: Data received: { id: 1, name: 'Test' }

eventBus.emit('errorOccurred', new Error('Something went wrong'));
// Output: Error occurred: Something went wrong
