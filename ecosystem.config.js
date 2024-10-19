module.exports = {
    apps: [
        {
            name: "backend",
            script: "pnpm",
            args: "run dev",
            cwd: "./backend",
        },
        {
            name: "frontend",
            script: "pnpm",
            args: "run dev",
            cwd: "./frontend",
        },
    ],
};