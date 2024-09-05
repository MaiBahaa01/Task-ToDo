import {  inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TokenService } from '../Services/token.service';

export const authGuard: CanActivateFn = (route, state) => {
  const router= inject(Router)
  const tokenService= inject (TokenService)
  const isToken=tokenService.checkToken();
  if(isToken){
    return true;
  }
  else{
    router.navigate(["/login"])
    return false
  }
};
