import express from 'express'
import { userroutes } from '../modules/user/user.route'
import { authroute } from '../modules/auth/auth.route'
import { schedulerouter } from '../modules/schedule/schedule.routes'


const router = express.Router()


const moduleroutes = [

    {
        path: '/user',
        route: userroutes
    },
    {
        path: '/auth',
        route: authroute
    },
    {
        path: '/schedule',
        route: schedulerouter
    }
]

moduleroutes.forEach(route => router.use(route.path, route.route))

export default router