import { Component, OnInit } from '@angular/core';
import { RestApiService } from "../shared/rest-api.service";
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  id = this.actRoute.snapshot.params['id'];
  userData: any = {};

  constructor(
    public restApi: RestApiService,
    public actRoute: ActivatedRoute,
    public router: Router
  ) { }

  ngOnInit() {
    this.restApi.getUser(this.id).subscribe((data: {}) => {
      this.userData = data;
    })
  }

  updateUser() {
    if(window.confirm('Are you sure, you want to update?')){
      this.restApi.updateUser(this.id, this.userData).subscribe(data => {
        this.router.navigate(['/user-list'])
      })
    }
  }
}
