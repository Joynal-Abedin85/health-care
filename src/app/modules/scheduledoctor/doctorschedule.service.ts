import { PrismaClient } from "@prisma/client"

const createdoctorschedule = async(user : any, payload: {scheduleids: string[]} ) => {
    const prisma = new PrismaClient()
    const doctordata = await prisma.doctor.findUniqueOrThrow({
        where: {
            email: user.email
        }
    })


    const doctorscheduledata = payload.scheduleids.map(scheduleid =>({
        doctorid: doctordata.id,
        scheduleid
    })) 


    return await prisma.doctorschedule.createMany({
        data: doctorscheduledata
    })



}



export const doctorscheduleservice = {
    createdoctorschedule
}