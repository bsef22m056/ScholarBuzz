# ScholarBuzz
All materials related to development of ScholarBuzz website.
# ScholarBuzz - Smart Scholarship Recommendation System

**Buzz into Global Oppurtunities with ScholarBuzz.**

A modern web app that helps students discover scholarships, receive personalized recommendations, and stay on top of deadlines. Built with React, TypeScript, and Tailwind CSS. Deployed on Vercel.

![Status](https://img.shields.io/badge/status-active-brightgreen)
![React](https://img.shields.io/badge/React-18-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Vite](https://img.shields.io/badge/Vite-5-purple)
![Tailwind](https://img.shields.io/badge/Tailwind-3-06B6D4)

## ✨ Features

- 🎯 **Smart Matching** – AI-powered recommendations combined with strict eligibility rules
- 🔔 **Deadline Reminders** – Get notified 7, 3, and 1 day before deadlines
- 🌍 **Global Coverage** – Browse scholarships from national and international sources
- 💬 **Intelligent Chatbot** – Natural language queries and proactive suggestions
- 📄 **Resume Upload** – Automatic parsing to extract skills and experience
- 🔐 **Secure Auth** – User profiles with protected routes
- 📱 **Responsive Design** – Works on desktop, tablet, and mobile

## 🚀 Quick Start

### Prerequisites
- Node.js 16+
- npm or yarn

### Installation & Development

```bash
# Install dependencies
npm install

# Start dev server (http://localhost:5173)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Test Credentials
```
Email:    test@example.com
Password: password123
```

## 📁 Project Structure

```
src/
├── api/
│   └── mockApi.ts              # Mock API client with sample scholarships
├── components/
│   ├── Header.tsx              # Navigation with auth state
│   ├── Footer.tsx              # Footer with links
│   ├── ScholarshipCard.tsx      # Individual scholarship display
│   ├── MatchList.tsx           # List of recommendations
│   ├── NotificationCenter.tsx   # Notifications UI
│   ├── Chatbot.tsx             # Chat widget
│   ├── ResumeUpload.tsx        # File upload handler
│   ├── AdminScholarshipEditor.tsx # Scholarship form
│   └── ProtectedRoute.tsx       # Auth guard
├── context/
│   └── AuthContext.tsx         # Auth state + hooks
├── pages/
│   ├── Home.tsx                # Landing page
│   ├── Login.tsx               # Login form
│   ├── Signup.tsx              # Registration form
│   ├── Dashboard.tsx           # User dashboard
│   ├── Profile.tsx             # User profile editor
│   ├── ScholarshipsList.tsx    # Browse scholarships
│   ├── ScholarshipDetail.tsx   # Scholarship detail view
│   ├── AdminPanel.tsx          # Admin controls
│   └── NotFound.tsx            # 404 page
├── types/
│   └── index.ts                # TypeScript interfaces
├── styles/
│   └── global.css              # Tailwind + custom styles
├── App.tsx                     # Root component
├── main.tsx                    # App entry point
└── router.tsx                  # Route definitions
```

## 🛠 Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | React 18, TypeScript |
| **Build** | Vite 5 |
| **Styling** | Tailwind CSS 3 |
| **Routing** | React Router v6 |
| **State** | Context API + localStorage |
| **Deployment** | Vercel |

## 📋 Routes

| Route | Protected | Description |
|-------|-----------|-------------|
| `/` | No | Home/landing page |
| `/login` | No | User login |
| `/signup` | No | User registration |
| `/dashboard` | Yes | Dashboard with recommendations |
| `/profile` | Yes | User profile & resume upload |
| `/scholarships` | No | Browse all scholarships |
| `/scholarships/:id` | No | Scholarship details |
| `/admin` | Yes | Admin panel |

## 🌐 Deployment on Vercel

### Option 1: Via Web UI (Recommended)

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project" → "Import Git Repository"
4. Select your repo
5. Vercel auto-detects build settings
6. Click "Deploy"

### Option 2: Via Vercel CLI

```bash
npm install -g vercel
cd path/to/scholarbuzz
vercel --prod
```

**Note:** On Windows, use Command Prompt (cmd.exe) instead of PowerShell to avoid execution policy issues.

### Live URL
After deployment, your app will be available at: `https://scholarbuzz-xyz.vercel.app`

For detailed deployment instructions, see [VERCEL_DEPLOY.md](./VERCEL_DEPLOY.md)

## 🔧 Environment Variables

Create a `.env.local` file:

```env
VITE_API_URL=https://api.scholarbuzz.example.com
VITE_LLM_API_KEY=your-api-key-here
```

Current app uses mock data (no API keys needed for demo).

## 📊 Mock Data

The app includes realistic sample data:

- **4 Scholarships**: Fulbright, Chevening, PEEF, CSC
- **1 User Profile**: Ahmed Hassan from Pakistan
- **Notifications**: Sample match and reminder notifications

Replace `src/api/mockApi.ts` with real API calls when ready.

## 🔐 Authentication

- Uses Context API + localStorage
- Protected routes redirect to login
- Test credentials provided above
- Ready for JWT/OAuth integration

## 🚢 Production Checklist

- [ ] Replace mock API with real backend
- [ ] Add real authentication (JWT/OAuth)
- [ ] Set up environment variables in Vercel
- [ ] Configure custom domain
- [ ] Enable HTTPS (automatic on Vercel)
- [ ] Add analytics/monitoring
- [ ] Set up error tracking
- [ ] Write unit tests
- [ ] Set up CI/CD pipeline

## 🧪 Testing

```bash
# Run dev server with hot reload
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview
```

Test checklist:
- [ ] All pages load without errors
- [ ] Login/logout works
- [ ] Scholarship list shows mock data
- [ ] Search filters scholarships
- [ ] Resume upload handler works
- [ ] Chatbot opens/closes
- [ ] Mobile responsive design

## 🤝 Contributing

1. Fork the repo
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -am 'Add amazing feature'`
4. Push: `git push origin feature/amazing-feature`
5. Open Pull Request

## 📚 Learning Resources

- [React Docs](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Vite Guide](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Router](https://reactrouter.com/)
- [Vercel Docs](https://vercel.com/docs)

## 🐛 Troubleshooting

### Build fails locally
```bash
rm -rf node_modules dist
npm install
npm run build
```

### Port 5173 already in use
```bash
npm run dev -- --port 3000
```

### Vercel deployment fails
- Check `package.json` for correct build command
- Ensure `dist/` is created locally first
- Check build logs in Vercel dashboard

### Styles not applied
- Clear browser cache (Ctrl+Shift+Delete)
- Rebuild: `npm run build`

## 📝 License

MIT License - feel free to use this project for personal or commercial purposes.

## 💬 Support & Feedback

- Open an issue for bugs
- Start a discussion for feature requests
- Email: [your-email@scholarbuzz.com]

---

## 🎓 About ScholarBuzz

**Mission:** Help students access scholarship opportunities without missing deadlines.

**Vision:** Build a global platform connecting students with opportunities, from concept to deployment.

**Built by:** Zille Huma, Muhammad Usman, Ammar Bin Sohail  
**Supervised by:** Dr. Natalia Chaudhry  
**Institution:** FYDP, FCIT, University of the Punjab

---

**Status:** ✅ Live and ready to use!

**Current Version:** 0.1.0 (Beta)

**Last Updated:** November 2025

