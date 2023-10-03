import {useAppDispatch, useAppSelector} from "Frontend/redux/hooks";
import {useEffect} from "react";
import {AuthThunks} from "Frontend/redux/feat/auth/authThunks";
import {useMatches} from "react-router-dom";
import {AccessProps, AuthSelectors} from "Frontend/redux/feat/auth/authSelectors";
import {hasAccess} from "Frontend/utils/auth";

export const useAuth = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(AuthThunks.getUser())
    }, [])

    useEffect(()=>{
        if(user && user.id){
            dispatch(AuthThunks.startConnection(user.id))
        }
    })

    const matches = useMatches();
    const user = useAppSelector(AuthSelectors.getCurrentUser());

    return matches.every((match) =>
        hasAccess(match.handle as AccessProps, user))
}