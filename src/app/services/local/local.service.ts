import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalService {

  constructor() { }

  public saveData(key: string, value: string) {

    localStorage.setItem(key, JSON.stringify(value));
  }

  public getData(key: string) {
    return JSON.parse(localStorage.getItem(key)!)
  }

  public removeData(key: string) {
    localStorage.removeItem(key);
  }

  public clearData() {
    localStorage.clear();
  }

  public getUserName() {
    const user = JSON.parse(localStorage.getItem("user")!)
    return user.username
  }

  public getRole() {
    const user = JSON.parse(localStorage.getItem("user")!)
    return user.role
  }

  public getUserId() {
    const user = JSON.parse(localStorage.getItem("user")!)
    return user.id
  }

  public checkUser() {
    const user = JSON.parse(localStorage.getItem("user")!)
    if (user) {
      if (user.role == 'u') {
        return true
      }
    }
    return false
  }

  public checkAdmin() {
    const user = JSON.parse(localStorage.getItem("user")!)
    if (user) {
      if (user.role == 'a') {
        return true
      }
    }
    return false
  }
}
