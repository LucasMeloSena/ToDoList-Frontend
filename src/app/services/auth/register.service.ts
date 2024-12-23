import { Injectable, signal } from "@angular/core";
import { User } from "../../models/user";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { firstValueFrom } from "rxjs";
import { injectMutation } from "@tanstack/angular-query-experimental";
import { LoginParams } from "./login.service";
import { Response } from "../../models/response";
import { environment } from "../../../environments/environment.development";

@Injectable({ providedIn: "root" })
export class RegisterService {
  constructor(private readonly http: HttpClient) {}

  isLoginPage = signal(true);

  updateCurrentPage(value: boolean) {
    this.isLoginPage.set(value);
  }

  mutation = injectMutation(() => ({
    mutationFn: (user: User) => this.createUserApi(user),
  }));

  private async createUserApi(user: LoginParams): Promise<Response<User>> {
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
    });
    const response = await firstValueFrom(this.http.post<Promise<Response<User>>>(`${environment.apiUrl}/user/register`, user, { headers }));
    return response;
  }

  async createUser(user: User) {
    const response = await this.mutation.mutateAsync(user);
    if (response.error) throw new Error();
  }
}
