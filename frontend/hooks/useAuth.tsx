import {useAppDispatch, useAppSelector} from "Frontend/redux/hooks";
import {useEffect} from "react";
import {AuthThunks} from "Frontend/redux/feat/auth/authThunks";
import {useMatches} from "react-router-dom";
import {AccessProps, AuthSelectors} from "Frontend/redux/feat/auth/authSelectors";
import {hasAccess} from "Frontend/utils/auth";

export const useAuth = () => {
    const dispatch = useAppDispatch();
    const user = useAppSelector(AuthSelectors.getCurrentUser());
    const matches = useMatches();

    useEffect(() => {
        dispatch(AuthThunks.getUser())
    }, [])

    return matches.every((match) =>
        hasAccess(match.handle as AccessProps, user))
}