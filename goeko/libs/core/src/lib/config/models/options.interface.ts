export interface Options {
	/**
	 *  Define the endopoint for login
	 */
	endopoint: string;
	domainAuth0: string;

	tokenAccess: string;

	isConsumer?: true;

	clientSecret: string;
	clientId: string;
}
