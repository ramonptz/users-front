import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IUserRequest } from './../interfaces/user-request.interface';
import { ICreateUserResponse } from './../interfaces/creat-user-response.interface';

@Injectable({
  providedIn: 'root'
})
export class CreateUserService {
  private readonly _httpClient = inject(HttpClient);

  createUser(newUser: IUserRequest){
    const headers = new HttpHeaders().set('authorization', 'Bearer ' + localStorage.getItem('token')  )
    return this._httpClient.post<ICreateUserResponse>(
      'http://localhost:3000/create-user',
      newUser,
      { headers:headers }
     )
  }

}
