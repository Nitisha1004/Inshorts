import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";

const NewsBoard = ({ category }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      setError(null);
      try {
        const url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${import.meta.env.VITE_API_KEY}`;
        const response = await fetch(url);
        const data = await response.json();

        console.log("Fetched Data:", data); // Log the fetched data

        if (data && data.articles) {
          setArticles(data.articles);
        } else {
          setArticles([]);
          setError("No articles found");
        }
      } catch (error) {
        console.error("Error fetching the news:", error);
        setError("Failed to fetch news");
      }
      setLoading(false);
    };

    fetchNews();
  }, [category]);

  console.log("Articles State:", articles); // Log the articles state

  return (
    <div>
      <h2 className="text-center">
        Latest <span className="badge bg-danger">News</span>
      </h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        articles.map((news, index) => (
          <NewsItem
            key={index}
            title={news.title}
            description={news.description}
            src={news.urlToImage}
            url={news.url}
          />
        ))
      )}
    </div>
  );
};

export default NewsBoard;
