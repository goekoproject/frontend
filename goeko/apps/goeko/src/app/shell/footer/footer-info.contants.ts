import { VAR_GENERAL } from "@goeko/business-ui";

export interface FooterInfo {
  title: string;
  elements: Elements[];
}
export interface Elements {
  title: string;
  url: string;
  logo?: string;
}

export const FOOTER_INFO = [
/*   {
    title: 'FOOTER.service',
    elements: [
      {
        title: 'Transition ecology',
        url: '',
      },
    ],
  }, */

  {
    title: 'FOOTER.resources',
    elements: [
      {
        title: 'WhitePapers',
        url: '',
      },
      {
        title: 'LEGAL.privacyPolicy',
        url: 'privacy-policy',
      },
      {
        title: 'LEGAL.cookiesPolicy',
        url: 'cookies-policy',
      },
    ],
  },

  {
    title: 'FOOTER.contact',
    elements: [
      {
        title: VAR_GENERAL.GOEKO_EMAIL,
        url: `malito:${VAR_GENERAL.GOEKO_EMAIL}`,
        logo: 'mail',
      }
    ],
  },
];
