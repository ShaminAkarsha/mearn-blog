import mongoose from "mongoose";

const adSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default:
        "https://brentwoodsgf.org/wp-content/uploads/2018/10/joinus-361x181.jpg",
    },
    adlink: {
      type: String,
      default: "#",
    },
    adid: {
      type: Number,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

const Ad = mongoose.model("ad", adSchema);

export default Ad;
