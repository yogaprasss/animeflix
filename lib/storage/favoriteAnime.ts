const favoriteAnimeKey = 'FavoriteAnimeKey';

export class FavoriteAnime {
  private favoriteAnime: number[] = [];

  constructor() {
    const favoriteAnime = localStorage.getItem(favoriteAnimeKey);

    if (favoriteAnime) this.favoriteAnime = JSON.parse(favoriteAnime);
  }

  public save = (id: number): void => {
    if (!this.favoriteAnime.includes(id)) {
      const newFavoriteAnime = [...this.favoriteAnime, id];
      this.favoriteAnime = newFavoriteAnime;
      localStorage.setItem(favoriteAnimeKey, JSON.stringify(this.favoriteAnime));
    }
  };

  public get = (): number[] => {
    return this.favoriteAnime;
  };
}