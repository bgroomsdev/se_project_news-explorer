import "./SavedNews.css";
import NewsCard from "../NewsCard/NewsCard.jsx";

function SavedNews({ userName, savedArticles, onDeleteArticle }) {
  const uniqueKeywords = [
    ...new Set(savedArticles.map((article) => article.keyword).filter(Boolean)),
  ];

  function formatKeywords(keywords) {
    if (keywords.length === 0) return "";
    if (keywords.length <= 3) return keywords.join(", ");
    return `${keywords[0]}, ${keywords[1]}, and ${keywords.length - 2} other`;
  }

  return (
    <main className="saved-news">
      <section className="saved-news__header">
        <p className="saved-news__subtitle">Saved articles</p>
        <h1 className="saved-news__title">
          {userName}, you have {savedArticles.length} saved{" "}
          {savedArticles.length === 1 ? "article" : "articles"}
        </h1>
        {uniqueKeywords.length > 0 && (
          <p className="saved-news__keywords">
            By keywords:{" "}
            <span className="saved-news__keywords-bold">
              {formatKeywords(uniqueKeywords)}
            </span>
          </p>
        )}
      </section>

      {savedArticles.length > 0 && (
        <section className="saved-news__cards">
          <ul className="saved-news__cards-grid">
            {savedArticles.map((article) => (
              <NewsCard
                key={article.url}
                article={article}
                isLoggedIn={true}
                isSaved={true}
                isSavedNewsPage={true}
                onDeleteClick={onDeleteArticle}
              />
            ))}
          </ul>
        </section>
      )}
    </main>
  );
}

export default SavedNews;
