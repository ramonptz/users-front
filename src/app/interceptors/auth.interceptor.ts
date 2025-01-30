import { HttpBackend, HttpContext, HttpContextToken, HttpInterceptorFn } from '@angular/common/http';

export const AUTH_TOKEN_ENABLED = new HttpContextToken<boolean>(() => true);

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  console.log('authRequest');
  console.log('req', req);
  console.log('context', req.context.get(AUTH_TOKEN_ENABLED));

  let newReq = req;

  const APPLY_AUTH_TOKEN = req.context.get(AUTH_TOKEN_ENABLED);

  if(APPLY_AUTH_TOKEN){
    newReq = req.clone({
      headers: req.headers.set('authorization', 'Bearer ' + localStorage.getItem('token')),
    })
  }


  // const newReq = req.clone({
  //   headers: req.headers.set('Authorization', 'Bearer ' + localStorage.getItem('token')),
  // });

  return next(newReq);
};
