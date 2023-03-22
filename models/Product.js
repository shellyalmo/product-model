import mongoose from "mongoose";
import slugify from "slugify";

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a product name"],
      unique: [true, "Product name already exists"],
      trim: true,
    },
    slug: String,
    category: {
      type: String,
      required: [true, "Please add a category name"],
      trim: true,
    },
    isActive: Boolean,
    details: {
      description: {
        type: String,
        required: [true, "Please add a description"],
        maxlength: [
          10,
          "Product description can not be more than 10 characters",
        ],
        trim: true,
      },
      price: {
        type: Number,
        required: [true, "Please add a price"],
        trim: true,
        min: [0, "Price must be a positive number"],
      },
      discount: {
        type: Number,
        required: false,
        default: 0,
        trim: true,
      },
    },
    images: [
      { src: { type: String, required: true } },
      { src: { type: String, required: true } },
    ],
    phone: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          return /^(05[0-9]|02|03|04|08|09)[-.]?\d{7}$/;
          g.test(v);
        },
        message: (props) =>
          `${props.value} is not a valid Israeli phone number!`,
      },
    },
    dataAdded: { type: Date, default: Date.now },
  },

  {
    toJSON: {
      virtuals: true,
      //hide the _id and the __v fields from the frontend
      transform: function (doc, returnedObject) {
        returnedObject.id = returnedObject._id;
        delete returnedObject._id;
        delete returnedObject.__v;
      },
    },
    toObject: {
      virtuals: true,
      //hide the _id and the __v fields from the frontend
      transform: function (doc, returnedObject) {
        returnedObject.id = returnedObject._id;
        delete returnedObject._id;
        delete returnedObject.__v;
      },
    },
  }
);

//Middleware - create slug from name
ProductSchema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

export default mongoose.model("Product", ProductSchema);
