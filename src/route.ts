import {Routing} from "express-zod-api"
import {presidentInitEndpoint, tenantLoginEndpoint} from "./endpoint"

export const routing: Routing = {
    v1: {
        citizens: {
            president: {
                init: presidentInitEndpoint,
            },
            tenant: {
                login: tenantLoginEndpoint,
            }
        }
    }
}
