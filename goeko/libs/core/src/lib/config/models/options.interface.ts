export interface Options {
  /**
   *  Define the endopoint for login
   */
  endopoint: string
  domainAuth0: string
  isConsumer?: true
  connection: string
  clientSecret: string
  clientId: string
  audience: string
}
