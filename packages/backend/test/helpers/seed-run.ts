import { seedDb } from './seed';

seedDb().then(() => {
  console.log('Seed finished');
});
