import { z } from "zod";

export const searchSchema = z.object({
  name: z
    .string()
    .min(1, { message: "A pesquisa não pode ser vazia" })
    .refine((value) => !/^\s*$/.test(value), {
      message: "Não pode ter apenas espaços",
    }),
});
