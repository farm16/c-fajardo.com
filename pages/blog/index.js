import React, { useEffect, useCallback, useState } from "react";
export default function Blog() {
  const [news, setNews] = useState([]);
  const api = "https://hn.algolia.com/api/v1/search?tags=front_page";
  // http://hn.algolia.com/api/v1/search?tags=front_page
  const fetchData = useCallback(async () => {
    if (news.length > 0) return null;
    try {
      const response = await fetch(api);
      const res = await response.json();
      setNews([...res.hits]);
    } catch (error) {
      alert(error);
    }
  }, [news.length]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="flex flex-col m-3">
      <div
        className="bg-yellow-100 self-center text-center rounded-lg py-5 px-6 text-base text-yellow-700 mb-3"
        role="alert"
      >
        Oops, sorry no personal blogs yet!
        <br /> ...but you can enjoy some content from one of my faves APIs{" "}
        <a
          rel="noopener noreferrer"
          target="_blank"
          href="https://hn.algolia.com"
          className="p-2 bg-red-700 text-white text-lg"
        >
          HackerNews
        </a>{" "}
        =)
      </div>
      {news.map((elem, i) => (
        <div className="flex mb-3" key={i}>
          <p className="mb-4">
            <svg
              aria-hidden="true"
              focusable="false"
              data-prefix="fas"
              data-icon="quote-left"
              className="w-6 pr-2 inline-block"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path
                fill="currentColor"
                d="M464 256h-80v-64c0-35.3 28.7-64 64-64h8c13.3 0 24-10.7 24-24V56c0-13.3-10.7-24-24-24h-8c-88.4 0-160 71.6-160 160v240c0 26.5 21.5 48 48 48h128c26.5 0 48-21.5 48-48V304c0-26.5-21.5-48-48-48zm-288 0H96v-64c0-35.3 28.7-64 64-64h8c13.3 0 24-10.7 24-24V56c0-13.3-10.7-24-24-24h-8C71.6 32 0 103.6 0 192v240c0 26.5 21.5 48 48 48h128c26.5 0 48-21.5 48-48V304c0-26.5-21.5-48-48-48z"
              ></path>
            </svg>
            {elem.title}{" "}
          </p>
          <a
            className="ml-auto inline-block px-6 py-2.5 bg-transparent text-blue-600 font-medium text-xs leading-tight uppercase rounded hover:bg-gray-100 focus:text-blue-700 focus:bg-gray-100 focus:outline-none focus:ring-0 active:bg-gray-200 active:text-blue-800 transition duration-300 ease-in-out"
            href={elem.url}
            target="_black"
          >
            Link
          </a>
          <p className="w-1/5 text-right font-medium text-xs leading-tight uppercase ">
            by : {elem.author}
            <br /> date: {elem.created_at.split("T")[0]}
          </p>
        </div>
      ))}
    </div>
  );
}
