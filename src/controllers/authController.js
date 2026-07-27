import {prisma} from "../config/db.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";
const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const UserExists = await prisma.user.findUnique({
            where: { email:email },
        });
        if (UserExists) {
            return res.status(400).json({ error: "Email already in use" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await prisma.user.create({
            data: { name, email, password: hashedPassword },
        });

        const token = generateToken(user.id,res)

        res.status(201).json({
            status: "success",
            data: {
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                },
                token

            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Creating user failed" });
    }
};


const login = async (req,res) => {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({
        where: { email: email },
    });

    if(!user){
        return res.status(401).json({ error: "Invalid email or pass" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid){
        return res.status(401).json({ error: "Invalid email or password" });
    }

    const token = generateToken(user.id,res)

    res.status(201).json({
            status: "success",
            data: {
                user: {
                    id: user.id,
                    email: user.email,
                },
                token
            },
        });
};

const logout = async (req,res)=>{
    res.cookie("jwt","",{
        httpOnly: true,
        expires: new Date(0)
    })
    res.status(200).json({
        status: "success",
        message:"Logged out "
    });
};

export {register,login,logout}