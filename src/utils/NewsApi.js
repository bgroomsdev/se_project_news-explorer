const newsApiBaseUrl =
  import.meta.env.MODE === "production"
    ? "https://news-api-proxy.up.railway.app/news/v2/everything"
    : "https://newsapi.org/v2/everything";

const API_KEY = import.meta.env.VITE_NEWS_API_KEY;

function getPastWeekRange() {
  const to = new Date();
  const from = new Date();
  from.setDate(to.getDate() - 7);

  return {
    from: from.toISOString().split("T")[0],
    to: to.toISOString().split("T")[0],
  };
}

export function getNewsArticles(keyword) {
  const { from, to } = getPastWeekRange();
  const url = `${newsApiBaseUrl}?q=${encodeURIComponent(
    keyword,
  )}&from=${from}&to=${to}&pageSize=100&apiKey=${API_KEY}`;

  return fetch(url).then((res) => {
    if (!res.ok) {
      return Promise.reject(`Error: ${res.status}`);
    }
    return res.json();
  });
}
