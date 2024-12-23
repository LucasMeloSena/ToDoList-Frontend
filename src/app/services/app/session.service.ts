import { Injectable } from "@angular/core";
import { User } from "../../models/user";

@Injectable({ providedIn: "root" })
export class SessionService {
  getUserData(): User | null {
    if (typeof window !== "undefined" && window.sessionStorage) {
      const userData = sessionStorage.getItem("user");
      return userData ? JSON.parse(userData) : null;
    }
    return null;
  }

  clearUserData() {
    if (typeof window !== "undefined" && window.sessionStorage) {
      sessionStorage.removeItem("user");
    }
  }
}
