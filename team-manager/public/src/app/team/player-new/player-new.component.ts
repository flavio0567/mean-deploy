import { Component, OnInit } from '@angular/core';
// import { Player } from '../player';
import { Router, ActivatedRoute } from '@angular/router';
import { TeamService } from '../team.service';

@Component({
  selector: 'app-player-new',
  templateUrl: './player-new.component.html',
  styleUrls: ['./player-new.component.css']
})
export class PlayerNewComponent implements OnInit {
  user;
  newPlayer: any;

  constructor(      
    private _teamService: TeamService, 
    private _router: Router, 
    private _route: ActivatedRoute
) { }

  ngOnInit() {
    this.user = this._teamService.user;
    this.newPlayer = { name: "", position: "" };
  }

  addPlayer() {
    console.log('player new', this.newPlayer);
    this._teamService.addPlayer(this.newPlayer, (res) => {
      this._router.navigate(['/players/list', res]);
    });
  };

  logout() {
    this._teamService.logout(this.user, (res) => { });
    this._router.navigate(['/']);
  }

}
