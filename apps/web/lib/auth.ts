import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prismaClient } from "@repo/db";
import { createAuthMiddleware } from "better-auth/api";

export const auth = betterAuth({
  database: prismaAdapter(prismaClient, {
    provider: "postgresql",
  }),
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  emailAndPassword: {
    enabled: false,
  },
  hooks: {
    after: createAuthMiddleware(async (ctx) => {
      const session = ctx.context.session;
      const now: any = new Date();
      if (
        session?.user.createdAt &&
        now - new Date(session.user.createdAt).getTime() < 60_000
      ) {
        const existingFolder = await prismaClient.folder.findFirst({
          where: {
            userId: session.user.id,
            name: "Unsorted",
          },
        });
        if (!existingFolder) {
          const defaultFolder = await prismaClient.folder.create({
            data: {
              name: "Unsorted",
              userId: session.user.id,
            },
          });
        }
      }
    }),
  },
});
