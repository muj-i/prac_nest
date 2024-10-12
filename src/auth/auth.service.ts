import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  logIn() {
    return { msg: 'This action logs a user in' };
  }
  signUp() {
    return 'This action signs a user up';
  }
}
