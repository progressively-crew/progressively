import { cleanupDb } from './seed';

cleanupDb().then(() => {
  console.log('Cleanup finished');
});
