#!/usr/bin/env node

const { program } = require('commander');
const { convertFile } = require('./converter');
const { pickFile } = require('./picker');

program
  .name('generar-markdown')
  .description('Convierte archivos PDF, Word, Excel y PPTX a Markdown usando MarkitDown')
  .version('1.0.0');

program
  .command('convert [filepath]')
  .alias('c')
  .description('Convierte un archivo a Markdown')
  .option('-o, --output <path>', 'Ruta de salida del archivo .md')
  .action(async (filepath, options) => {
    const targetFile = filepath || (await pickFile());
    if (!targetFile) process.exit(0);
    await convertFile(targetFile, options.output);
  });

program
  .action(async () => {
    const targetFile = await pickFile();
    if (!targetFile) process.exit(0);
    await convertFile(targetFile);
  });

program.parse();
