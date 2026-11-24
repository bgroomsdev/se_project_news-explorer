export const saveArticle = (article) => {
  return new Promise((resolve) => {
    resolve({
      ...article,
      _id: `saved-${Date.now()}`,
    });
  });
};

export const deleteArticle = (articleId) => {
  return new Promise((resolve) => {
    resolve({ message: "Article deleted", _id: articleId });
  });
};
