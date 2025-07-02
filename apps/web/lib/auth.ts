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
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
  },
  emailAndPassword: {
    enabled: false,
  },
  hooks: {
    after: createAuthMiddleware(async (ctx) => {
      const session = ctx.context.session;
      if (!session?.user.id || !session.user.createdAt) {
        return;
      }
      const now = new Date();
      const userCreatedAt = new Date(session.user.createdAt);
      const timeDiffMs = now.getTime() - userCreatedAt.getTime();

      if (timeDiffMs < 60_000) {
        try {
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
        } catch (error) {
          console.error("Error creating default folder:", error);
        }
      }
    }),
  },
});
