module.exports = {
    plugins: [
        require("tailwindcss"),
        require("nativewind/postcss")({
          output: "nativewind-output.js",
        }),
    ],

    };