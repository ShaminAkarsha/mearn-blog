import { Button, Modal, Table } from "flowbite-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import AddButton from "./utils/AddButton";

export default function DashAds() {
  const { currentUser } = useSelector((state) => state.user);
  const [userAds, setUserAds] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModel, setShowModel] = useState(false);
  const [deletingAdId, setDeletingAdId] = useState(null);
  useEffect(() => {
    const fetchAd = async () => {
      try {
        const res = await fetch(`/api/ad/getads?adId=&category=`);
        const data = await res.json();
        if (res.ok) {
          setUserAds(data.ads);
          if (data.ads.length < 9) {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (currentUser.isAdmin) {
      fetchAd();
    }
  }, []);
  const handleShowMore = async () => {
    const startIndex = userAds.length;
    try {
      const res = await fetch(`/api/ad/getads?startIndex=${startIndex}`);
      const data = await res.json();
      if (res.ok) {
        setUserAds((prev) => [...prev, ...data.ads]);
        if (data.ads.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleDeleteAd = async () => {
    setShowModel(false);
    if (!deletingAdId) {
      return;
    }
    try {
      const res = await fetch(`/api/ad/deletead/${deletingAdId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        setUserAds((prev) => prev.filter((ad) => ad._id !== deletingAdId));
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div
      className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100
    scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500"
    >
      {currentUser.isAdmin && userAds.length > 0 ? (
        <>
          <Table hoverable className="shadow-md">
            <Table.Head>
              <Table.HeadCell>Date updated</Table.HeadCell>
              <Table.HeadCell>Ad Id</Table.HeadCell>
              <Table.HeadCell>Ad Image</Table.HeadCell>
              <Table.HeadCell>Ad Title</Table.HeadCell>
              <Table.HeadCell>content</Table.HeadCell>
              <Table.HeadCell>Delete</Table.HeadCell>
            </Table.Head>
            {userAds.map((ad) => (
              <Table.Body className="divide-y">
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell>
                    {new Date(ad.updatedAt).toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell>
                    {ad.adid}
                  </Table.Cell>
                  <Table.Cell>
                    <img
                      src={ad.image}
                      alt={ad.title}
                      className="w-20 h-10 object-cover bg-gray-500"
                    />
                  </Table.Cell>
                  <Table.Cell>
                    <Link
                      className="font-medium text-teal-500 dark:text-white hover:underline"
                      to={ad.adlink}
                    >
                      {ad.title}
                    </Link>
                  </Table.Cell>
                  <Table.Cell>{ad.content}</Table.Cell>
                  <Table.Cell>
                    <span
                      onClick={() => {
                        setShowModel(true);
                        setDeletingAdId(ad._id);
                      }}
                      className="font-medium text-red-500 hover:underline cursor-pointer"
                    >
                      Delete
                    </span>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            ))}
          </Table>
          {showMore && (
            <button
              onClick={handleShowMore}
              className="w-full text-teal-500 self-center text-sm py-7"
            >
              show more
            </button>
          )}
        </>
      ) : (
        <p>You have no ads yet!</p>
      )}
      <div className="fixed bottom-4 z-20 right-4">
        <Link to={"/create-add"} target="new">
          <AddButton />
        </Link>
      </div>
      <Modal
        show={showModel}
        onClose={() => setShowModel(false)}
        popup
        size="md"
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle
              className="h-14 w-14 text-gray-400
              dark:text-gray-200 mb-4 mx-auto"
            />
            <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this Ad.
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleDeleteAd}>
                Yes, I'm sure
              </Button>
              <Button color="gray" onClick={() => setShowModel(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
