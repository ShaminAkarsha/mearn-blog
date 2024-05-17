import { Button, Select, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PostCard from "../component/PostCard";

export default function Search() {
  const location = useLocation();
  const [sideBarData, setSideBarData] = useState({
    serchTerm: "",
    sort: "desc",
    category: "",
  });
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const navigate = useNavigate();
  console.log(sideBarData);
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromURL = urlParams.get("searchTerm");
    const sortFromUrl = urlParams.get("sort");
    const categoryFromUrl = urlParams.get("category");
    if (searchTermFromURL || sortFromUrl || categoryFromUrl) {
      setSideBarData({
        ...sideBarData,
        serchTerm: searchTermFromURL,
        sort: sortFromUrl,
        category: categoryFromUrl,
      });

      const fetchPosts = async () => {
        setLoading(true);
        const searchQuery = urlParams.toString();
        const res = await fetch(`/api/post/getposts?${searchQuery}`);
        if (!res.ok) {
          setLoading(false);
          return;
        }
        if (res.ok) {
          const data = await res.json();
          setPosts(data.posts);
          setLoading(false);
          if (data.posts.length === 9) {
            setShowMore(true);
          } else {
            setShowMore(false);
          }
        }
      };
      fetchPosts();
    }
  }, [location.search]);
  const hanldeChange = (e) => {
    if (e.target.id === "searchTerm") {
      setSideBarData({ ...sideBarData, serchTerm: e.target.value });
    }
    if (e.target.id === "category") {
      const category = e.target.value || "";
      setSideBarData({ ...sideBarData, category });
    }
    if (e.target.id === "sort") {
      const order = e.target.value || "desc";
      setSideBarData({ ...sideBarData, sort: order });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("searchTerm", sideBarData.serchTerm);
    urlParams.set("sort", sideBarData.sort);
    urlParams.set("category", sideBarData.category);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  const handleShowMore = async () =>{
    const numberOfPosts = posts.length;
    const startIndex = numberOfPosts;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('startIndex', startIndex);
    const searchQuery = urlParams.toString();
    const res = await fetch(`/api/post/getposts?${searchQuery}`);
    if(!res.ok){
      return;
    }
    if(res.ok){
      const data = await res.json();
      setPosts([...posts, ...data.posts]);
      if(data.posts.length === 9){
        setShowMore(true);
      }else{
        setShowMore(false);
      }
    }
  }

  return (
    <div className="flex flex-col md:flex-row">
      <div className="p-7 border-b md:border-r md:min-h-screen border-gray-500">
        <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
          <div className="flex items-center gap-2">
            <label className="whitespace-nowrap font-semibold">
              Search Term:
            </label>
            <TextInput
              placeholder="Search Term"
              id="searchTerm"
              type="text"
              value={sideBarData.serchTerm}
              onChange={hanldeChange}
            />
          </div>

          <div className="flex items-center gap-2">
            <label className="font-semibold">Sort:</label>
            <Select
              className=""
              onChange={hanldeChange}
              value={sideBarData.sort}
              id="sort"
            >
              <option value="desc">Latest</option>
              <option value="asc">Oldest</option>
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <label className="font-semibold">Category:</label>
            <Select
              className=""
              onChange={hanldeChange}
              value={sideBarData.category}
              id="category"
            >
              <option value="">All types</option>
              <option value="Javascript">JavaScript</option>
              <option value="reactjs">ReactJs</option>
              <option value="nextjs">NextJs</option>
              <option value="uncategorized">uncategorized</option>
            </Select>
          </div>
          <Button type="submit" outline gradientDuoTone="purpleToPink">
            Apply Filters
          </Button>
        </form>
      </div>
      <div className="w-full ">
        <h1 className="text-3xl font-semibold sm:border-b border-gray-500 p-3 mt-5">
          Posts Results:
        </h1>
        <div className="p-7 flex flex-wrap gap-3">
          {!loading && posts.length === 0 && (
            <p className="text-xl text-gray-500">No posts found</p>
          )}
          {loading && <p className="text-xl text-gray-500">Loading...</p>}
          {!loading &&
            posts &&
            posts.map((post) => <PostCard key={post._id} post={post} />)}
          {
            showMore && <button onClick={handleShowMore} className="text-teal-500 text-lg hover:underline p-7 w-full">
              show more
            </button>
          }
        </div>
      </div>
    </div>
  );
}
