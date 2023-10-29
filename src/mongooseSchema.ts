import * as mongoose from "mongoose"
import {Document} from "mongoose"
import {Citizen} from "./types";

export type MongooseDocument = Document & Citizen

export const mongooseSchema: mongoose.Schema = new mongoose.Schema({
    type: String,
    blockId: String,
    telegramUserId: Number
}, {
    timestamps: true,
})

mongooseSchema.index({
    telegramUserId: 1, blockId: 1
}, {
    unique: true
})

export const citizenMongooseModel = mongoose.model<MongooseDocument>("citizen", mongooseSchema)
