/** @type {import('next').NextConfig} */
const nextConfig = {}

const withTM = require("next-transpile-modules")(["bcrypt"]);

module.exports = withTM();

module.exports = nextConfig
