import { Component, HostListener, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent implements OnInit {
  allUsers: User[] = [];

  users: User[] = [];

  isLoading = false;

  pageSize = 1;

  pageCount = 30;

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight &&
      !this.isLoading &&
      this.users.length !== this.allUsers.length
    ) {
      this.isLoading = true;

      setTimeout(() => {
        this.users = [
          ...this.users,
          ...this.allUsers.slice(
            this.pageSize * this.pageCount,
            this.pageSize * this.pageCount + this.pageCount
          ),
        ];
        this.pageSize += 1;
        this.isLoading = false;
      }, 1000);
    }
  }

  constructor(private userService: UsersService) {
    this.isLoading = true;

    this.userService.getAllUsers().then((users) => {
      this.allUsers = users;
      this.users = this.allUsers.slice(0, this.pageCount);
      this.isLoading = false;
    });
  }

  ngOnInit(): void {}
}
