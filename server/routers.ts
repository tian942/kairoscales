import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { notifyOwner } from "./_core/notification";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { getAllLeads, insertLead } from "./db";
import { z } from "zod";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  leads: router({
    submit: publicProcedure
      .input(
        z.object({
          firstName: z.string().min(1).max(128),
          companyName: z.string().min(1).max(256),
          revenue: z.string().min(1).max(128),
          offer: z.string().min(1),
        })
      )
      .mutation(async ({ input }) => {
        await insertLead({
          firstName: input.firstName,
          companyName: input.companyName,
          revenue: input.revenue,
          offer: input.offer,
        });

        // Notify owner of new lead
        try {
          await notifyOwner({
            title: `🎯 New Lead: ${input.firstName} — ${input.companyName}`,
            content: `**First Name:** ${input.firstName}\n**Company:** ${input.companyName}\n**Revenue:** ${input.revenue}\n**Offer:** ${input.offer}`,
          });
        } catch {
          // Non-fatal — lead is already saved
        }

        return { success: true } as const;
      }),

    list: publicProcedure.query(async () => {
      return getAllLeads();
    }),
  }),
});

export type AppRouter = typeof appRouter;
