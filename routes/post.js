const Router = require('koa-router');
const postServices = require('../services/post');
const router = new Router();
const userServices = require('../services/user');
const multer = require('koa-multer');//加载koa-multer模块
//图片路径
var storage = multer.diskStorage({
  //文件保存路径
  destination: function (req, file, cb) {
    cb(null, 'static/picture/')
  },
  //修改文件名称
  filename: function (req, file, cb) {
    var fileFormat = (file.originalname).split(".");
    cb(null, Date.now() + "." + fileFormat[fileFormat.length - 1]);
  }
})
//加载配置
var picture = multer({ storage: storage });

//首页文章列表页面
router.get('/index', async (ctx) => {
  const list = await postServices.list();
  const list1 = await postServices.list1();
  const list2 = await postServices.list2();
  const list3 = await postServices.list3();
  const flag = ctx.cookies.get('flag');
  const myId = ctx.cookies.get('uid');
  const username = await postServices.username(myId);
  const qx = await postServices.findQx(myId);
  await ctx.render('index', {
    list: list,
    list1: list1,
    list2: list2,
    list3: list3,
    qx: qx,
    username: username,
    flag: flag
  })
});


router.get('/', async (ctx) => {
  ctx.redirect('/index');
});
router.get('/main', async (ctx) => {
  ctx.redirect('/main/1');
});

router.get('/main/1', async (ctx) => {
  let data =await postServices.goodsList(1);
  const flag = ctx.cookies.get('flag');
  const myId = ctx.cookies.get('uid');
  const username = await postServices.username(myId);
  const qx = await postServices.findQx(myId);
  const type =await postServices.type();
  const sum =await postServices.goodSum(myId);
  await ctx.render('main', {
    data:data,
    qx: qx,
    username: username,
    flag: flag,
    type:type,
    sum:sum
  })
});

router.get('/main/:item', async (ctx) => {
  let tid = ctx.params.item;
  let data =await postServices.goodsList(tid);
  const flag = ctx.cookies.get('flag');
  const myId = ctx.cookies.get('uid');
  const username = await postServices.username(myId);
  const qx = await postServices.findQx(myId);
  const type =await postServices.type();
  const sum =await postServices.goodSum(myId);
  await ctx.render('main', {
    data:data,
    qx: qx,
    username: username,
    flag: flag,
    type:type,
    sum:sum
  })

});
//购物车页面
router.get('/shopcar',async (ctx)=>{
  const flag = ctx.cookies.get('flag');
  const myId = ctx.cookies.get('uid');
  const username = await postServices.username(myId);
  const qx = await postServices.findQx(myId);
  const data =await postServices.shopCarList(myId);
  const allSum =await postServices.allSum(myId);
  await ctx.render('shopcar',{
    flag:flag,
    data:data,
    qx: qx,
    username: username,
    allSum:allSum
  });
});
//订单页面
router.get('/order',async(ctx)=>{
  const flag=ctx.cookies.get('flag');
  const myId =ctx.cookies.get('uid');
  const username =await postServices.username(myId);
  const qx = await postServices.findQx(myId);
  const data =await postServices.orderList(myId);
  console.log(1232);
  await ctx.render('order',{
    flag:flag,
    data:data,
    qx: qx,
    username: username
  })

})

//添加商品进入购物车
router.get('/addGoods/:item',async(ctx)=>{
  const gid =ctx.params.item;
  const uid = ctx.cookies.get('uid');
  const result =await postServices.addGoods(uid,gid);
  ctx.redirect('/shopcar')
});

//删除购物车商品的数量
router.get('/deleteGoods/:item',async(ctx)=>{
  const gid =ctx.params.item;
  const uid = ctx.cookies.get('uid');
  const result =await postServices.deleteGoods(uid,gid);
  ctx.redirect('/shopcar')
});
//减少购物车商品数量
router.get('/reduceGoods/:item',async(ctx)=>{
  const gid =ctx.params.item;
  const uid = ctx.cookies.get('uid');
  const result =await postServices.reduceGoods(uid,gid);
  ctx.redirect('/shopcar')
});

//进行模糊查询查找商品
router.post('/main/:item',async(ctx)=>{
  const {gname} =ctx.request.body;
  const data =await postServices.search(gname)
  const flag = ctx.cookies.get('flag');
  const myId = ctx.cookies.get('uid');
  const username = await postServices.username(myId);
  const qx = await postServices.findQx(myId);
  const type =await postServices.type();
  const sum =await postServices.goodSum(myId);
  await ctx.render('main', {
    data:data,
    qx: qx,
    username: username,
    flag: flag,
    type:type,
    sum:sum
  })

});
module.exports = router;