"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const diagnosisRouter_1 = __importDefault(require("./routes/diagnosisRouter"));
const patientRouter_1 = __importDefault(require("./routes/patientRouter"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/api/patients", patientRouter_1.default);
app.use("/api/diagnoses", diagnosisRouter_1.default);
app.get("/", (_req, res) => {
    res.send("Welcome to Patientor app!");
});
app.get("/api/ping", (_req, res) => {
    res.send("pong");
});
app.get("/vovka", (_req, res) => {
    res.send("Privet, Vovka!");
});
const PORT = 3002;
app.listen(PORT, () => {
    console.log(`Patientor server now works on port: ${PORT}`);
});
exports.default = app;
