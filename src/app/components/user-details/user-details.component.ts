import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
})
export class UserDetailsComponent implements OnInit {
  user!: User | undefined;

  friendsListOpen = false;

  friends: User[]  | undefined = [];

  pageSize = 1;

  pageCount = 20;

  isLoading = false;

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight &&
      !this.isLoading &&
      this.friends?.length !== this.user?.friends?.length
    ) {
      this.isLoading = true;

      setTimeout(() => {
        this.friends = [
          ...(this.friends || []),
          ...(this.user?.friends || [])?.slice(
            this.pageSize * this.pageCount,
            this.pageSize * this.pageCount + this.pageCount
          ),
        ];
        this.pageSize += 1;
        this.isLoading = false;
      }, 1000);
    }
  }

  constructor(
    private route: ActivatedRoute,
    private userService: UsersService
  ) {
    const userId = this.route.snapshot.params['id'];

    this.userService.getUserById(userId).then((user) => {
      this.user = user;
      this.friends = this.user?.friends.slice(0, 20);

    });
  }

  ngOnInit(): void {}

  showFriends() {
    this.friendsListOpen = !this.friendsListOpen;
  }
}
