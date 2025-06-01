# take-home-assignment-A

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

### Guidelines

- **Tech Stack**: The frontend application should be built using TypeScript/React/Next.js with Mantine as a suggested UI library. The backend application should be built using the existing provided skeleton (Node.js, TypeScript, Prisma, PSQL).
- **Code Quality**: Please ensure your code is clean, well-organized, and well-documented. Add comments where necessary to explain key decisions.
- **Time Management**: This is intended to be a 4+ hour assignment. Focus on getting the basic functionality working first, and add optional features if you have time.
- **(OPTIONAL) API Documentation**: Provide basic API documentation (e.g., using Swagger or in README.md).
- **(OPTIONAL) Deployment**: If possible, deploy your application to a service like Heroku, Vercel, or Netlify, and share the live URL with us for bonus points!

### Submission Instructions

- Share a GitHub repository with your code and provide instructions for how to run the project locally.
- (OPTIONAL) If you deploy the application, include the live link in the repository’s README.
- Ensure that your submission includes clear documentation on how to set up and run the backend and frontend.

---

We hope you have fun with the assignment and we look forward to hearing from you!

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
