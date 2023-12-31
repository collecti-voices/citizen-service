import {
    Citizen,
    CitizenTypes,
    InputAdminInit,
    InputPresidentDelete,
    InputTenantLoginSchema,
    InputTenantLogoutSchema,
    OutputAdminInit,
    OutputPresidentDelete,
    OutputTenantLoginSchema,
    OutputTenantLogoutSchema
} from "./types";
import {citizenDbController} from "./dbController";
import {toDataURL} from "qrcode";
import * as createHttpError from "http-errors";

export const presidentInit = async (inputAdminInit: InputAdminInit): Promise<OutputAdminInit> => {
    let president = await citizenDbController.getPresident(inputAdminInit.telegramUserId)

    if (!president) {

        const blockId = Math.random().toString(36).substring(7)

        president = await citizenDbController
            .presidentInit(blockId, inputAdminInit)
    }

    const url = `https://t.me/${process.env.TELEGRAM_BOT_USERNAME}?start=${president.blockId}`

    const qrCode = "data:image/png;base64," +
        (await toDataURL(url)).replace(/^data:image\/png;base64,/, "")

    return {
        url: url,
        qrCode: qrCode
    }
}

export const presidentDelete = async (inputPresidentDeleteSchema: InputPresidentDelete): Promise<OutputPresidentDelete> => {
    const president = await citizenDbController.getPresident(inputPresidentDeleteSchema.telegramUserId)

    if (!president) {
        throw createHttpError(404, "You are not president to remove your block")
    }

    await citizenDbController.deleteAllCitizensByBlockId(president.blockId)

    return {
        blockId: president.blockId,
    }
}

export const tenantLogin = async (inputTenantLoginSchema: InputTenantLoginSchema): Promise<OutputTenantLoginSchema> => {
    const citizen = await citizenDbController
        .getCitizenByTelegramUserId(inputTenantLoginSchema.telegramUserId)
    const president: Citizen | null = await citizenDbController.getPresidentByBlockId(inputTenantLoginSchema.blockId)

    let outputTenantLoginSchema: OutputTenantLoginSchema
    if (citizen) {
        outputTenantLoginSchema = citizen
        outputTenantLoginSchema.presidentTelegramUserName = president?.telegramUserName

        return outputTenantLoginSchema
    }

    let tenant = await citizenDbController
        .getTenant(inputTenantLoginSchema.telegramUserId, inputTenantLoginSchema.blockId)

    if (tenant) {
        outputTenantLoginSchema = tenant
        outputTenantLoginSchema.presidentTelegramUserName = president?.telegramUserName

        return outputTenantLoginSchema
    }

    outputTenantLoginSchema = await citizenDbController.tenantLogin(inputTenantLoginSchema)
    outputTenantLoginSchema.presidentTelegramUserName = president?.telegramUserName

    return outputTenantLoginSchema
}

export const tenantLogout = async (inputTenantLogoutSchema: InputTenantLogoutSchema): Promise<OutputTenantLogoutSchema> => {
    const citizen = await citizenDbController
        .getCitizenByTelegramUserId(inputTenantLogoutSchema.telegramUserId)

    if (!citizen) {
        throw createHttpError(404, "You are not a part of any blocks to logout from")
    }

    if (citizen?.type === CitizenTypes.President) {
        throw createHttpError(404, "You are not tenant to logout from block")
    }

    await citizenDbController.tenantLogout(inputTenantLogoutSchema.telegramUserId, citizen.blockId)

    return {
        blockId: citizen.blockId,
    }
}

export const getInfo = async (telegramUserId: number): Promise<Citizen> => {
    const citizen = await citizenDbController
        .getCitizenByTelegramUserId(telegramUserId)

    if (!citizen) {
        throw createHttpError(404, "You are not a part of any blocks to get info about")
    }

    return citizen
}

export const citizenService = {
    presidentInit,
    tenantLogin,
    presidentDelete,
    tenantLogout,
    getInfo
}
