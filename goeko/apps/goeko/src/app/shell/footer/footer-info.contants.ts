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
  {
    title: 'FOOTER.service',
    elements: [
      {
        title: 'Transition ecology',
        url: '',
      },
    ],
  },

  {
    title: 'FOOTER.resources',
    elements: [
      {
        title: 'WhitePapers',
        url: '',
      },
      {
        title: 'LEGAL.privacyPolicy',
        url: 'home/privacy-policy',
      },
      {
        title: 'LEGAL.cookiesPolicy',
        url: 'home/cookies-policy',
      },
    ],
  },

  {
    title: 'FOOTER.contact',
    elements: [
      {
        title: 'info@goeko.ch',
        url: '',
        logo: 'mail',
      }
    ],
  },
];
