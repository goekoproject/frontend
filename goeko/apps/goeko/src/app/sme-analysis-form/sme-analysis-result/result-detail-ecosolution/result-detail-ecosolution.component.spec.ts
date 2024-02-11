import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonModule } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { SdgIconsComponent } from '@goeko/business-ui';
import { BadgeModule, ButtonModule, PercentageModule } from '@goeko/ui';
import { TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';
import { ResultDetailEcosolutionComponent } from './result-detail-ecosolution.component';
const detailsEcosolution = {
  companyDetail: {
    name: 'Neolec',
    countries: ['CH'],
    country: 'CHE',
    city: 'Lausanne',
    email: 'nia@neolec.ch',
    link: 'www.neolec.ch',
    logo: 'http://res.cloudinary.com/hqsjddtpo/image/upload/v1702049234/actor_documents/cleantechs/8d6f3f35-5d93-4da6-ae4a-0a919992f729/logo/logo.png',
  },
  solutionName: 'Smart Energy Management',
  description:
    "Solution unique qui permet de connecter et d'optimiser l'ensemble de vos équipements énergétiques.",
  improvement: {
    reductionPercentage: {
      from: 0.0,
      to: 20.0,
    },
    smeReduction: 1000.0,
    operationalCostReductionPercentage: {
      from: 10.0,
      to: 20.0,
    },
    smeOperationalCostReduction: {
      amount: 1000.0,
      currency: 'EUR',
    },
  },
  sustainableDevelopmentGoals: [7, 11, 12, 13],
  classification: {
    mainCategory: 'co2Emission',
    subCategory: 'sustainableBuildingOperations',
    products: [
      'useRenewableEnergies',
      'storeEnergy',
      'optimizeEnergyConsumption',
      'chargeElectricVehicles',
    ],
  },
  countries: ['CH', 'FR', 'DE', 'IT', 'ES'],
  marketReady: true,
  guarantee: true,
  guaranteeInYears: 1.0,
  certified: false,
  approved: false,
};
const mockSmeAnalysisStoreService = {
  getDetailEcosolutions: jest.fn(),
};

describe('ResultDetailEcosolutionComponent', () => {
  let component: ResultDetailEcosolutionComponent;
  let fixture: ComponentFixture<ResultDetailEcosolutionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        ButtonModule,
        PercentageModule,
        SdgIconsComponent,
        BadgeModule,
        TranslateModule.forRoot(),
        RouterTestingModule.withRoutes([]),
      ],
      declarations: [ResultDetailEcosolutionComponent],
      providers: [
        {
          mockSmeAnalysisStoreService,
          useValue: mockSmeAnalysisStoreService,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ResultDetailEcosolutionComponent);
    component = fixture.componentInstance;
    mockSmeAnalysisStoreService.getDetailEcosolutions.mockReturnValue(
      of(detailsEcosolution)
    );
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should initialize component with correct data', () => {
    component.ngOnInit();

    // Assert
    expect(component.detailsEcosolution).toEqual(detailsEcosolution);
  });
});
