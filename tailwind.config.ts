import type { Config } from "tailwindcss"

const config: Config = {
    content: [
        "./src/**/*.{js,ts,jsx,tsx}",
        "./app/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}"
    ],
    theme: {
        extend: {
            colors: {
                background: "#f5f1e8",
                primary: "#4b2e1f",
                secondary: "#7a4c2f",
                accent: "#d8b89c",
                card: "rgba(255,255,255,0.7)",
                border: "rgba(75, 46, 31, 0.1)", // derived from primary
                foreground: "#4b2e1f",
                muted: "#e3dacc",
                "muted-foreground": "#7a4c2f"
            },
            backgroundImage: {
                'radial-glow': 'radial-gradient(circle at top, rgba(216, 184, 156, 0.4) 0%, transparent 60%)',
                'vignette': 'radial-gradient(circle, transparent 50%, rgba(75, 46, 31, 0.05) 150%)',
            },
            animation: {
                float: "float 6s ease-in-out infinite",
                "float-delayed": "float 6s ease-in-out 3s infinite",
                lift: "lift 0.3s ease-out forwards",
            },
            keyframes: {
                float: {
                    "0%, 100%": { transform: "translateY(0) scale(1) rotate(0deg)" },
                    "50%": { transform: "translateY(-15px) scale(1.02) rotate(2deg)" }
                },
                lift: {
                    "0%": { transform: "translateY(0) scale(1)", boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)" },
                    "100%": { transform: "translateY(-8px) scale(1.02)", boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }
                }
            }
        }
    },
    plugins: []
}

export default config
