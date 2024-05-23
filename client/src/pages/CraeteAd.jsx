import { Button, FileInput, TextInput, Textarea } from "flowbite-react";
import { HiOutlineLightBulb } from "react-icons/hi";

export default function CraeteAd() {
  return (
    <div>
      <div className="p-3 max-w-3xl mx-auto min-h-screen">
        <div className="flex text-3xl flex-row m-5 p-2 text-center justify-center">
          <h1
            className="font-semibold  mr-1
        "
          >
            List an Ad{" "}
          </h1>
          <HiOutlineLightBulb className="hover:text-yellow-200" />
        </div>
        <form className="flex flex-col gap-4">
          <TextInput 
          title="title" 
          placeholder="Ad title"
          required
          id="title"
          className="flex-1" />
          <TextInput
          title="adid"
          id="adid"
          placeholder="Ad Id"
          className="flex-1"
          />
          <div className="flex gap-3 items-center justify-between p-3">
            <FileInput type="file" accept="image/*"/>
            <Button 
            type="button"
            gradientDuoTone="purpleToBlue"
            className="w-30"
            outline
            >
              Upload Image
            </Button>
          </div>
          <Textarea
          title="content"
          placeholder="Category keywords and content"
          id="content"
          className="flex-1"/>
          <Button type="submit" gradientDuoTone="purpleToPink">
          Publish
        </Button>
        </form>
      </div>
    </div>
  );
}
