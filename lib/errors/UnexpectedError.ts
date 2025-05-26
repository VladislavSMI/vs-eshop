import { PublicError } from './PublicError';

export class UnexpectedError extends PublicError {
  constructor() {
    super({
      code: 'UNEXPECTED_ERROR',
      message: 'An unexpected error occurred.',
      messageKey: 'responseError.unexpected',
    });
    this.name = 'UnexpectedError';
  }
}
