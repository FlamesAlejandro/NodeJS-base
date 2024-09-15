Pasos para crear un proyecto en NodeJS.
1. Crea una carpeta para tu proyecto y abre una terminal en esa carpeta.
2. Ejecuta el siguiente comando para inicializar un nuevo proyecto Node.js:
    npm init -y
3. Instala las dependencias necesarias:
    npm install express sequelize mysql2 jsonwebtoken bcryptjs body-parser dotenv
4. Crear la estructura del proyecto

## Resumen de los Endpoints

| Método  | Endpoint               | Descripción                              |
| ------- | ---------------------- | ---------------------------------------- |
| POST    | `/auth/register`        | Registro de un nuevo usuario (Register)  |
| POST    | `/auth/login`           | Autenticación de usuario (Login)         |
| POST    | `/users/create`         | Crear un usuario (solo Admin)            |
| GET     | `/users`                | Obtener todos los usuarios               |
| GET     | `/users/:id`            | Obtener un usuario por ID                |
| PUT     | `/users/:id`            | Actualizar un usuario                    |
| DELETE  | `/users/:id`            | Eliminar un usuario                      |
| POST    | `/products/create`      | Crear un producto                        |
| GET     | `/products`             | Obtener todos los productos              |
| GET     | `/products/:id`         | Obtener un producto por ID               |
| PUT     | `/products/:id`         | Actualizar un producto                   |
| DELETE  | `/products/:id`         | Eliminar un producto                     |
| POST    | `/types/create`         | Crear un tipo de producto                |
| GET     | `/types`                | Obtener todos los tipos de productos     |
| GET     | `/types/:id`            | Obtener un tipo de producto por ID       |
| PUT     | `/types/:id`            | Actualizar un tipo de producto           |
| DELETE  | `/types/:id`            | Eliminar un tipo de producto             |
| POST    | `/invoices/create`      | Crear una factura (boleta de venta)      |
| GET     | `/invoices/:id`         | Obtener detalles de una factura por ID   |
