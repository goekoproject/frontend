import {
	AfterViewInit,
	Component,
	ContentChildren,
	Input,
	NgZone,
	OnInit,
	Provider,
	QueryList,
	forwardRef,
	isDevMode,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BadgeComponent } from './badge.component';
import { Observable, defer, merge, startWith, switchMap, take } from 'rxjs';
import { SelectionModel } from '@angular/cdk/collections';
import { V } from '@angular/cdk/keycodes';

const CONTROL_VALUE_ACCESSOR: Provider = {
	provide: NG_VALUE_ACCESSOR,
	useExisting: forwardRef(() => BadgeGroupComponent),
	multi: true,
};
@Component({
	selector: 'go-badge-group',
	templateUrl: './badge-group.component.html',
	styleUrls: ['./badge-group.component.scss'],
	providers: [CONTROL_VALUE_ACCESSOR],
})
export class BadgeGroupComponent implements ControlValueAccessor, OnInit, AfterViewInit {
	@ContentChildren(BadgeComponent) badge!: QueryList<BadgeComponent>;
	_selectionModel!: SelectionModel<BadgeComponent>;

	/**
	 * Function to compare the option values with the selected values. The first argument
	 * is a value from an option. The second is a value from the selection. A boolean
	 * should be returned.
	 */
	@Input()
	get compareWith() {
		return this._compareWith;
	}
	set compareWith(fn: (o1: any, o2: any) => boolean) {
		if (typeof fn !== 'function' && isDevMode()) {
			throw Error('`compareWith` must be a function.');
		}
		this._compareWith = fn;
	}

	/** Combined stream of all of the child options' change events. */
	// eslint-disable-next-line @typescript-eslint/member-ordering
	readonly optionSelectionChanges: Observable<any> = defer(() => {
		const options = this.badge;

		if (options) {
			return options.changes.pipe(
				startWith(options),
				switchMap(() => merge(...options.map((option: BadgeComponent) => option.onSelected$)))
			);
		}

		return this._ngZone.onStable.pipe(
			take(1),
			switchMap(() => this.optionSelectionChanges)
		);
	}) as Observable<any>;

	/** Comparison function to specify which option is displayed. Defaults to object equality. */
	private _compareWith = (o1: any, o2: any) => {
		if (o2 && typeof o2 === 'object') {
			return deepEqual(o1, o2);
		}
		return o1 === o2;
	};

	onChange = (value: any) => {};
	onTouched = () => {};

	writeValue(value: any): void {
		this._assignValue(value);
	}

	registerOnChange(fn: (value: any) => void): void {
		this.onChange = fn;
	}

	registerOnTouched(fn: () => void): void {
		this.onTouched = fn;
	}

	setDisabledState(isDisabled: boolean): void {
		// Actualiza el estado de tu componente aquí
	}

	constructor(protected _ngZone: NgZone) {}

	ngOnInit(): void {
		this._selectionModel = new SelectionModel<BadgeComponent>(true);
	}

	ngAfterViewInit(): void {
		this.optionSelectionChanges.subscribe((badge) => this._selectOption(badge));
	}

	private _selectOption(option: BadgeComponent) {
		if (this._selectionModel.isSelected(option)) {
			this._selectionModel.deselect(option);
		} else {
			this._selectionModel.select(option);
		}

		this._selectedAndPropagateValue(option);
	}
	private _selectedAndPropagateValue(badge: BadgeComponent) {
		if (!badge) {
			return;
		}
		badge.onSelected(badge.selected);
		this._propagateValue();
	}

	private _propagateValue() {
		const valuesBadge = this._selectionModel.selected.map((badge) => badge.value);
		this.onChange(valuesBadge);
		this.onTouched();
	}

	private _assignValue(value: any[]) {
		if (!value) {
			return;
		}
		setTimeout(() => value.forEach((currentValue) => this._selectOptionValue(currentValue)));
	}

	private _selectOptionValue(value: any) {
		const badgeOption = this.badge?.find((option) => {
			if (this._selectionModel.isSelected(option)) {
				return false;
			}

			return option.value != null && this._compareWith(option.value, value);
		});
		if (badgeOption) {
			this._selectionModel.select(badgeOption);
			this._selectedAndPropagateValue(badgeOption);
		}
		return badgeOption;
	}
}
function deepEqual(object1: any, object2: any): boolean {
	const keys1 = Object.keys(object1);
	const keys2 = Object.keys(object2);

	if (keys1.length !== keys2.length) {
		return false;
	}

	for (const key of keys1) {
		const val1 = object1[key];
		const val2 = object2[key];
		if (val1 !== val2) {
			return false;
		}
	}

	return true;
}
