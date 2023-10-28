import {z} from "zod"
import {CitizenTypes} from "./types";


export const citizenTypeSchema = z.nativeEnum(CitizenTypes)

export const citizenSchema = z.object({
    _id: z.string(),
    type: citizenTypeSchema,
    blockId: z.string(),
    telegramUserId: z.string(),
    createdAt: z.date(),
    updatedAt: z.date()
})

export const inputAdminInitSchema = z.object({
    telegramUserId: z.string()
})

export const outputAdminInitSchema = z.object({
    url: z.string().url(),
    qrCode: z.string()
})