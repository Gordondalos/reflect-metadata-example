import 'reflect-metadata';

function Route(method: string, path: string) {
    return function (target: any, propertyKey: string) {
        Reflect.defineMetadata('route', { method, path }, target, propertyKey);
    };
}

class UserController {
    @Route('GET', '/users')
    getAllUsers(req: any, res: any) {
        res.send('Get all users');
    }

    @Route('POST', '/users')
    createUser(req: any, res: any) {
        res.send('Create user');
    }
}


function registerRoutes(controller: any, app: any) {
    const instance = new controller();
    const properties = Object.getOwnPropertyNames(Object.getPrototypeOf(instance));

    properties.forEach(property => {
        const route = Reflect.getMetadata('route', instance, property);
        if (route) {
            app[route.method.toLowerCase()](route.path, instance[property].bind(instance));
        }
    });
}



const express = require('express');
const app = express();

registerRoutes(UserController, app);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
