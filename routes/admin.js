const Router = require('koa-router');
const adminServices = require('../services/admin');
const router = new Router();
const postServices = require('../services/post');
const userServices = require('../services/user');
// const multer = require('koa-multer');//加载koa-multer模块

//渲染后台
router.get('/admin', async (ctx) => {
    await ctx.render('admin', {

    })
});
//添加用户
router.get('/adduser', async (ctx) => {
    await ctx.render('adduser', {

    });
});
router.post('/adduser', async (ctx) => {
    let { username, password, tel, address } = ctx.request.body;
    console.log({ username, password, tel, address })
    if (!username || !password || !tel || !address) {
        throw (400, '错')
    }
    let result = await userServices.register(username, password, tel, address);
    if (result == true) {
        ctx.redirect('/adduser');
        console.log('成功')
    }
});
//删除用户
router.get('/deleteuser', async (ctx) => {
    const data = await adminServices.selectUser();
    await ctx.render('deleteuser', {
        data: data
    });
});
// 删除
router.get('/deleteuser/:item', async (ctx) => {
    const uid = ctx.params.item;
    const result = await adminServices.deleteUser(uid);
    ctx.redirect('/deleteuser')
});

//查看用户
router.get('/selectuser', async (ctx) => {
    const data = await adminServices.selectUser();
    await ctx.render('selectuser', {
        data: data
    })
});
//更新用户
router.get('/updateuser', async (ctx) => {
    const data = await adminServices.selectUser();
    await ctx.render('updateuser', {
        data: data

    })
});

//更新提交用户信息
router.get('/updateuser/:item', async (ctx) => {
    const uid = ctx.params.item;
    const data = await adminServices.updateUser1(uid);
    await ctx.render('updateput', {
        data: data

    })
});

router.post('/updateuser/:item', async (ctx) => {
    let { username, password, tel, address, qx,uid} = ctx.request.body;
    let result = await adminServices.updateUser(username, password, tel, address, qx,uid);
    if (result == true) {
        ctx.redirect('/updateuser');
    }
});



// 增加商品信息
router.get('/addgoods', async (ctx) => {
    await ctx.render('/addgoods');
})

router.post('/addgoods', async (ctx) => {
    let { gname, price, vprice, img, des, tid } = ctx.request.body;
    let result = await adminServices.addgoods(gname, price, vprice, img, des, tid);
    if (result == true) {
        ctx.redirect('/addgoods');
        console.log('成功');
    }
});

//查看商品信息
router.get('/selectGoods', async (ctx) => {
    const data = await adminServices.selectGoods();
    await ctx.render('selectGoods', {
        data: data
    })
});

//更新商品信息
router.get('/updateGoods', async (ctx) => {
    const data = await adminServices.selectGoods();
    await ctx.render('updateGoods', {
        data: data
    })
});


// 更新提交商品信息
router.get('/updateGoods/:item', async (ctx) => {
    const gid = ctx.params.item;
    const data = await adminServices.updateGoods1(gid);
    await ctx.render('updateGput', {
        data: data

    })
});

router.post('/updateGoods/:item', async (ctx) => {
    let {gname,price,vprice,img,des,tid,gid} = ctx.request.body;
    let result = await adminServices.updateGoods(gname,price,vprice,img,des,tid,gid);
    console.log(result);
    if (result == true) {
        ctx.redirect('/updateGoods');
    }
});

//删除商品信息
router.get('/deleteGoods', async (ctx) => {
    const data = await adminServices.selectGoods();
    await ctx.render('deleteGoods', {
        data: data
    });
});

// 删除商品信息
router.get('/deleteGoods/:item', async (ctx) => {
    const gid = ctx.params.item;
    const result = await adminServices.deleteGoods(gid);
    ctx.redirect('/deleteGoods')
});

// 增加文章信息
router.get('/addMessage', async (ctx) => {
    await ctx.render('addMessage');
})

router.post('/addMessage', async (ctx) => {
    let { mname, mimg, des,time} = ctx.request.body;
    let result = await adminServices.addMessage(mname, mimg, des,time);
    if (result == true) {
        ctx.redirect('/addMessage');
        console.log('成功');
    }
});

//查看文章信息
router.get('/selectMessage', async (ctx) => {
    const data = await adminServices.selectMessage();
    await ctx.render('selectMessage', {
        data: data
    })
});

//删除文章信息
router.get('/deleteMessage', async (ctx) => {
    const data = await adminServices.selectMessage();
    await ctx.render('deleteMessage', {
        data: data
    });
});

// 删除文章信息
router.get('/deleteMessage/:item', async (ctx) => {
    const mid = ctx.params.item;
    const result = await adminServices.deleteMessage(mid);
    ctx.redirect('/deleteMessage')
});

module.exports = router;