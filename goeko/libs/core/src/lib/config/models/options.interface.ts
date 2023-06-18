export interface Options {
	/**
	 *  Define the endopoint for login
	 */
	endopoint: string;

	tokenAccess: string;

	isConsumer?: true;

	consumerSecret?: string;
	consumerKey?: string;
}
