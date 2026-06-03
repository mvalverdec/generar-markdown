const { execFile } = require('child_process');
const { promisify } = require('util');
const path = require('path');
const fs = require('fs');

const execFileAsync = promisify(execFile);

const MARKITDOWN_BIN = '/Users/mvalverdec/.local/bin/markitdown';

async function convertFile(inputPath, outputPath) {
  const chalk = (await import('chalk')).default;

  const resolved = path.resolve(inputPath);
  if (!fs.existsSync(resolved)) {
    console.error(chalk.red(`Error: archivo no encontrado: ${resolved}`));
    process.exit(1);
  }

  const baseName = path.basename(resolved, path.extname(resolved));
  const outputFile = outputPath
    ? path.resolve(outputPath)
    : path.join(path.dirname(resolved), `${baseName}.md`);

  console.log(chalk.yellow(`Convirtiendo: ${path.basename(resolved)} ...`));

  try {
    const { stdout } = await execFileAsync(MARKITDOWN_BIN, [resolved]);
    fs.writeFileSync(outputFile, stdout, 'utf-8');
    console.log(chalk.green(`Archivo generado: ${outputFile}`));
  } catch (err) {
    console.error(chalk.red('Error al convertir el archivo:'));
    console.error(err.stderr || err.message);
    process.exit(1);
  }
}

module.exports = { convertFile };
