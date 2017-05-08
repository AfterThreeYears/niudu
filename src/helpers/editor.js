export const preview = (id) => {
  window.open(
    process.env.NODE_ENV === 'production' ? `/vinci/preview/${id}` : `/preview/${id}`,
    'preview',
    'width=390,height=600,location=no,left=100,resizable=no',
  );
};
