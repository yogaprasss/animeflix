export const animeListQuery = `
  query ($page: Int, $genre: String) {
    Page(page: $page, perPage: 24) {
      pageInfo {
        hasNextPage
      }
      media(type: ANIME, genre: $genre) {
        id
        title {
          userPreferred
        }
        coverImage {
          extraLarge
          large
          medium
        }
      }
    }
  }
`;

export const animeDetailQuery = `
  query ($id: Int) {
    Media(type: ANIME, id: $id) {
      id
      title {
        userPreferred
      }
      genres
      duration
      episodes
      description(asHtml: true)
      coverImage {
        extraLarge
        large
        medium
      }
      bannerImage
      averageScore
      startDate {
        year
      }
    }
  }
`;
