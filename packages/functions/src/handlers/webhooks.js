import Koa from 'koa';
import cors from '@koa/cors';
import webhookRouter from '@functions/routes/webhooks';

const app = new Koa();
app.proxy = true;

app.use(cors());
app.use(webhookRouter.allowedMethods());
app.use(webhookRouter.routes());

export default app;
