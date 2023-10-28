import { defaultEndpointsFactory } from "express-zod-api"
import {inputAdminInitSchema, outputAdminInitSchema} from "./zodSchema";
import { citizenService } from "./citizenService";


export const presidentInitEndpoint = defaultEndpointsFactory.build({
    method: "post",
    input: inputAdminInitSchema,
    output: outputAdminInitSchema,
    handler: async ({input, options, logger }) => {
        return citizenService.presidentInit(input)
    },
})
