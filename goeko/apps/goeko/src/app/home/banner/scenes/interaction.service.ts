import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class InteractionService {
	onSMEClick = new Subject<boolean>();
	onCleanTeachClick = new Subject<boolean>();
	onBankClick = new Subject<boolean>();

	onSMEHover = new Subject<boolean>();
	onCleanTeachHover = new Subject<boolean>();
	onBankHover = new Subject<boolean>();

	constructor() {}
}
