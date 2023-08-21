import { SetMetadata } from '@nestjs/common';
import { config } from 'dotenv';

const env = config();
export const IS_PUBLIC_KEY = env.parsed.PUBLiC_KEY;

export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
