# Jean Marc Aguilar - Full Stack Developer Portfolio

A modern, professional portfolio website built with React.js, featuring a clean black-and-white design, interactive 3D elements, and smooth animations.

## 🌟 Features

- **Modern Design**: Minimal, premium black-and-white aesthetic
- **Interactive 3D Scene**: Subtle Three.js developer scene with floating elements
- **Smooth Animations**: Framer Motion animations throughout
- **Responsive Design**: Fully responsive across all devices
- **Project Filtering**: Filter projects by category with animated transitions
- **Project Modals**: Detailed project information in elegant modals
- **Contact Form**: Validated contact form with EmailJS integration
- **Timeline**: Professional experience and education timeline
- **Skills Section**: Categorized technical skills with icons
- **SEO Optimized**: Proper meta tags and Open Graph metadata
- **Accessibility**: Semantic HTML and keyboard navigation support

## 🚀 Tech Stack

### Frontend
- **React.js** - UI library
- **Vite** - Build tool and dev server
- **JavaScript** - Programming language
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Framer Motion** - Animation library
- **Lucide React** - Icon library

### 3D Graphics
- **Three.js** - 3D library
- **React Three Fiber** - React renderer for Three.js
- **@react-three/drei** - Useful helpers for React Three Fiber

### Contact
- **EmailJS** - Email service integration

### Development Tools
- **Git** - Version control
- **GitHub** - Code hosting

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/jeanmarcaguilar/portfolio.git
   cd portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` and add your EmailJS credentials:
   ```env
   VITE_EMAILJS_SERVICE_ID=your_service_id
   VITE_EMAILJS_TEMPLATE_ID=your_template_id
   VITE_EMAILJS_PUBLIC_KEY=your_public_key
   ```

## 🛠️ Development

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## 🏗️ Build

Build for production:
```bash
npm run build
```

The built files will be in the `dist` directory.

## 🚢 Deployment

### GitHub Pages

1. Install `gh-pages` package:
   ```bash
   npm install -D gh-pages
   ```

2. Update `package.json` with these scripts:
   ```json
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d dist"
   }
   ```

3. Deploy:
   ```bash
   npm run deploy
   ```

### Vercel

1. Push your code to GitHub
2. Import your repository in Vercel
3. Vercel will automatically detect Vite and deploy

### Netlify

1. Push your code to GitHub
2. Import your repository in Netlify
3. Set build command: `npm run build`
4. Set publish directory: `dist`

## 📁 Project Structure

```
portfolio/
│
├── public/
│   ├── images/          # Static images
│   ├── projects/        # Project screenshots
│   └── resume.pdf       # Resume file
│
├── src/
│   ├── components/      # React components
│   │   ├── Navbar.jsx
│   │   ├── Hero.jsx
│   │   ├── About.jsx
│   │   ├── Skills.jsx
│   │   ├── Projects.jsx
│   │   ├── ProjectCard.jsx
│   │   ├── ProjectModal.jsx
│   │   ├── Experience.jsx
│   │   ├── Education.jsx
│   │   ├── Contact.jsx
│   │   ├── Footer.jsx
│   │   └── ThreeScene.jsx
│   │
│   ├── data/           # Data files
│   │   ├── projects.js
│   │   ├── skills.js
│   │   ├── experience.js
│   │   └── education.js
│   │
│   ├── assets/         # Assets
│   │   ├── images/
│   │   └── icons/
│   │
│   ├── App.jsx         # Main app component
│   ├── main.jsx        # Entry point
│   └── index.css       # Global styles
│
├── .env                # Environment variables
├── .env.example        # Environment variables template
├── .gitignore          # Git ignore rules
├── index.html          # HTML template
├── package.json        # Project dependencies
├── tailwind.config.js  # Tailwind configuration
├── postcss.config.js   # PostCSS configuration
├── vite.config.js      # Vite configuration
└── README.md           # This file
```

## 🎨 Customization

### Update Personal Information

Edit the data files in `src/data/`:
- `projects.js` - Add/update your projects
- `skills.js` - Add/update your skills
- `experience.js` - Add/update your experience
- `education.js` - Add/update your education

### Update Contact Information

Edit contact links in:
- `src/components/Contact.jsx` - Email and social links
- `src/components/Footer.jsx` - Footer social links

### Update Resume

Replace `public/resume.pdf` with your actual resume file.

### Customize Colors

Edit `tailwind.config.js` to customize the color scheme:
```javascript
theme: {
  extend: {
    colors: {
      background: '#050505',
      primary: '#FFFFFF',
      secondary: '#A1A1AA',
      border: '#27272A',
      card: '#0A0A0A',
      hover: '#18181B',
    },
  },
}
```

## 🧪 Testing

The project includes manual testing recommendations:
- Test navigation on desktop and mobile
- Verify all links work correctly
- Test contact form validation
- Check responsive design at different breakpoints
- Verify animations and 3D scene performance
- Test project filtering and modals

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🔧 Troubleshooting

### 3D Scene Not Loading
- Check browser WebGL support
- Ensure Three.js dependencies are installed
- Check console for errors

### Tailwind Styles Not Applying
- Verify Tailwind CSS is installed
- Check `tailwind.config.js` content paths
- Ensure `index.css` includes Tailwind directives

### Build Errors
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`
- Check for missing dependencies
- Verify all imports are correct

## 📄 License

This project is open source and available under the MIT License.

## 👤 Author

**Jean Marc Aguilar**
- Full Stack Developer
- Portfolio: [jeanmarcaguilar.github.io](https://jeanmarcaguilar.github.io)
- GitHub: [@jeanmarcaguilar](https://github.com/jeanmarcaguilar)
- LinkedIn: [jeanmarcaguilar](https://linkedin.com/in/jeanmarcaguilar)

## 🙏 Acknowledgments

- Built with [React](https://reactjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- 3D graphics powered by [Three.js](https://threejs.org/)
- Icons by [Lucide](https://lucide.dev/)
- Animations by [Framer Motion](https://www.framer.com/motion/)

---

Made with ❤️ by Jean Marc Aguilar
