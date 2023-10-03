import {createSelector} from "@reduxjs/toolkit";
import {AuthState} from "./authSlice";
import Role from "Frontend/generated/com/hillarocket/application/domain/Role";

interface PartialAuthState {
    auth: AuthState;
}
export type AccessProps = Readonly<{
    requiresLogin?: boolean;
    rolesAllowed?: readonly Role[];
}>;

const authStateSelector = (state: PartialAuthState) => state.auth;

export const AuthSelectors = {
    authStateSelector,
    getCurrentUser: () => createSelector(authStateSelector, ({user}) => user),
};