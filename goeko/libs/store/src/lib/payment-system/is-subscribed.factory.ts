import { USER_TYPE } from "../user/user-type.constants";
import { UserService } from "../user/user.services";
import { PaymentSystemService } from "./payment-system.service";

export function isSubscribed(paymentSystems: PaymentSystemService, userService: UserService) {
    return () => userService.fechAuthUser.subscribe( () => {
        if(userService.userType() === USER_TYPE.CLEANTECH) {
            paymentSystems.isSubscribedForActor(userService.userProfile().id) 
        }
    });
}