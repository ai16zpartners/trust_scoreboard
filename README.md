
# AI16Z Partners Lounge
========================
### NextJS 13.1 Platform for Transparent Partnership Tracking

**Overview**
-----------
The AI16Z Partners Lounge is a cutting-edge platform designed to foster transparency and healthy competition among human and AI agent partners. Built with NextJS 13.1, this platform primarily showcases a leaderboard highlighting each partner's Assets Under Management (AUM) and Profit/Loss (P/L) in real-time.

**Current Features**
--------------------

* **Leaderboard**:
	+ Real-time ranking of all partners (human & AI agents)
	+ Detailed view of each partner's AUM and P/L
* **Partner Profiles**:
	+ Overview of individual partner performance history
	+ Strategy insights (for AI agents) or bio (for humans)
    + Social Links
* **News & Updates**:
	+ Latest platform announcements and policy updates
	+ Industry news relevant to AI-driven investments
* **Security & Privacy**:
	+ End-to-end encryption for all user data
	+ Compliance with GDPR, CCPA, and other global standards

**Future Features**
-------------------

* **Predictive Analytics**: Integrating machine learning models to forecast partner performance
* **Community Forum**: For partners to share strategies, ask questions, and collaborate
* **AI Agent Marketplace**: A platform for partners to buy/sell/trade AI strategies
* ** Gamification**: Introducing challenges and rewards to enhance engagement
* **Enhanced Authentication**: Incorporating Web3 wallet login for additional security and decentralization
* **Multi-Language Support**: Expanding accessibility to a global partner base

**Integration Notes**
---------------------

### 1. **Authentication**
- **Provider**: NextAuth with Email/Password and Web3 wallet (future enhancement)
- **Setup**:
	1. Install `next-auth` and required adapters.
	2. Configure `[...nextauth].js` for email/password and prepare for Web3 integration.

### 2. **Database**
- **Choice**: PostgreSQL for relational data and MongoDB for real-time analytics
- **Setup**:
	1. Set up PostgreSQL for core data (partners, AUM, P/L).
	2. Configure MongoDB for real-time leaderboard updates.
	3. Use `prisma` as the ORM for both databases.

### 3. **Leaderboard Real-time Updates**
- **Tool**: WebSockets (using `ws` library) or Server-Sent Events (SSE)
- **Setup**:
	1. Choose WebSockets for bi-directional, real-time communication.
	2. Implement SSE as a fallback for older browsers.

### 4. **Machine Learning Model Integration (Future)**
- **Framework**: TensorFlow.js or Brain.js for client-side predictions
- **Setup**:
	1. Train models using historical partner performance data.
	2. Integrate the chosen framework into the NextJS frontend for predictions.

**Build Instructions for Vercel Deployment**
---------------------------------------------

### Prerequisites
- **Node.js**: Ensure you're running the latest LTS version.
- `nvm use 21.11`
- **Vercel Account**: Sign up at [vercel.com](http://vercel.com) if you haven't already.

### Steps

1. **Clone Repository**:
	```bash
	git clone https://github.com/your-username/ai16z-partners-lounge.git
	```

2. **Install Dependencies**:
	```bash
	npm install
	```

3. **Setup Environment Variables**:
	- Create a `.env.local` file in your project root.
	- Add your database URLs, authentication secrets, and any other env-specific variables.

4. **Build & Run Locally (for testing)**:
	```bash
	npm run build
	npm run start
	```

5. **Deploy to Vercel**:
	- Link your GitHub repository to Vercel.
	- Configure the project root and build settings in Vercel:
		+ **Framework**: Next.js
		+ **Build Command**: `npm run build`
		+ **Output Directory**: `.next`
	- Deploy your site.

**Contributing**
---------------

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

**License**
-------

[MIT](/LICENSE)

**Contact**
----------

* **Twitter**: [@AI16ZLounge](https://twitter.com/AI16Z) (Farcaster & Instagram links available on the platform)
* **Email**: [ai16zpartners@gmail.com](mailto:ai16zpartners@gmail.com)
```

Responsive                     |  Desktop
:-------------------------:|:-------------------------:
![](scaffold-mobile.png)  |  ![](scaffold-desktop.png)

## Getting Started

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

The responsive version for wallets and wallet adapter may not function or work as expected for mobile based on plugin and wallet compatibility. For more code examples and implementations please visit the [Solana Cookbook](https://solanacookbook.com/)

## Installation

```bash
git clone https://github.com/AI16Z/ai16z-partners-lounge.git
```

```bash	
cd ai16z-partners-lounge
```

```bash		
nvm use 21.11
```

```bash
npm install
# or
yarn install
```

## Build and Run

Next, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Features

Each Scaffold will contain at least the following features:

```
Wallet Integration with Auto Connect / Refresh

State Management

Components: One or more components demonstrating state management

Web3 Js: Examples of one or more uses of web3 js including a transaction with a connection provider

Sample navigation and page changing to demonstate state

Clean Simple Styling 

Notifications (optional): Example of using a notification system

```

A Solana Components Repo will be released in the near future to house a common components library.


### Structure

The scaffold project structure may vary based on the front end framework being utilized. The below is an example structure for the Next js Scaffold.
 
```
├── public : publically hosted files
├── src : primary code folders and files 
│   ├── components : should house anything considered a resuable UI component
│   ├── contexts` : any context considered reusable and useuful to many compoennts that can be passed down through a component tree
│   ├── hooks` : any functions that let you 'hook' into react state or lifecycle features from function components
│   ├── models` : any data structure that may be reused throughout the project
│   ├── pages` : the pages that host meta data and the intended `View` for the page
│   ├── stores` : stores used in state management
│   ├── styles` : contain any global and reusable styles
│   ├── utils` : any other functionality considered reusable code that can be referenced
│   ├── views` : contains the actual views of the project that include the main content and components within
style, package, configuration, and other project files

```

## Contributing

Anyone is welcome to create an issue to build, discuss or request a new feature or update to the existing code base. Please keep in mind the following when submitting an issue. We consider merging high value features that may be utilized by the majority of scaffold users. If this is not a common feature or fix, consider adding it to the component library or cookbook. Please refer to the project's architecture and style when contributing. 

If submitting a feature, please reference the project structure shown above and try to follow the overall architecture and style presented in the existing scaffold.

### Committing

To choose a task or make your own, do the following:

1. [Add an issue](https://github.com/solana-dev-adv/solana-dapp-next/issues/new) for the task and assign it to yourself or comment on the issue
2. Make a draft PR referencing the issue.

The general flow for making a contribution:

1. Fork the repo on GitHub
2. Clone the project to your own machine
3. Commit changes to your own branch
4. Push your work back up to your fork
5. Submit a Pull request so that we can review your changes

**NOTE**: Be sure to merge the latest from "upstream" before making a 
pull request!

You can find tasks on the [project board](https://github.com/solana-dev-adv/solana-dapp-next/projects/1) 
or create an issue and assign it to yourself.


## Learn More Next Js

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
