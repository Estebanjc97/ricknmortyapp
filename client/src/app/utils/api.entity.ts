export interface ApiResponse<T> {
  info: ApiInfo;
  results: Array<T>;
}

export interface ApiInfo {
  total: number;
  status: number;
  request: string;
}

export interface RickAndMortyApiResponse<T> {
  info: RickAndMortyApiInfo;
  results: Array<T>;
}

export interface RickAndMortyApiInfo {
  count: number,
  pages: number,
  next: string | null,
  prev: string | null
}
