# E-commerce Store with Admin Dashboard

E-commerce store designed for a seamless shopping experience with admin and customer roles.

## Features

*   **User Authentication:** Secure login, signup, and logout.
*   **People Also Bought:** Product recommendations based on purchasing patterns.
*   **Persistent Cart:** Users can manage items before checkout.
*   **Stripe Payments:** Secure and efficient payment processing.
*   **Coupon Management:** Administrators can create and distribute discounts.
*   **Sales Analytics:** Detailed insights into performance and customer behavior.

## Key Technologies

*   **Frontend:** React, Tailwind CSS, Framer Motion, Zustand
*   **Backend:** Node.js (Express), JWT, Bcryptjs
*   **Database:** MongoDB (Mongoose), Redis (Upstash)
*   **Payments:** Stripe
*   **Media:** Cloudinary
*   **Deployment:** vercel

## Environment Variables

This project requires the following environment variables. Make sure to replace each placeholder with your actual credentials and configurations.
- `VITE_STRIPE_PUBLISHABLE_KEY`: The publishable key for Stripe.
- `NODE_ENV`: The environment mode (`development`, `production`, etc.).
- `VITE_API_BASE_URL`: The base URL for the API.

## Using Stripe test cards
*  You can refer to <a href="https://docs.stripe.com/testing?testing-method=card-numbers#visa" target="_blank">Stripe docs here</a> and use any card they offer

<a href="https://github.com/ahmed45adel/store-backend" target="_blank">Backend Code Here</a>  
<a href="https://store-frontend-rose.vercel.app" target="_blank">Deployed Project Here</a>