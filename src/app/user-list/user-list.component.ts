import { Component, OnInit } from '@angular/core';
import { RestApiService } from "../shared/rest-api.service";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  User: any = [];

  constructor(public restApi: RestApiService) { }

  ngOnInit() {
    this.loadUsers()
  }

  displayedColumns: string[] = ['id', 'name', 'edit', 'delete'];

  loadUsers() {
    return this.restApi.getUsers().subscribe((data: {}) => {
      this.User = data;
      this.User.delete = function(id) {
        this.deleteUser(id);
      }

      this.User.edit = {}

      this.User.sort(function(a, b) {
        if (a.name < b.name)  return -1;
        if (a.name > b.name)  return 1;
        return 0;
      });
    })
  }


  deleteUser(id) {
    if (window.confirm('Are you sure, you want to delete?')){
      this.restApi.deleteUser(id).subscribe(data => {
        this.loadUsers()
      })
    }
  } 
}
