const dotenv = require('dotenv');
dotenv.config({ path: './.env' });

const app = require('./app');
const port = process.env.PORT || 4000;

//Comment out local DB when ready to push to github
//Uncomment Live DB when ready to push to github
const connectDB = require('./db/dbConnect');
const startSever = async () => {
  const DB = process.env.DATABASE_LOCAL;
  try {
    await connectDB(DB);
    app.listen(
      port,
      console.log(`App is running on port ${port} and DB connection successful`)
    );
  } catch (error) {
    console.log('Database connection failed', error);
  }
};

startSever();
