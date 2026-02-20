import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "@/lib/prisma";
import { generateFromEmail } from "unique-username-generator";
import { Prisma } from "@/generated/prisma/client";

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL,
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      prompt: "select_account",
    },
  },
  databaseHooks: {
    user: {
      create: {
        after: async (user) => {
          try {
            await prisma.profile.create({
              data: {
                userId: user.id,
                username: generateFromEmail(user.email, {
                  randomDigits: 5,
                  leadingFallback: "user",
                }),
              },
            });
          } catch (error) {
            // Check if the error is a Prisma-specific error
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
              // P2002 is the code for unique constraint violations
              if (error.code === "P2002") {
                throw new Error(
                  `The field ${error.meta?.target} already exists.`,
                );
              }
            }
            throw error; // Re-throw if it's a different error
          }
        },
      },
    },
  },
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  plugins: [nextCookies()],
});
