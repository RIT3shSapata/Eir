import express, { Application, Request, Response } from 'express';
import CloudLayerRouter from './router/router.cloudLayer';
import cors from 'cors';

const app: Application = express();
const PORT: number = 5500;
app.use(cors());

app.use(express.json());
app.use(CloudLayerRouter);

app.get('/', async (req: Request, res: Response) => {
    res.send('Hello World!');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
