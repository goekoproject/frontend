import { Injectable } from '@angular/core'
import { LeadCleantechService, UserService } from '@goeko/store'

@Injectable()
export class DashboardCleantechService {
  private _cleantechId!: string
  constructor(
    private leadCleantechService: LeadCleantechService,
    private _userService: UserService,
  ) {}

  getLeads() {
    this._cleantechId = this._userService.userProfile()?.id
    return this.leadCleantechService.getLeadByCleantech(this._cleantechId)
  }
}
