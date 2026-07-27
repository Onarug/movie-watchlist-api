import z from "zod"

const registerSchema = z.object({
    name : z.string(),
    email : z.string().email(),
    password : z.string().min(4, "Password needs to be 4 characters ")
});

const loginSchema = z.object({
    email : z.string().email(),
    password : z.string().min(4, "Password needs to be 4 characters ")
});

export {registerSchema, loginSchema}