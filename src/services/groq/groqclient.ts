import Groq from "groq-sdk";
import { config } from "../../constants/config";
export const groqClient = new Groq({ apiKey: config.api.groqApiKey });
