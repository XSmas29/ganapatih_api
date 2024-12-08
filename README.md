# Ganapatih Express Deployment Guide

This guide explains how to set up and run this Express app locally.

---

## Steps to Run Locally

### 1. Create and Log In to Your Socrata Account
If you don’t have a Socrata account, create one by visiting [Socrata's website](https://dev.socrata.com/). Log in to your account.

---

### 2. Create a Socrata API Token
1. Go to your Socrata account dashboard.
2. Create a new API token.
3. Store the API token securely in a `.env` file located in the root of your project, using the following format:

```env
SOCRATA_APP_TOKEN=<your-socrata-api-token>
```

### 3. Install Dependencies
Run the following command to install all required dependencies:

```bash
npm install
```

### 4. Start the Development Server
Run the following command to start the app in development mode:

```bash
npm run dev
```
