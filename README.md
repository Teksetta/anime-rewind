# 🎬 ANIME REWIND

A VHS-themed anime recommendation engine built with React, Three.js, and real MyAnimeList data integration.

## ✨ Features

- **Retro VHS Aesthetic** - Authentic 90s VCR vibes with scanlines, chromatic aberration, and CRT effects
- **3D WebGL Graphics** - Floating VHS tapes with Three.js
- **Smart Recommendations** - AI-powered algorithm matching your preferences to 5000+ anime
- **Real Data** - Live MyAnimeList API integration for current anime information
- **Interactive Questionnaire** - 5-step preference quiz with glass-morphism UI
- **Procedural Audio** - Web Audio API sound effects for authentic VCR sounds
- **Responsive Design** - Beautiful on desktop, mobile, and tablet
- **Production Ready** - Fully optimized for deployment on Vercel/Netlify

## 🚀 Quick Start

### Prerequisites
- Node.js 18 or higher
- npm or yarn

### Installation

```bash
# Clone or download the project
cd anime-rewind

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will open at `http://localhost:3000`

## 📁 Project Structure

```
anime-rewind/
├── index.html                 # Entry point
├── package.json               # Dependencies
├── vite.config.js            # Build config
├── tailwind.config.js        # Tailwind setup
├── postcss.config.js         # PostCSS config
├── .gitignore                # Git ignore rules
└── src/
    ├── main.jsx              # React entry
    ├── App.jsx               # Main component
    ├── App.css               # App styles
    ├── index.css             # Global styles
    ├── components/
    │   ├── VHSScene.jsx      # 3D scene component
    │   ├── Questionnaire.jsx # Form container
    │   ├── Questionnaire.css
    │   ├── Results.jsx       # Results display
    │   ├── Results.css
    │   ├── AnimeDetailModal.jsx
    │   ├── AnimeDetailModal.css
    │   └── questions/
    │       ├── QuestionExperience.jsx
    │       ├── QuestionGenres.jsx
    │       ├── QuestionMood.jsx
    │       ├── QuestionRating.jsx
    │       └── QuestionTime.jsx
    └── utils/
        ├── VHSSceneManager.js    # Three.js manager
        ├── VHSTape.js            # 3D tape model
        ├── jikanAPI.js           # API wrapper
        ├── recommendationEngine.js  # Scoring
        └── vhsSound.js           # Audio effects
```

## 🛠️ Technology Stack

- **Frontend**: React 18.2.0
- **3D Graphics**: Three.js 0.158.0
- **Styling**: Tailwind CSS 3.3.6
- **Build Tool**: Vite 5.0.8
- **API**: Jikan (MyAnimeList)
- **Deployment**: Vercel / Netlify

## 🎯 How It Works

1. **Splash Screen** - FBI warning with VHS effects
2. **Questionnaire** - Answer 5 questions about your preferences
3. **Analysis** - Algorithm processes your answers
4. **Results** - Personalized anime recommendations with match scores
5. **Details** - Click any recommendation to see full information

## 📊 Recommendation Algorithm

The engine scores anime based on:
- Genre matching (25 points per match)
- Rating/Quality (10-20 points)
- Experience level calibration
- Time commitment alignment
- Popularity weighting

## 🌐 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Connect GitHub repo to Vercel
3. Deploy with one click
4. Automatic updates on every push

See `DEPLOYMENT.md` for detailed instructions.

### Netlify

1. Connect GitHub repo
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Deploy!

## 🔑 API Configuration

The app uses the Jikan API (MyAnimeList) which is free and doesn't require authentication. CORS is handled automatically with a proxy service.

No API keys needed!

## 📝 Development

```bash
# Development server with hot reload
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🐛 Troubleshooting

**CORS Errors?**
- The app uses a CORS proxy automatically
- No configuration needed
- Check browser console for specific errors

**Images not loading?**
- This is normal in local development
- Images load properly on Vercel/Netlify
- Deploy to see full functionality

**API not responding?**
- MyAnimeList API sometimes experiences rate limits
- App falls back to default anime
- Wait a moment and retry

## 📄 License

MIT License - Feel free to use and modify!

## 🎨 Customization

### Change Color Scheme
Edit `tailwind.config.js` VHS color values

### Modify Questions
Update component files in `src/components/questions/`

### Adjust Algorithm
Edit `src/utils/recommendationEngine.js` scoring logic

### Add Sound Effects
Enhance `src/utils/vhsSound.js` with more Web Audio API tricks

## 💡 Ideas for Enhancement

- Add anime watchlist/favorites
- Save recommendation history
- Share recommendations via URL
- Multi-language support
- Dark/light mode toggle
- Advanced filtering options
- Community ratings

## 🎬 Credits

Built with ❤️ for anime fans everywhere.

---

**Status**: Production Ready ✅  
**Version**: 1.0.0  
**Last Updated**: December 2024
