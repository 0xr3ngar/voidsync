import { useState } from "react";

interface UseListNavigationProps {
    itemCount: number;
    visibleItems: number;
}

export const useListNavigation = ({
    itemCount,
    visibleItems,
}: UseListNavigationProps) => {
    const [index, setIndex] = useState(0);
    const [scroll, setScroll] = useState(0);

    const moveUp = () => {
        const newIndex = Math.max(0, index - 1);
        setIndex(newIndex);
        if (newIndex < scroll) {
            setScroll(newIndex);
        }
    };

    const moveDown = () => {
        const newIndex = Math.min(itemCount - 1, index + 1);
        setIndex(newIndex);
        if (newIndex >= scroll + visibleItems) {
            setScroll(newIndex - visibleItems + 1);
        }
    };

    return { index, scroll, moveUp, moveDown };
};
