import ProgressBar from "@ramonak/react-progress-bar";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import {
  Alert,
  Button,
  FileInput,
  Spinner,
  TextInput,
  Textarea,
} from "flowbite-react";
import { useState } from "react";
import { HiOutlineLightBulb } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { app } from "../firebase";

export default function CraeteAd() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [errorUploading, SetErrorUploading] = useState(null);
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUploadingProgress, setImageFileUploadingProgress] =
    useState(null);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleUploadImage = async () => {
    try {
      if (!imageFile) {
        setImageFileUploadError("Please profide a file to upload");
        return;
      }
      setImageFileUploadError(null);
      const storage = getStorage(app);
      const fileName = new Date().getTime() + "-" + imageFile.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, imageFile);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImageFileUploadingProgress(progress.toFixed(0));
        },
        (error) => {
          setImageFileUploadError("Image upload failed");
          setImageFileUploadingProgress(null);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageFileUploadingProgress(null);
            setImageFileUploadError(null);
            setFormData({ ...formData, image: downloadURL });
          });
        }
      );
    } catch (error) {
      setImageFileUploadError(error.message);
      setImageFileUploadingProgress(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      SetErrorUploading(null);
      setLoading(true);
      if (Object.keys(formData).length === 0) {
        SetErrorUploading("Please make sure to fill title and id");
        setLoading(false);
        return;
      }
      const res = await fetch("/api/ad/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if(!res.ok){
        SetErrorUploading(data.message);
        setLoading(false);
        return;
      }
      if(res.ok){
        setLoading(false);
        SetErrorUploading(null);
        navigate('/dashboard?tab=ads');
      }
    } catch (error) {
      setLoading(false);
      SetErrorUploading(error.message);
      console.log(error.message);
    }
  };
  return (
    <div>
      <div className="p-3 max-w-3xl mx-auto min-h-screen">
        <div className="flex text-3xl flex-row m-5 p-2 text-center justify-center">
          <h1 className="font-semibold  mr-1">List an Ad</h1>
          <HiOutlineLightBulb className="hover:text-yellow-200" />
        </div>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <TextInput
            placeholder="Ad title"
            required
            id="title"
            className="flex-1"
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />
          <TextInput
            id="adid"
            placeholder="Ad Id"
            className="flex-1"
            onChange={(e) =>
              setFormData({ ...formData, adid: e.target.value })
            }
          />
          <TextInput
            id="adlink"
            placeholder="Ad Link"
            className="flex-1"
            onChange={(e) =>
              setFormData({ ...formData, adlink: e.target.value })
            }
          />
          <div className="flex gap-3 items-center justify-between p-3">
            <FileInput
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
            <Button
              type="button"
              gradientDuoTone="purpleToBlue"
              className="w-30"
              outline
              onClick={handleUploadImage}
              disabled={imageFileUploadingProgress}
            >
              {imageFileUploadingProgress ? (
                <div className="">
                  <ProgressBar
                    width="88px"
                    isLabelVisible={false}
                    height="20px"
                    bgColor="purple"
                    padding="0"
                    completed={imageFileUploadingProgress || 0}
                  />
                </div>
              ) : (
                "Upload image"
              )}
            </Button>
          </div>
          {imageFileUploadError && (
            <Alert color="failure" className="mt-4 mb-5">
              {imageFileUploadError}
            </Alert>
          )}
          <div className="flex md:flex-row flex-col gap-3">
           {formData.image && (
          <img
            src={formData.image}
            alt="uploadedImage"
            className="md:w-72 w-full h-60 object-cover"
          />
        )}
          <Textarea
            placeholder="Category keywords and content"
            id="content"
            className="flex-1"
            onChange={(e) =>
              setFormData({ ...formData, content: e.target.value })
            }
          />
          </div>
          <Button
            type="submit"
            gradientDuoTone="purpleToPink"
            disabled={loading}
          >
            {loading ? (
              <>
                <Spinner size="sm" /> <p className="ml-2">loading...</p>
              </>
            ) : (
              "Publish"
            )}
          </Button>
          {errorUploading && (
            <Alert color="failure" className="mt-5">
              {errorUploading}
            </Alert>
          )}
        </form>
      </div>
    </div>
  );
}
