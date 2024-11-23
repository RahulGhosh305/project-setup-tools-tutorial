import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [posts, setPosts] = useState([]);
  console.log(import.meta.env.VITE_API_URL); // Output depends on the current mode
  console.log(import.meta.env.VITE_ENV_NAME); // Loaded from `.env`

  useEffect(() => {
    // API call is proxied through Vite (no need to include the full backend URL)
    fetch(`/${import.meta.env.VITE_API_VERSION_PREFIX}/posts`)
      .then((response) => response.json())
      .then((data) => {
        if (data?.posts?.length) {
          setPosts(data?.posts);
        } else {
          setPosts(data);
        }
      })
      .catch((error) => console.error("Error fetching posts:", error));
  }, []);

  return (
    <>
      <div className="space-y-10">
        <div>
          <p className="read-the-docs text-2xl font-bold underline">
            === Http-proxy-middleware Tutorial ====
          </p>
          <p className="read-the-docs mt-2">
            Change{" "}
            <span className="font-bold">
              Prefix {import.meta.env.VITE_API_VERSION_PREFIX}
            </span>{" "}
            on env file and Check setup
            <span className="font-bold"> Source codes</span> and
            <span className="font-bold"> Newwork</span> tab.
          </p>
          <p>
            Original endpoint-{" "}
            <span className="underline">
              {import.meta.env.VITE_API_VERSION_PREFIX == "api-v1"
                ? "https://jsonplaceholder.typicode.com/posts"
                : "https://dummyjson.com/posts"}
            </span>
          </p>
        </div>
        <div>
          <h1 className="text-xl underline">
            Data endpoint from --{" "}
            <span className="font-bold">
              /{import.meta.env.VITE_API_VERSION_PREFIX}/posts
            </span>
          </h1>
          <ul>
            {posts.slice(0, 5).map((post, i) => (
              <li key={post.id}>{`${i + 1} - ${post.title}`}</li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default App;
