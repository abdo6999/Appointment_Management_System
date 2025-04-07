import express, { Request, Response } from 'express';
import cors from 'cors';
import routes from './router/router';

const app = express();

app.use(express.json())

const port: number = 3000;


app.use(cors());


app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to the Express API');
});



app.use('/api', routes);


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});