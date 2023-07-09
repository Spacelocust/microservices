import { articleClient } from '$server/grpc/client';

export const load = async () => {
  const { response } = await articleClient.listArticles('');

  return {
    articles: structuredClone(response.articles),
  };
};
