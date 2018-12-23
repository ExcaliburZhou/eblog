import Koa from 'koa';

const app = new Koa();

app.use(async (ctx) => {
  ctx.body = 'hello world';
  ctx.keys = ['i am wx', 'heheda'];
});

app.listen(3008);

