interface Items {
  description: string;
  releaseDate: string;
  score: string;
  slug: number;
  title: string;
  image: {
    bucketType: string;
    bucketPath: string;
  };
  criticScoreSummary: {
    score: string;
  };
}

export interface Game {
  description: string;
  releaseDate: string;
  score: string;
  slug: number;
  title: string;
  image: string;
}

interface Reviews {
  quote: any;
  score: any;
  date: any;
  publicationName: any;
  author: any;
}

export async function getLatestGames() {
  const LATEST_GAMES =
    "https://internal-prod.apigee.fandom.net/v1/xapi/finder/metacritic/web?sortBy=-metaScore&productType=games&page=1&releaseYearMin=1958&releaseYearMax=2024&offset=0&limit=24&apiKey=1MOZgmNFxvmljaQR1X9KAij9Mo4xAY3u";

  const rawData = await fetch(LATEST_GAMES);
  const json = await rawData.json();

  const {
    data: { items },
  } = json;

  return items.map((item: Items) => {
    const { description, slug, releaseDate, image, criticScoreSummary, title } =
      item;
    const { score } = criticScoreSummary;

    const { bucketType, bucketPath } = image;
    const img = `https://www.metacritic.com/a/img/${bucketType}${bucketPath}`;

    const games: Game = {
      description,
      releaseDate,
      score,
      slug,
      title,
      image: img,
    };

    return games;
  });
}

export async function getGameDetails(slug: any) {
  const GAME_DETAILS = `https://internal-prod.apigee.fandom.net/v1/xapi/composer/metacritic/pages/games/${slug}/web?&apiKey=1MOZgmNFxvmljaQR1X9KAij9Mo4xAY3u`;

  const rawData = await fetch(GAME_DETAILS);
  const json = await rawData.json();

  const { components } = json;
  const { title, description, criticScoreSummary, images } = components[0];
  const { score } = criticScoreSummary;

  // get the card image
  const cardImage = images.find(
    (image: { typeName: string }) => image.typeName === "cardImage",
  );
  const { bucketType, bucketPath } = cardImage;
  const img = `https://www.metacritic.com/a/img/${bucketType}${bucketPath}`;

  const rawReviews = components[3].data.items;

  // get the reviews
  const reviews = rawReviews.map((review: Reviews) => {
    const { quote, score, date, publicationName, author } = review;
    return { quote, score, date, publicationName, author };
  });

  return {
    img,
    title,
    slug,
    description,
    score,
    reviews,
  };
}
