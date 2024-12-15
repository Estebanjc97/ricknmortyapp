export interface ApiResponse<T> {
  info: ApiInfo;
  results: Array<T>;
}

export interface ApiInfo {
  count: number;
  pages: number;
  next: string;
  prev: string;
}
