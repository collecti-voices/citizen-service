import {citizenMongooseModel} from "./mongooseSchema";
import {Citizen, CitizenTypes, InputAdminInit, InputTenantLoginSchema} from "./types";

class CitizenDbController {

    getPresident = async (telegramUserId: number): Promise<Citizen | null> => {
        return await citizenMongooseModel.findOne({
            type: CitizenTypes.President,
            telegramUserId
        }).exec()
    }

    getPresidentByBlockId = async (blockId: string): Promise<Citizen | null> => {
        return await citizenMongooseModel.findOne({
            type: CitizenTypes.President,
            blockId
        }).exec()
    }

    presidentInit = async (blockId: string, inputAdminInit: InputAdminInit): Promise<Citizen> => {

        const newCitizen = new citizenMongooseModel({
            type: CitizenTypes.President,
            blockId,
            ...inputAdminInit
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

    tenantLogin = async (inputTenantLoginSchema: InputTenantLoginSchema): Promise<Citizen> => {
        const newCitizen = new citizenMongooseModel({
            type: CitizenTypes.Tenant,
            ...inputTenantLoginSchema
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
