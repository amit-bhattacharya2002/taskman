import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import prisma from "@/app/db";
import { NextApiRequest, NextApiResponse } from "next";
export async function DELETE(req: Request, {params}:{params: {id: string}}){
    try{
        const {userId} = auth();

        const {id} = params;

        if(!userId){
            return NextResponse.json({error : "Unauthorized", status: 401})
        }

        const task= await prisma.task.delete({
            where: {
                id,
            }
        })


        console.log("TASK DELETED: ", task);
        return NextResponse.json(task)
    }catch(error){
        console.log("Error deleting task: ", error);
        return NextResponse.json({error:"Error deleting task", status: 500})
    }
}


