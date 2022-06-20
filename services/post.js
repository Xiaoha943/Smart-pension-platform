const fs = require('fs');
const bluebird = require('bluebird');
//promi化fs的api
bluebird.promisifyAll(fs);
const db = require('../middlewares/conn');
const router = require('../routes/user');

exports.list = async () => {
    let strSql2 = "select * from message"
    let select3 = await db.query(strSql2);
    return select3.map(item => item);
};
exports.list1 = async () => {
    let strSql2 = "select * from messagehot"
    let select3 = await db.query(strSql2);
    return select3.map(item => item);
};
exports.list2 = async () => {
    let strSql2 = "select * from messagelist"
    let select3 = await db.query(strSql2);
    return select3.map(item => item);
};
exports.list3 = async () => {
    let strSql2 = "select * from messagelook"
    let select3 = await db.query(strSql2);
    return select3.map(item => item);
};
// 获取商品类别
exports.type =async()=>{
    let strSql2 = "select * from type"
    let select3 = await db.query(strSql2);
    return select3.map(item => item);
};
//获取商品列表
exports.goodsList=async(tid)=>{
    let strSql2 = "select * from goods where tid=?"
    let select3 = await db.query(strSql2,[tid]);
    return select3.map(item => item);
};
//获取购物车商品
exports.shopCarList=async(uid)=>{    
    let strSql2 = "select *, count(*) count from goods g join shopcar s on g.gid=s.gid where s.uid=? group by s.gid"
    let select3 = await db.query(strSql2,[uid]);
    // console.log(select3);
    return select3.map(item => item);
};
//获取订单商品
exports.orderList=async(uid)=>{    
    let strSql2 = "select *, count(*) count from goods g join orders o on g.gid=o.gid where o.uid=? group by o.gid"
    let select3 = await db.query(strSql2,[uid]);
    return select3.map(item => item);
};
exports.username = async (id) => {
    let strSql = 'select username from user where uid=?';
    let select = await db.query(strSql, [id]);
    return select.map(item => item);
};

exports.findQx = async (id) => {
    let strSql1 = 'select qx from user where uid=?';
    let select1 = await db.query(strSql1, [id]);
    return select1.map(item => item);
};
//添加商品到购物车/增加购物车商品
exports.addGoods =async(uid,gid)=>{
    let strSql2='insert into shopcar(uid,gid) values(?,?)'
    let select3 = await db.query(strSql2,[uid,gid]);
};
//获取商品的数量
exports.goodSum=async(uid)=>{
    let strSql ='select count(*) count from shopcar where uid=?'
    let select3 =await db.query(strSql,[uid])
    return select3.find(item => item);
};

//删除购物车中商品数量
exports.deleteGoods=async(uid,gid)=>{
    let strSql2='delete from shopcar where uid=? and gid=?'
    let select3 = await db.query(strSql2,[uid,gid]);
};

//减少购物车商品数量
exports.reduceGoods=async(uid,gid)=>{
    let strSql2='delete from shopcar where uid=? and gid=? limit 1'
    let select3 = await db.query(strSql2,[uid,gid]);
};
//模糊查询
exports.search=async (value)=>{
    let selectSql='select * from goods where gname like ?';
    let select =await db.query(selectSql,[value]);
    return select.map(item => item);
}
//计算总价
exports.allSum=async(uid)=>{
     let selectSql='select sum(price) sum from shopcar s join goods g on s.gid=g.gid where s.uid= ?';
    let select =await db.query(selectSql,[uid]);
    return select.find(item => item);
}