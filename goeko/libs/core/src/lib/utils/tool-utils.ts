import { AbstractControl, FormArray } from "@angular/forms";
import { Observable, distinctUntilChanged, map, merge } from "rxjs";

export function valueChangeArray(value: FormArray): Observable<any> {
	return merge(
		...value.controls.map((control: AbstractControl, index: number) =>
			control.valueChanges.pipe(distinctUntilChanged(),map((value) => ({ rowIndex: index, control: control, data: value })))
		)
	);
}