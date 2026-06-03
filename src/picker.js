const { input } = require('@inquirer/prompts');
const fs = require('fs');
const path = require('path');

const SUPPORTED_EXTENSIONS = ['.pdf', '.docx', '.doc', '.xlsx', '.xls', '.pptx', '.ppt'];

async function pickFile() {
  const chalk = (await import('chalk')).default;

  const filePath = await input({
    message: chalk.cyan('Ruta del archivo a convertir:'),
    validate: (value) => {
      const trimmed = value.trim();
      if (!trimmed) return 'Ingresa una ruta válida';

      const resolved = path.resolve(trimmed);
      if (!fs.existsSync(resolved)) return `Archivo no encontrado: ${resolved}`;

      const ext = path.extname(resolved).toLowerCase();
      if (!SUPPORTED_EXTENSIONS.includes(ext)) {
        return `Formato no soportado. Usa: ${SUPPORTED_EXTENSIONS.join(', ')}`;
      }

      return true;
    },
  });

  return path.resolve(filePath.trim());
}

module.exports = { pickFile, SUPPORTED_EXTENSIONS };
