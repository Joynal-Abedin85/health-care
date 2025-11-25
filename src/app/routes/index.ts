import express from 'express'
import { userroutes } from '../modules/user/user.route'
import { authroute } from '../modules/auth/auth.route'
import { schedulerouter } from '../modules/schedule/schedule.routes'
import { doctorschedulerouter } from '../modules/scheduledoctor/doctorschedule.routes'
import { SpecialtiesRoutes } from '../modules/specialities/specialities.routes'
import { doctorrouter } from '../modules/doctor/doctor.routes'


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
    },
    {
        path: '/doctor_schedule',
        route: doctorschedulerouter
    },
    {
        path: '/specialties',
        route: SpecialtiesRoutes
    },
    {
        path: "/doctor",
        route: doctorrouter
    }
]

moduleroutes.forEach(route => router.use(route.path, route.route))

export default router