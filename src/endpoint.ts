import { defaultEndpointsFactory } from "express-zod-api"
import {
    inputAdminInitSchema,
    inputTenantLoginSchema,
    outputAdminInitSchema,
    outputTenantLoginSchema
} from "./zodSchema";
import { citizenService } from "./citizenService";


export const presidentInitEndpoint = defaultEndpointsFactory.build({
    method: "post",
    input: inputAdminInitSchema,
    output: outputAdminInitSchema,
    handler: async ({input, options, logger }) => {
        return citizenService.presidentInit(input)
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
