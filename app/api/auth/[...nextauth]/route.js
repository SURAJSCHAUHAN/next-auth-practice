import connectDB from "@/config/db";
import User from "@/model/UserSchema";
import NextAuth from "next-auth/next";
import  CredentialsProvider  from "next-auth/providers/credentials";
import bcrypt from "bcryptjs"

export const authOptions={
    providers:[
        CredentialsProvider({
            name:"credentials",
            credentials:{
                email:{label:"Email", type:"text"},
                password:{label:"Password",type:"password"}
            },

            async authorize(credentials){
                const {email,password}=credentials;
                try {
                    await connectDB();
                    const user= await User.findOne({email});

                    if(!user){
                        return null;
                    }
                    const passwordMatch=await bcrypt.compare(password,user.password);
                    if(!passwordMatch){
                        return null;
                    }
                    return user;
                } catch (error) {
                    console.log(error);
                }
            },
            
        }),
    ],
    session:{
        strategy:"jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages:{
        signIn:"/",
    },
};

const handler = NextAuth(authOptions);

export {handler as GET, handler as POST};