import dotenv from 'dotenv';

dotenv.config();

const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS || '';
const RPC_URL = process.env.RPC_URL;
const PATIENT_ADDRESS = process.env.PATIENT_ADDRESS || '';

export { CONTRACT_ADDRESS, RPC_URL, PATIENT_ADDRESS };
