import {login as _login, logout as _logout} from '@hilla/frontend';
import {AsyncThunk} from "@reduxjs/toolkit";
import User from "Frontend/generated/com/hillarocket/application/domain/User";

export async function login(
    username: string,
    password: string,
    authenticate: AsyncThunk<User | undefined, void, any>
) {
    const result = await _login(username, password);

    if (!result.error) {
        authenticate();
    }

    return result;
}

export async function logout(
    unAuthenticate: AsyncThunk<void, void, any>
) {
    await _logout();
    unAuthenticate();
}
