export interface StarProps {
    id: number
    name: string
    original_name: string
    adult: boolean
    popularity: number
    gender: 0 | 1 | 2
    known_for_department?: string | null
    profile_path: string | null
}

export interface StarApiResponse {
    page: number
    results: StarProps[]
    total_pages: number
    total_results: number
}
