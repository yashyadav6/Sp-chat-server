const babel = require('@babel/core');
const fs = require('fs');
try {
  babel.transformSync(fs.readFileSync('src/App.tsx', 'utf8'), {
    presets: ['@babel/preset-typescript', ['@babel/preset-react', {runtime: 'automatic'}]],
    filename: 'src/App.tsx'
  });
  console.log("No syntax errors parsing JSX!");
} catch (e) {
  console.error("Syntax Error: ");
  console.error(e.message);
}
