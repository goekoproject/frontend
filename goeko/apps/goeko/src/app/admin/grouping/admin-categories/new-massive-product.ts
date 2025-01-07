import { NewProduct } from '@goeko/store'

export function getProductBySubcategoryId(subcategoryId: string): NewProduct[] {
  const products = [
    {
      subcategoryId: subcategoryId,
      label: {
        translations: [
          { label: 'Isolation of attics', lang: 'en' },
          { label: 'Isolation des combles', lang: 'fr' },
          { label: 'Aislamiento de los áticos', lang: 'es' },
          { label: 'Dämmung der Dachböden', lang: 'de' },
        ],
      },
    },
    {
      subcategoryId: subcategoryId,
      label: {
        translations: [
          { label: 'Wall insulation', lang: 'en' },
          { label: 'Isolation des murs', lang: 'fr' },
          { label: 'Aislamiento de las paredes', lang: 'es' },
          { label: 'Wanddämmung', lang: 'de' },
        ],
      },
    },
    {
      subcategoryId: subcategoryId,
      label: {
        translations: [
          { label: 'Floor insulation', lang: 'en' },
          { label: 'Isolation des sols', lang: 'fr' },
          { label: 'Aislamiento de los suelos', lang: 'es' },
          { label: 'Bodenisolierung', lang: 'de' },
        ],
      },
    },
    {
      subcategoryId: subcategoryId,
      label: {
        translations: [
          { label: 'Heat pump installation', lang: 'en' },
          { label: 'Installation d’une pompe à chaleur', lang: 'fr' },
          { label: 'Instalación de una bomba de calor', lang: 'es' },
          { label: 'Installation einer Wärmepumpe', lang: 'de' },
        ],
      },
    },
    {
      subcategoryId: subcategoryId,
      label: {
        translations: [
          { label: 'Window replacement', lang: 'en' },
          { label: 'Remplacement des fenêtres', lang: 'fr' },
          { label: 'Sustitución de ventanas', lang: 'es' },
          { label: 'Fensterersatz', lang: 'de' },
        ],
      },
    },
    {
      subcategoryId: subcategoryId,
      label: {
        translations: [
          { label: 'Shutter or solar protection installation', lang: 'en' },
          { label: 'Installation de volets ou protections solaires', lang: 'fr' },
          { label: 'Instalación de persianas o protecciones solares', lang: 'es' },
          { label: 'Installation von Rollläden oder Sonnenblenden', lang: 'de' },
        ],
      },
    },
    {
      subcategoryId: subcategoryId,
      label: {
        translations: [
          { label: 'Boiler replacement', lang: 'en' },
          { label: 'Remplacement de la chaudière', lang: 'fr' },
          { label: 'Sustitución de la caldera', lang: 'es' },
          { label: 'Kesseltausch', lang: 'de' },
        ],
      },
    },
    {
      subcategoryId: subcategoryId,
      label: {
        translations: [
          { label: 'Solar or thermal panels', lang: 'en' },
          { label: 'Panneaux solaires ou thermiques', lang: 'fr' },
          { label: 'Paneles solares o térmicos', lang: 'es' },
          { label: 'Solar- oder thermische Kollektoren', lang: 'de' },
        ],
      },
    },
    {
      subcategoryId: subcategoryId,
      label: {
        translations: [
          { label: 'Wood or biomass boiler', lang: 'en' },
          { label: 'Chaudière à bois ou biomasse', lang: 'fr' },
          { label: 'Caldera de madera o biomasa', lang: 'es' },
          { label: 'Holz- oder Biomassekessel', lang: 'de' },
        ],
      },
    },
    {
      subcategoryId: subcategoryId,
      label: {
        translations: [
          { label: 'Low consumption lighting', lang: 'en' },
          { label: 'Eclairage basse consommation', lang: 'fr' },
          { label: 'Iluminación de bajo consumo', lang: 'es' },
          { label: 'Energieeffiziente Beleuchtung', lang: 'de' },
        ],
      },
    },
    {
      subcategoryId: subcategoryId,
      label: {
        translations: [
          { label: 'Thermodynamic or solar water heater', lang: 'en' },
          { label: 'Chauffe-eau thermodynamique ou solaire', lang: 'fr' },
          { label: 'Calentador de agua termodinámico o solar', lang: 'es' },
          { label: 'Thermodynamischer oder solarer Wasserboiler', lang: 'de' },
        ],
      },
    },
    {
      subcategoryId: subcategoryId,
      label: {
        translations: [
          { label: 'Double flow ventilation system installation', lang: 'en' },
          { label: 'Installation d’une ventilation double flux', lang: 'fr' },
          { label: 'Instalación de un sistema de ventilación de doble flujo', lang: 'es' },
          { label: 'Installation eines Doppelstranglüftungssystems', lang: 'de' },
        ],
      },
    },
    {
      subcategoryId: subcategoryId,
      label: {
        translations: [
          { label: 'Home automation systems', lang: 'en' },
          { label: 'Systèmes domotiques', lang: 'fr' },
          { label: 'Sistemas domóticos', lang: 'es' },
          { label: 'Hausautomationssysteme', lang: 'de' },
        ],
      },
    },
  ]

  return products
}
