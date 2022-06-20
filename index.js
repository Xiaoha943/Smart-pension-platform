const koa =require('koa');
const bodyParser = require('koa-bodyparser');
const authenticate=require('./middlewares/cookies');
const path=require('path');
const render=require('koa-ejs')
const postRouter=require('./routes/post');
const userRouter=require('./routes/user');
const adminRouter=require('./routes/admin')
const static =require('koa-static');


const app=new koa();
app.keys=['jkshdjkhkjnklzoiop'];
app.use(bodyParser());
app.use(authenticate);
render(app,{
    root:'./templates',//静态文件托管
    layout:false,
    viewExt:'ejs'
});

app.use(static(__dirname+'/static'))

app.use(adminRouter.routes()).use(adminRouter.allowedMethods());
app.use(userRouter.routes()).use(userRouter.allowedMethods());
app.use(postRouter.routes()).use(postRouter.allowedMethods());
//视图渲染设置
app.listen(9998,()=>{
    console.log('http://localhost:9998 服务器已启动')
})