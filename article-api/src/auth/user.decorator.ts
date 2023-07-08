import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserRole } from 'src/stubs/user/v1alpha/message';

export type UserRequest = {
  id: number,
  email: string,
  role: UserRole,
}

export const GRPCUser = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    return context.switchToRpc().getContext().user;
  },
);
