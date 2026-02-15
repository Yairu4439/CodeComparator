import { useRef, useEffect } from 'react';

export const useScrollSync = () => {
    const ref1 = useRef(null);
    const ref2 = useRef(null);
    const ref3 = useRef(null);
    const isScrolling = useRef(null);
    const timeoutRef = useRef(null);

    useEffect(() => {
        const refs = [ref1, ref2, ref3].filter(r => r.current);

        const handleScroll = (sourceRef) => {
            if (!sourceRef.current) return;
            if (isScrolling.current && isScrolling.current !== sourceRef) return;
            isScrolling.current = sourceRef;

            clearTimeout(timeoutRef.current);
            timeoutRef.current = setTimeout(() => {
                isScrolling.current = null;
            }, 50);

            const { scrollTop, scrollLeft } = sourceRef.current;

            refs.forEach(target => {
                if (target !== sourceRef && target.current) {
                    target.current.scrollTop = scrollTop;
                    if (target !== ref3) {
                        target.current.scrollLeft = scrollLeft;
                    }
                }
            });
        };

        const listeners = refs.map(ref => {
            const listener = () => handleScroll(ref);
            const node = ref.current;
            node.addEventListener('scroll', listener);
            return { node, listener };
        });

        return () => {
            listeners.forEach(({ node, listener }) => {
                if (node) node.removeEventListener('scroll', listener);
            });
            clearTimeout(timeoutRef.current);
        };
    }, []);

    return [ref1, ref2, ref3];
};
