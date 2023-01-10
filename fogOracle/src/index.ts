import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import FogLayerRouter from './router/router.FogLayer';

const app: Application = express();
const PORT: number = 5000;
app.use(cors());
app.use(express.json());
app.use(FogLayerRouter);

app.get('/', async (req: Request, res: Response) => {
    res.send('Hello World!');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
