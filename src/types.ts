import {z} from "zod"
import {
    citizenSchema,
    inputAdminInitSchema,
    inputTenantLoginSchema,
    outputAdminInitSchema,
    outputTenantLoginSchema
} from "./zodSchema";

export enum CitizenTypes {
    Tenant = "tenant",
    President = "president",
    Counselor = "counselor"
}

export type Citizen  = z.infer<typeof citizenSchema>

export type InputAdminInit = z.infer<typeof inputAdminInitSchema>

export type OutputAdminInit = z.infer<typeof outputAdminInitSchema>

export type InputTenantLoginSchema = z.infer<typeof inputTenantLoginSchema>

export type OutputTenantLoginSchema = z.infer<typeof outputTenantLoginSchema>