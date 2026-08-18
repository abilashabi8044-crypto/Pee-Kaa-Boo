import React, { useEffect } from 'react';

const SmoothScroll = ({ children }) => {
    useEffect(() => {
        // 1. Enable smooth scrolling on root elements
        document.documentElement.style.scrollBehavior = 'smooth';
        document.body.style.scrollBehavior = 'smooth';

        // 2. Smooth scroll on anchor link clicks
        const handleAnchorClick = (e) => {
            const target = e.target.closest('a[href^="#"]');
            if (target) {
                const hash = target.getAttribute('href');
                if (hash && hash !== '#') {
                    const element = document.querySelector(hash);
                    if (element) {
                        e.preventDefault();
                        element.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                }
            }
        };

        document.addEventListener('click', handleAnchorClick);

        return () => {
            document.removeEventListener('click', handleAnchorClick);
        };
    }, []);

    return <>{children}</>;
};

export default SmoothScroll;

