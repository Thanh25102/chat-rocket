import { useEffect, useRef } from 'react';

// This hook will run the provided callback function after every update,
// but not on the initial mount.
function useDidUpdate(callback: () => void, dependencies: any[]) {
    const hasMounted = useRef(false);

    useEffect(() => {
        if (hasMounted.current) {
            callback();
        } else {
            hasMounted.current = true;
        }
        // Dependencies should include everything that will trigger the update
    }, dependencies);
}

export default useDidUpdate;
