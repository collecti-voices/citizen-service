import {z} from "zod"
import {
    citizenSchema,
    inputAdminInitSchema, inputPresidentDeleteSchema,
    inputTenantLoginSchema, inputTenantLogoutSchema,
    outputAdminInitSchema, outputPresidentDeleteSchema,
    outputTenantLoginSchema, outputTenantLogoutSchema
} from "./zodSchema";

export enum CitizenTypes {
    Tenant = "tenant",
    President = "president",
    Counselor = "counselor"
}

export type Citizen  = z.infer<typeof citizenSchema>

export type InputAdminInit = z.infer<typeof inputAdminInitSchema>

export type OutputAdminInit = z.infer<typeof outputAdminInitSchema>

export type InputPresidentDeleteSchema = z.infer<typeof inputPresidentDeleteSchema>

export type OutputPresidentDeleteSchema = z.infer<typeof outputPresidentDeleteSchema>

export type InputTenantLoginSchema = z.infer<typeof inputTenantLoginSchema>

export type OutputTenantLoginSchema = z.infer<typeof outputTenantLoginSchema>

export type InputTenantLogoutSchema = z.infer<typeof inputTenantLogoutSchema>

export type OutputTenantLogoutSchema = z.infer<typeof outputTenantLogoutSchema>