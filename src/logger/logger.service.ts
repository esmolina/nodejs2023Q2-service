import { Injectable } from '@nestjs/common';
import { LoggerService } from '@nestjs/common';
import { LogLevel } from '../types/enams';

@Injectable()
export class CustomLoggerService implements LoggerService {
  constructor(private readonly logLevel: number) {
    this.logLevel = logLevel;
  }

  public async log(message: string, data?: any) {
    if (this.logLevel >= LogLevel.LOG) {
      console.log(`[LOG-Log]`);
    }
  }

  public async error(message: string, data?: any) {
    if (this.logLevel >= LogLevel.ERROR) {
      console.error(`[LOG-error]`);
    }
  }

  public async warn(message: string, data?: any) {
    if (this.logLevel >= LogLevel.WARN) {
      console.warn(`[LOG-warn]`);
    }
  }

  public async debug(message: string, data?: any) {
    if (this.logLevel >= LogLevel.DEBUG) {
      console.debug(`[LOG-debug]`);
    }
  }

  public async verbose(message: string, data?: any) {
    if (this.logLevel >= LogLevel.VERBOSE) {
      console.log(`[LOG-verbose]`);
    }
  }
}
