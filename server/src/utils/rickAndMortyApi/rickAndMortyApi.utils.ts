import { ApiResponse } from '../entities/api.entity';

const serverURL = 'https://ricknmortyserver-467042232272.us-central1.run.app/';

export function mapApiEndpoint(data: ApiResponse<any>): ApiResponse<any> {
  const { info, ...rest } = data;

  if (info.next) {
    const params = info.next.split('?')[1];
    info.next = `${serverURL}?${params}`;
  }

  if (info.prev) {
    const params = info.prev.split('?')[1];
    info.prev = `${serverURL}?${params}`;
  }

  return {
    ...rest,
    info,
  };
}
