"use client"

import { useState, useEffect } from 'react';
import Confetti from 'react-confetti'

function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
        width,
        height
    };
}

export default function useWindowDimensions() {
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

    useEffect(() => {
        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return windowDimensions;
}

export const ConfettiEffect = () => {
    const { height, width } = useWindowDimensions();

    return <Confetti width={width} height={height} numberOfPieces={100} wind={0.03} />
}