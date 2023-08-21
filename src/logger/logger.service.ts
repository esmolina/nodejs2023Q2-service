import { Injectable } from '@nestjs/common';
import { LoggerService } from '@nestjs/common';
import { Request, Response } from 'express';
import { config } from 'dotenv';
import { join } from 'path';
import { mkdir, stat, writeFile, access, appendFile } from 'fs/promises';
import { stdout } from 'node:process';
import { LogLevel } from '../types/enams';

const env = config();
const LOG_LEVEL: number = Number(env.parsed.LOG_LEVEL) || 1;
const MAX_LOG_FILE_SIZE: number = Number(env.parsed.MAX_LOG_FILE_SIZE) || 1000;
const LOG_DIRECTORY_NAME = env.parsed.LOG_DIRECTORY_NAME || 'journal';
const LOG_FILE_NAME = env.parsed.LOG_FILE_NAME || 'logs.log';
const ERROR_FILE_NAME = env.parsed.ERROR_FILE_NAME || 'errors.log';

const logDirectoryPath = join(LOG_DIRECTORY_NAME);
const logFilePath = join(logDirectoryPath, LOG_FILE_NAME);
const errorFilePath = join(logDirectoryPath, ERROR_FILE_NAME);

const outputChannel = stdout;

@Injectable()
export class CustomLoggerService implements LoggerService {
  private logFilePath: string;
  private errorFilePath: string;

  constructor() {
    this.logFilePath = logFilePath;
    this.errorFilePath = errorFilePath;
    this.createLogDirectoryIfNotExists();
    this.createLogFileIfNotExists(logFilePath);
    this.createLogFileIfNotExists(errorFilePath);
  }

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
      const resultMessage = `[LOG-Log] ${message} ${requestData} ${responseCode}\n`;
      await this.printInStdout(resultMessage);
      await this.appendToFile(this.logFilePath, resultMessage);
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

  private async isLogDirectoryExist() {
    try {
      await access(logDirectoryPath);
      return true;
    } catch (error) {
      return false;
    }
  }

  private async isLogFileExist(filePath: string) {
    try {
      await access(filePath);
      return true;
    } catch (error) {
      return false;
    }
  }

  private async createLogFile(filePath: string) {
    await writeFile(filePath, '');
  }

  private async createLogDirectoryIfNotExists() {
    if (!(await this.isLogDirectoryExist())) {
      await mkdir(logDirectoryPath, { recursive: true });
    }
  }

  private async createLogFileIfNotExists(filePath: string) {
    if (!(await this.isLogFileExist(filePath))) {
      await this.createLogFile(filePath);
    }
  }

  private isPathContainsErrorsPath(patch: string, errorPath: string): boolean {
    return patch.includes(errorPath);
  }

  private async appendToFile(filePath: string, logMessage: string) {
    const fileInfo = await stat(filePath);
    const fileSizeInBytes = fileInfo.size;
    const fileSizeKb = fileSizeInBytes / 1024;

    if (fileSizeKb >= MAX_LOG_FILE_SIZE) {
      const timestamp = Date.now().toString();
      const isErrorLogging = this.isPathContainsErrorsPath(
        filePath,
        errorFilePath,
      );
      let newLogFilePath: string;
      if (isErrorLogging) {
        newLogFilePath = join(errorFilePath, timestamp);
        this.errorFilePath = newLogFilePath;
      } else {
        newLogFilePath = join(logFilePath, timestamp);
        this.logFilePath = newLogFilePath;
      }
      await this.createLogFile(newLogFilePath);
      await appendFile(newLogFilePath, logMessage);
    } else {
      await appendFile(filePath, logMessage);
    }
  }

  private async printInStdout(logMessage: string) {
    outputChannel.write(logMessage);
  }
}
