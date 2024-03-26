export interface ProviderDetails {
    subscriptionId: string;
}

export interface PaymentSuscription {
    id: string;
    cleantechId: string;
    providerDetails: ProviderDetails;
    date: string;
}