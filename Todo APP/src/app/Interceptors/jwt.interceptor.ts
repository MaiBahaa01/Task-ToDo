import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { TokenService } from '../Services/token.service';

export const jWTInterceptor: HttpInterceptorFn = (req, next) => {
  const tokenService=inject (TokenService)
  const mytoken=tokenService.getToken();
  const newReq=req.clone({
    setHeaders:{
      Authorization:`Bearer ${mytoken}`
    }
  });
  return next(newReq);
};
