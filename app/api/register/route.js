import { NextResponse } from "next/server";
import User from "@/model/UserSchema";
import connectDB from "@/config/db";
import bcrypt from "bcryptjs"

export async function POST(req,res){
    try {
        const {name,email,password}=await req.json();
        console.log(name,email,password);

        const hashPassword=await bcrypt.hash(password,10);

        await connectDB();
        await User.create({name,email,password:hashPassword});

        return NextResponse.json({message:"User Registered Succesfully",ok:true},{status:201})
    } catch (error) {
        return NextResponse.json({message:"An Error occur while creating an user."},{status:400})
    }
} 