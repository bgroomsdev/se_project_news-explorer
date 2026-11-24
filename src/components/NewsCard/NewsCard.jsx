import { useState } from "react";
import "./NewsCard.css";
import bookmarkNormal from "../../assets/bookmark-normal.svg";
import bookmarkHover from "../../assets/bookmark-hover.svg";
import bookmarkMarked from "../../assets/bookmark-marked.svg";
import trashNormal from "../../assets/trash.svg";
import trashHover from "../../assets/trash-hover.svg";

function formatArticleDate(isoDate) {
  if (!isoDate) return "";
  const date = new Date(isoDate);
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function NewsCard({
  article,
  isLoggedIn,
  isSaved,
  isSavedNewsPage,
  onSaveClick,
  onDeleteClick,
}) {
  const [isHovered, setIsHovered] = useState(false);

  function handleActionClick() {
    if (isSavedNewsPage) {
      onDeleteClick(article);
    } else {
      onSaveClick(article);
    }
  }

  let currentIcon = bookmarkNormal;
  if (isSavedNewsPage) {
    currentIcon = isHovered ? trashHover : trashNormal;
  } else if (isSaved) {
    currentIcon = bookmarkMarked;
  } else if (isHovered) {
    currentIcon = bookmarkHover;
  }

  return (
    <li className="news-card">
      <article className="news-card__article">
        <div className="news-card__image-container">
          <img
            src={article.urlToImage || article.image}
            alt={article.title}
            className="news-card__image"
          />

          {isSavedNewsPage && article.keyword && (
            <span className="news-card__keyword">{article.keyword}</span>
          )}

          <div className="news-card__controls">
            {(!isLoggedIn || isSavedNewsPage) && (
              <span className="news-card__tooltip">
                {isSavedNewsPage
                  ? "Remove from saved"
                  : "Sign in to save articles"}
              </span>
            )}

            <button
              type="button"
              className="news-card__action-button"
              aria-label={
                isSavedNewsPage ? "Remove from saved" : "Save article"
              }
              onClick={handleActionClick}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <img
                src={currentIcon}
                alt=""
                className="news-card__action-icon"
              />
            </button>
          </div>
        </div>

        <a
          href={article.url || article.link}
          target="_blank"
          rel="noreferrer"
          className="news-card__content"
        >
          <p className="news-card__date">
            {formatArticleDate(article.publishedAt || article.date)}
          </p>
          <h3 className="news-card__title">{article.title}</h3>
          <p className="news-card__text">
            {article.description || article.text}
          </p>
          <p className="news-card__source">
            {article.source?.name || article.source}
          </p>
        </a>
      </article>
    </li>
  );
}

export default NewsCard;
