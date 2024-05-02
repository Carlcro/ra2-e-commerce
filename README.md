# E-commerce site

## Overview

This project is a React-based web application using Vite for bundling, Tailwind for styling, TanStack Router for navigation, and TanStack Query for server-state management. The app allows users to browse products, add items to their cart, and complete purchases with a credit card.

## Features

- **Product List**: Browse a list of products, each displayed with its price and rating. Filter on title, price and category. Filter state is in the URL so that it can be bookmarked or shared.
- **Detailed Product Page**: View detailed information about each product by navigating to its dedicated page.
- **Shopping Cart**: Review all items added to the cart before proceeding to checkout. Items added to shopping cart will be saved in local storage so that it persists between browser sessions.
- **Checkout Page**: Complete your purchase by entering credit card details.

## Running the Application Locally

1. **Clone the Repository**

   Begin by cloning the repository to your local machine using Git:

   ```bash
   git clone https://github.com/your-repository/react-shopping-cart.git
   cd react-shopping-cart
   ```

2. **Install Dependencies**

   Install all the required dependencies using Yarn:

   ```bash
   yarn install
   ```

3. **Start the Development Server**

   Launch the development server with hot reloading by running:

   ```bash
   yarn dev
   ```

   This will start the application on `http://localhost:5174`
