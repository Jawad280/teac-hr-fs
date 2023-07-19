/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [
            "res.cloudinary.com"
        ]
    }
}

const withTM = require("next-transpile-modules")(["bcrypt"]);

module.exports = withTM();

module.exports = nextConfig
