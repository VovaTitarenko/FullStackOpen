"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const patientEntries_1 = __importDefault(require("../../data/patientEntries"));
const getPatients = () => {
    return patientEntries_1.default;
};
const addPatient = (d) => {
    console.log(`i added a patient ${d}`);
};
exports.default = { getPatients, addPatient };
