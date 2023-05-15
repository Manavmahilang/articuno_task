import { User } from '@prisma/client';
import { hash } from 'bcryptjs';
import { prisma } from '~/server/db';


export default async function handler(req: { method: string; body: { email: any; password: any; cpassword: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { message?: string; error?: string; status?: boolean; user?: User; }): void; new(): any; }; }; }){
    // only post method is accepted
    if(req.method !== 'POST') {
        res.status(500).json({ message: "HTTP method not valid only POST Accepted"})
        return;
    }

    if(!req.body) {
        res.status(404).json({ error: "Don't have form data...!"});
        return;
    }

    const { email, password,cpassword  } = req.body;

    // check duplicate users
    const checkexisting = await prisma.user.findUnique({
        where: { email },
    });
    if(checkexisting) {
        res.status(422).json({ message: "User Already Exists...!"});
        return;
    }

    // hash password
    const hashedPassword = await hash(password, 12);
    const user = await prisma.user.create({
        data: {
            email,
            password: hashedPassword,
            cpassword: hashedPassword
            
        },
    });

    res.status(201).json({ status : true, user });
}