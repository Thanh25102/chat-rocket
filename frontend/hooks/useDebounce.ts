import {useEffect, useState} from "react";

function useDebounce(value: any, delay: number = 500) {
    //like useTransition, useDeferredValue in react 18
    const [debouncedValue, setDebouncedValue] = useState<any>(value);
    useEffect(() => {
        const handler = setTimeout(() => setDebouncedValue(value), delay);
        return () => clearTimeout(handler);
    }, [value]);

    return debouncedValue;
}

export default useDebounce;
