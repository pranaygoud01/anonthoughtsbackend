import mongoose from "mongoose";
const userthoughts = mongoose.Schema(
  {
    idea: {
      require: true,
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Users = mongoose.model("Users", userthoughts);
export default Users;
