# 🎞️ Anime Rewind - VHS-Themed Anime Recommendation Engine

A retro-futuristic 3D anime recommendation platform with authentic VHS aesthetics, combining React, Three.js, and real anime data from the Jikan API.

## 🌟 Project Vision

Anime Rewind merges 80s/90s VHS nostalgia with modern web technology to create an immersive anime discovery experience. Features include:

- **VHS Aesthetic**: Authentic CRT scanlines, chromatic aberration, tape tracking effects, and VCR-style UI
- **3D Interactive Elements**: Three.js-powered VHS tape visualizations and floating card effects
- **Smart Recommendations**: Questionnaire-based engine analyzing preferences, mood, and viewing habits
- **Real Data**: Live integration with MyAnimeList via Jikan API

## 📦 Stage 1: Foundation & VHS Effects ✅

### What's Built:
✅ Complete VHS effect system with:
- CRT screen container with bezel effects
- Scanline animation overlay
- CRT flicker simulation
- Dynamic noise/static overlay
- Vignette darkening
- Chromatic aberration text effects

✅ Retro UI components:
- VCR-style buttons with 3D press effect
- Glass-morphic panels with VHS borders
- Timecode display
- VHS tape label styling
- Warning text animations
- Loading bar effects

✅ Typography system:
- VT323 for VCR on-screen displays
- Press Start 2P for tape labels
- Orbitron for futuristic headers

✅ Intro sequence:
- FBI warning simulation
- Timecode display
- "Loading tape" animation
- "Press Play" interaction

✅ Main menu interface:
- VHS-themed navigation
- Recording indicator
- Tape label information box

## 📦 Stage 2: 3D VHS Scene Setup ✅

### What's Built:
✅ Three.js scene integration:
- VHSSceneManager class for scene initialization
- Responsive camera and renderer setup
- Atmospheric fog for depth
- VHS-era dramatic lighting (cyan, magenta, purple)
- Pulsing ambient lights

✅ 3D VHS Tape models:
- Realistic VHS tape geometry with proper proportions
- Black plastic case body with realistic materials
- Procedurally generated label with anime titles
- Visible tape spools through window
- Animated rotating spools
- Edge highlights and glow effects
- Custom canvas-based label textures

✅ Floating animations:
- Gentle bobbing/floating motion
- Slow rotation on Y-axis
- Slight tilt on X-axis
- Pulsing glow effect
- Each tape has unique animation speed

✅ Demo tapes included:
- Cowboy Bebop (red accent)
- Neon Genesis Evangelion (purple accent)  
- Akira (yellow accent)
- Ghost in the Shell (cyan accent)
- Serial Experiments Lain (green accent)
- Perfect Blue (blue accent)

✅ Integration:
- VHSScene React component with animation loop
- Smooth fade-in after intro
- Positioned behind UI elements (z-index management)
- Performance-optimized rendering

## 📦 Stage 3: Questionnaire System ✅

### What's Built:
✅ Multi-step form system:
- 5 comprehensive questions covering all preferences
- Step-by-step navigation with REWIND/FORWARD buttons
- Progress bar with VHS-style tracking
- Tape counter visualization showing current step
- Form validation preventing progression without selection
- Recording indicator animation

✅ Question components:
- **Experience Level**: 4 tiers from beginner to expert with color-coded UI
- **Genre Preferences**: Multi-select up to 3 genres from 12 options with emoji icons
- **Current Mood**: 6 emotional states to match viewing preferences
- **Content Rating**: G, PG, PG-13, R-17+ with appropriate warnings
- **Time Commitment**: Short (1-13), Medium (12-26), Long (26-100), or Any length

✅ VHS-themed UI elements:
- VCR counter display (01/05 format)
- Progress bar with gradient cyan-purple-red
- Selection badges and checkmarks
- Color-coded responses matching VHS palette
- Hover states and animations
- Disabled states when max selections reached

✅ User experience features:
- Clear visual feedback for selections
- Tips and helpful information for each question
- Warning messages for mature content
- Time estimates for viewing commitments
- Selected items display (genre tags)
- Smooth transitions between questions

✅ State management:
- Complete answer tracking across all questions
- Validation before allowing progression
- Results passed to callback on completion
- Ready for API integration in Stage 4

## 📦 Stage 4: API Integration & Smart Recommendations ✅

### What's Built:
✅ Jikan API integration:
- Complete API utility module with CORS proxy (AllOrigins)
- Search anime by genres with filters
- Fetch top anime by popularity
- Get seasonal anime for variety
- Full error handling and fallbacks

✅ Smart recommendation engine:
- Multi-source data fetching (genre search, top anime, seasonal)
- Duplicate removal by MAL ID
- Episode count filtering based on time preference
- Content rating filtering (G, PG, PG-13, R-17+)
- Advanced scoring algorithm weighing:
  - Experience level matching (beginner to expert)
  - Genre alignment (up to 3 selected genres)
  - Mood-based filtering (6 mood types)
  - Popularity-based adjustments
  - MAL score integration
- Top 6 recommendations selected
- Personalized explanations for each recommendation

✅ Results display:
- Professional card grid layout (responsive)
- Anime cards with hover effects and scaling
- Rank badges (#1-6)
- MAL score display with star rating
- Genre tags with color coding
- Episode count and year information
- Click-to-view detailed information
- Loading state with VHS-themed animation
- Error handling with retry option

✅ Detailed anime modal:
- Full-screen overlay with VHS styling
- Large poster image with scanline effect
- Comprehensive stats (type, episodes, status, year)
- Genre tags and studio information
- Complete synopsis
- Personalized recommendation explanation
- Streaming platform badges (mock data)
- Additional metrics (popularity, members, favorites)
- Content rating display
- Direct link to MyAnimeList page
- Keyboard navigation (ESC to close)

✅ 3D scene integration:
- Demo tapes replaced with recommended anime
- Dynamic tape colors based on genres
- Color-coded accent lighting per recommendation
- Smooth transition from demo to results

✅ Fallback system:
- 6 curated classic anime as backup
- Activates if API fails or returns no results
- Includes popular titles (Cowboy Bebop, FMA:B, etc.)
- Ensures users always get recommendations

## 📦 Stage 5: Polish & Deployment ✅

### What's Built:
✅ VHS Sound Effects System:
- Complete Web Audio API implementation
- Authentic retro VCR sounds generated programmatically
- **8 different sound effects**:
  - VCR startup whir (app launch)
  - Button click (all interactions)
  - Tape insertion (start questionnaire)
  - Tape ejection (back to menu)
  - Rewind sound (previous question)
  - Fast forward (next question)
  - Success chime (questionnaire complete)
  - Tracking/static noise (ambient)
- Sound toggle button (top-right corner)
- Volume control system
- Automatic initialization on first user interaction
- No external audio files needed (all procedural)

✅ Enhanced User Experience:
- Sound effects integrated throughout app
- Smooth transitions with audio feedback
- Visual + audio confirmation for all actions
- Toggle sound on/off without page reload
- Persistent sound preference

✅ Deployment Configuration:
- **Vercel** configuration (`vercel.json`)
- **Netlify** configuration (`netlify.toml`)
- **GitHub Actions** CI/CD pipeline (`.github/workflows/ci-cd.yml`)
- Automated testing on multiple Node.js versions
- Preview deployments for pull requests
- Production deployments on main branch merge
- Build artifact uploading

✅ Comprehensive Documentation:
- Complete deployment guide (`DEPLOYMENT.md`)
- Step-by-step instructions for GitHub setup
- Vercel deployment walkthrough
- Netlify deployment alternative
- Continuous deployment setup
- Custom domain configuration
- Troubleshooting section
- Security best practices
- Performance optimization tips

✅ Production-Ready Features:
- Optimized build configuration
- SPA routing handled (all routes → index.html)
- Environment variable support ready
- Auto-detection of framework by deployment platforms
- Node.js 18 compatibility
- Error boundaries for graceful failures

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ and npm

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The app will open at `http://localhost:3000` with full 3D VHS tapes floating!

### Build for Production

```bash
npm run build
npm run preview
```

## 📁 Project Structure

```
anime-rewind/
├── .github/
│   └── workflows/
│       └── ci-cd.yml          # GitHub Actions CI/CD pipeline
├── index.html                  # Entry HTML with CRT container
├── package.json                # Dependencies and scripts
├── vite.config.js              # Vite configuration
├── tailwind.config.js          # Custom VHS color palette
├── postcss.config.js           # PostCSS setup
├── vercel.json                 # Vercel deployment config
├── netlify.toml                # Netlify deployment config
├── README.md                   # Project documentation
├── DEPLOYMENT.md               # Comprehensive deployment guide
└── src/
    ├── main.jsx                # React entry point
    ├── App.jsx                 # Main app with routing, API, sounds
    ├── index.css               # Tailwind imports + base styles
    ├── vhs-effects.css         # Complete VHS aesthetic system
    ├── components/
    │   ├── VHSScene.jsx              # Three.js scene React component
    │   ├── Questionnaire.jsx         # Multi-step form with sounds
    │   ├── Results.jsx               # Recommendation results display
    │   ├── AnimeDetailModal.jsx      # Detailed anime info modal
    │   └── questions/
    │       ├── QuestionExperience.jsx  # Experience level selector
    │       ├── QuestionGenres.jsx      # Genre multi-select
    │       ├── QuestionMood.jsx        # Mood/tone selector
    │       ├── QuestionRating.jsx      # Content rating selector
    │       └── QuestionTime.jsx        # Episode length preference
    └── utils/
        ├── VHSSceneManager.js      # Three.js scene management
        ├── VHSTape.js              # 3D VHS tape model class
        ├── jikanAPI.js             # Jikan API wrapper with CORS
        ├── recommendationEngine.js  # Smart recommendation algorithm
        └── vhsSound.js             # VHS sound effects manager
```

## 🎨 VHS Color Palette

```css
--vhs-black: #0a0a0a    /* Deep black background */
--vhs-white: #e0e0e0    /* Slightly warm white */
--vhs-red: #ff2a6d      /* Bright magenta-red */
--vhs-cyan: #05d9e8     /* Electric cyan */
--vhs-yellow: #f7ef8a   /* Soft yellow */
--vhs-purple: #d62ad0   /* Vivid purple */
--vhs-green: #01ffaa    /* Neon green */
--vhs-blue: #1e3799     /* Deep blue */
```

## ✨ Complete Feature List

### 🎨 VHS Aesthetic
- Authentic CRT screen effects (scanlines, flicker, noise, vignette)
- Chromatic aberration on text
- VCR-style UI elements and buttons
- Retro typography (VT323, Press Start 2P, Orbitron)
- Glass-morphism panels with VHS glow
- VHS tape label styling
- Tracking line animations
- Color palette inspired by 80s/90s VHS era

### 🎬 3D Experience
- Six floating VHS tapes with realistic geometry
- Procedurally generated tape labels
- Rotating tape spools (visible through window)
- Dynamic lighting (cyan, magenta, purple)
- Pulsing glow effects
- Smooth floating animations
- Genre-based color coding

### 📋 Smart Questionnaire
- 5-step personalized form
- Experience level (4 tiers)
- Genre selection (12 genres, pick 3)
- Mood matching (6 moods)
- Content rating (G to R-17+)
- Time commitment (short to epic)
- Progress tracking with VHS counter
- Form validation

### 🎯 AI-Powered Recommendations
- Multi-source data fetching (Jikan API)
- Advanced scoring algorithm
- Genre matching
- Mood-based filtering
- Experience level calibration
- Episode count filtering
- Content rating enforcement
- Top 6 personalized picks
- Explanation for each recommendation

### 🔊 Authentic Sound Design
- 8 procedurally generated VHS sounds
- VCR startup whir
- Button clicks
- Tape insertion/ejection
- Rewind/fast forward
- Success chimes
- Tracking noise
- Toggle on/off control

### 📱 Modern Features
- Fully responsive design
- Detailed anime modals
- MAL integration
- Streaming platform badges
- Click-to-explore interactions
- Keyboard navigation (ESC to close)
- Loading states
- Error handling with fallbacks

### 🚀 Production Ready
- Vercel deployment configured
- Netlify alternative ready
- GitHub Actions CI/CD
- Environment variable support
- Optimized build process
- SEO-friendly routing

## 🛠️ Technologies

- **React 18** - UI framework
- **Three.js** - 3D graphics (Stage 2+)
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility styling
- **Jikan API** - MyAnimeList data (Stage 4+)

## 🎮 VHS Effect Classes

Use these CSS classes to style components with VHS aesthetics:

- `.chromatic-text` - Light chromatic aberration
- `.chromatic-text-strong` - Heavy RGB splitting
- `.vcr-osd` - VCR on-screen display style
- `.tape-label` - Physical VHS tape label look
- `.vcr-button` - 3D pressable VCR button
- `.vhs-panel` - Glass-morphic panel with glow
- `.retro-title` - Gradient animated title
- `.timecode` - VHS timecode display
- `.warning-text` - Blinking warning text
- `.glitch` - Periodic glitch animation

## 🎬 Development Tips

### Testing VHS Effects
All effects are applied via fixed-position overlays that don't interfere with content:
- Scanlines: `z-index: 999`
- Flicker: `z-index: 998`
- Noise: `z-index: 997`
- Vignette: `z-index: 996`

### Customizing Intensity
Adjust effect strength in `vhs-effects.css`:
```css
:root {
  --scanline-opacity: 0.15;  /* 0.0 - 0.3 recommended */
  --noise-opacity: 0.08;     /* 0.0 - 0.2 recommended */
  --aberration-offset: 2px;  /* 1px - 4px recommended */
}
```

### Adding New VHS Elements
Follow the established patterns:
1. Use VHS color palette variables
2. Add text-shadow for glow effects
3. Include chromatic aberration on text
4. Use VT323 or Press Start 2P fonts
5. Add subtle animations for authenticity

## 📝 Notes

- Effects are optimized for performance but may be intensive on older hardware
- CORS proxy will be needed for API calls (AllOrigins or similar)
- Three.js 3D elements coming in Stage 2
- Sound effects will require user interaction to play (browser policy)

## 🤝 Credits

Built with inspiration from:
- 80s/90s VHS era anime distribution
- Classic VCR interfaces and physical VHS tapes
- Retro CRT monitor aesthetics
- Cyberpunk and synthwave visual styles

## 🚀 Deployment

This project is production-ready and can be deployed to multiple platforms:

### Quick Deploy Options:

**Vercel (Recommended):**
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/anime-rewind)

**Netlify:**
[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/YOUR_USERNAME/anime-rewind)

### Manual Deployment:

See [DEPLOYMENT.md](./DEPLOYMENT.md) for comprehensive instructions including:
- GitHub repository setup
- Vercel deployment walkthrough
- Netlify deployment alternative
- Custom domain configuration
- CI/CD pipeline setup
- Troubleshooting guide

## 🎮 VHS Effect Classes

Use these CSS classes to style components with VHS aesthetics:

- `.chromatic-text` - Light chromatic aberration
- `.chromatic-text-strong` - Heavy RGB splitting
- `.vcr-osd` - VCR on-screen display style
- `.tape-label` - Physical VHS tape label look
- `.vcr-button` - 3D pressable VCR button
- `.vhs-panel` - Glass-morphic panel with glow
- `.retro-title` - Gradient animated title
- `.timecode` - VHS timecode display
- `.warning-text` - Blinking warning text
- `.glitch` - Periodic glitch animation

## 🎬 Development Tips

### Customizing VHS Effects Intensity
Adjust effect strength in `vhs-effects.css`:
```css
:root {
  --scanline-opacity: 0.15;  /* 0.0 - 0.3 recommended */
  --noise-opacity: 0.08;     /* 0.0 - 0.2 recommended */
  --aberration-offset: 2px;  /* 1px - 4px recommended */
}
```

### Adding New Questions
Create a new component in `src/components/questions/` following the existing pattern.
Add it to the `questions` array in `Questionnaire.jsx`.

### Customizing Recommendation Algorithm
Modify scoring weights in `src/utils/recommendationEngine.js`:
- Genre match bonus (currently 1.5 points per match)
- Mood match bonus (currently 1 point)
- Experience level adjustments
- Popularity-based scoring

### Adjusting 3D Scene
Modify `VHSSceneManager.js` to change:
- Camera position and FOV
- Lighting colors and intensity
- Fog density and range

### Sound Effect Customization
Edit `vhsSound.js` to adjust:
- Volume levels per sound
- Frequency ranges
- Duration of effects
- Add new custom sounds

## 🤝 Credits

Built with inspiration from:
- 80s/90s VHS era anime distribution
- Classic VCR interfaces and physical VHS tapes
- Retro CRT monitor aesthetics
- Cyberpunk and synthwave visual styles
- MyAnimeList community data (via Jikan API)

### Technologies Used:
- React 18 - UI framework
- Three.js - 3D graphics
- Vite - Build tool
- Tailwind CSS - Utility styling
- Jikan API - Anime data
- Web Audio API - Sound effects

---

**Project Status**: ✅ COMPLETE - All 5 stages finished!  

**Version**: 1.0.0  
**Build Status**: Production Ready  
**Last Updated**: December 2024

**Ready to deploy and share with the world!** 🎉
