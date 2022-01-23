import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from './user.entity';

export const GetUser = createParamDecorator(
  (data: string, context: ExecutionContext): User => {
    const req = context.switchToHttp().getRequest();
    const user = req.user;

    return data ? user?.[data] : user;
  },
);
