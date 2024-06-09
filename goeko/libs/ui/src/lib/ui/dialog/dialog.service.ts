import { ComponentType } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { DialogConfig } from '../dialog-message/dialog-message.service';
import { DEFAULT_CONFIG, OverlayRefService } from '../dialog-message/overlay-ref.service';
import { UIDialogRef } from '../dialog-message/ui-dialog-ref';

@Injectable({providedIn: 'root'})
export class DialogService {
    private _uiDialogRef!: UIDialogRef<any>;
	constructor(private _dialogRef: OverlayRefService) {}

	open<T>(_component: ComponentType<T>, config?: DialogConfig) {
		const _config = { ...DEFAULT_CONFIG, ...config };
		this._uiDialogRef = this._dialogRef.attach<T>(_component, _config) as any;
		return this._uiDialogRef;
	}

	
	close(data?: any) {
		this._uiDialogRef.close(data);
	}
    
}