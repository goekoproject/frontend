import { inject } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { UserService } from '@goeko/store'
export const switchDashboardGuard = () => {
  return () => {
    const router = inject(Router)
    const activatedRoute = inject(ActivatedRoute)
    const userType = inject(UserService).userType() || 'sme'
    const externalId = inject(UserService).externalId()

    const userId = inject(UserService).userProfile()?.id
    if (userId) {
      router.navigate([`profile/${externalId}`], { relativeTo: activatedRoute.parent })
    } else {
      router.navigate([`platform/dashboard/${userType}`], { relativeTo: activatedRoute.parent })
    }

    return true
  }
}
