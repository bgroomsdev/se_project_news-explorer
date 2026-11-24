import { useState } from "react";
import "./Main.css";
import SearchForm from "../SearchForm/SearchForm.jsx";
import Preloader from "../Preloader/Preloader.jsx";
import NewsCard from "../NewsCard/NewsCard.jsx";
import About from "../About/About.jsx";
import notFoundIcon from "../../assets/not-found.svg";

function Main({
  articles,
  savedArticles,
  isLoading,
  hasSearched,
  searchError,
  isLoggedIn,
  onSearch,
  onSaveArticle,
}) {
  const [visibleCount, setVisibleCount] = useState(3);

  function handleSearch(keyword) {
    setVisibleCount(3);
    onSearch(keyword);
  }

  return (
    <main className="main">
      <section className="main__hero">
        <div className="main__hero-content">
          <h1 className="main__title">What&apos;s going on in the world?</h1>
          <p className="main__subtitle">
            Find the latest news on any topic and save them in your personal
            account.
          </p>
          <SearchForm onSearch={handleSearch} />
        </div>
      </section>

      {isLoading && <Preloader />}

      {!isLoading && searchError && (
        <section className="main__not-found">
          <h2 className="main__not-found-title">Something went wrong</h2>
          <p className="main__not-found-text">{searchError}</p>
        </section>
      )}

      {!isLoading && !searchError && hasSearched && articles.length === 0 && (
        <section className="main__not-found">
          <img
            src={notFoundIcon}
            alt="Nothing found magnifying glass"
            className="main__not-found-icon"
          />
          <h2 className="main__not-found-title">Nothing found</h2>
          <p className="main__not-found-text">
            Sorry, but nothing matched your search terms.
          </p>
        </section>
      )}

      {!isLoading && !searchError && articles.length > 0 && (
        <section className="main__results">
          <h2 className="main__results-title">Search results</h2>
          <ul className="main__cards-grid">
            {articles.slice(0, visibleCount).map((article) => {
              const isSaved = savedArticles.some(
                (saved) => saved.url === article.url,
              );
              return (
                <NewsCard
                  key={article.url}
                  article={article}
                  isLoggedIn={isLoggedIn}
                  isSaved={isSaved}
                  isSavedNewsPage={false}
                  onSaveClick={onSaveArticle}
                />
              );
            })}
          </ul>

          {visibleCount < articles.length && (
            <button
              type="button"
              className="main__show-more-button"
              onClick={() => setVisibleCount((prev) => prev + 3)}
            >
              Show more
            </button>
          )}
        </section>
      )}

      <About />
    </main>
  );
}

export default Main;
