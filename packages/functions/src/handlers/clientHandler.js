import Koa from 'koa';
import cors from '@koa/cors';
import clientRouter from '../routes/clientApi';

const app = new Koa();
app.proxy = true;

app.use(cors());
app.use(clientRouter.allowedMethods());
app.use(clientRouter.routes());

export default app;
