import { config } from 'dotenv';

config();

const PORT = process.env.PORT || 8000;

export default { PORT };
