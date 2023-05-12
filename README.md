# LearnHQ

LearnHQ is a web application that allows users to learn new skills and track their progress. The application is built using Next.js, a popular React framework that makes it easy to build server-rendered applications.

## Table of Contents

- [Introduction](#introduction)
- [Getting Started](#getting-started)
- [File Structure](#file-structure)
- [Pages](#pages)
- [Components](#components)
- [API](#api)
- [Authentication](#authentication)
- [Styling](#styling)
- [Deployment](#deployment)
- [Conclusion](#conclusion)
- [Create T3 App](#create-t3-app)

## Getting Started

To get started with the LearnHQ web app, you'll need to follow these steps:

1. Clone the repository:

```
    git clone https://github.com/Collins-Ruto/learnhq.git
```

2. Install dependencies:

```
    cd learnhq
    npm install
```

3. Set up environment variables:
   Create a `.env.local` file in the root directory of the project and add the following environment variables:

```
    NEXT_PUBLIC_API_URL=https://api.learnhq.com
```

4. Start the development server:

```
    npm run dev
```

5. Open the app in your browser:
   Visit [http://localhost:3000](http://localhost:3000) to view the web app.

## File Structure

The file structure of the LearnHQ web app is as follows:

```
learnhq/
├── app/
│ ├── Layout.tsx
│ ├── page.tsx
│ ├── teacher/
│ │   ├── page.tsx
│ │   └── ...
│ └── ...
├── assets/
│ └── ...
├── components/
│ ├── index.tsx
│ ├── Header.tsx
│ └── ...
├── public/
│ ├── favicon.ico
│ └── ...
├── styles/
│  └── globals.css
├── prisma/
│ ├── schema.prisma
│ └── seed.ts
├── src/
│ ├── pages/
│ ├── server/
│ ├── middleware.ts
│ └── ...
├── .env.local
├── next.config.mjs
├── package.json
└── README.md
└── ... more
```

- `components/` contains all the reusable React components used in the application.
- `app/` contains all the Next.js pages that make up the app's routes.
- `public/` contains all the static assets used in the application, like images and favicons.
- `styles/` contains all the CSS styles for the application.
- `src/` contains all the utility functions used in the application.
- `.env.local` contains the environment variables used in the application.
- `next.config.js` contains the configuration settings for the Next.js app.
- `package.json` contains the dependencies and scripts used in the application.
- `README.md` contains the documentation for the application.

## Pages

The LearnHQ web app has the following pages:

- `/`: The homepage of the application, which displays a list of available courses.
- `/learn`: The learn page, which provides access to all learning materials present publicly.
- `/calende`: A route that displays a specific callender per school.
- `/login`: The login page, which allows users to log in to the application.
- `/prisma`: This file defines the schema of the database that the app will use.

## Components

The LearnHQ web app has the following reusable components:

- `Layout`: The layout component, which provides a consistent layout for all pages.
- `Header`: Global navigation component, which provides a navigation menu for the app.

## API

The app uses **trpc**, a modern RPC (Remote Procedure Call) framework for TypeScript, to communicate with the server. trpc provides a type-safe and flexible way to define APIs and automatically generate client and server code.

The API endpoints are defined in the `api/trpc.ts` file, which uses the `trpcNext` function from the `@trpc/server/adapters/next` package to create an RPC server for Next.js. The endpoints use the Prisma client to interact with the database and return the results to the client.

We also use **Prisma ORM**, a modern database toolkit for TypeScript and Node.js, to interact with the database. Prisma provides a type-safe and intuitive way to define database models and perform database operations.

The database models are defined in the `prisma/schema.prisma` file, which uses the Prisma Schema Language to define the data model for the application. This file defines the tables, columns, relationships, and constraints for the database. To generate the Prisma client, we've installed the `@prisma/client` package using npm and run the `npx prisma generate` command.

For input validation and schema definition, it utilizes **Zod**, a TypeScript-first schema validation library. Zod allows for defining strict and expressive schemas for validating API requests and responses.

Zod is used to validate and ensure the correctness of incoming data, such as request payloads and API responses. It helps maintain data integrity and provides a type-safe approach to handling data validation.

To customize the API endpoints, you can modify the `api/trpc.ts` file and the database models in the `prisma/schema.prisma` file. For more information on how to use trpc and Prisma, check out the official documentation at [trpc.io](https://trpc.io) and [prisma.io](https://prisma.io).


The following endpoints are available:

- `GET /api/trpc/course.getAll`: Retrieves a list of available courses.
- `GET /api/trpc/course.getById`: Retrieves a specific course based on its ID.

## Authentication

The LearnHQ web app uses NextAuth.js. NextAuth.js provides a simple way to implement authentication with various providers, such as Google, Facebook, Twitter, and more.

By default, the LearnHQ app uses email and password authentication, which is implemented using JWT (JSON Web Tokens) for secure authentication and authorization of API requests.

When a user logs in, NextAuth.js generates a JWT token for the user and stores it in an HttpOnly cookie. This token is then sent with each subsequent API request to authenticate the user.

If a user attempts to access a protected route without being logged in, they will be redirected to the login page. The app also includes a custom `getServerSideProps` function to ensure that protected pages can only be accessed by authenticated users.

To customize the authentication settings, you can modify the `pages/api/auth/[...nextauth].js` file, which contains the authentication logic for the app. You can also modify the `app/login/page.tss` files to customize the user authentication flow.

## Styling

The LearnHQ web app uses Tailwind CSS for styling. Tailwind CSS is a utility-first CSS framework that provides pre-built CSS classes for common styles, making it easy to rapidly prototype and build responsive user interfaces.

To use Tailwind CSS in the LearnHQ web app, we've installed it as a dependency using npm:

```
    npm install tailwindcss
```
We've also created a tailwind.config.js file in the root directory of the project, which contains the configuration settings for Tailwind CSS. This file allows us to customize the default configuration, such as the colors, fonts, and spacing. 

For more information on how to use Tailwind CSS, check out the [official documentation](https://tailwindcss.com).


## Deployment

The LearnHQ web app is deployed to Vercel, a popular hosting service for Next.js applications. To deploy the app to Vercel, you'll need to follow these steps:

1. Create an account on Vercel.
2. Connect your GitHub repository to Vercel.
3. Configure your Vercel settings.
4. Deploy the app to Vercel.

## Conclusion

That's it for the LearnHQ web app documentation! If you have any questions or issues, feel free to reach out to the application's creators or open an issue on the GitHub repository.

## Create T3 App

This is a [T3 Stack](https://create.t3.gg/) project bootstrapped with `create-t3-app`.

Deployed on [Vercel](https://vercel.com): [learnhq](learnhq.vercel.app)

## What's next? How do I make an app with this?

We try to keep this project as simple as possible, so you can start with just the scaffolding we set up for you, and add additional things later when they become necessary.

If you are not familiar with the different technologies used in this project, please refer to the respective docs. If you still are in the wind, please join our [Discord](https://t3.gg/discord) and ask for help.

- [Next.js](https://nextjs.org)
- [NextAuth.js](https://next-auth.js.org)
- [Prisma](https://prisma.io)
- [Tailwind CSS](https://tailwindcss.com)
- [tRPC](https://trpc.io)

## Learn More

To learn more about the [T3 Stack](https://create.t3.gg/), take a look at the following resources:

- [Documentation](https://create.t3.gg/)
- [Learn the T3 Stack](https://create.t3.gg/en/faq#what-learning-resources-are-currently-available) — Check out these awesome tutorials

You can check out the [create-t3-app GitHub repository](https://github.com/t3-oss/create-t3-app) — your feedback and contributions are welcome!

## How do I deploy this?

Follow our deployment guides for [Vercel](https://create.t3.gg/en/deployment/vercel), [Netlify](https://create.t3.gg/en/deployment/netlify) and [Docker](https://create.t3.gg/en/deployment/docker) for more information.
