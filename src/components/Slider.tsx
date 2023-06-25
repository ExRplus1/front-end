import { useEffect, useRef, useState } from "react";


const delay = 2500;


const IMAGE_LENGTH = 6;

export function Slideshow() {
    const [index, setIndex] = useState(0);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const imageIndexArray = new Array(IMAGE_LENGTH).fill(null).map((_, index) => index);

    function resetTimeout() {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
    }

    useEffect(() => {
        resetTimeout();
        timeoutRef.current = setTimeout(
            () =>
                setIndex((prevIndex) =>
                    prevIndex === imageIndexArray.length - 1 ? 0 : prevIndex + 1
                ),
            delay
        );

        return () => {
            resetTimeout();
        };
    }, [imageIndexArray.length, index]);

    return (
        <div
            className="slideshow" style={{
                margin: "0 auto",
                overflow: "hidden",
                height: "100%"
            }}>
            <div
                className="slideshowSlider"
                style={{
                    transform: `translate3d(${-index * 100}%, 0, 0)`,
                    height: "100%",
                    whiteSpace: "nowrap",
                    transition: "ease 1000ms"
                }}
            >
                {imageIndexArray.map((_n, index) => (
                    <div
                        key={`images/slider/slider${_n + 1}.png`}
                        style={{
                            backgroundImage: `url(/images/slider/${index + 1}.jpeg)`,
                            backgroundSize: "cover",
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "center",
                            display: "inline-block",
                            height: "100%",
                            width: "100%",
                        }} />
                ))}
            </div>


        </div>
    );
}