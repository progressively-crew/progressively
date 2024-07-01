import { Request } from 'express';
import * as uap from 'ua-parser-js';

const defaultValue = 'Unknown';

export interface DeviceInfo {
  os: string;
  browser: string;
  osVersion: string;
  browserVersion: string;
}
export const getDeviceInfo = (request: Request): DeviceInfo => {
  const ua = uap(request.headers['user-agent']);
  const browser = ua?.browser?.name || defaultValue;
  const browserVersion = ua?.browser?.version || defaultValue;
  const os = ua?.os?.name || defaultValue;
  const osVersion = ua?.os?.version || defaultValue;

  return { os, browser, osVersion, browserVersion };
};
