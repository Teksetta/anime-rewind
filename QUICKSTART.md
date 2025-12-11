# 🎬 ANIME REWIND - QUICK START

Get up and running in 5 minutes!

## Prerequisites
- Node.js 18+
- npm (comes with Node)
- A code editor (VS Code recommended)

## Installation (2 minutes)

```bash
# 1. Navigate to the project folder
cd anime-rewind

# 2. Install all dependencies
npm install

# This downloads React, Three.js, and everything else
# (Might take a minute - that's normal!)
```

## Start Coding! (1 minute)

```bash
# Start the development server
npm run dev
```

✅ App opens automatically at `http://localhost:3000`

You should see:
- Black screen with VHS effects
- Floating 3D VHS tapes
- FBI warning overlay
- "PLAY" button

## First Test

1. Click the **PLAY** button
2. Answer 5 quick questions
3. See anime recommendations!

If images don't load, that's okay - they work perfectly when deployed.

## File Tour (Optional)

Want to understand the structure?

```
src/
├── App.jsx              ← Main app logic
├── components/
│   ├── VHSScene.jsx     ← 3D graphics
│   ├── Questionnaire.jsx ← Quiz form
│   └── Results.jsx      ← Recommendations
└── utils/
    ├── jikanAPI.js      ← Anime data (MyAnimeList)
    └── recommendationEngine.js ← Matching algorithm
```

## Making Changes

### Change Colors
Edit `tailwind.config.js` - look for `vhs-neon`, `vhs-magenta`, etc.

### Change Questions
Edit files in `src/components/questions/`

### Change Anime Data
The algorithm is in `src/utils/recommendationEngine.js`

After any change, the browser reloads automatically!

## Build for Production

When you're ready to deploy:

```bash
# Creates optimized build
npm run build

# Creates a "dist" folder with everything needed
# Deploy this folder to Vercel or Netlify!
```

## Troubleshooting

**Port already in use?**
```bash
# Use a different port
npm run dev -- --port 3001
```

**Dependencies not installing?**
```bash
# Clear and reinstall
rm -rf node_modules package-lock.json
npm install
```

**Weird styling issues?**
- Hard refresh: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)
- Clear browser cache

**Can't see images?**
- Normal in development - they load when deployed
- Jikan API sometimes slow - wait 10 seconds and refresh

## Next Steps

1. ✅ Get it running locally
2. 🎨 Customize styling/questions
3. 🚀 Deploy to Vercel (See DEPLOYMENT.md)
4. 🎉 Share with friends!

## Commands Cheat Sheet

```bash
npm run dev       # Start development (runs forever)
npm run build     # Build for production
npm run preview   # See the production build locally
```

## Tips & Tricks

- **Hot reload** works - save a file and see changes instantly
- **Debugger** - F12 to open browser dev tools
- **Network tab** - Watch API calls to MyAnimeList
- **3D Inspector** - Check how Three.js renders

## Need Help?

- Check console (F12) for error messages
- Look at the README.md for more info
- Review DEPLOYMENT.md when ready to go live

---

**You're ready!** 🚀

The app is production-ready. Customize it, break it, rebuild it - that's how you learn!

Happy coding! 🎬
