import { Injectable } from '@angular/core'
import { LeadService, UserService } from '@goeko/store'

@Injectable()
export class DashboardCleantechService {
  private _cleantechId!: string
  constructor(
    private _leadService: LeadService,
    private _userService: UserService,
  ) {}

  getLeads() {
    this._cleantechId = this._userService.userProfile()?.id
    return this._leadService.getLeadByCleantech(this._cleantechId)
  }
}
