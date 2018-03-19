import { Component, OnInit } from '@angular/core';
import { TeamService } from '../team.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-status-game',
  templateUrl: './status-game.component.html',
  styleUrls: ['./status-game.component.css']
})
export class StatusGameComponent implements OnInit {
  user;
  game;
  player;
  team;
  switch: boolean = true;

  constructor(private _teamService: TeamService, private _router: Router) { }

  ngOnInit() {
    this.user = this._teamService.user;
    this.game = 1;
    this.getPlayerList();
  }

  getPlayerList(){
    this._teamService.getPlayersList((res) => {
      this.team = res;
    });
  }

  logout() {
    this._teamService.logout(this.user, (res) => { });
    this._router.navigate(['/']);
  }
  
  switchPlaying(player) {
    if (player['game'][this.game]['action']['playing']) {
      player['game'][this.game]['action']['playing']    = false;
    } else {
      player['game'][this.game]['action']['playing']    = true;
      player['game'][this.game]['action']['notplaying'] = false;
      player['game'][this.game]['action']['undefined']  = false;
    }
    this._teamService.updatePlayer(player, (res) => {
      this.team.player = res;
    })
  }

  switchNotPlaying(player) {
    if (player['game'][this.game]['action']['notplaying']) {
        player['game'][this.game]['action']['notplaying'] = false;
    } else {
        player['game'][this.game]['action']['notplaying'] = true;
        player['game'][this.game]['action']['playing'] = false;
        player['game'][this.game]['action']['undefined'] = false;
    }
    this._teamService.updatePlayer(player, (res) => {
      this.team.player = res;
    })
  }
 
  switchUndefined(player) {
    if (player['game'][this.game]['action']['undefined']) {
        player['game'][this.game]['action']['undefined'] = false;
    } else {
        player['game'][this.game]['action']['undefined'] = true;
        player['game'][this.game]['action']['playing'] = false;
        player['game'][this.game]['action']['notplaying'] = false;
    }
    this._teamService.updatePlayer(player, (res) => {
      this.team.player = res;
    })
  }

}
