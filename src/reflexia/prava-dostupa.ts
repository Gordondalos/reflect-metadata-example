import 'reflect-metadata';

function RequireRole(role: string) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        const originalMethod = descriptor.value;

        descriptor.value = function (...args: any[]) {
            const userRole = Reflect.getMetadata('role', this);
            if (userRole !== role) {
                throw new Error(`User does not have the required role: ${role}`);
            }
            return originalMethod.apply(this, args);
        };
    };
}


class UserService {
    @RequireRole('admin')
    deleteUser(userId: number) {
        console.log(`User ${userId} deleted`);
    }
}

const userService = new UserService();
Reflect.defineMetadata('role', 'admin', userService);

try {
    userService.deleteUser(123); // Output: User 123 deleted
} catch (error) {
    console.error(error.message);
}

Reflect.defineMetadata('role', 'user', userService);

try {
    userService.deleteUser(123); // Throws error: User does not have the required role: admin
} catch (error) {
    console.error(error.message); // Output: User does not have the required role: admin
}
