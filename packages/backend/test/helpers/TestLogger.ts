/** eslint-disable @typescript-eslint/no-empty-function */
import { LoggerService } from '@nestjs/common';

export class TestLogger implements LoggerService {
  /**
   * Write a 'log' level log.
   */
  log() {
    // do stuff
  }

  /**
   * Write an 'error' level log.
   */
  error() {
    // do stuff
  }

  /**
   * Write a 'warn' level log.
   */
  warn() {
    // do stuff
  }

  /**
   * Write a 'debug' level log.
   */
  debug() {
    // do stuff
  }

  /**
   * Write a 'verbose' level log.
   */
  verbose() {
    // do stuff
  }
}
