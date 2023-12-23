export function AutoUnsubscribe(): ClassDecorator {
	// eslint-disable-next-line @typescript-eslint/ban-types
	return (constructor: Function) => {
		const original = constructor.prototype.ngOnDestroy;

		constructor.prototype.ngOnDestroy = function (...args: any[]) {
			this.destroy$.next();
			this.destroy$.unsubscribe();

			if (original && typeof original === 'function') {
				original.apply(this, args);
			}
		};
	};
}
