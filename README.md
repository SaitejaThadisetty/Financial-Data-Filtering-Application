# Financial Data Filtering App

A web application that allows users to view, filter, and sort financial data for Apple Inc., sourced from the Financial Modeling Prep API.

## Link to Deployed App
-[Financial Data Filtering App](https://financial-data-filtering-application.vercel.app)

## Features
- Displays income statement data for Apple Inc.
- Filter options:
  - Date range
  - Revenue range
  - Net income range
- Sorting options:
  - Date
  - Revenue
  - Net income
- Responsive design with TailwindCSS.
- Deployed on Vercel.

## Instructions to Run the Project Locally

### 1. Prerequisites
Ensure the following tools are installed on your system:
- [Node.js](https://nodejs.org/) (version 16 or higher)
- [Git](https://git-scm.com/)
- [Vercel CLI (optional)](https://vercel.com/cli) for deployment.

### 2. Clone the Repository
git clone https://github.com/your-repo/financial-data-filtering-app.git
cd financial-data-filtering-app

### 3. Run the following command to install project dependencies:
npm install

### 4. Add Environment variables
1. Create a .env file in the root of the project.
2. Add the following:
VITE_API_KEY=e3oWr4RAjvp1QuEF0gvT21qCJlGrckuD

### 5. Start the Development Server
Run the app locally:
npm run dev
Open your browser and navigate to http://localhost:5173