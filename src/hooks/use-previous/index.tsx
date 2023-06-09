import { useRef, useEffect } from 'react';

export function usePrevious<T>(value: T) {
    const ref = useRef<T>(null as any);
    useEffect(() => {
        ref.current = value;
    });
    return ref.current;
}
