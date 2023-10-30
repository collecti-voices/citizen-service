import { defaultEndpointsFactory } from "express-zod-api"
import {
    inputAdminInitSchema, inputGetInfoSchema, inputPresidentDeleteSchema,
    inputTenantLoginSchema, inputTenantLogoutSchema,
    outputAdminInitSchema, outputGetInfoSchema, outputPresidentDeleteSchema,
    outputTenantLoginSchema, outputTenantLogoutSchema
} from "./zodSchema";
import {citizenService} from "./citizenService";


export const presidentInitEndpoint = defaultEndpointsFactory.build({
    method: "post",
    input: inputAdminInitSchema,
    output: outputAdminInitSchema,
    handler: async ({input, options, logger }) => {
        return citizenService.presidentInit(input)
    },
})

export const presidentDeleteEndpoint = defaultEndpointsFactory.build({
    method: "delete",
    input: inputPresidentDeleteSchema,
    output: outputPresidentDeleteSchema,
    handler: async ({input, options, logger }) => {
        return citizenService.presidentDelete(input)
    },
})

export const tenantLoginEndpoint = defaultEndpointsFactory.build({
    method: "post",
    input: inputTenantLoginSchema,
    output: outputTenantLoginSchema,
    handler: async ({input, options, logger }) => {
        return citizenService.tenantLogin(input)
    },
})

export const tenantLogoutEndpoint = defaultEndpointsFactory.build({
    method: "delete",
    input: inputTenantLogoutSchema,
    output: outputTenantLogoutSchema,
    handler: async ({input, options, logger }) => {
        return citizenService.tenantLogout(input)
    },
})

export const getInfoEndpoint = defaultEndpointsFactory.build({
    method: "get",
    input: inputGetInfoSchema,
    output: outputGetInfoSchema,
    handler: async ({input, options, logger }) => {
        return citizenService.getInfo(input.telegramUserId)
    },

})
