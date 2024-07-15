import 'reflect-metadata';

function EventListener(eventName: string) {
    return function (target: any, propertyKey: string) {
        const listeners = Reflect.getOwnMetadata('eventListeners', target) || [];
        listeners.push({ eventName, methodName: propertyKey });
        Reflect.defineMetadata('eventListeners', listeners, target);
    };
}


class MyComponent {
    @EventListener('click')
    handleClick(event: Event) {
        console.log('Element clicked:', event.target);
    }

    @EventListener('mouseover')
    handleMouseOver(event: Event) {
        console.log('Mouse over element:', event.target);
    }
}


function registerEventListeners(instance: any, element: HTMLElement) {
    const listeners = Reflect.getOwnMetadata('eventListeners', instance) || [];

    listeners.forEach((listener: { eventName: string, methodName: string }) => {
        element.addEventListener(listener.eventName, (event) => {
            instance[listener.methodName](event);
        });
    });
}


const component = new MyComponent();
const element = document.querySelector('#myElement');

if (element) {
    registerEventListeners(component, element);
}
