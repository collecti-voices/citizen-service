import {z} from "zod"
import {CitizenTypes} from "./types";


export const citizenTypeSchema = z.nativeEnum(CitizenTypes)

export const citizenSchema = z.object({
    _id: z.any(),
    type: citizenTypeSchema,
    blockId: z.string(),
    telegramUserName: z.string(),
    telegramUserId: z.number(),
    createdAt: z.date(),
    updatedAt: z.date()
})

export const inputAdminInitSchema = z.object({
    telegramUserId: z.number(),
    telegramUserName: z.string(),
})

export const outputAdminInitSchema = z.object({
    url: z.string().url(),
    qrCode: z.string()
})

export const inputPresidentDeleteSchema = z.object({
    telegramUserId: z.string().transform((value) => parseInt(value))
})

export const outputPresidentDeleteSchema = z.object({
    blockId: z.string()
})

export const inputTenantLoginSchema = z.object({
    blockId: z.string(),
    telegramUserId: z.number(),
    telegramUserName: z.string()
})

export const outputTenantLoginSchema = citizenSchema.merge(z.object({
    presidentTelegramUserName: z.string().optional()
}))

export const inputTenantLogoutSchema = z.object({
    telegramUserId: z.string().transform((value) => parseInt(value))
})

export const outputTenantLogoutSchema = z.object({
    blockId: z.string()
})

export const inputGetInfoSchema = z.object({
    telegramUserId: z.string().transform((value) => parseInt(value))
})

export const outputGetInfoSchema = citizenSchema