const fs = require('fs');

const files = [
  'src/components/AboutUsPage/AboutHero.jsx',
  'src/components/AboutUsPage/CallToAction.jsx',
  'src/components/AboutUsPage/CompanyOverview.jsx',
  'src/components/AboutUsPage/CoreStrengths.jsx',
  'src/components/AboutUsPage/MissionVision.jsx',
  'src/components/AboutUsPage/StatsAchievements.jsx',
  'src/components/AboutUsPage/Timeline.jsx',
  'src/components/AboutUsPage/TrustIndicators.jsx',
  'src/pages/AboutUsPage.jsx'
];

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  
  content = content.replace(/import ['"]\.\/([^'"]+)\.css['"];/g, "import styles from './$1.module.css';");

  content = content.replace(/className="([^"]+)"/g, (match, classes) => {
    // If it's empty
    if(!classes.trim()) return match;
    const classArray = classes.split(' ').filter(c => c);
    if (classArray.length === 1) {
      if(classes.includes('{') || classes.includes('$')) return match;
      return `className={styles["${classes}"]}`;
    } else {
      const formattedClasses = classArray.map(c => `\${styles["${c}"]}`).join(' ');
      return `className={\`${formattedClasses}\`}`;
    }
  });
  
  fs.writeFileSync(file, content);
});
console.log('Replacement complete.');
