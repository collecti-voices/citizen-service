import {citizenMongooseModel} from "./mongooseSchema";
import {Citizen, CitizenTypes} from "./types";

class CitizenDbController {

    presidentInit = async (blockId: string, telegramUserId: string): Promise<Citizen> => {

        const newCitizen = new citizenMongooseModel({
            type: CitizenTypes.President,
            blockId,
            telegramUserId
        })

        return await newCitizen.save()
    }

}

export const citizenDbController = new CitizenDbController()
