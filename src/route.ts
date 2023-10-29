import {Routing} from "express-zod-api"
import {presidentDeleteEndpoint, presidentInitEndpoint, tenantLoginEndpoint, tenantLogoutEndpoint} from "./endpoint"

export const routing: Routing = {
    v1: {
        citizens: {
            president: {
                init: presidentInitEndpoint,
                delete: presidentDeleteEndpoint,
            },
            tenant: {
                login: tenantLoginEndpoint,
                logout: tenantLogoutEndpoint,
            }
        }
    }
}
