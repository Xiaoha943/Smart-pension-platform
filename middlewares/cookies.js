module.exports=async (ctx,next)=>{
    const flag =ctx.cookies.get('flag',{signed:true })
    ctx.state.flag=!!flag;
    await next();
}