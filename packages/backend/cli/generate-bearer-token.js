/**
 * This is a command that helps generating a bearer token for usage with Swagger
 * Instead of opening a web ui, getting a token from the headers, you can generate one directly form here
 * and paste in the Swagger UI.
 */
const prompts = require('prompts');
const request = require('supertest');

const endpoint = process.env.BACKEND_ENDPOINT || 'http://localhost:4000';
const getToken = async (username, password) => {
  try {
    const body = await request(endpoint).post('/auth/login').send({
      username,
      password,
    });

    return JSON.parse(body.text).access_token;
  } catch (e) {
    printError();
  }
};

const printError = () => {
  console.log(`
  
  Oops! User not found on ${endpoint}
        
  On a side note, remember that by default the generation runs against port 4000. If you want to run on another port, make sure to run BACKEND_ENDPOINT=http://localhost:5000 npm run gen:bearer
            `);
};

const printToken = (token) => {
  console.log(`
  The token has been generated, you can now copy it and paste it in the swagger UI:
  
${token}

  `);
};

const users = [
  {
    title: 'Marvin',
    email: 'marvin.frachet@gmail.com',
    description: 'Admin of project id 1',
    value: 'marvin',
    password: 'password',
  },
  {
    title: 'John',
    description: 'Member of project id 1',
    value: 'john',
    password: 'password',
    email: 'john.doe@gmail.com',
  },
  {
    title: 'Jane',
    description: 'Does not belong to a project',
    value: 'jane',
    password: 'password',
    email: 'jane.doe@gmail.com',
  },
  {
    title: 'Without fullname',
    email: 'without.fullname@gmail.com',
    description: 'No projects, invited by email',
    value: 'withoutPassword',
    password: 'password',
  },
  {
    title: 'Other',
    description: 'I want to fill the credentials myself',
    value: 'other',
    password: 'password',
  },
];

(async () => {
  const { user } = await prompts({
    type: 'select',
    name: 'user',
    message: 'Choose a user :)',
    choices: users,
    initial: 0,
  });

  if (user === 'other') {
    const { email } = await prompts({
      type: 'text',
      name: 'email',
      message: "Type the user's email",
    });

    const { password } = await prompts({
      type: 'password',
      name: 'password',
      message: "Type the user's password",
    });

    const token = await getToken(email, password);
    if (token) {
      printToken(token);
    } else {
      printError();
    }
  } else {
    const actualUser = users.find(
      (u) => u.title.toLowerCase() === user.toLowerCase(),
    );

    const token = await getToken(actualUser.email, actualUser.password);
    printToken(token);
  }
})();
