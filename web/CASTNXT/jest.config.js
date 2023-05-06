module.exports = {
    roots: [
        "spec/javascript"
    ],
    testEnvironment: "jsdom",
    testPathIgnorePatterns: [
        "<rootDir>/spec/javascript/__mocks__",
        "<rootDir>/spec/javascript/__utils__",
        "<rootDir>/node_modules"
    ],
    preset: 'ts-jest',
    transform: {
        '^.+\\.(ts|tsx)?$': 'ts-jest',
        "^.+\\.(js|jsx)$": "babel-jest",
    },
    moduleNameMapper: {
        "\\.(jpg|ico|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/spec/javascript/__mocks__/file.mock.js",
        "\\.(css|less|scss|sss|styl)$": "<rootDir>/node_modules/jest-css-modules"
    },
    globals: {
        "window": {}
    }
  };