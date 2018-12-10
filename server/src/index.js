import Koa from 'koa';

const app = new Koa();

app.use(async (ctx) => {
  ctx.body = 'hello world';
  ctx.keys = ['i am wx', 'heheda'];
  console.log(new Date);
  console.log(ctx.ip);
});

app.listen(3008);
