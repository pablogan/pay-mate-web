import { User } from './../../../shared/models/user.model';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../shared/services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  user: User = new User();
  constructor(
    private router: Router,
    private userService: UserService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const groupId = params.groupId;
      const userId = params.userId;
      // console.log('LOS PARAMS', params);

      this.userService.select(groupId, userId)
        .subscribe(
          (user: User) => this.user = user
        );
    });
  }

  onDeleteUser() {
    this.route.params.subscribe(params => {
      const groupId = params.groupId;
      const userId = this.user.id;
      this.userService.delete(groupId, userId)
        .subscribe(() => { });
    });
  }

  onLinkCreatePayment() {
    this.route.params.subscribe(params => {
      const groupId = params.groupId;
    this.router.navigate(['groups/', groupId, 'payments', 'create']);
    });
  }

  onPaymentDetails(groupId: string, paymentId: string) {
    console.log('EL PAYMENT ID', paymentId);
    this.router.navigate(['groups/', groupId, 'payments', paymentId]);
  }
}
