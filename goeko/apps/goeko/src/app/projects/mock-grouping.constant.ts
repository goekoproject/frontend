export const MOCK_GROUPING: any[] = [
  {
    id: 'f842b710-c343-4ecc-80e6-c9848db07418',
    code: 'co2Emission',
    label: 'Emissions de Co2',
    subcategories: [
      {
        code: 'mainInternalCombustionEngine',
        label: 'Engins et véhicules',
        question: 'Principaux engins à moteur thermique utilisés par votre entreprise',
        products: [
          {
            code: 'equipmentCarrierTruck',
            label: 'Camion de transport d’équipements',
            disabled: false,
          },
          {
            code: 'materialsCarrierTruck',
            label: 'Camion de transport de matériaux',
            disabled: false,
          },
          {
            code: 'loader',
            label: 'Chargeuse',
            disabled: false,
          },
          {
            code: 'backhoe',
            label: 'Raboteuse',
            disabled: false,
          },
          {
            code: 'backhoeLoader',
            label: 'Pelle mécanique​',
            disabled: false,
          },
          {
            code: 'aerialBucketTruck',
            label: 'Camion nacelle',
            disabled: false,
          },
          {
            code: 'scraper',
            label: 'Scraper',
            disabled: false,
          },
          {
            code: 'dumper',
            label: 'Dumper',
            disabled: false,
          },
          {
            code: 'steamRoller',
            label: 'Rouleau compresseur',
            disabled: false,
          },
          {
            code: 'grader',
            label: 'Niveleuse',
            disabled: false,
          },
          {
            code: 'bulldozer',
            label: 'Bulldozer',
            disabled: false,
          },
          {
            code: 'slicer',
            label: 'Trancheuse',
            disabled: false,
          },
          {
            code: 'compressor',
            label: 'Compresseur​',
            disabled: false,
          },
          {
            code: 'vehicleFortransportingPeople​​',
            label: 'Véhicule pour transport de personnes​​',
            disabled: false,
          },
          {
            code: 'generator',
            label: 'Génératrice​',
            disabled: false,
          },
          {
            code: 'mechanicalPalletTruck',
            label: 'Transpalette mécanique​',
            disabled: false,
          },
        ],
        disabled: false,
      },
      {
        code: 'mainMineralProduct',
        label: 'Principaux produits minéraux et métaux',
        question: 'Principaux produits minéraux et métaux utilisés par votre entreprise',
        products: [
          {
            code: 'steel',
            label: 'Acier',
            disabled: false,
          },
          {
            code: 'concrete',
            label: 'Béton',
            disabled: false,
          },
          {
            code: 'isolation',
            label: 'Isolation thermique​',
            disabled: false,
          },
          {
            code: 'cement',
            label: 'Ciment',
            disabled: false,
          },
          {
            code: 'iron',
            label: 'Inox',
            disabled: false,
          },
          {
            code: 'aluminum',
            label: 'Aluminium​',
            disabled: false,
          },
          {
            code: 'copper',
            label: 'Cuivre',
            disabled: false,
          },
          {
            code: 'zinc',
            label: 'Zinc',
            disabled: false,
          },
        ],
        disabled: false,
      },
      {
        code: 'sustainableBuildingOperations',
        label: 'Pour l’exploitation de bâtiments ou la mobilité durable,  votre éco-solution permet de:',
        question: 'Pour l’exploitation du bâtiment et la mobilité douce, auriez-vous besoin de',
        products: [
          {
            code: 'useRenewableEnergies',
            label: 'Recourir à des énergies renouvelables',
            disabled: false,
          },
          {
            code: 'storeEnergy',
            label: 'Stocker l’énergie',
            disabled: false,
          },
          {
            code: 'recoverHeat',
            label: 'Récupérer la chaleur',
            disabled: false,
          },
          {
            code: 'useLowConsumptionLighting',
            label: 'Des solutions de refroidissement écologiques',
            disabled: false,
          },
          {
            code: 'optimizeEnergyConsumption',
            label: 'Optimiser la consommation d’énergie',
            disabled: false,
          },
          {
            code: 'chargeElectricVehicles',
            label: 'Charger des véhicules électriques',
            disabled: false,
          },
          {
            code: 'electricMeansOfTransport',
            label: 'Des moyens de transport électrique​',
            disabled: false,
          },
          {
            code: 'sustainableLightingSystems',
            label: 'Des systèmes d’éclairage durables',
            disabled: false,
          },
        ],
        disabled: false,
      },
    ],
  },
  {
    id: 'ccef550d-2d20-4d8c-9443-1efee00dbf08',
    code: 'waste',
    label: 'Déchets',
    subcategories: [
      {
        code: 'mainCategoryNonInert',
        label: 'Dans quelle(s) catégorie(s) de déchets non inertes votre éco-solution améliore-t-elle la gestion?',
        question: 'Avec quels types de déchets non inertes votre entreprise est-elle principalement confrontée?',
        products: [
          {
            code: 'metalsAndAlloys',
            label: 'Métaux et alliages',
            disabled: false,
          },
          {
            code: 'untreatedWood',
            label: ' Bois non traité',
            disabled: false,
          },
          {
            code: 'plastic',
            label: 'Plastique (emballages, bâches, etc.)',
            disabled: false,
          },
          {
            code: 'plaster',
            label: 'Plâtre',
            disabled: false,
          },
          {
            code: 'insulationMaterials',
            label: "Matériaux d'isolation",
            disabled: false,
          },
          {
            code: 'cardboardAndPaper',
            label: 'Carton et papier',
            disabled: false,
          },
        ],
        disabled: false,
      },
      {
        code: 'inertOrMineralWaste',
        label: 'Dans quelle(s) catégorie(s) de déchets minéraux ou inertes votre éco-solution améliore-t-elle la gestion?',
        question: 'Avec quels types de déchets minéraux ou inertes votre entreprise est-elle principalement confrontée?',
        products: [
          {
            code: 'concrete',
            label: 'Béton',
            disabled: false,
          },
          {
            code: 'brick',
            label: 'Brique/tuile​',
            disabled: false,
          },
          {
            code: 'soil',
            label: 'Terre',
            disabled: false,
          },
          {
            code: 'stone',
            label: 'Pierre',
            disabled: false,
          },
          {
            code: 'ceramic',
            label: 'Céramique',
            disabled: false,
          },
        ],
        disabled: false,
      },
      {
        code: 'greenWaste',
        label: 'Dans quelle(s) catégorie(s) de déchets verts votre entreprise améliore-t-elle la gestion?',
        question: 'Avec quels types de déchets verts votre entreprise est-elle principalement confrontée?',
        products: [
          {
            code: 'greenWoodUntreated',
            label: 'Bois naturel​',
            disabled: false,
          },
          {
            code: 'topsoil',
            label: 'Déchets verts compostables',
            disabled: false,
          },
        ],
        disabled: false,
      },
      {
        code: 'specialWaste',
        label: 'Dans quelle(s) catégorie(s) de déchets spéciaux votre éco-solution améliore-t-elle la gestion?',
        question: 'Avec quels types de déchets spéciaux votre entreprise est-elle principalement confrontée?',
        products: [
          {
            code: 'paintsAndSolvents',
            label: 'Peintures et solvants',
            disabled: false,
          },
          {
            code: 'usedOils',
            label: 'Huiles usagées',
            disabled: false,
          },
          {
            code: 'batteriesAndAccumulators',
            label: 'Batteries et accumulateurs',
            disabled: false,
          },
          {
            code: 'fluorescentTubesEnergySavingBulbsNeonTubes',
            label: "Tubes fluorescents, ampoules à économie d'énergie, rampes de néon",
            disabled: false,
          },
          {
            code: 'electricalAndElectronicEquipmentPCB',
            label: 'Équipements électriques et électroniques',
            disabled: false,
          },
          {
            code: 'cartridgesSealantChemicalCaulking',
            label: 'Cartouches (produit chimique, calfeutrage…)',
            disabled: false,
          },
          {
            code: 'treatedWood',
            label: 'Bois traités',
            disabled: false,
          },
          {
            code: 'polyurethaneFoams',
            label: 'Mousses polyuréthanes',
            disabled: false,
          },
          {
            code: 'asbestos',
            label: 'Amiante',
            disabled: false,
          },
          {
            code: 'particleboardPanels',
            label: 'Panneaux de bois aggloméré',
            disabled: false,
          },
          {
            code: 'agglomeratedConcrete',
            label: 'Béton pollué',
            disabled: false,
          },
          {
            code: 'agglomeratedCementPanels',
            label: 'Panneaux de ciment aggloméré',
            disabled: false,
          },
          {
            code: 'rubberProducts',
            label: 'Produits en caoutchouc',
            disabled: false,
          },
          {
            code: 'pouredAsphalt',
            label: 'Asphalte coulée',
            disabled: false,
          },
        ],
        disabled: false,
      },
      {
        code: 'hazardousWaste',
        label: 'Dans quelle(s) catégorie(s) de déchets dangereux votre entreprise améliore-t-elle la gestion?',
        question: 'Avec quels types de déchets dangereux votre entreprise est-elle principalement confrontée?',
        products: [
          {
            code: 'productsContainingHeavyMetals',
            label: 'Boues de centrale à béton avec du chrome 6',
            disabled: false,
          },
          {
            code: 'productsContainingTar',
            label: 'Produits contenant des HAP​',
            disabled: false,
          },
          {
            code: 'oilSeparatorSludge',
            label: "Boue de séparateur d'huile",
            disabled: false,
          },
          {
            code: 'productsContainingHCB',
            label: 'Produits contenant du HCB',
            disabled: false,
          },
          {
            code: 'landsContainingPFAS',
            label: 'Terres contenant des PFAS',
            disabled: false,
          },
        ],
        disabled: false,
      },
    ],
  },
  {
    id: '417c0dee-92c5-4596-af0b-7ddd4317b8bb',
    code: 'waterConsumption',
    label: 'Eau',
    subcategories: [
      {
        code: 'mainActivity',
        label:
          "Pour quelle(s) activité(s) en rapport avec l’eau votre éco-solution permet-elle de réduire sa consommation ou d'améliorer sa qualité ?",
        question: 'Activités de votre entreprise qui consomment le plus d’eau',
        products: [
          {
            code: 'siteCleaning',
            label: 'Arrosage du chantier',
            disabled: false,
          },
          {
            code: 'cleaningSiteVehicles',
            label: 'Nettoyage des véhicules de chantier',
            disabled: false,
          },
          {
            code: 'pouringConcrete',
            label: 'Production du béton',
            disabled: false,
          },
          {
            code: 'toolCleaning',
            label: 'Nettoyage du matériel',
            disabled: false,
          },
          {
            code: 'paint',
            label: 'Peinture',
            disabled: false,
          },
          {
            code: 'siteHut',
            label: 'Cabane de chantier',
            disabled: false,
          },
          {
            code: 'wateringForCure',
            label: 'Arrosage pour la cure',
            disabled: false,
          },
          {
            code: 'cleaningOfSiteAndPeripheryAccesses',
            label: 'Nettoyage des accès chantier et périphérie',
            disabled: false,
          },
          {
            code: 'wateringPlants',
            label: 'Arrosage des plantes',
            disabled: false,
          },
        ],
        disabled: false,
      },
      {
        code: 'buildingOperation',
        label: 'Exploitation du bâtiment',
        question: "Pour l'exploitation du bâtiment, seriez-vous intéressé par",
        products: [
          {
            code: 'greenRoofsWalls',
            label: 'Toits et murs végétalisés',
            disabled: false,
          },
          {
            code: 'waterManagement',
            label: 'Des solutions pour la gestion de l’eau de pluie',
            disabled: false,
          },
          {
            code: 'waterManagementGray',
            label: 'Des solutions pour la gestion de l’eau grise',
            disabled: false,
          },
        ],
        disabled: false,
      },
    ],
  },
  {
    id: 'd9586af1-1684-4c45-8c8a-76ee1692d7bc',
    code: 'hazardousProduct',
    label: 'Produits toxiques',
    subcategories: [
      {
        code: 'products',
        label: 'Types de produits toxiques',
        question: 'Types de produits toxiques',
        products: [
          {
            code: 'aerosol',
            label: 'Aérosol',
            disabled: false,
          },
          {
            code: 'productsContainingTar',
            label: 'Produits contenant du goudron',
            disabled: false,
          },
          {
            code: 'woodTreatedWithHazardousSubstances',
            label: 'Bois traité avec des substances dangereuses',
            disabled: false,
          },
          {
            code: 'collects',
            label: 'Colles',
            disabled: false,
          },
          {
            code: 'fuel',
            label: 'Carburant',
            disabled: false,
          },
          {
            code: 'oils',
            label: 'Huiles',
            disabled: false,
          },
          {
            code: 'curingProducts',
            label: 'Produits de cure',
            disabled: false,
          },
          {
            code: 'admixtures',
            label: 'Adjuvants',
            disabled: false,
          },
          {
            code: 'bituminousProductsContainingHAPs',
            label: 'Produits bitumineux contenant des HAP',
            disabled: false,
          },
        ],
        disabled: false,
      },
    ],
  },
]
