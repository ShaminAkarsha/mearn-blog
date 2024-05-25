import { Button, Spinner } from "flowbite-react";
import { useEffect, useState, CSSProperties } from "react";
import { Link, useParams } from "react-router-dom";
import GridLoader from "react-spinners/GridLoader";
import CallToAction from "../component/CallToAction";
import CommentSection from "../component/CommentSection";
import PostCard from "../component/PostCard";
import AdComp from "../component/AdComp";

export default function PostPage() {
  const { postslug } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [post, setPost] = useState(null);
  const [recentPosts, setRecentPosts] = useState(null);
  const [firstHalfe, setfirstHalfe] = useState({});
  const [secondHalfe, setsecondHalfe] = useState({})

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/post/getposts?slug=${postslug}`);
        const data = await res.json();
        if (!res.ok) {
          setError(true);
          setLoading(false);
          return;
        }
        if (res.ok) {
          setPost(data.posts[0]);
          setLoading(false);
        }
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchPost();
  }, [postslug]);

  useEffect(() => {
    if (post && post.content) {
      const contentDividPoint = Math.floor(post.content.length / 2);
      setfirstHalfe(post.content.slice(0, contentDividPoint));
      setsecondHalfe(post.content.slice(contentDividPoint, post.content.length));
    }
  }, [post]);

  useEffect(() => {
    try {
      const fetchRecentPosts = async () => {
        const res = await fetch(`/api/post/getposts?limit=3`);
        const data = await res.json();
        if (res.ok) {
          setRecentPosts(data.posts);
        }
      };
      fetchRecentPosts();
    } catch (error) {
      console.log(error.message);
    }
  }, []);
  
  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <GridLoader size="10px" color="#36d7b7" />
      </div>
    );
  return (
    <main className="p-3 flex flex-col max-w-6xl mx-auto min-h-screen">
      <h1 className="text-3xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl">
        {post && post.title}
      </h1>
      <Link
        to={`/search?category=${post && post.category}`}
        className="self-center mt-5"
      >
        <Button color="gray" className="pl-1 pr-1" pill size="xm">
          {post && post.category}
        </Button>
      </Link>
      <img
        src={post && post.image}
        alt={post && post.title}
        className="mt-10 p-3 max-h-[600px] w-full object-cover"
      />
      <div className="flex justify-between p-3 border-b border-slate-500 mx-auto w-full max-w-2xl text-xs ">
        <span>{post && new Date(post.createdAt).toLocaleDateString()}</span>
        <span className="italic">
          {post && (post.content.length / 1000).toFixed(0)} mins read
        </span>
      </div>
      <div
        className="p-3 max-w-2xl mx-auto w-full post-content"
        dangerouslySetInnerHTML={{ __html: post && firstHalfe }}
      ></div>
      <div className="p-3  max-w-6xl mx-auto mt-2 flex flex-col sm:flex-row justify-center gap-4 bg-slate-100 dark:bg-slate-800 shadow-md">
        <div><AdComp/></div>
        <div className="hidden sm:block"><AdComp/></div>
      </div>
      <div
        className="p-3 max-w-2xl mx-auto w-full post-content"
        dangerouslySetInnerHTML={{ __html: post && secondHalfe }}
      ></div>
      <div className="max-w-4xl mx-auto w-full">
        <CallToAction />
      </div>
      <CommentSection postId={post._id} />

      <div className="flex flex-col mb-5 justify-center items-center">
        <h1 className="text-xl mt-5">Recent articles</h1>
        <div className="flex flex-wrap gap-5 mt-5 justify-center">
          {recentPosts
            ? recentPosts.map((post) => <PostCard key={post._id} post={post} />)
            : "No recent posts yet"}
        </div>
      </div>
    </main>
  );
}
