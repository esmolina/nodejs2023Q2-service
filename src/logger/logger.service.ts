import { Injectable } from '@nestjs/common';
import { LoggerService } from '@nestjs/common';
import { Request, Response } from 'express';
import { config } from 'dotenv';
import { LogLevel } from '../types/enams';

const env = config();
const LOG_LEVEL: number = Number(env.parsed.LOG_LEVEL) || 1;

@Injectable()
export class CustomLoggerService implements LoggerService {
  public getRequestDataMessage(request: Request, query: any, body: any) {
    const { method, url } = request;
    const requestDataMessage = `Method: ${method} URL: ${url}: Query params: ${JSON.stringify(
      query,
    )}, Body: ${JSON.stringify(body)}`;
    return requestDataMessage;
  }

  public getResponseCodeMessage(response: Response) {
    const { statusCode } = response;
    const responseCodeMessage = `Status code: ${statusCode}`;
    return responseCodeMessage;
  }

  public async log(
    message: string,
    request?: Request,
    response?: Response,
    query?: any,
    body?: any,
  ) {
    if (LOG_LEVEL >= LogLevel.LOG) {
      const requestData = request
        ? this.getRequestDataMessage(request, query, body)
        : '';
      const responseCode = response
        ? this.getResponseCodeMessage(response)
        : '';
      console.log(`[LOG-Log] ${message} ${requestData} ${responseCode}`);
    }
  }

  public async error(message: string, data?: any) {
    if (LOG_LEVEL >= LogLevel.ERROR) {
      console.error(`[LOG-error]`);
    }
  }

  public async warn(message: string, data?: any) {
    if (LOG_LEVEL >= LogLevel.WARN) {
      console.warn(`[LOG-warn]`);
    }
  }

  public async debug(message: string, data?: any) {
    if (LOG_LEVEL >= LogLevel.DEBUG) {
      console.debug(`[LOG-debug]`);
    }
  }

  public async verbose(message: string, data?: any) {
    if (LOG_LEVEL >= LogLevel.VERBOSE) {
      console.log(`[LOG-verbose]`);
    }
  }
}
