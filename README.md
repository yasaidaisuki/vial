# Vial Assignment - Query Management System
## Requirements:
- Node.js, POSTGRESQL, Docker
- Ensure no active local servers on address 5432 or 8080.

## Getting Started
- copy the .env.example file into a .env file
- `docker-compose build`
- `docker-compose up`
- `npm run migrate`
- `npm run seed`
- if you view your database, you should be able to see a populated form data table
- running the following in your terminal will perform a GET request to fetch the form data
```bash
curl --location 'http://127.0.0.1:8080/form-data' --header 'Content-Type: application/json'
```

- go into client
- `npm i`
- `npm run dev`
- to start client

## Tech stack
* [Node](https://nodejs.org/en/)
* [Typescript](www.google.com)
* [Fastify](https://www.fastify.io/)
* [Prisma ORM](https://www.prisma.io/)
* [PostgreSQL](https://www.postgresql.org/)
* [Docker and Compose](https://www.docker.com/)

## Extra Technologies:
* Axios
* ShadCN (Front-end components & Styling)

### Guidelines

### Notes:
- App is made with Next.js, so page uses server-side and component uses client-side.
    - Overhead fetching on server-side, everytime an axios req is made, refetch form and query data in component
- Fully responsive with media queries (small, medium, and large screens)
- Clicking on a row shows the full untruncated question and answer.
    - Ensures User Experience
- Backend API Routes are done with Fastify client to provide the routes and abstracted Prisma ORM functions is used to interact with POSTGRESQL
    - used Prisma to create a queryData schema which generates an abstracted function to perform CRUD on the queryData table on psql.
    - Extra DELETE functionality available when a query exists
- API Documentation can be found below

---
### Screenshots
<img width="1461" alt="image" src="https://github.com/user-attachments/assets/04af1cfe-00c8-4a05-b558-247b122098a7" />
<img width="1457" alt="image" src="https://github.com/user-attachments/assets/233044a9-e025-47a9-a5c8-6bf8b142dcea" />
<img width="1202" alt="image" src="https://github.com/user-attachments/assets/77811a44-33b4-43ac-886f-8ea8b61fc2ed" />
<img width="1452" alt="image" src="https://github.com/user-attachments/assets/810f4e1d-fb13-485e-9851-bd6daa549f71" />
<img width="1451" alt="image" src="https://github.com/user-attachments/assets/19feeea6-10ab-4243-814e-c57ba8eb14d4" />

### API Documentation

Endpoints:
1. formDataRoutes
    - HTTP Method: GET
    - URL: https://localhost:8080/form-data
    - Description:
        - get req using fastify client.
        - Prisma pulls from local postgresql formData table, and gets formData. One of the fields of formData is a one-to-            one relation 
          with queryData
        - Parameters: (None)
        - Status codes:
            - Sucess: 200
            - Missing Data Error: 400
            - Not Found: 404
2. createQueryRoute
    - HTTP Method: POST
    - URL: https://localhost:8080/create-query
    - Description:
        - post req using fastify client.
        - Prisma creates a new queryData into local postgresql queryData table. Prisma automatically handles the backwards            one-to-one relationship with formData
        - Parameters: 
            - JSON Body:
              - title: string
              - description: string | null
              - createdAt: Date
              - updatedAt: Date
              - status: string
              - formDataId: string
        - Status codes:
            - Created Sucessfully: 201
            - Missing Data Error: 400
            - Not Found: 404
3. updateQueryRoute
    - HTTP Method: PUT
    - URL: https://localhost:8080/update-query
    - Description:
        - put req using fastify client.
        - Prisma updates an existing queryData into local postgresql queryData table via id. Prisma automatically handles             the backwards one-to-one relationship with formData
        - Parameters: 
            - JSON Body:
                - queryDataId: string
                - updatedAt: Date
                - status: string
        - Status codes:
            - Updated Sucessfully: 200
            - Missing Data Error: 400
            - Not Found: 404
            - Conflict during update: 409
4. deleteQueryRoute
    - HTTP Method: DELETE
    - URL: https://localhost:8080/delete-query
    - Description:
        - post req using fastify client.
        - Prisma deletes an existing queryData into local postgresql queryData table via id. Prisma automatically handles             the backwards one-to-one relationship with formData
        - Parameters: 
            - JSON Body:
                - queryDataId: string
        - Status codes:
            - Deleted Sucessfully: 200
            - Not Found: 404
