import {citizenMongooseModel} from "./mongooseSchema";
import {Citizen, CitizenTypes} from "./types";

class CitizenDbController {

    getPresident = async (telegramUserId: number): Promise<Citizen | null> => {
        return await citizenMongooseModel.findOne({
            type: CitizenTypes.President,
            telegramUserId
        }).exec()
    }

    presidentInit = async (blockId: string, telegramUserId: number): Promise<Citizen> => {

        const newCitizen = new citizenMongooseModel({
            type: CitizenTypes.President,
            blockId,
            telegramUserId
        })

        return await newCitizen.save()
    }

    getTenant = async (telegramUserId: number, blockId: string): Promise<Citizen | null> => {
        return await citizenMongooseModel.findOne({
            type: CitizenTypes.Tenant,
            telegramUserId,
            blockId
        }).exec()
    }

    tenantLogin = async (blockId: string, telegramUserId: number): Promise<Citizen> => {
        const newCitizen = new citizenMongooseModel({
            type: CitizenTypes.Tenant,
            blockId,
            telegramUserId
        })

        return await newCitizen.save()
    }

    getCitizenByTelegramUserId = async (telegramUserId: number): Promise<Citizen | null> => {
        return await citizenMongooseModel.findOne({
            telegramUserId
        }).exec()
    }

    deleteAllCitizensByBlockId = async (blockId: string): Promise<void> => {
        await citizenMongooseModel.deleteMany({
            blockId
        }).exec()
    }

    tenantLogout = async (telegramUserId: number, blockId: string): Promise<void> => {
        await citizenMongooseModel.deleteOne({
            telegramUserId,
            blockId
        }).exec()
    }

}

export const citizenDbController = new CitizenDbController()
