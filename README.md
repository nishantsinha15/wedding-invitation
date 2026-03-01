# 💍 Nishant & Sharmistha — Wedding Invitation

A beautiful, mobile-first wedding invitation website celebrating the union of two cultures — Bihar and Assam, brought together in Bangalore.

## 🌐 Live Preview

Simply open `index.html` in any browser.

## 📁 Project Structure

```
weddingCard/
├── index.html      → Main page (all sections)
├── styles.css      → All styles (mobile-first, responsive)
├── script.js       → Countdown, music, animations, floating diyas
├── music/
│   └── madhaniya.mp3  → Background music (YOU NEED TO ADD THIS)
└── README.md       → This file
```

## 🎵 Adding Background Music

1. Download or get an MP3 of **Madhaniya** (or your preferred wedding song)
2. Place it in the `music/` folder as `madhaniya.mp3`
3. The music toggle button (top-right) will then work

## 📸 Adding Your Photos

In `index.html`, find the **"Meet the Couple"** section and replace the placeholder:

```html
<div class="photo-placeholder">
    <div class="photo-initials">N & S</div>
    <p class="photo-note">Our photo coming soon</p>
</div>
```

Replace with:

```html
<img src="photos/your-couple-photo.jpg" alt="Nishant & Sharmistha" 
     style="width: 260px; height: 320px; object-fit: cover; border-radius: 10px;">
```

## 🚀 Hosting (Free Options)

### GitHub Pages
1. Push this folder to a GitHub repo
2. Go to Settings → Pages → Deploy from main branch
3. Your site will be live at `https://yourusername.github.io/reponame`

### Netlify (Drag & Drop)
1. Go to [netlify.com](https://netlify.com)
2. Drag the entire `weddingCard` folder onto the page
3. Done! You get a URL to share

### Vercel
1. `npm i -g vercel && vercel` in this directory

## ✏️ Customization

- **Colors**: Edit CSS variables at the top of `styles.css` (`:root` section)
- **Dates/Names**: Edit directly in `index.html`
- **Music**: Replace `music/madhaniya.mp3`
- **Wedding Date** (for countdown): Edit `script.js` line with `new Date('May 7, 2026 19:00:00 GMT+0530')`

## 🎨 Design Elements

- **Madhubani art** patterns (Bihar) — Corner ornaments, fish & peacock motifs
- **Gamosa pattern** (Assam) — Red-white stripe dividers
- **Mekhela Chador** reference in the story
- **Floating diyas** — Animated golden lights in hero
- **Starry night sky** — Countdown section background
- **Muga gold + Forest green** — Color palette inspired by both cultures

## #NishTha 💛
> निष्ठा — Devotion, Faith, Love