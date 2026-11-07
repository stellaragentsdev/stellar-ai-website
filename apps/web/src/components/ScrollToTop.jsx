import { useLocation } from 'react-router-dom';
import { useEffect, useLayoutEffect } from 'react';

// useLayoutEffect warns during build-time prerender; it is a no-op there anyway.
const useIsomorphicLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect;

const ScrollToTop = () => {
    const { pathname, hash } = useLocation();

    useIsomorphicLayoutEffect(() => {
        if (hash) {
            const target = document.getElementById(hash.slice(1));

            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                return;
            }
        }

        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }, [pathname, hash]);

    return null;
}

export default ScrollToTop;

export { ScrollToTop };
