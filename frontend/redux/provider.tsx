import {store} from "./store";
import {Provider} from "react-redux";
import {ReactNode} from "react";

export function Providers({children}: { children: ReactNode }) {
    return <Provider store={store}>{children}</Provider>;
}