// utility page
export type DynamicUtilityPageProps = {
  params: Promise<{ slug: string }>;
};

// previous form state
export type PrevFormStateProps = {
  success: boolean;
  message: string;
  field?: string;
};
