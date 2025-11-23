import { useEffect, useState } from "react";


export const useScroll = (threshold = 10) => {

    const [isScrolled, setIsScrolled] = useState(false);
    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            setIsScrolled(scrollTop > threshold);
        };  
        window.addEventListener("scroll", handleScroll);
        handleScroll(); // Initial check
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };  
    }, [threshold]);

    return isScrolled;
}