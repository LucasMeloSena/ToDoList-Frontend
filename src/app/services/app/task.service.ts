import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { injectMutation } from "@tanstack/angular-query-experimental";
import { environment } from "../../../environments/environment.development";
import { firstValueFrom } from "rxjs";
import { Response } from "../../models/response";
import { Task } from "../../models/task";

@Injectable({ providedIn: "root" })
export class TaskService {
  constructor(private http: HttpClient) {}

  mutation = injectMutation(() => ({
    mutationFn: (task: Task) => this.createTaskApi(task),
  }));

  private async createTaskApi(task: Task): Promise<Response<string>> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    });
    const response = await firstValueFrom(this.http.post<Promise<Response<string>>>(`${environment.apiUrl}/task/register`, task, { headers }));
    return response;
  }

  async createTask(task: Task) {
    const response = await this.mutation.mutateAsync(task);
    if (response.error) throw new Error();
  }

  async fetchTasksApi(): Promise<Response<Task[]>> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    });
    const response = await firstValueFrom(this.http.get<Promise<Response<Task[]>>>(`${environment.apiUrl}/task`, { headers }));
    return response;
  }
}
