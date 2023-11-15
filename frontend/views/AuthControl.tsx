import React, {FC, ReactNode} from "react";
import {Navigate} from "react-router-dom";
import {useAuth} from "Frontend/hooks/useAuth";

type Props = {
    children?: ReactNode
}

export const AuthControl: FC<Props> = ({children}) => {
    const authorized = useAuth();
    return authorized ? <>{children}</> : <Navigate to="/login" replace/>;
}