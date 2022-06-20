const bluebird = require('bluebird');
const fs = require('fs');
bluebird.promisifyAll(fs);
const db = require('../middlewares/conn');



exports.login = async function (username, password) {
    let result = await db.query('select * from user')
    let value = result.find(v => v.username == username);
    if (value == undefined) {
        return 3;
    }
    // for (let value of result1) {
        
        if (value.username == username) {
            let result1 = await db.query('select * from user where username=?', [username])
            for (let value1 of result1) {
                if (value1.password === password) {
                    return 1;//账号密码正确
                } else {
                    return 2;//密码错误
                }
            }
        } else  {
            return 3;//用户名密码错误
        // }
    }


}
exports.register =async (username, password,tel,address) => {
    // console.log(username,password);
    let sql = 'insert into user (username,password,tel,address)values(?,?,?,?)';
    await db.query(sql, [username, password,tel,address])
    return true;
}
//获取cookies值的用户数据
exports.findIdByUname= async name=>{
    let sql='select * from user where username=?';
    let a=await db.query(sql,[name]);
    for(let v of a){
        return v.uid;
    }
    
}
