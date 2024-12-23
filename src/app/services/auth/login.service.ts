import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { injectMutation } from "@tanstack/angular-query-experimental";
import { environment } from "../../../environments/environment.development";
import { BehaviorSubject, firstValueFrom } from "rxjs";
import { Response } from "../../models/response";
import { Auth } from "../../models/auth";

export interface LoginParams {
  email: string;
  password: string;
}

@Injectable({ providedIn: "root" })
export class LoginService {
  constructor(private http: HttpClient) {}
  authenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  updateAuthState(value: boolean) {
    this.authenticated.next(value);
  }

  mutation = injectMutation(() => ({
    mutationFn: (login: LoginParams) => this.loginApi(login),
  }));

  private async loginApi(params: LoginParams): Promise<Response<Auth>> {
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
    });
    const response = await firstValueFrom(this.http.post<Promise<Response<Auth>>>(`${environment.apiUrl}/user/login`, params, { headers }));
    return response;
  }

  async login(params: LoginParams) {
    const response = await this.mutation.mutateAsync(params);
    if (response.error) throw new Error();
    localStorage.setItem("token", response.data.token);
    sessionStorage.setItem("user", JSON.stringify(response.data.user));
    this.updateAuthState(true);
  }
}
