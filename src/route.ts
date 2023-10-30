import {Routing} from "express-zod-api"
import {
    getInfoEndpoint,
    presidentDeleteEndpoint,
    presidentInitEndpoint,
    tenantLoginEndpoint,
    tenantLogoutEndpoint
} from "./endpoint"

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
            },
            info: getInfoEndpoint,
        }
    }
}
