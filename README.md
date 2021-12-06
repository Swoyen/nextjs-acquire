
## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You will need the env.local file to run in locally which I might provide upon request.

## E-commerce site

The main purpose of starting this project was to learn nextjs by creating an ecommerce website. The site is deployed on https://nextjs-acquire.vercel.app . The project took me about 2 weeks to complete. This application allows user to view games and purchase them. Users can also login and view their purchase history. Users will not be charged for their purchases as it is just a test website.

The transaction is done using stripe. User data is stored in mongodb. Authentication is handled by nextauth. The API data is obtained from https://api.rawg.io

