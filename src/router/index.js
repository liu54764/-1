import {createRouter,createWebHashHistory} from 'vue-router'
import Login from '../views/login'
import Register from '../views/register'

const routes = [

    {
        path:'/',
        redirect: '/login',
        component:() => import('../views/home')
    },
    {
        path:'/login',
        component:Login
    },
    {
        path:'/register',
        component:Register
    },
    {
        path:'/home',
        component:() => import('../views/home')
    }
    ,{
        path:'/organization',
        component:() => import('../views/organization')
    }
    ,{
        path:'/grade',
        component:() => import('../views/grade')
    },{
        path:'/credits',
        component:() => import('../views/credits')
    },{
        path:'/contest',
        component:() => import('../views/contest')
    },{
        path:'/inquiry',
        component:() => import('../views/inquiry')
    },{
        path:'/StudentManage',
        component:() => import('../views/StudentManage')
    },{
        path:'/GradeRevision',
        component:() => import('../views/GradeRevision')
    }


]



const router = createRouter({
     history:createWebHashHistory(),
     routes
})
export default router;