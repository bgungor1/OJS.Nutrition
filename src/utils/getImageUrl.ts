
const IMAGE_BASE_URL = 'https://fe1111.projects.academy.onlyjs.com'

const DEFAULT_FALLBACK = '/src/assets/whey-protein.jpg'

export const getImageUrl = (
    photoSrc: string | undefined | null,
    fallback: string = DEFAULT_FALLBACK
): string => {
    if (!photoSrc) return fallback
    if (photoSrc.startsWith('http')) return photoSrc
    return `${IMAGE_BASE_URL}${photoSrc}`
}
