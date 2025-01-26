import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UpdateUserService } from '../../services/update-user.service';
import { CreateUserService } from '../../services/create-user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { IUserRequest } from '../../interfaces/user-request.interface';

@Component({
  selector: 'app-user-infos',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './user-infos.component.html',
  styleUrl: './user-infos.component.scss'
})
export class UserInfosComponent {
  userInfosForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    username: new FormControl(''),
    password: new FormControl(''),
  });

  private readonly _updateUserService = inject(UpdateUserService);
  private readonly _createUserService = inject(CreateUserService);

  createUser() {
    this._createUserService.createUser(this.userInfosForm.value as IUserRequest).subscribe({
      next: () => {
        this.userInfosForm.setErrors({ 'create-user-success': true});
      },
      error: (error: HttpErrorResponse) => {
        const ALREADY_EXISTING_USERS = error.status === 409;

        if(ALREADY_EXISTING_USERS) {
          return this.userInfosForm.setErrors({ 'existing-user-error': true});
        }

        return this.userInfosForm.setErrors({ 'create-user-error':true});
      }
    })
  }

  updateUser() {
    this._updateUserService.updateUser(this.userInfosForm.value as IUserRequest).subscribe({
      // next: (poderia usar o return do service) => {},
      next: () => {
        this.userInfosForm.setErrors({ 'update-success': true});
        console.log('funfou')
      },
      error: () => {
        console.log('não funfou')
        this.userInfosForm.setErrors({ 'update-error': true});
      },
    });
  }
}
