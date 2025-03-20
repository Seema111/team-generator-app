## RANDOM TEAM GENERATOR APP DOCUMENTATION


<!-- GETTING STARTED -->
## Getting Started

ABOUT THE PROJECT: 

This documentation provides a comprehensive guide to the Random Team Generator App, including installation instructions, updates, API details, and the necessary data required for the app to function. The app is built using Next.js, Tailwind CSS, and React Icons, and it allows users to create random or skill-balanced teams from a list of participants. Features that are integrated:
Generate completely random teams from a provided player list.
Create balanced teams based on player skill levels (rated 1-5).
Manage players and teams effectively.
API endpoints for seamless integration with other applications.

Features:

1. Generate completely random teams from a provided player list.

2. Create balanced teams based on player skill levels (rated 1-5).

3. Manage players and teams effectively.

4. API endpoints for seamless integration with other applications.

5. User-friendly interface with real-time updates.

6. Secure authentication for team management.



### Built With

This section should list any major frameworks/libraries Here are the list:

* [![Next][Next.js]][https://nextjs.org/docs]
* [![React][React.js]][(https://react.dev/)]
* [![Tailwind][Tailwind CSS]][https://tailwindcss.com/]
* [![MongoDB][Mongoose]][(https://www.mongodb.com/)]


### Prerequisites

First:

- Node.js (v18+) & npm (v9) must be installed
- Check your current node and npm version to make it compatible to go next steps further.

### Installation

_Below is the instruction to install the project._

1. Clone the repo
   
   git clone https://github.com/Seema111/team-generator-app.git


2. Install NPM packages
   
* npm
  
  npm install



3. Create a persona .env file OR update env.local for use personally
   
   MONGODB_URI="mongodbURL" <---MongoDB URI Link"--->
   NEXT_PUBLIC_API_BASE_URL=http://localhost:3000


4. Run the Project using 
   
    npm run dev

5. Check your Database connection using API
   
    http://localhost:3000/api/checkDb

4. Run the Build of project
   
    npm run build


<!-- USAGE EXAMPLES -->
## Usage

_For more details, please refer to the [Documentation](https://docs.google.com/document/d/1mgogjezMq0cg0FxM8ZZQZ__2Bm7r6XXGZSfplgWt-MU/edit?usp=sharing)_

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
