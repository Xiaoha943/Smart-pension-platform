const koa =require('koa');
const Router=require('koa-router');
let router =new Router();
let userServices=require('../services/user')


router.get('/login',async(ctx)=>{
  await  ctx.render('login');
});
router.post('/login',async(ctx)=>{
    const data =ctx.request.body;
    if(!data.username||!data.password){
        ctx.throw(400,'数据不能为空');
    }
    let flag =await userServices.login(data.username,data.password);
    //获取cookies值的用户数据
    let userId=await userServices.findIdByUname(data.username);

    if(flag===1){
        ctx.cookies.set('flag',1,{
            signed:true,
            httpOnly:true,
            maxAge:24*3600*100    
        });
        ctx.cookies.set('uid',userId,{
            signed:true,
            httpOnly:true,
            maxAge:24*3600*100    
        });
        ctx.redirect('/index')
    }else if(flag==2){
        ctx.throw(400,'密码错误')
    }else if(flag==3){
        ctx.throw(400,'账号不存在')
    }
});

// 注册
router.get('/register', async (ctx) => {
    await ctx.render('login')
});
router.post('/register', async (ctx) => {
    let { username, password ,tel,address} = ctx.request.body;
    console.log( { username, password ,tel,address})
    if (!username || !password ||!tel ||!address) {
        throw (400, '错')
    }
    let result = await userServices.register(username, password,tel,address);
    if (result == true) {
        ctx.redirect('/login');
        console.log('成功')
    }
})

//退出登录
router.get('/logout',(ctx)=>{
    ctx.cookies.set('flag',0,{
          signed:true,
          // httpOnly:true,
          maxAge:-1
      })
      //清除cookies值
     let uid =ctx.cookies.get('uid');
     ctx.cookies.set('uid',uid,{
        signed:true,
        // httpOnly:true,
        maxAge:-1
    })
      ctx.redirect('/index','退出成功');
  });

module.exports=router;