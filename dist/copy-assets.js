const fs = require('fs');
const path = require('path');

const distDir = path.join(__dirname, 'dist');

// Função para copiar recursivamente
function copyRecursiveSync(src, dest) {
  const exists = fs.existsSync(src);
  const stats = exists && fs.statSync(src);
  const isDirectory = exists && stats.isDirectory();
  
  if (isDirectory) {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }
    fs.readdirSync(src).forEach(childItemName => {
      copyRecursiveSync(
        path.join(src, childItemName),
        path.join(dest, childItemName)
      );
    });
  } else {
    const destDir = path.dirname(dest);
    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true });
    }
    fs.copyFileSync(src, dest);
  }
}

// Arquivos e pastas para copiar
const toCopy = [
  // Arquivos JS na raiz
  '*.js',
  // Arquivos CSS na raiz
  '*.css',
  // Arquivos JSON na raiz
  '*.json',
  // Arquivos de fonte na raiz
  '*.ttf',
  '*.eot',
  '*.svg',
  '*.woff',
  '*.woff2',
  // Pastas
  'css',
  'js',
  'fonts',
  'icon',
  'patterns',
  'psalms',
  'vulgate',
  'aelf',
  'gabc',
];

// Copiar cada item
toCopy.forEach(item => {
  const srcPath = path.join(__dirname, item);
  const destPath = path.join(distDir, item.replace('*.', ''));
  
  if (item.includes('*')) {
    // É um padrão glob, listar arquivos
    const dir = path.dirname(srcPath);
    const pattern = path.basename(srcPath);
    const ext = pattern.replace('*', '');
    
    if (fs.existsSync(dir)) {
      const files = fs.readdirSync(dir).filter(f => f.endsWith(ext));
      files.forEach(file => {
        const src = path.join(dir, file);
        const dest = path.join(distDir, file);
        if (fs.existsSync(src)) {
          fs.copyFileSync(src, dest);
        }
      });
    }
  } else {
    // É uma pasta ou arquivo
    if (fs.existsSync(srcPath)) {
      copyRecursiveSync(srcPath, destPath);
    }
  }
});

console.log('Assets copied successfully!');

