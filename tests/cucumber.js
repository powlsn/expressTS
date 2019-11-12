const common = [
  '--require-module ts-node/register', // Load TypeScript module
  // !IMPORTANT! the used tsconfig.json must include
  //   "module": "commonjs",
  '--require ./step-definitions/**/*.ts',
  '--require ./features/**/*.ts',
].join(' ');

module.exports = {
  default: common,
};
