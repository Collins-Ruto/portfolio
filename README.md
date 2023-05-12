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

The LearnHQ web app communicates with a RESTful API to retrieve course information and user data. The API endpoints are located at [https://api.learnhq.com](https://api.learnhq.com).

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

The LearnHQ web app uses CSS modules for styling. Each component has its own CSS file, which is imported into the component's JavaScript file. Global CSS styles are located in `styles/globals.css`.

## Deployment

The LearnHQ web app is deployed to Vercel, a popular hosting service for Next.js applications. To deploy the app to Vercel, you'll need to follow these steps:

1. Create an account on Vercel.
2. Connect your GitHub repository to Vercel.
3. Configure your Vercel settings.
4. Deploy the app to Vercel.

## Conclusion

That's it for the LearnHQ web app documentation! If you have any questions or issues, feel free to reach out to the application's creators or open an issue on the GitHub repository.

## Create T3 App

LearnHq is a Fully fledged Learning and School Management system app.

This is a [T3 Stack](https://create.t3.gg/) project bootstrapped with `create-t3-app`.

Deployed on vercel [learnhq](learnhq.vercel.app)

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
