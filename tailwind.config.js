const { spacing, fontFamily } = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./components/**/*.{vue,js,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./composables/**/*.{js,ts}",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./assets/**/*.{css,scss}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Deep Ocean palette — dark mode
        ocean: {
          bg:       "#040d10",
          surface:  "#0a1a20",
          surface2: "#0f2430",
          border:   "rgba(45,212,191,0.2)",
        },
        // Light mode surface
        mist: {
          bg:      "#d0ede8",
          surface: "#ffffff",
          surface2:"#e8f7f4",
          border:  "rgba(13,148,136,0.22)",
        },
        teal: {
          400: "#2dd4bf",
          600: "#0d9488",
        },
        amber: {
          400: "#fbbf24",
          600: "#d97706",
        },
      },
      fontFamily: {
        heading: ["Space Grotesk", "Inter", ...fontFamily.sans],
        sans:    ["Inter", ...fontFamily.sans],
        mono:    ["JetBrains Mono", "Fira Code", "Courier New", "monospace"],
      },
      boxShadow: {
        teal:  "0 8px 32px rgba(45,212,191,0.15)",
        teal2: "0 20px 48px rgba(45,212,191,0.18)",
        card:  "0 2px 16px rgba(0,0,0,0.18)",
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme("colors.gray.700"),
            maxWidth: "none",
            a: {
              color: "#0d9488",
              textDecorationOffset: "3px",
              "&:hover": { color: "#d97706" },
              code: { color: "#0d9488" },
            },
            "h1,h2,h3,h4,h5,h6": {
              fontFamily: '"Space Grotesk", Inter, system-ui, sans-serif',
              "scroll-margin-top": spacing[28],
            },
            "h2,h3": { "scroll-margin-top": spacing[28] },
            code: {
              color: "#0d9488",
              backgroundColor: "rgba(13,148,136,0.08)",
              padding: "2px 6px",
              borderRadius: "4px",
              fontFamily: '"JetBrains Mono", monospace',
              fontWeight: "400",
              "&::before": { content: '""' },
              "&::after":  { content: '""' },
            },
            pre: {
              backgroundColor: "#0d1b2a",
              borderRadius: "12px",
              border: "1px solid rgba(45,212,191,0.15)",
              code: {
                color: "#e2e8f0",
                backgroundColor: "transparent",
                padding: "0",
                "&::before": { content: '""' },
                "&::after":  { content: '""' },
              },
            },
            blockquote: {
              borderLeftColor: "#0d9488",
              backgroundColor: "rgba(13,148,136,0.05)",
              borderRadius: "0 8px 8px 0",
              padding: "12px 20px",
              color: theme("colors.gray.600"),
              fontStyle: "normal",
              "p:first-of-type::before": { content: '""' },
              "p:last-of-type::after":   { content: '""' },
            },
            "ul li::marker": { color: "#0d9488" },
            "ol li::marker": { color: "#0d9488", fontWeight: "600" },
            hr: { borderColor: "rgba(13,148,136,0.2)" },
            table: { fontSize: "0.9em" },
            thead: {
              th: {
                color: "#0d9488",
                backgroundColor: "rgba(13,148,136,0.06)",
                borderBottomColor: "rgba(13,148,136,0.2)",
              },
            },
          },
        },
        dark: {
          css: {
            color: "#e2e8f0",
            a: {
              color: "#2dd4bf",
              "&:hover": { color: "#fbbf24" },
              code: { color: "#2dd4bf" },
            },
            "h1,h2,h3,h4,h5,h6": { color: "#e2e8f0" },
            code: {
              color: "#2dd4bf",
              backgroundColor: "rgba(45,212,191,0.1)",
              border: "1px solid rgba(45,212,191,0.2)",
            },
            pre: {
              backgroundColor: "#0d1b2a",
              border: "1px solid rgba(45,212,191,0.15)",
              code: {
                color: "#e2e8f0",
                backgroundColor: "transparent",
                border: "none",
              },
            },
            blockquote: {
              borderLeftColor: "#2dd4bf",
              backgroundColor: "rgba(45,212,191,0.05)",
              color: "#94a3b8",
            },
            "ul li::marker": { color: "#2dd4bf" },
            "ol li::marker": { color: "#2dd4bf" },
            hr:     { borderColor: "rgba(45,212,191,0.15)" },
            strong: { color: "#e2e8f0" },
            thead: {
              th: {
                color: "#2dd4bf",
                backgroundColor: "rgba(45,212,191,0.06)",
                borderBottomColor: "rgba(45,212,191,0.2)",
              },
            },
            tbody: {
              tr: { borderBottomColor: "rgba(45,212,191,0.1)" },
            },
          },
        },
      }),
    },
  },
  variants: {},
  plugins: [require("@tailwindcss/typography")],
};
