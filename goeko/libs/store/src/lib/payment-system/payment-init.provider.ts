import { APP_INITIALIZER } from "@angular/core";
import { UserService } from "../user/user.services";
import { isSubscribed } from "./is-subscribed.factory";
import { PaymentSystemService } from "./payment-system.service";

export const isSubscribedCleantech = {
    provide: APP_INITIALIZER,
    multi: true,
    useFactory: isSubscribed,
    deps: [PaymentSystemService,UserService]
}