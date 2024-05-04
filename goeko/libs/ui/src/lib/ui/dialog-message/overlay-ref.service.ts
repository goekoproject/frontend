import { ComponentType, Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Injectable, Injector, StaticProvider } from '@angular/core';
import { DialogConfig } from './dialog-message.service';
import { OVERLAY } from './overlay.token';
import { UIDialogRef } from './ui-dialog-ref';
export interface Config {
	panelClass?: string;
	hasBackdrop?: boolean;
	backdropClass?: string;
	data?: any;
	elementRef?: any;
}
const DEFAULT_CONFIG: Config = {
	hasBackdrop: true,
	backdropClass: 'modal-backdrop',
	panelClass: 'ui-modal',
	data: null,
	elementRef: null
};
@Injectable()
export class OverlayRefService {
	config!: Config;
	overlayRef!: OverlayRef;

	constructor(private readonly overlay: Overlay) {}

	/**
	 * Attach component all screens to the overlay
	 * @param _component
	 * @param _config
	 * @returns
	 */
	attach<T>(_component: ComponentType<T>, _config?: DialogConfig): UIDialogRef<T> {
		this.config = { ...DEFAULT_CONFIG, ..._config };
		// Returns an OverlayRef (which is a PortalHost)
		this.overlayRef = this.createOverlay();
		const _overlayRef = this.overlayRef;

		const dialogRef = new UIDialogRef<T>(_overlayRef);
		const injector = this.createInjector(this.config, dialogRef);

		// Create ComponentPortal that can be attached to a PortalHost
		const componentPortal = new ComponentPortal(_component, undefined, injector);

		// Attach ComponentPortal to PortalHost
		if (!_overlayRef.hasAttached()) {
			_overlayRef.attach(componentPortal);
		}
		_overlayRef.backdropClick().subscribe(() => dialogRef.close());
		return dialogRef;
	}

	detach() {
		this.overlayRef?.detach();
	}

	/**
	 * Basic config component on center screen
	 * @returns
	 */
	private _getOverlayConfig() {
		const positionStrategy = this.overlay.position().global().centerHorizontally().centerVertically();

		const overlayConfig = new OverlayConfig({
			hasBackdrop: false,
			backdropClass: this.config.backdropClass,
			panelClass: this.config.panelClass,
			scrollStrategy: this.overlay.scrollStrategies.block(),
			positionStrategy
		});

		return overlayConfig;
	}

	/**
	 * Basic config component conecte elementRef
	 * @returns
	 */
	private _getOverlayConfigConectElementRef() {
		const pos = this.config.elementRef.nativeElement.getBoundingClientRect();
		const positionStrategy = this.overlay
			.position()
			.flexibleConnectedTo(this.config.elementRef)
			.withFlexibleDimensions(false)
			.withPositions([
				{
					originX: 'end',
					originY: 'center',
					overlayX: 'end',
					overlayY: 'top',
					offsetY: -23
				}
			]);
		const overlayConfig = new OverlayConfig({
			hasBackdrop: this.config.hasBackdrop,
			panelClass: this.config.panelClass,
			backdropClass: this.config.backdropClass,
			scrollStrategy: this.overlay.scrollStrategies.block(),
			positionStrategy
		});

		return overlayConfig;
	}
	private createInjector<T>(config: Config, overlayRef: UIDialogRef<any>) {
		const providers: StaticProvider[] = [
			{ provide: UIDialogRef, useValue: overlayRef },
			{ provide: OVERLAY, useValue: config.data }
		];

		return Injector.create({ providers });
	}

	private createOverlay() {
		let overlayConfig;
		if (this.config.elementRef) {
			overlayConfig = this._getOverlayConfigConectElementRef();
		} else {
			// Returns an OverlayConfig
			overlayConfig = this._getOverlayConfig();
		}

		// Returns an OverlayRef
		return this.overlay.create(overlayConfig);
	}
}
