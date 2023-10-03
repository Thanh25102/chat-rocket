import {AccessProps} from "Frontend/redux/feat/auth/authSelectors";
import User from "Frontend/generated/com/hillarocket/application/domain/User";

export const hasAccess = (access: AccessProps,user:User|null)=>{
    const requiresAuth = access?.requiresLogin || access?.rolesAllowed;
    if (!requiresAuth) {
        return true;
    }

    if (!user) {
        return false;
    }

    if (access.rolesAllowed) {
        return access.rolesAllowed.some((allowedRole) =>
            user!.role === allowedRole
        );
    }

    return true;
}