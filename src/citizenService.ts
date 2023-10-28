import {InputAdminInit, OutputAdminInit} from "./types";
import {citizenDbController} from "./dbController";
import {toDataURL} from "qrcode";
import createHttpError from "http-errors";

export const presidentInit = async (inputAdminInit: InputAdminInit): Promise<OutputAdminInit> => {
    const blockId = Math.random().toString(36).substring(7)

    const citizen = await citizenDbController
        .presidentInit(blockId, inputAdminInit.telegramUserId)

    const isPresidentExists = await citizenDbController.isPresidentExists(inputAdminInit.telegramUserId)

    if (isPresidentExists) {
        throw createHttpError(400, "President already exists")
    }

    const url = `https://t.me/${process.env.TELEGRAM_BOT_USERNAME}?init=${citizen.blockId}`

    const qrCode = "data:image/png;base64," + (await toDataURL(url)).replace(/^data:image\/png;base64,/, "")

    return {
        url: url,
        qrCode: qrCode
    }

}

export const citizenService = {
    presidentInit
}
