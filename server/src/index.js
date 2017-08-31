import dotenv from 'dotenv';

dotenv.config();
export const add = (a, b) => a + b;
export const minus = (a, b, c) => a - b - c;

console.log(process.env.DB_HOST);
