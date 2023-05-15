import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaClient, User } from '@prisma/client';
import { compare } from 'bcryptjs';

const prisma = new PrismaClient();

export default NextAuth({
    providers: [

        CredentialsProvider({
            name: "Credentials",
            credentials: {
                // define your credentials schema here
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials, req) {
                if (!credentials) {
                    throw new Error('No credentials supplied');
                }

                const { email, password } = credentials;

                if (!email || !password) {
                    throw new Error('Invalid credentials supplied');
                }

                const result = await prisma.user.findUnique({
                    where: { email },
                });

                if (!result) {
                    throw new Error('No user found with email');
                }

                const checkPassword = await compare(password, result.password);

                if (!checkPassword) {
                    throw new Error('Invalid password');
                }

                return result;
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
              token.id = user.id;
            }
            return token;
          },
        async session({ session, token, user }) {
            session.user = token
            return session
        }
    }
});