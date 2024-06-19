const { exec } = require('child_process');

// Ejecuta el comando de Tailwind CSS
exec('npm run start-tailwind', (err, stdout, stderr) => {
  if (err) {
    console.error(`Error al ejecutar Tailwind CSS: ${stderr}`);
    process.exit(1);
  }
  console.log(`Tailwind CSS output: ${stdout}`);

  // Una vez que Tailwind CSS ha terminado, ejecuta el build de Angular
  exec('build:dev', (err, stdout, stderr) => {
    if (err) {
      console.error(`Error al ejecutar Angular build: ${stderr}`);
      process.exit(1);
    }
    console.log(`Angular build output: ${stdout}`);
  });
});
