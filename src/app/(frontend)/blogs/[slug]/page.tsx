const ArticleDetailsPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) => {
  const { category } = await searchParams;

  return <div>{category}</div>;
};

export default ArticleDetailsPage;
