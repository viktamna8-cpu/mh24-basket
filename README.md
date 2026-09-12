# MH24 Basket

Fresh vegetable doorstep delivery app for Latur, Maharashtra.

## What this is
A React + Vite app. Customers browse vegetables by category, add to basket,
enter delivery details, and send the complete order to WhatsApp
(+91 95038 16596) with a pre-filled message. No prices shown — only
"You Save ₹" estimated savings.

## Run locally (optional, only if you want to test on your computer)
```
npm install
npm run dev
```
Then open the link it shows (usually http://localhost:5173).

## Deploy for free (Vercel) — see DEPLOY_STEPS.txt for full instructions
1. Push this whole folder to a GitHub repository.
2. Go to vercel.com → Sign up with GitHub.
3. Add New Project → Import your repository.
4. Framework Preset: Vite (auto-detected).
5. Click Deploy.
6. You get a free live link like: mh24-basket.vercel.app

## Admin panel
Tap the small "admin" text at the bottom of the Home screen.
Password: mh24admin (change this in src/App.jsx, search for ADMIN_PASSWORD)

## WhatsApp number
Search for WHATSAPP_NUMBER in src/App.jsx to change it.
Currently set to 919503816596 (displayed as 9503816596).
