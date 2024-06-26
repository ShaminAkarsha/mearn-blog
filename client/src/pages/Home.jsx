import { Link } from "react-router-dom";
import CallToAction from "../component/CallToAction";
import PostCard from "../component/PostCard";
import { useEffect, useState } from "react";
import AdComp from "../component/AdComp";

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch("/api/post/getposts");
      const data = await res.json();
      setPosts(data.posts);
    };
    fetchPosts();
  }, []);
  return (
    <div>
      <div className="flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold lg:text-6xl">Welcome to my Blog</h1>
        <p className="text-gray-500 text-xs sm:text-sm">
          Here you'll find a variaty of articles and tutorials on topics such as
          web development, software enginearing, and programming languages.
        </p>
        <Link
          to="/search?searchTerm=&sort=desc&category="
          className="text-sm sm:text-sm text-teal-500 font-bold 
        hover:underline"
        >
          Viwe all posts
        </Link>
      </div>
      <div className="p-3 bg-amber-100 dark:bg-slate-700">
        <CallToAction />
      </div>
      <div className="p-3 max-w-6xl mx-auto mt-2 flex flex-col sm:flex-row justify-center gap-4 bg-slate-100 shadow-md dark:bg-slate-800">
        <div><AdComp/></div>
        <div className="hidden sm:block"><AdComp/></div>
      </div>
      <div className="max-w-6xl mx-auto text-center flex flex-col p-3 gap-8 py-7">
        {posts && posts.length > 0 && (
          <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-semibold text-center">Recent Posts</h2>
            <div className="flex flex-wrap gap-4 justify-center">
              {posts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
            <Link to='/search?searchTerm=&sort=desc&category=' className="text-lg text-teal-500 hover:underline text-center">Viwe all posts</Link>
          </div>
        )}
      </div>
    </div>
  );
}
