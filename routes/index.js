import expenseTrackerRoutes from './expenseTracker.js'; 
import path from 'path';

const constructorMethod = (app) => {
  app.use('/', expenseTrackerRoutes);
  app.use('*', (req, res) => {res.redirect('/');}); 
};

export default constructorMethod;
