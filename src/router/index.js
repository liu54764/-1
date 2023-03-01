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
        path:'/dital/:name',
        component:() => import('../views/dital')
    }
    ,{
        path:'/new',
        component:() => import('../views/new')
    }
    ,{
        path:'/home',
        component:() => import('../views/home')
    }


]



const router = createRouter({
     history:createWebHashHistory(),
     routes
})
export default router;