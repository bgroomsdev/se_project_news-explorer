import { useState } from "react";
import "./SearchForm.css";

function SearchForm({ onSearch }) {
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!query.trim()) {
      setError("Please enter a keyword");
      return;
    }
    setError("");
    onSearch(query.trim());
  }

  return (
    <form className="search-form" onSubmit={handleSubmit} noValidate>
      <input
        type="text"
        className="search-form__input"
        placeholder={error || "Enter topic"}
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          if (error) setError("");
        }}
        required
      />
      <button type="submit" className="search-form__button">
        Search
      </button>
    </form>
  );
}

export default SearchForm;
