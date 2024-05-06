This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, install dependencies:

```bash
npm install
# or
yarn add
```

Second, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/home). This endpoint can be edited in `pages/api/home.ts`.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## API Endpoints

You can use API endpoints in your proyect.

[http://localhost:3000/api/home](http://localhost:3000/api/home) -> Get data home.

[http://localhost:3000/api/transaction?PAGE_SIZE=10&SKIP=0](http://localhost:3000/api/transaction?PAGE_SIZE=10&SKIP=0) -> Get data transaction

[http://localhost:3000/api/transaction?hash=your_hash](http://localhost:3000/api/transaction?hash=your_hash) -> Return only transaction

[http://localhost:3000/api/block?limit=20](http://localhost:3000/api/block) -> Return blocks (limit is optional)

[http://localhost:3000/api/block?height=your_height&skip=0&take=10](http://localhost:3000/api/block?height=your_height&skip=0&take=10) -> Return only block and transactions

[http://localhost:3000/api/relay](http://localhost:3000/api/relay) -> Return data relays
[http://localhost:3000/api/governace?limit=20](http://localhost:3000/api/governace?limit=20) -> Return data governance.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
