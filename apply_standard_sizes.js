import fs from 'fs';
import path from 'path';

const SRC_DIR = './src';
const CSS_PATH = './src/index.css';

const closestStandardSize = (val) => {
    const v = parseFloat(val.replace('-', '.'));
    const standards = [
        { name: 'xs', px: 12 },
        { name: 'sm', px: 14 },
        { name: 'base', px: 16 },
        { name: 'lg', px: 18 },
        { name: 'xl', px: 20 },
        { name: '2xl', px: 24 },
        { name: '3xl', px: 30 },
        { name: '4xl', px: 36 },
        { name: '5xl', px: 48 },
        { name: '6xl', px: 60 },
        { name: '7xl', px: 72 },
        { name: '8xl', px: 96 },
        { name: '9xl', px: 128 },
    ];
    
    let closest = standards[0];
    let minDiff = Math.abs(v - standards[0].px);
    
    for (const std of standards) {
        const diff = Math.abs(v - std.px);
        if (diff < minDiff) {
            closest = std;
            minDiff = diff;
        }
    }
    return closest.name;
};

let changedFiles = 0;

function processFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    let changed = false;

    // Match both text-[Xpx] and text-X formats
    // We only want to match specific known generated sizes so we don't accidentally match colors.
    // However, our generated sizes are just digits.
    // Prefix can be md:, hover:, etc.
    const regex1 = /([a-zA-Z0-9\-:]*)text-\[((?:\d+)(?:\.\d+)?)px\]/g;
    const regex2 = /([a-zA-Z0-9\-:]*)text-(\d+(?:-\d+)?)(?![a-zA-Z0-9\-])/g;

    content = content.replace(regex1, (match, prefix, val) => {
        changed = true;
        return `${prefix}text-${closestStandardSize(val)}`;
    });

    content = content.replace(regex2, (match, prefix, val) => {
        // Skip actual tailwind classes that are already numbers? Wait, Tailwind doesn't have text-13
        // If it's a color like text-300, wait, colors are like text-gray-300.
        // We ensure there's no - after. text-13 is what we want.
        // What about opacity? text-opacity-50. The prefix would be text-opacity-, and val would be 50.
        // Wait, text-opacity is matched because prefix captures 'text-opacity-', then 'text-' is missing? No, the regex says `text-` explicitly.
        // So `text-opacity-50` would be matched by prefix=`text-opacity-`? No, because it looks for `text-` explicitly.
        // Wait: `text-opacity-50` -> `([a-zA-Z0-9\-:]*)text-(\d+(?:-\d+)?)(?![a-zA-Z0-9\-])`.
        // If the string is `text-opacity-50`, it would match `([a-zA-Z0-9\-:]*)text-(\d+)`. 
        // Prefix could be empty, and match `text-` but then `opacity-` is not a number.
        // What if the string is `bg-red-500 text-50`? It matches `text-50`.
        // What if `text-gray-900`? `gray` is not a number.
        // So regex2 only matches `text-` followed immediately by numbers.
        // THIS IS EXACTLY WHAT WE WANT! It avoids text-gray-900.
        
        // Wait, what if the user wrote `text-sm`? `sm` is not a number. So regex2 skips it.
        changed = true;
        return `${prefix}text-${closestStandardSize(val)}`;
    });

    if (changed) {
        fs.writeFileSync(filePath, content, 'utf8');
        changedFiles++;
        console.log(`Updated: ${filePath}`);
    }
}

function walkDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            walkDir(fullPath);
        } else if (fullPath.endsWith('.jsx') || fullPath.endsWith('.js')) {
            processFile(fullPath);
        }
    }
}

walkDir(SRC_DIR);
console.log(`Replaced custom sizes with standard names in ${changedFiles} files.`);

// Now remove the @theme block from index.css
let cssContent = fs.readFileSync(CSS_PATH, 'utf8');
// The theme block we injected looks like @theme { \n  --text-X: Ypx; \n }
const themeRegex = /@theme\s*\{[\s\S]*?\}/;
if (cssContent.match(themeRegex)) {
    cssContent = cssContent.replace(themeRegex, '');
    fs.writeFileSync(CSS_PATH, cssContent, 'utf8');
    console.log('Cleaned up index.css');
}

