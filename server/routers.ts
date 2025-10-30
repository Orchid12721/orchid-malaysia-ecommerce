import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import * as db from "./db";

// Admin-only procedure
const adminProcedure = protectedProcedure.use(({ ctx, next }) => {
  if (ctx.user.role !== 'admin') {
    throw new TRPCError({ code: 'FORBIDDEN', message: 'Admin access required' });
  }
  return next({ ctx });
});

export const appRouter = router({
  system: systemRouter,

  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),

  categories: router({
    list: publicProcedure.query(async () => {
      return await db.getAllCategories();
    }),
    
    getBySlug: publicProcedure
      .input(z.object({ slug: z.string() }))
      .query(async ({ input }) => {
        return await db.getCategoryBySlug(input.slug);
      }),

    create: adminProcedure
      .input(z.object({
        name: z.string(),
        slug: z.string(),
        description: z.string().optional(),
        imageUrl: z.string().optional(),
        displayOrder: z.number().optional(),
      }))
      .mutation(async ({ input }) => {
        return await db.createCategory(input);
      }),

    update: adminProcedure
      .input(z.object({
        id: z.number(),
        name: z.string().optional(),
        description: z.string().optional(),
        imageUrl: z.string().optional(),
        displayOrder: z.number().optional(),
        isActive: z.boolean().optional(),
      }))
      .mutation(async ({ input }) => {
        const { id, ...data } = input;
        return await db.updateCategory(id, data);
      }),
  }),

  products: router({
    list: publicProcedure.query(async () => {
      return await db.getAllProducts();
    }),

    getByCategory: publicProcedure
      .input(z.object({ categoryId: z.number() }))
      .query(async ({ input }) => {
        return await db.getProductsByCategory(input.categoryId);
      }),

    getBySlug: publicProcedure
      .input(z.object({ slug: z.string() }))
      .query(async ({ input }) => {
        return await db.getProductBySlug(input.slug);
      }),

    getById: publicProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        return await db.getProductById(input.id);
      }),

    getFeatured: publicProcedure.query(async () => {
      return await db.getFeaturedProducts(8);
    }),

    create: adminProcedure
      .input(z.object({
        categoryId: z.number(),
        name: z.string(),
        slug: z.string(),
        description: z.string().optional(),
        price: z.number(),
        compareAtPrice: z.number().optional(),
        sku: z.string().optional(),
        stock: z.number().default(0),
        imageUrl: z.string().optional(),
        images: z.string().optional(),
        isFeatured: z.boolean().default(false),
      }))
      .mutation(async ({ input }) => {
        return await db.createProduct(input);
      }),

    update: adminProcedure
      .input(z.object({
        id: z.number(),
        categoryId: z.number().optional(),
        name: z.string().optional(),
        slug: z.string().optional(),
        description: z.string().optional(),
        price: z.number().optional(),
        compareAtPrice: z.number().optional(),
        sku: z.string().optional(),
        stock: z.number().optional(),
        imageUrl: z.string().optional(),
        images: z.string().optional(),
        isActive: z.boolean().optional(),
        isFeatured: z.boolean().optional(),
      }))
      .mutation(async ({ input }) => {
        const { id, ...data } = input;
        return await db.updateProduct(id, data);
      }),

    delete: adminProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        return await db.deleteProduct(input.id);
      }),
  }),
});

export type AppRouter = typeof appRouter;

