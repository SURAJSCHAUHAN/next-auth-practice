import { NextResponse } from "next/server";
import User from "@/model/UserSchema";
import connectDB from "@/config/db";

export async function POST(req){
    try {
        await connectDB();
        const {email}=await req.json();
        const user= await User.findOne({email}).select("_id");
        return NextResponse.json({user});
    } catch (error) {
        console.log(error);
    }
}