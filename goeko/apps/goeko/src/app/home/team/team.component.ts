import { Component } from '@angular/core';
import { TEAMS, Team } from './teams.contants';

@Component({
	selector: 'goeko-team',
	templateUrl: './team.component.html',
	styleUrls: ['./team.component.scss'],
})
export class TeamComponent {
	public teams = TEAMS;
	public active = false;

	public toogle(member: Team) {
		member.active = !member.active;
	}
}
