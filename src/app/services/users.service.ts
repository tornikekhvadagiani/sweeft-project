import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  url = 'http://localhost:3000/users';

  async getAllUsers(): Promise<User[]> {
    const data = await fetch(this.url);
    return (await data.json()) ?? [];
  }

  async getUserById(id: number): Promise<User | undefined> {
    const data = await fetch(`${this.url}/${id}`);
    return (await data.json()) ?? {};
  }
}
