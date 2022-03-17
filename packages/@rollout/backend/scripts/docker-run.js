const { execSync } = require('child_process');

const database = (process.env.DATABASE || 'sqlite').toLocaleLowerCase();

function dockerRun() {
  console.log(`Running on ${database.toUpperCase()}`);
  execSync(`npm run db:gen:${database}-schema`, { stdio: 'inherit' });
  execSync('npm run db:migrate:dev && npm start', { stdio: 'inherit' });
}

dockerRun();
