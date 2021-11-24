module.exports = {
  preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
  testMatch: [
    '**/tests/integration/**/*.test.[jt]s?(x)',
    '**/tests/unit/**/*.test.[jt]s?(x)'
  ],
};
