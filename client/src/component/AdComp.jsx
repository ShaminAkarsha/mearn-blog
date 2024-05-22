import { Card } from "flowbite-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MdClose } from "react-icons/md";

export default function AdComp({ adId, category }) {
  const [diplayAdId, setDisplayAdId] = useState("");
  const [ad, setAd] = useState(null);
  const [showAd, setShowAd] = useState(true);
  useEffect(() => {
    const fetchAd = async () => {
      try {
        if (adId && adId !== "") {
          setDisplayAdId(adId);
        }
        if (!category) {
          category = null;
        }
        const res = await fetch(
          `/api/ad/getads?adid=${diplayAdId}&category=${category || ""}`
        );
        const data = await res.json();
        if (res.ok) {
          if (data.ads.length > 0) {
            console.log("ad amount:", data.ads.length);
            const rand = Math.floor(Math.random() * data.ads.length);
            setAd(data.ads[rand]);
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchAd();
  }, [adId, category]);

  if (!ad) {
    return <div>Loading Ad...</div>; // add a loading state or spinner
  }

  if (!showAd) {
    return null; // Don't render anything if the ad is closed
  }

  return (
    <div>
      <div className="relative h-fit w-fit">
        <button
          className="absolute top-0 right-0 m-2  text-gray-600 rounded-full p-2 hover:bg-gray-200 focus:outline-none"
          onClick={() => setShowAd(false)}
        >
          <MdClose />
        </button>
        <Link to={ad.adlink}>
          <Card className="max-w-sm" imgAlt={ad.content} imgSrc={ad.image}>
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {ad.title}
            </h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">
              {ad.content}
            </p>
          </Card>
        </Link>
      </div>
    </div>
  );
}
