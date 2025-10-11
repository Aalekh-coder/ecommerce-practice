import { CLIENT_URL } from "./env.js"

const corsConfig = {
    origin: CLIENT_URL,
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: [
        "Content-Type",
        "Authorization",
        "Cache-Control",
        "Expires",
        "Pragma"
    ],
    credentials: true
}

export default corsConfig
