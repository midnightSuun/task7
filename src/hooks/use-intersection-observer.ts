import { useEffect, useRef } from "react"

type UseIntersectionObserverOptions = IntersectionObserverInit & {
    enabled?: boolean
    onIntersect: () => void
    skipFirstIntersect?: boolean
}

export const useIntersectionObserver = <T extends HTMLElement = HTMLDivElement>({
    enabled = true,
    onIntersect,
    skipFirstIntersect = false,
    root,
    rootMargin,
    threshold,
}: UseIntersectionObserverOptions) => {
    const ref = useRef<T>(null)
    const onIntersectRef = useRef(onIntersect)
    const skipFirstIntersectRef = useRef(skipFirstIntersect)
    const hasHandledFirstCallbackRef = useRef(false)

    useEffect(() => {
        onIntersectRef.current = onIntersect
    }, [onIntersect])

    useEffect(() => {
        const element = ref.current

        if (!element || !enabled) return

        const observer = new IntersectionObserver(
            (entries) => {
                const [entry] = entries
                const isIntersecting = Boolean(entry?.isIntersecting)

                if (!hasHandledFirstCallbackRef.current) {
                    hasHandledFirstCallbackRef.current = true

                    if (skipFirstIntersectRef.current && isIntersecting) {
                        return
                    }
                }

                if (!isIntersecting) return

                onIntersectRef.current()
            },
            { root, rootMargin, threshold },
        )

        observer.observe(element)

        return () => {
            observer.disconnect()
        }
    }, [enabled, root, rootMargin, threshold])

    return ref
}
