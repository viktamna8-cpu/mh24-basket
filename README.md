# MH24 Basket

Fresh vegetables ordering app (React + Vite + Tailwind), WhatsApp order flow.

## Local मध्ये चालवायचं असेल तर

```bash
npm install
npm run dev
```

नंतर ब्राउझरमध्ये `http://localhost:5173` उघडा.

## Build करण्यासाठी (production)

```bash
npm run build
```

`dist` फोल्डर तयार होईल — तो कुठेही (Netlify, Vercel, GitHub Pages) deploy करता येईल.

## GitHub वर टाकायचं असेल तर

1. GitHub वर नवीन repository तयार करा.
2. या फोल्डरमधल्या सगळ्या फाईल्स त्या repo मध्ये push करा:

```bash
git init
git add .
git commit -m "Initial commit - MH24 Basket"
git branch -M main
git remote add origin https://github.com/USERNAME/REPO_NAME.git
git push -u origin main
```

## फाईल स्ट्रक्चर

```
mh24-basket/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── src/
│   ├── main.jsx
│   ├── App.jsx        ← मुख्य ॲप कोड (इथेच सगळे बदल करायचे)
│   └── index.css
└── README.md
```

## महत्त्वाचं

- WhatsApp नंबर बदलायचा असेल तर `src/App.jsx` मध्ये `WHATSAPP_NUMBER` शोधा.
- Admin password: `mh24admin` (`src/App.jsx` मध्ये `ADMIN_PASSWORD`).
- भाज्यांचे फोटो नसतील/चुकीचे असतील तिथे आपोआप हिरवा icon दिसतो — कोड चुकीचा फोटो कधीच दाखवत नाही.
