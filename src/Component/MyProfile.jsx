import React, { useContext, useState } from "react";
import { Authcontext } from "../Provider/Authprovider";
import { auth } from "../Firebase/firebase.config";
import { updateProfile } from "firebase/auth";
import Swal from "sweetalert2";
import PrivateRoute from "../PrivetRoute/PrivateRoute";

const MyProfile = () => {
  const { user, setuser } = useContext(Authcontext);
  const [name, setName] = useState(user?.displayName || "");
  const [photoURL, setPhotoURL] = useState(user?.photoURL || "");

  const handleUpdate = () => {
    updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photoURL
    })
      .then(() => {
        setuser({ ...user, displayName: name, photoURL: photoURL });
        Swal.fire({
          icon: "success",
          title: "Profile Updated",
          text: "Your profile has been updated successfully!",
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Update Failed",
          text: error.message,
        });
      });
  };

  return (
    <PrivateRoute>
      <div className="min-h-screen flex items-center justify-center bg-gray-300 p-4">
           <title>FinEase-My Profile</title>
        <div className="bg-white text-black p-8 rounded-xl shadow-xl w-full max-w-md">
          {/* Title */}
          <h2 className="text-4xl font-bold text-gray-500 text-center mb-6">
            My Profile 📝
          </h2>

          {/* Profile Form */}
          <div className="space-y-4">

            {/* Photo Preview */}
            {photoURL && (
              <div className="flex justify-center">
                <img
                  src={photoURL}
                  alt="Profile"
                  className="w-24 h-24 rounded-full mt-2"
                />
              </div>
            )}
            {/* Name */}
            <div>
              <label className="block font-semibold mb-1">Name</label>
              <input
                type="text"
                className="w-full px-4 py-2 border rounded-lg"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            {/* Photo URL */}
            <div>
              <label className="block font-semibold mb-1">Photo URL</label>
              <input
                type="text"
                className="w-full px-4 py-2 border rounded-lg"
                value={photoURL}
                onChange={(e) => setPhotoURL(e.target.value)}
              />
            </div>

            {/* Email */}
            <div>
              <label className="block font-semibold mb-1">Email</label>
              <input
                type="email"
                className="w-full px-4 py-2 border rounded-lg bg-gray-100"
                value={user?.email}
                disabled
              />
            </div>

            {/* Update Button */}
            <button
              onClick={handleUpdate}
              className="w-full bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-700"
            >
              Update Profile
            </button>
          </div>
        </div>
      </div>
    </PrivateRoute>
  );
};

export default MyProfile;
