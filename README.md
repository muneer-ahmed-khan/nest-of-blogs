# Nest of Blogs

Nest of Blogs is a dynamic blogging platform built using Nuxt.js, designed to provide an intuitive user experience for reading blog posts. The platform leverages modern web technologies for a responsive, fast, and scalable application.

## Features

- **List of Blogs**: Displays all blogs stored in the `content` directory in markdown format.
- **Dynamic Blog View**: Each blog has a dedicated dynamic page for detailed reading.
- **Topic Filtering**: Users can select a topic from the dropdown menu in the navbar to filter blogs.
- **Dark Mode Support**: Toggle between light and dark themes for a comfortable reading experience.
- **Google Sign-In**: Users can sign in with Google to comment on and like blogs.
- **Firebase Integration**: Connected to Firebase for user authentication, comment management, and likes.
- **Deployed on Vercel**: Accessible at [nest-of-blogs.vercel.app](https://nest-of-blogs.vercel.app/).

## Technology Stack

The project utilizes the following technologies and tools:

- **Nuxt.js**: A powerful Vue.js framework for building server-side rendered applications.
- **TypeScript**: Ensures robust and type-safe code.
- **Tailwind CSS**: A utility-first CSS framework for custom styling.
- **Markdown**: Content written in markdown is seamlessly rendered into HTML.
- **Firebase**: Used for authentication, comments, and likes functionality.
- **Vercel**: Deployed using Vercel for fast, reliable hosting.

## Environment Variables

To run this project locally, you will need to set up Firebase configuration and other environment variables. Here's how you can do that:

1. Create a `.env` file in the root of the project.

2. Add the following environment variables to your `.env` file:

```plaintext
# Public Variables (Accessible on Client-Side)
NUXT_PUBLIC_FIREBASE_API_KEY=<your-firebase-api-key>
NUXT_PUBLIC_FIREBASE_AUTH_DOMAIN=<your-firebase-auth-domain>
NUXT_PUBLIC_FIREBASE_PROJECT_ID=<your-firebase-project-id>
NUXT_PUBLIC_FIREBASE_STORAGE_BUCKET=<your-firebase-storage-bucket>
NUXT_PUBLIC_FIREBASE_SENDER_ID=<your-firebase-sender-id>
NUXT_PUBLIC_FIREBASE_APP_ID=<your-firebase-app-id>
NUXT_PUBLIC_FIREBASE_MEASUREMENT_ID=<your-firebase-measurement-id>

# Private Variables (Server-Side Only)
FIREBASE_CLIENT_EMAIL=<your-firebase-client-email>
FIREBASE_PRIVATE_KEY=<your-firebase-private-key>
FIREBASE_PROJECT_ID=<your-firebase-project-id>
```

3. Replace the placeholder values with your actual Firebase project details.

**Note**: Make sure your `.env` file is **not committed to version control** to keep your private keys secure.

## Installation

Follow these steps to set up the project locally:

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/muneer-ahmed-khan/nest-of-blogs.git
   cd nest-of-blogs
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Start Development Server**:
   ```bash
   npm run dev
   ```
   The development server will start at `http://localhost:3000`.

4. **Build for Production**:
   ```bash
   npm run build
   ```

5. **Preview the Production Build**:
   ```bash
   npm run preview
   ```

## Project Structure

Here's an overview of the project's directory structure:

```
├── assets/        # Uncompiled assets (e.g., CSS, images)
├── components/    # Vue.js components
├── composables/   # Reusable state and logic management functions
├── content/       # Blog content written in markdown
├── pages/         # Application routes
├── plugins/       # Plugins for extending Nuxt.js functionality
├── public/        # Static files served directly
├── server/        # API endpoints and server-side code
├── store/         # Vuex state management files
├── utils/         # Utility functions
└── nuxt.config.ts # Nuxt.js configuration file
```

## Deployment

The application is deployed on Vercel. You can access the live version [here](https://nest-of-blogs.vercel.app/).

## Contributing

Contributions are welcome! Follow these steps to contribute:

1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Commit your changes and push the branch.
4. Submit a pull request with a detailed description of your changes.

## License

This project is licensed under the [MIT License](LICENSE).

---

**Author:** Muneer Ahmed

Feel free to reach out for any questions or collaboration opportunities!