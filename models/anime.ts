interface AnimeTitle {
  userPreferred: string;
}

interface AnimeCoverImage {
  extraLarge: string;
  large: string;
  medium: string;
}

interface AnimeStartDate {
  year: number;
}

export interface AnimeProps {
  id: string;
  title: AnimeTitle;
  coverImage: AnimeCoverImage;
}

export interface AnimeDetailProps extends AnimeProps {
  genres: string[];
  duration: number;
  episodes: number;
  description: string;
  bannerImage: string;
  averageScore: number;
  startDate: AnimeStartDate;
}
