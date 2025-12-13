# 🚀 PROTOTYPE v2 - Quick Deploy Checklist

## 📦 Package Contents

This `anime-rewind-prototype` folder contains:
- ✅ All original v1 files (stages 1-5)
- ✅ NEW EnhancedVHSScene.jsx (vortex, carousel, filtering, grid)
- ✅ NEW PrototypeApp.jsx (demo UI)
- ✅ NEW main-prototype.jsx (entry point)
- ✅ UPDATED package.json (includes GSAP)
- ✅ PROTOTYPE.md (testing guide)
- ✅ All documentation and configs

**Total: ~40 files ready to deploy**

---

## 🎯 Deploy to GitHub → Vercel

### Step 1: Go to Your GitHub Repo
Navigate to: `github.com/YOUR_USERNAME/anime-rewind`

### Step 2: Upload Entire Folder
1. Click "Add file" → "Upload files"
2. **Drag the ENTIRE `anime-rewind-prototype` folder contents**
3. GitHub will ask about replacing files → Click YES/Replace
4. Commit message: **"Prototype v2 - Enhanced 3D vision"**
5. Click "Commit changes"

### Step 3: Edit ONE File (IMPORTANT!)
After upload, navigate to `index.html` in GitHub:
1. Click on `index.html`
2. Click pencil icon (✏️ Edit)
3. Find line 11:
   ```html
   <script type="module" src="/src/main.jsx"></script>
   ```
4. Change to:
   ```html
   <script type="module" src="/src/main-prototype.jsx"></script>
   ```
5. Commit: "Switch to prototype entry point"

### Step 4: Wait for Vercel
- Check your Vercel dashboard
- New deployment starts automatically
- Takes ~2-3 minutes
- Visit: `https://anime-rewind-zeta.vercel.app/`

---

## 🎬 What You'll See

After deployment:
1. **Vortex** - 50 swirling VHS tapes around camera
2. **"BEGIN EXPERIENCE"** button
3. Click → **Carousel forms** (tapes fly inward, 4 rotating rows)
4. **Questions appear** → Answer any option
5. **Tapes filter out** (fly away violently)
6. Repeat 5 times
7. **Grid wall** forms with ~14 remaining tapes

---

## 📊 Test Checklist

Once live, check:
- [ ] Vortex loads (50 tapes swirling)
- [ ] BEGIN button works
- [ ] Tapes fly to carousel formation
- [ ] Carousel rows rotate
- [ ] Questions appear after carousel forms
- [ ] Answering questions filters tapes out
- [ ] Filtered count decreases
- [ ] Grid wall forms at the end
- [ ] Debug info shows (top-left)
- [ ] VHS effects visible (scanlines, noise)

---

## 🐛 If Something Breaks

**No tapes appear:**
- Check browser console for errors
- Try hard refresh (Ctrl+Shift+R or Cmd+Shift+R)
- Check Vercel build logs

**Black screen:**
- Make sure you edited `index.html` to use `main-prototype.jsx`
- Check if WebGL is enabled in browser

**Tapes don't move:**
- Check if JavaScript is enabled
- Try different browser

**Performance issues:**
- This is heavy 3D - might be slow on older devices
- Desktop recommended for testing

---

## 💬 After Testing

Come back and tell me:
1. ✅ Does it work?
2. ✅ Does it match your vision?
3. ✅ What feels right?
4. ✅ What needs adjusting?
5. ✅ Ready to hear the other half of your idea?

---

## 🔄 To Switch Back to v1

If you want to go back to the original v1:

1. Edit `index.html` line 11 back to:
   ```html
   <script type="module" src="/src/main.jsx"></script>
   ```
2. Commit and push

---

**Ready to deploy?** Just drag the folder contents to GitHub! 🚀
