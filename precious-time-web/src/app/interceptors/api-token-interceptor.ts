import { HttpInterceptorFn } from '@angular/common/http';

export const apiTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const reqHeader = req.clone({
    headers: req.headers.set('Authorization', `Bearer ${localStorage.getItem('token')!}`)
  })
  return next(reqHeader);
};
