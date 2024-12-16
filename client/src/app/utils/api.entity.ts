export interface ApiResponse<T> {
  info: ApiInfo;
  results: Array<T>;
}

export interface ApiInfo {
  total: number;
  status: number;
  request: string;
}
