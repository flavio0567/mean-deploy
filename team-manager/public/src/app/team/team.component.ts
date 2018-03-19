import { Component, OnInit, Inject } from '@angular/core';
import { TeamService } from './team.service';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatFormFieldModule, MatInputModule } from '@angular/material';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {
  user;
  
  constructor(private _teamService: TeamService, private _router: Router, public dialog: MatDialog) { }

  ngOnInit() {
    setTimeout(() => this.openDialog(), 0);
  }

  openDialog(): void {
    let dialogRef = this.dialog.open(Login, {
      width: '250px',
      data: {
        user: this.user
      }
    });

    dialogRef.afterClosed().subscribe(res => {
      console.log('The dialog was closed');
      this.user = res;
      });
  }

  // onSubmit() {
  //   this._teamService.login(this.user, (res) => {
  //     this._router.navigate(['/players/list']);
  //   });

  // }

}


@Component({
  selector: 'app-login',
  templateUrl: './login/login.component.html',
})

export class Login {
  user;

  constructor(private _teamService: TeamService, private _router: Router, 
    public dialogRef: MatDialogRef<Login>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  login(user) {
    this.dialogRef.close();
    this._teamService.login((user),(res) => { });
    this._router.navigate(['/players/list']);
  }

}
