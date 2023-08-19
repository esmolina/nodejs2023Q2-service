import { Injectable } from '@nestjs/common';
import { LoggerService } from '@nestjs/common';
import { Request, Response } from 'express';
import { LogLevel } from '../types/enams';

@Injectable()
export class CustomLoggerService implements LoggerService {
  requestDataMessage: string;
  responseCodeMessage: string;

  constructor(private readonly logLevel: number) {
    this.logLevel = logLevel;
    this.requestDataMessage = '';
    this.responseCodeMessage = '';
  }

  public getRequestData(request: Request, query: any, body: any) {
    const { method, url } = request;
    this.requestDataMessage = `Method: ${method} URL: ${url}: Query params: ${JSON.stringify(
      query,
    )}, Body: ${JSON.stringify(body)}`;
  }

  public getResponseCode(response: Response) {
    const { statusCode } = response;
    this.responseCodeMessage = `Status code: ${statusCode}`;
  }

  public async log(
    message: string,
    request?: Request,
    response?: Response,
    query?: any,
    body?: any,
  ) {
    if (this.logLevel >= LogLevel.LOG) {
      const requestData = request ? `${this.requestDataMessage}` : '';
      const responseCode = response ? `${this.responseCodeMessage}` : '';
      console.log(`[LOG-Log] ${message} ${requestData} ${responseCode}`);
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
