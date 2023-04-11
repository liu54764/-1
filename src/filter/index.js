import router from "@/router/index";

router.beforeEach((to,from,next)=>{
    // console.info(to)
    let userinfo = JSON.parse(localStorage.getItem('userinfo'))
    if(userinfo)
    {
        next()
    }else {
        if(to.path == '/register'||to.path == '/login')
        {
            next()
        }else {
            next({path:'/login'})
        }
    }
})
