import {Routing} from "express-zod-api"
import { presidentInitEndpoint } from "./endpoint"

export const routing: Routing = {
    v1: {
        citizens: {
            president: {
                init: presidentInitEndpoint,
            }
        }
    }
}
