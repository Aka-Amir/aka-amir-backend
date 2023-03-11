import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const TokenData = createParamDecorator((_, ctx: ExecutionContext) => {
  try {
    const req = ctx.switchToHttp().getRequest();
    delete req.token_data.iat;
    delete req.token_data.exp;
    return req.token_data as object;
  } catch (e) {
    console.log(e);
    return null;
  }
});
