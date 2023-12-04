# Documentation

Vercel - https://vercel.com/docs <br />
Mongo https://www.mongodb.com/docs/ <br />
TailwindCSS - https://tailwindcss.com/docs/installation <br />
NextJS - https://nextjs.org/docs <br />

## Demo

https://nextjs-login-bay.vercel.app

## How to Use

### Environment

Rename `.env.example` to `.env` and fill all the fields.

To generate a new secret key run:

`openssl rand -base64 32`

To get a `MONGODB_URI` after created your account and signed in to your project, on the sidebar click on `Database` and then choose the tab `Overview` and after click on button `Connect`.

It will open a a modal, here select `Drivers` here copy the url under the third point (3. Add your connection string into your application code) until the last slash, you can ignore `?retryWrites=true&w=majority` and after the last slash add the name of the database you want to use.

### Install

Node version required: `20.10.x` - [Download](https://nodejs.org/dist/v18.15.0/)

This version is required to use SwaggerUI

Install globally pnpm and vercel:

`
npm install -g pnpm vercel
`

Run:

`pnpm run install`

To start the project:

`pnpm run dev`

To check if Eslint is correct:

`pnpm run lint`


### Project Tree

On the root of the project it possibile to find all configuration files:

- .env - .env.development.local: are used to store all security keys to connect to databasee, etc.
- tailwind.config.js: is used to configure tailwindcss
- tsconfig.json: is used to configure typescript
- .eslintrc.js: is used to configure eslint and prettier

Under `src` folder is possible to find all project files:

- @types: is a folder to content all general types and Model
- app: it is the core of NextJS project ([DOCS](https://nextjs.org/docs/app/building-your-application/routing))

## API

Postman documentation [DOCS](https://mattia-buffetti.postman.co/workspace/Team-Workspace~cab353ba-5e7a-4934-8ffe-1cd2c62ab6bf/documentation/31241551-3be639a3-945a-4993-b6ea-2043ef81f34a)
