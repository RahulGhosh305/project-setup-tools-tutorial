import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // API call is proxied through Vite (no need to include the full backend URL)
    fetch(`${import.meta.env.VITE_URL_NAME}/posts`)
      .then((response) => response.json())
      .then((data) => {
        if (data?.posts?.length) {
          setPosts(data?.posts);
        } else {
          setPosts(data);
        }
      })
      .catch((error) => setError(error));
  }, []);

  return (
    <div className="space-y-10">
      <div>
        <p className="read-the-docs text-2xl font-bold underline">
          === Http-Proxy-Middleware Tutorial ====
        </p>
        <p className="read-the-docs mt-2">
          Change{" "}
          <span className="font-bold text-sm">
            VITE_URL_NAME = {import.meta.env.VITE_URL_NAME}
          </span>{" "}
          in the `.env` file and check the setup in the
          <span className="font-bold"> source code</span> and
          <span className="font-bold"> network</span> tab.
        </p>
      </div>
      <div>
        <p>
          Original proxy endpoint:{" "}
          <span className="font-bold underline">
            {import.meta.env.VITE_URL_NAME === "development"
              ? `https://jsonplaceholder.typicode.com/posts`
              : `https://dummyjson.com/posts`}
          </span>
        </p>
        <p>
          Network data endpoint:{" "}
          <span className="font-bold underline">
            http://localhost:5173/{import.meta.env.VITE_URL_NAME}/posts
          </span>
        </p>
      </div>
      <div>
        {error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <ul>
            {posts.slice(0, 5).map((post, i) => (
              <li key={post.id}>{`${i + 1} - ${post.title}`}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;
