import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'platform',
})
export class SessionStorageService {
	private readonly _sessionStorage = sessionStorage;

	constructor() {}

	/**
	 * Gets the object from the navigator's Session Storage as the object passed as generic.
	 *
	 * @param name name of the object to be retrieved
	 * @generic T type of the object to be retrieved
	 */
	getItem<T>(name: string): T | null {
		const stringifiedObj = sessionStorage.getItem(name);

		if (stringifiedObj && stringifiedObj !== 'undefined') {
			const decode = decodeURIComponent(window.atob(stringifiedObj));
			return JSON.parse(decode) as T;

			/* 			return JSON.parse(atob(stringifiedObj)) as T;
			 */
		}

		return null;
	}

	/**
	 * Sets the object passed as parameter with the key as the name passed as parameter
	 * on the localStorage of the navigator. It gets a base64 encryption when saved.
	 *
	 * @param name key of the object to be stored
	 * @param obj object to be stored
	 */
	setItem<T>(name: string, obj: T, code?: boolean): void {
		if (code) {
			sessionStorage.setItem(name, window.btoa(encodeURIComponent(JSON.stringify(obj))));
			return;
		}
		sessionStorage.setItem(name, window.btoa(encodeURIComponent(JSON.stringify(obj))));
	}

	/**
	 * Deletes the item from the navigator's Session Storage
	 *
	 * @param name key of the property to be removed from the session's storage
	 */
	removeItem(name: string): void {
		sessionStorage.removeItem(name);
	}

	/**
	 * Method that clears the Local Storage
	 */
	clearItems(): void {
		sessionStorage.clear();
	}
}
