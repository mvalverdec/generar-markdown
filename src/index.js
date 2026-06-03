#!/usr/bin/env node

const { program } = require('commander');
const { convertFile } = require('./converter');
const { pickFile } = require('./picker');
const { scanEntrada } = require('./scanner');

program
  .name('generar-markdown')
  .description('Convierte archivos PDF, Word, Excel y PPTX a Markdown usando MarkitDown')
  .version('1.0.0');

program
  .command('convert [filepath]')
  .alias('c')
  .description('Convierte un archivo a Markdown. Sin argumentos, procesa todos los archivos de ./entrada')
  .option('-o, --output <path>', 'Ruta de salida del archivo .md (solo aplica si se pasa un archivo)')
  .action(async (filepath, options) => {
    if (filepath) {
      await convertFile(filepath, options.output);
      return;
    }

    const files = scanEntrada();
    if (files.length === 0) process.exit(0);
    for (const file of files) {
      await convertFile(file);
    }
  });

program
  .action(async () => {
    const targetFile = await pickFile();
    if (!targetFile) process.exit(0);
    await convertFile(targetFile);
  });

program.parse();
