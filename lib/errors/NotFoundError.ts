import { PublicError } from './PublicError';

export class NotFoundError extends PublicError {
  constructor() {
    super({
      code: 'NOT_FOUND',
      message: 'The requested resource could not be found.',
      messageKey: 'responseError.notFound',
    });
    this.name = 'NotFoundError';
  }
}
