import { useState, useEffect } from "react";

export function useFetch(url) {
  console.log("useFetch hook called, url:", url);

  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(
    function () {
      console.log("useFetch useEffect running, fetching:", url);

      // If no url was passed in, do nothing
      if (!url) {
        console.log("No url provided, skipping fetch");
        return;
      }

      setIsLoading(true);
      setError(null);

      async function fetchData() {
        try {
          console.log("Starting fetch request to:", url);
          const response = await fetch(url);

          if (!response.ok) {
            throw new Error("Network response was not ok: " + response.status);
          }

          const json = await response.json();
          console.log("Fetch successful, data received:", json);
          setData(json);
          setIsLoading(false);
        } catch (fetchError) {
          console.log("Fetch error:", fetchError);
          setError(fetchError.message);
          setIsLoading(false);
        }
      }

      fetchData();
    },
    [url],
  );

  return { data, isLoading, error };
}
