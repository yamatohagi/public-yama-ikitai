import {z} from 'zod';
import type {Prisma} from '@prisma/client';
import {MountainUrlMemoWhereInputSchema} from 'generated/schema/zod/inputTypeSchemas/MountainUrlMemoWhereInputSchema';
import {MountainUrlMemoOrderByWithRelationInputSchema} from 'generated/schema/zod/inputTypeSchemas/MountainUrlMemoOrderByWithRelationInputSchema';
import {MountainUrlMemoWhereUniqueInputSchema} from 'generated/schema/zod/inputTypeSchemas/MountainUrlMemoWhereUniqueInputSchema';
import {MountainUrlMemoScalarFieldEnumSchema} from 'generated/schema/zod/inputTypeSchemas/MountainUrlMemoScalarFieldEnumSchema';
import MountainArgsSchema from 'generated/schema/zod/outputTypeSchemas/MountainArgsSchema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const MountainUrlMemoSelectSchema: z.ZodType<Prisma.MountainUrlMemoSelect> = z
  .object({
    id: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    deletedAt: z.boolean().optional(),
    mountainId: z.boolean().optional(),
    name: z.boolean().optional(),
    url: z.boolean().optional(),
    remark: z.boolean().optional(),
    Mountain: z.union([z.boolean(), z.lazy(() => MountainArgsSchema)]).optional(),
  })
  .strict();

export const MountainUrlMemoFindManyArgsSchema: z.ZodType<Prisma.MountainUrlMemoFindManyArgs> = z
  .object({
    select: MountainUrlMemoSelectSchema.optional(),

    where: MountainUrlMemoWhereInputSchema.optional(),
    orderBy: z.union([MountainUrlMemoOrderByWithRelationInputSchema.array(), MountainUrlMemoOrderByWithRelationInputSchema]).optional(),
    cursor: MountainUrlMemoWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z.union([MountainUrlMemoScalarFieldEnumSchema, MountainUrlMemoScalarFieldEnumSchema.array()]).optional(),
  })
  .strict() as z.ZodType<Prisma.MountainUrlMemoFindManyArgs>;

export default MountainUrlMemoFindManyArgsSchema;
