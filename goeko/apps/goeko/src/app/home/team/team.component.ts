import { Component, OnInit } from '@angular/core';
import { TEAMS, Team } from './teams.contants';
import { ContentFulService } from '@goeko/store';
import { DataTeam } from './team.model';
import { TranslateService } from '@ngx-translate/core';

const CONTENT_TYPE = 'team';
@Component({
	selector: 'goeko-team',
	templateUrl: './team.component.html',
	styleUrls: ['./team.component.scss'],
})
export class TeamComponent implements OnInit {
	public teams = TEAMS;
	public active = false;
	public dataTeams!: DataTeam[];
	constructor(private _contentService: ContentFulService, private _translateService: TranslateService) {}

	ngOnInit(): void {
		this.getDataTeam();
		this.onChangeLang();
	}
	public toogle(member: Team) {
		member.active = !member.active;
	}

	getDataTeam() {
		this._contentService.getContentType(CONTENT_TYPE).subscribe((data) => {
			if (data) {
				this.dataTeams = data.items.map((item) => new DataTeam(item.fields as any));
			}
		});
	}

	private onChangeLang() {
		this._translateService.onLangChange.subscribe(() => {
			this.getDataTeam();
		});
	}
}
