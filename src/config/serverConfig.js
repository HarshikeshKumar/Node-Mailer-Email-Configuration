import dotenv from "dotenv";

dotenv.config();

export const PORT = process.env.PORT || 5000;
export const APP_PASS = process.env.APP_PASS;
export const FROM_GMAIL = process.env.FROM_GMAIL;
export const TO_GMAIL = process.env.TO_GMAIL;
