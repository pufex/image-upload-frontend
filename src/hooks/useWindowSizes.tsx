import { useEffect, useState } from "react"

export const useWindowSize = () => {
    const [width, setWidth] = useState(0)

    useEffect(() => {
        const getWindowWidth = () => {
            const width = window.outerWidth
            setWidth(width)
        }

        window.addEventListener("resize", getWindowWidth)
        return () => window.removeEventListener("resize", getWindowWidth)
    }, [])

    return width
}