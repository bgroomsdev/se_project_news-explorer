import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
import Header from "../Header/Header.jsx";
import Main from "../Main/Main.jsx";
import SavedNews from "../SavedNews/SavedNews.jsx";
import Footer from "../Footer/Footer.jsx";
import LoginModal from "../LoginModal/LoginModal.jsx";
import RegisterModal from "../RegisterModal/RegisterModal.jsx";
import ModalWithForm from "../ModalWithForm/ModalWithForm.jsx";
import { getNewsArticles } from "../../utils/NewsApi.js";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute.jsx";
import * as auth from "../../utils/auth.js";
import * as api from "../../utils/api.js";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({ name: "Elise", email: "" });
  const [activeModal, setActiveModal] = useState("");
  const [articles, setArticles] = useState([]);
  const [savedArticles, setSavedArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [searchError, setSearchError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      auth
        .checkToken(token)
        .then((res) => {
          setCurrentUser(res.data);
          setIsLoggedIn(true);
        })
        .catch(() => {
          localStorage.removeItem("jwt");
        });
    }
  }, []);

  function closeAllModals() {
    setActiveModal("");
  }

  function handleRegister({ email, password, name }) {
    auth.register(email, password, name).then(() => {
      setActiveModal("success");
    });
  }

  function handleLogin({ email, password }) {
    auth.authorize(email, password).then((data) => {
      if (data.token) {
        localStorage.setItem("jwt", data.token);
        auth.checkToken(data.token).then((res) => {
          setCurrentUser(res.data);
          setIsLoggedIn(true);
          closeAllModals();
        });
      }
    });
  }

  function handleLogout() {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    navigate("/");
  }

  function handleSearch(keyword) {
    setIsLoading(true);
    setHasSearched(true);
    setSearchError("");

    getNewsArticles(keyword)
      .then((data) => {
        const formattedKeyword =
          keyword.charAt(0).toUpperCase() + keyword.slice(1);
        const filtered = (data.articles || [])
          .filter((item) => item.title && item.title !== "[Removed]")
          .map((item) => ({
            ...item,
            keyword: formattedKeyword,
          }));
        setArticles(filtered);
      })
      .catch(() => {
        setSearchError(
          "Sorry, something went wrong during the request. Please try again later.",
        );
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleSaveArticle(article) {
    if (!isLoggedIn) {
      setActiveModal("login");
      return;
    }

    const existingSaved = savedArticles.find(
      (saved) => saved.url === article.url,
    );

    if (existingSaved) {
      api.deleteArticle(existingSaved._id).then(() => {
        setSavedArticles((prev) =>
          prev.filter((saved) => saved.url !== article.url),
        );
      });
    } else {
      api.saveArticle(article).then((savedCard) => {
        setSavedArticles((prev) => [savedCard, ...prev]);
      });
    }
  }

  function handleDeleteArticle(articleToDelete) {
    api.deleteArticle(articleToDelete._id).then(() => {
      setSavedArticles((prev) =>
        prev.filter((saved) => saved.url !== articleToDelete.url),
      );
    });
  }

  return (
    <div className="page">
      <Header
        isLoggedIn={isLoggedIn}
        userName={currentUser.name}
        onSignInClick={() => setActiveModal("login")}
        onLogoutClick={handleLogout}
      />

      <Routes>
        <Route
          path="/"
          element={
            <Main
              articles={articles}
              savedArticles={savedArticles}
              isLoading={isLoading}
              hasSearched={hasSearched}
              searchError={searchError}
              isLoggedIn={isLoggedIn}
              onSearch={handleSearch}
              onSaveArticle={handleSaveArticle}
            />
          }
        />
        <Route
          path="/saved-news"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <SavedNews
                userName={currentUser.name}
                savedArticles={savedArticles}
                onDeleteArticle={handleDeleteArticle}
              />
            </ProtectedRoute>
          }
        />
      </Routes>

      <Footer />

      <LoginModal
        isOpen={activeModal === "login"}
        onClose={closeAllModals}
        onLogin={handleLogin}
        onSwitchToRegister={() => setActiveModal("register")}
      />

      <RegisterModal
        isOpen={activeModal === "register"}
        onClose={closeAllModals}
        onRegister={handleRegister}
        onSwitchToLogin={() => setActiveModal("login")}
      />

      <ModalWithForm
        title="Registration successfully completed!"
        name="success"
        isOpen={activeModal === "success"}
        onClose={closeAllModals}
        switchText="Sign in"
        onSwitchClick={() => setActiveModal("login")}
      />
    </div>
  );
}

export default App;
