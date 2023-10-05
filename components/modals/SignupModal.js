import { closeSignupModal, openSignupModal } from "@/Redux/modalSlice";
import Modal from "@mui/material/Modal";
import { useDispatch, useSelector } from "react-redux";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "@/firebase";
import { setUser } from "@/Redux/userSlice";
import { useRouter } from "next/router";

export default function SignupModal() {
  const isOpen = useSelector((state) => state.modals.signupModalOpen);
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  async function handleSignup() {
    const userCredentials = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    await updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: `${
        window.location.origin
      }/assets/profilePictures/pfp${Math.ceil(Math.random() * 6)}.png`,
    });
    router.reload();
  }

  async function handleGuestSignIN() {
    await signInWithEmailAndPassword(
      auth,
      "guest12345564576@gmail.com",
      "123456"
    );
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) return;
      dispatch(
        setUser({
          username: currentUser.email.split("@")[0],
          name: currentUser.displayName,
          email: currentUser.email,
          uid: currentUser.uid,
          photoURL: currentUser.photoURL,
        })
      );
    });
    return unsubscribe;
  });

  return (
    <>
      <button
        className="bg-white border border-white text-black w-[160px]
          rounded-full h-[40px] hover:bg-[#cbd2d7]"
        onClick={() => dispatch(openSignupModal())}
      >
        Sign up
      </button>

      <Modal
        open={isOpen}
        onClose={() => dispatch(closeSignupModal())}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          className="w-[90%] h-[600px] bg-black text-white border
                border-gray-700
                rounded-lg flex justify-center
          md:w-[560px]
          md:h-[600px]"
        >
          <div className="w-[90%] mt-8  flex flex-col">
            <button
              className="bg-white text-black w-full
                         font-bold
                         text-lg
                         p-2 rounded-md"
              onClick={handleGuestSignIN}
            >
              Sign In as Guest
            </button>
            <h1 className="text-center mt-4 font-bold text-lg">or</h1>
            <h1 className="text-center mt-4 font-bold text-4xl">
              Create your account
            </h1>
            <input
              placeholder="Full Name"
              className="h-10 mt-8 rounded-md bg-transparent border border-gray-700 p-6"
              type={"text"}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              placeholder="Email"
              className="h-10 mt-8 rounded-md bg-transparent border border-gray-700 p-6"
              type={"email"}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              placeholder="Password"
              type={"password"}
              className="h-10 mt-8 rounded-md bg-transparent border border-gray-700 p-6"
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              className="bg-white text-black w-full
                         font-bold
                         text-lg
                         p-2 mt-8 rounded-md"
              onClick={handleSignup}
            >
              Create your account
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}
