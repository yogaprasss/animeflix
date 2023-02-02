import type { AnimeProps } from './anime';

interface PageInfo {
  hasNextPage: boolean;
}

interface PageDetail {
  pageInfo: PageInfo;
  media?: AnimeProps;
}

export interface PageProps {
  Page: PageDetail;
}