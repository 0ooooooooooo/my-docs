import fs from 'fs';
import path from 'path';

const menuIconMap = {
  'solarBattery': 'Solar&Battery',
  'heatPump': 'Heat Pump',
  'evCharger': 'EV charger',
  'smartHome': 'Smart home',
  'vehicle': 'Vehicle',
  'hemsController': 'HEMS Controller',
  'prices': 'Prices',
  'general': 'General',
  'energyDevice': 'Energy Device',
  'automaticStrategy': 'Automatic Strategy',
  'usageAnalysis': 'Usage Analysis',
  'endUser': 'End User',
  'installer': 'Installer',
};

const iconsDir = path.resolve('icons');
const output = path.resolve('icons/index.ts');

const files = fs
  .readdirSync(iconsDir)
  .filter((file) => file.endsWith('.tsx'))
  .filter((file) => file !== 'index.ts')
  .sort();

function toPascalCase(name) {
  return name
    .replace('.tsx', '')
    .split(/[-_ ]+/)
    .map(
      (word) =>
        word.charAt(0).toUpperCase() +
        word.slice(1),
    )
    .join('');
}

function toCamelCase(name) {
  const pascal = toPascalCase(name);

  return (
    pascal.charAt(0).toLowerCase() +
    pascal.slice(1)
  );
}

const imports = files.map((file) => {
  const fileName = file.replace('.tsx', '');
  const componentName = `${toPascalCase(file)}Icon`;

  return `import { ${componentName} } from './${fileName}';`;
});

const registry = files.map((file) => {
  const fileName = toCamelCase(file);
  const iconName = menuIconMap[fileName] || fileName;
  const componentName = `${toPascalCase(file)}Icon`;
  
  return `  '${iconName}': ${componentName},`;
});

const content = `
// AUTO GENERATED
// DO NOT EDIT

${imports.join('\n')}

export const icons = {
${registry.join('\n')}
} as const;
`;

fs.writeFileSync(output, content);

console.log(
  `Generated ${files.length} icons`
);