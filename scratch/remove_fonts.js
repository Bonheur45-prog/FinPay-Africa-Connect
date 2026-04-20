const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else {
      if (file.endsWith('.css') || file.endsWith('.jsx')) {
        results.push(file);
      }
    }
  });
  return results;
}

const files = walk('c:/Users/mario/OneDrive/Desktop/FinPay-Africa/src');
let changedCount = 0;

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;

  if (file.endsWith('.css')) {
     content = content.replace(/^[ \t]*font-family:.*$/gm, '');
  } else if (file.endsWith('.jsx')) {
     content = content.replace(/fontFamily:\s*['"][^'"]+['"][ \t]*,?/g, '');
  }

  if (content !== original) {
    fs.writeFileSync(file, content);
    changedCount++;
  }
});

console.log(`Cleaned font-family from ${changedCount} files.`);
