export interface Movie {
  id: number
  title: string
  poster_path: string | null
  backdrop_path?: string | null
  release_date: string
  overview: string
  runtime?: number
  genres?: Genre[]
  status?: string
  vote_average?: number
  vote_count?: number
  budget?: number
  revenue?: number
  original_language?: string
  imdb_id?: string
  homepage?: string
  popularity?: number
  adult?: boolean
  original_title?: string
  tagline?: string
  production_companies?: ProductionCompany[]
  production_countries?: ProductionCountry[]
  spoken_languages?: SpokenLanguage[]
}

export interface Genre {
  id: number
  name: string
}

export interface ProductionCompany {
  id?: number
  logo_path?: string | null
  name: string
  origin_country?: string
}

export interface ProductionCountry {
  iso_3166_1: string
  name: string
}

export interface SpokenLanguage {
  iso_639_1: string
  name: string
}

export interface MovieResponse {
  page: number
  results: Movie[]
  total_pages: number
  total_results: number
}

export interface Cast {
  cast_id?: number
  character: string
  credit_id?: string
  gender?: number
  id: number
  name: string
  order?: number
  profile_path: string | null
}

export interface Crew {
  credit_id?: string
  department?: string
  gender?: number
  id: number
  job: string
  name: string
  profile_path: string | null
}

export interface Video {
  id: string
  iso_639_1: string
  iso_3166_1: string
  key: string  
  name: string
  site: string 
  size: number
  type: string 
  official: boolean
  published_at: string
}
