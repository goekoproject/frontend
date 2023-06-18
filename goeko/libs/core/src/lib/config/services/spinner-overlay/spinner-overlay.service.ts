import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { SpinnerOverlayComponent } from './components/spinner-overlay.component';

/**
 * Based on:
 * https://blog.thoughtram.io/angular/2017/11/20/custom-overlays-with-angulars-cdk.html
 */

interface SpinnerConfig {
	panelClass?: string;
	hasBackdrop?: boolean;
	backdropClass?: string;
}

const DEFAULT_CONFIG: SpinnerConfig = {
	hasBackdrop: true,
	backdropClass: 'dark-backdrop',
	panelClass: 'spinner-overlay-panel',
};

@Injectable()
export class SpinnerOverlayService {
	overlayRef!: OverlayRef;

	constructor(private overlay: Overlay) {}

	open() {
		// Returns an OverlayRef (which is a PortalHost)
		this.overlayRef = this.overlay.create({
			panelClass: 'spinner',
		});

		// Create ComponentPortal that can be attached to a PortalHost
		const filePreviewPortal = new ComponentPortal(SpinnerOverlayComponent);

		// Attach ComponentPortal to PortalHost
		if (!this.overlayRef.hasAttached()) {
			this.overlayRef.attach(filePreviewPortal);
		}
	}

	close() {
		this.overlayRef?.detach();
		this.overlayRef?.dispose();
	}
}
