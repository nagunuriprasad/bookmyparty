# Deploying React App on Netlify

## Prerequisites

- Ensure you have the latest version of Node.js installed. You can download it from [Node.js official website](https://nodejs.org/).
- A React application ready for deployment.

## Steps to Deploy

### 1. Build Your React App

Before deploying, you need to create a production build of your React app.

- Open your terminal and navigate to your React project directory.
- Run the following command:

  ```bash
  npm run build

  - This command generates an optimized production build in the build folder of your project.


### 2.Create a Netlify Account

  - Go to Netlify.

- Click on "Sign up" if you don't have an account, or "Log in" if you do.

### 3.Deploy Your Site
  ### Option A: Drag and Drop
   - After logging in, you'll see the Netlify dashboard.
   - Drag and drop your build folder into the dashboard.
  ### Option B: Connect to Git
   - Click on "New site from Git".
   - Choose your Git provider (e.g., GitHub, GitLab, or Bitbucket).
   - Authorize Netlify to access your repositories.
  - Select the repository containing your React app


 
### Once the deployment process finishes, you will be given a live URL where your React app is now hosted. You can access your application directly at this URL.
