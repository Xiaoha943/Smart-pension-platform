const fs = require('fs');
const bluebird = require('bluebird');
//promi化fs的api
bluebird.promisifyAll(fs);
const db = require('../middlewares/conn');
const router = require('../routes/user');

// 删除用户信息
exports.deleteUser=async(uid)=>{
    let strSql2='delete from user where uid=?'
    let select3 = await db.query(strSql2,[uid]);
};
// 查看所有用户信息
exports.selectUser=async()=>{
    let strSql2 = "select * from user"
    let select3 = await db.query(strSql2);
    return select3.map(item => item);
}
//更新用户信息
exports.updateUser=async(username,password,tel,address,qx,uid)=>{
    let strSql='update user set username=?,password=?,tel=?,address=?,qx=? where uid=?';
   await db.query(strSql,[username,password,tel,address,qx,uid]);
    return true;
};
//更新提交用户
exports.updateUser1=async(uid)=>{
    let strSql='select * from user where uid=?';
    let selcte=await db.query(strSql,[uid]);
    return selcte.map(item=>item);
}
//增加商品信息
exports.addgoods =async (gname,price,vprice,img,des,tid) => {
    // console.log(username,password);
    let sql = 'insert into goods (gname,price,vprice,img,des,tid)values(?,?,?,?,?,?)';
    await db.query(sql, [gname,price,vprice,img,des,tid])
    return true;
};
// 查看商品信息
exports.selectGoods=async()=>{
    let strSql2 = "select * from goods"
    let select3 = await db.query(strSql2);
    return select3.map(item => item);
}
//更新商品信息
exports.updateGoods=async(gname,price,vprice,img,des,tid,gid)=>{
    let strSql='update goods set gname=?,price=?,vprice=?,img=?,des=?,tid=? where gid=?';
    let selcte=await db.query(strSql,[gname,price,vprice,img,des,tid,gid]);
    return true;
};
//更新提交商品
exports.updateGoods1=async(gid)=>{
    let strSql='select * from goods where gid=?';
    let selcte=await db.query(strSql,[gid]);
    return selcte.map(item=>item);
}


//删除商品信息
exports.deleteGoods=async(gid)=>{
    let strSql2='delete from goods where gid=?'
    let select3 = await db.query(strSql2,[gid]);
};


//增加文章信息
exports.addMessage =async (mname, mimg, des, time) => {
    // console.log(username,password);
    let sql = 'insert into message (mname, mimg, des, time)values(?,?,?,?)';
    await db.query(sql, [mname, mimg, des, time])
    return true;
};

// 查看文章信息
exports.selectMessage=async()=>{
    let strSql2 = "select * from message"
    let select3 = await db.query(strSql2);
    return select3.map(item => item);
}

// 删除文章信息
exports.deleteMessage=async(mid)=>{
    let strSql2='delete from message where mid=?'
    let select3 = await db.query(strSql2,[mid]);
};