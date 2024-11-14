import { HttpClientTestingModule } from '@angular/common/http/testing'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { LeadResponse, LeadService, UserService } from '@goeko/store'
import { GoDateFormatPipe } from '@goeko/ui'
import { TranslateModule } from '@ngx-translate/core'
import { of } from 'rxjs'
import { LeadsListComponent } from './leads-list.component'
import { ManagerLeadsService } from './manager-leads.services'
const mockLeads = [
  {
    id: '1',
    date: new Date(),
    message: 'Message',
    sme: {
      id: '1',
      name: 'John Doe',
    },
    ecosolution: {
      name: 'EcoSolution',
      id: '1',
      description: 'Description',
    },
  },
]
describe('LeadsListComponent', () => {
  let component: LeadsListComponent
  let fixture: ComponentFixture<LeadsListComponent>
  let managerLeadsServiceMock: {
    getLeads: jest.Mock
  }
  let userServiceMock: {
    userProfile: jest.Mock
  }

  let leadsServiceMock: {
    getLeadByCleantech: jest.Mock
  }
  beforeEach(async () => {
    managerLeadsServiceMock = {
      getLeads: jest.fn().mockReturnValue(of(mockLeads)),
    }

    userServiceMock = {
      userProfile: jest.fn().mockReturnValue({ id: '1' }),
    }
    leadsServiceMock = {
      getLeadByCleantech: jest.fn().mockReturnValue(of(mockLeads)),
    }
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, TranslateModule.forRoot(), LeadsListComponent, GoDateFormatPipe],
      providers: [
        {
          provide: ManagerLeadsService,
          useValue: managerLeadsServiceMock,
        },
        {
          provide: UserService,
          useValue: userServiceMock,
        },
        {
          provide: LeadService,
          useValue: leadsServiceMock,
        },
      ],
    }).compileComponents()

    fixture = TestBed.createComponent(LeadsListComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should get all leads', () => {
    managerLeadsServiceMock.getLeads().subscribe((lead: LeadResponse) => {
      expect(component.lead?.id).toEqual(lead.id)
    })
    expect(managerLeadsServiceMock.getLeads).toHaveBeenCalled()
  })

  it('should get one lead', () => {
    component.selectedLead(mockLeads[0])
    expect(component.lead).toEqual(mockLeads[0])
  })
})
