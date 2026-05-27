const ArticleDetailsPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) => {
  const { category } = await searchParams;

  return (
    <div>
      {category} Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cum,
      repellat sequi explicabo illo soluta voluptatum dignissimos quam? Laborum,
      illo alias.
    </div>
  );
};

export default ArticleDetailsPage;
