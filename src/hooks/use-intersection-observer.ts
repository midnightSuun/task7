import { useEffect, useRef } from "react"

type UseIntersectionObserverOptions = IntersectionObserverInit & {
    enabled?: boolean
    onIntersect: () => void
}

export const useIntersectionObserver = <T extends HTMLElement = HTMLDivElement>({
    enabled = true,
    onIntersect,
    root,
    rootMargin,
    threshold,
}: UseIntersectionObserverOptions) => {
    const ref = useRef<T>(null)

    useEffect(() => {
        const element = ref.current

        if (!element || !enabled) return

        const observer = new IntersectionObserver(
            (entries) => {
                const [entry] = entries

                if (!entry.isIntersecting) return

                onIntersect()
            },
            { root, rootMargin, threshold },
        )

        observer.observe(element)

        return () => {
            observer.disconnect()
        }
    }, [enabled, onIntersect, root, rootMargin, threshold])

    return ref
}
