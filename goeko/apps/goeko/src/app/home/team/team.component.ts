import { Component, OnInit } from '@angular/core';
import { TEAMS, Team } from './teams.contants';
import { ContentFulService } from '@goeko/store';
import { DataTeam } from './team.model';

@Component({
	selector: 'goeko-team',
	templateUrl: './team.component.html',
	styleUrls: ['./team.component.scss'],
})
export class TeamComponent implements OnInit {
	public teams = TEAMS;
	public active = false;
	public dataTeams!: DataTeam[];
	constructor(private _contentService: ContentFulService) {}

	ngOnInit(): void {
		this.getDataTeam();
	}
	public toogle(member: Team) {
		member.active = !member.active;
	}

	getDataTeam() {
		this._contentService.getContentType('team').subscribe((data) => {
			if (data) {
				this.dataTeams = data.items.map((item) => new DataTeam(item.fields as any));
				console.log(this.dataTeams);
			}
		});
	}
}
