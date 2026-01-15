# People Connect

A modern, privacy-first professional networking platform that helps you connect with professionals through trusted, invite-only groups. Built with Next.js and TypeScript, featuring smooth animations, responsive design, and a clean user interface.

## 🚀 Features

### Core Functionality

- **User Profiles**: Create and manage your professional profile with details like organization, designation, and contact information
- **Group Management**: Create or join invite-only groups to connect with like-minded professionals
- **Member Discovery**: Browse group members, view profiles, and build meaningful connections
- **Privacy-First Design**: Clean, distraction-free environment focused on professional networking

### User Experience

- **Smooth Animations**: Sliding page transitions and tab animations for a polished feel
- **Responsive Design**: Optimized for both mobile and desktop devices
- **Dynamic Loading**: Code-split components for optimal performance
- **Toast Notifications**: Beautiful, glassy toast notifications for user feedback
- **Virtualized Lists**: Efficient rendering of large member lists using react-window

### Technical Highlights

- **Type-Safe**: Built with TypeScript for better developer experience
- **Modern Stack**: Next.js 16, React 19, Tailwind CSS 4
- **State Management**: React Query for server state management
- **Custom Hooks**: Reusable hooks for media queries and form handling

## 📋 Prerequisites

- Node.js 18+
- npm or yarn package manager

## 🛠️ Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/ashish3010/PeopleConnect.git
   cd people-connect
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
people-connect/
├── api-res/              # Mock API response files
├── pages/                # Next.js pages (routes)
│   ├── _app.tsx         # App wrapper with providers
│   ├── _document.tsx     # Custom document
│   ├── index.tsx        # Get Started page
│   ├── signup.tsx       # Signup page
│   ├── otp.tsx          # OTP verification
│   ├── home.tsx         # Home dashboard
│   ├── edit-details.tsx # Edit profile
│   ├── group-info.tsx   # Group details
│   └── user-info.tsx    # User profile view
├── src/
│   ├── components/      # React components
│   │   ├── common/     # Reusable components
│   │   │   ├── Button/
│   │   │   ├── Toast/
│   │   │   ├── PageTransition/
│   │   │   └── ...
│   │   ├── home/       # Home page components
│   │   ├── signup/     # Signup components
│   │   ├── group-info/ # Group info components
│   │   └── user-info/  # User info components
│   ├── hooks/          # Custom React hooks
│   │   ├── useMedia.tsx    # Media query hook
│   │   └── use-signup.tsx  # Signup form hook
│   ├── mock/           # Mirage JS mock API server
│   │   ├── index.ts         # Server setup and config
│   │   ├── mirage.ts        # API routes definition
│   │   ├── req-handler/     # Request handler functions
│   │   │   └── auth.ts      # Auth endpoints
│   │   └── seeds/           # Mock database seed data
│   │       └── users.ts     # User seed data
│   └── Providers/      # Context providers
│       ├── react-query-provider.tsx
│       └── toast-provider.tsx
├── public/             # Static assets
│   └── images/         # Image assets
├── styles/             # Global styles
│   └── globals.css     # Global CSS with animations
└── package.json        # Dependencies and scripts
```

## 🎨 Key Components

### PageTransition

Smooth sliding animations for page transitions with support for forward/back navigation detection.

### Toast

Custom toast notification system with glassy design, multiple types (success, error, info, warning), and auto-dismiss functionality.

### AboutMe

User profile component with circular avatar, professional details, and social media links.

### Groups

Group listing with search, filters, and member management capabilities.

### GroupInfo

Detailed group view with virtualized member list, admin badges, and member actions.

## 🧩 Custom Hooks

### useMedia

Responsive design hook that detects device type (mobile/tablet/desktop) based on screen width.

```typescript
const { isMobile, isDesktop, isTablet, isReady } = useMedia();
```

### useSignup

Form handling hook for signup process with validation and state management.

## 🎯 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🎨 Styling

The project uses **Tailwind CSS 4** with custom CSS variables for theming:

- **Primary Colors**: Purple-based color scheme (`--primary: #6c2cf2`)
- **Backgrounds**: Main background, cards, and muted variants
- **Text Colors**: Primary, secondary, and muted text colors
- **Status Colors**: Success, warning, danger, and info colors

Custom animations are defined in `styles/globals.css`:

- `slideInFromRight` / `slideInFromLeft` - Page transition animations
- `slideOutToRight` / `slideOutToLeft` - Page exit animations

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file for environment-specific variables (if needed):

```env
# Add your environment variables here
```

### TypeScript

TypeScript configuration is in `tsconfig.json`. The project uses strict type checking.

### ESLint

ESLint configuration follows Next.js recommended settings in `eslint.config.mjs`.

## 📱 Responsive Design

The application uses a mobile-first approach:

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

Components are conditionally rendered based on device type using the `useMedia` hook.

## 🚦 State Management

- **React Query**: Server state management and caching
- **React Context**: Global toast notifications
- **Session Storage**: User data persistence across page refreshes
- **Local State**: Component-level state with React hooks

## 🎭 Mock API with Mirage JS

The application includes a **modular Mirage JS** setup for mock API during development.

### Architecture

```
src/mock/
├── index.ts         # Server setup & configuration
├── mirage.ts        # API routes (endpoints)
├── req-handler/     # Business logic for each API
│   └── auth.ts     # Authentication handlers
└── seeds/           # Mock database data
    └── users.ts    # Test users
```

### Features

✅ **Modular Design** - Separate files for routes, handlers, and data  
✅ **Easy Configuration** - Enable/disable in one place  
✅ **Realistic Data** - Seed data acts as a mock database  
✅ **Authentication** - Signup, login, OTP verification

### Configuration

Edit `src/mock/index.ts`:

```typescript
export const mirageConfig = {
  enabled: true, // Set false to disable mock server
  logging: true, // See requests in console
  timing: 400, // Response delay in ms
};
```

### Test Users

```
user@example.com   - John Doe (Member)
alice@example.com  - Alice Smith (Admin)
bob@example.com    - Bob Johnson (Member)
```

**Note:** Any 6-digit OTP works for testing

See [src/mock/README.md](./src/mock/README.md) for detailed documentation

## 🎭 Animations

- **Page Transitions**: Smooth sliding animations between pages
- **Tab Switching**: Animated tab content transitions
- **Toast Notifications**: Slide-in animations for notifications
- **Scrollbar Hiding**: Hidden scrollbars on mobile for cleaner UI

## 📝 Development Notes

### Dynamic Imports

Pages use dynamic imports for code splitting:

- Components are lazy-loaded based on device type
- Loading states show `CentralLoader` during component load

### Image Optimization

Uses Next.js `Image` component for optimized image loading with fallbacks.

### Virtualization

Large lists (like group members) use `react-window` for efficient rendering.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is private and proprietary.

## 👥 Authors

- Your Name - Initial work

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Tailwind CSS for the utility-first CSS framework
- React Query for server state management

---

**Note**: This is a work in progress. Some features may be under development.
