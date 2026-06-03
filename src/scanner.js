const fs = require('fs');
const path = require('path');
const { SUPPORTED_EXTENSIONS } = require('./picker');

const ENTRADA_DIR = path.resolve(__dirname, '..', 'entrada');

function scanEntrada() {
  if (!fs.existsSync(ENTRADA_DIR)) {
    console.error(`La carpeta ./entrada no existe: ${ENTRADA_DIR}`);
    return [];
  }

  const files = fs.readdirSync(ENTRADA_DIR)
    .filter(f => SUPPORTED_EXTENSIONS.includes(path.extname(f).toLowerCase()))
    .map(f => path.join(ENTRADA_DIR, f));

  if (files.length === 0) {
    console.error(`No se encontraron archivos soportados en ./entrada`);
    console.error(`Formatos válidos: ${SUPPORTED_EXTENSIONS.join(', ')}`);
  }

  return files;
}

module.exports = { scanEntrada };
