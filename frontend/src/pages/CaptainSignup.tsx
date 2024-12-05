import { useState } from "react";
import { Link } from "react-router-dom";

const CaptainSignup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [lastname, setLastname] = useState("");
  const [firstname, setFirstname] = useState("");
  const [captainData, setCaptainData] = useState({});

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();

    setCaptainData({
      fullName: {
        firstname: firstname,
        lastname: lastname,
      },
      password: password,
      email: email,
    });

    setFirstname("");
    setLastname("");
    setEmail("");
    setPassword("");
  };
  return (
    <div className="py-5 px-5 h-screen flex flex-col justify-between">
      <div>
        <img
          className="w-20 mb-8"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSVCO4w_adxK32rCXFeKq3_NbLcR9b_js14w&s"
        />
        <form
          onSubmit={(e) => {
            submitHandler(e);
          }}
        >
          <h3 className="text-lg font-medium mb-2">What's your name</h3>
          <div className="flex gap-4 mb-6">
            <input
              className="bg-[#eeeeee] w-1/2 rounded py-2 px-4 border text-lg placeholder:text-base"
              required
              type="text"
              placeholder="First name"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
            />

            <input
              className="bg-[#eeeeee] w-1/2 rounded py-2 px-4 border text-lg placeholder:text-base"
              required
              type="text"
              placeholder="Last name"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
            />
          </div>

          <h3 className="text-lg font-medium mb-2">What's your email</h3>
          <input
            className="bg-[#eeeeee] mb-5 rounded py-2 px-4 border w-full text-lg placeholder:text-base"
            required
            type="email"
            placeholder="johndoe@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <h3 className="text-lg font-medium mb-2">Enter password</h3>
          <input
            className="bg-[#eeeeee] mb-5 rounded py-2 px-4 border w-full text-lg placeholder:text-base"
            required
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="bg-[#111] text-white font-semibold mb-3 rounded py-2 px-4 w-full text-lg placeholder:text-base">
            Login
          </button>
        </form>

        <p className="text-center">
          Already have an Account?{" "}
          <Link to="/captain-login" className="text-blue-600">
            Login here
          </Link>
        </p>
      </div>

      <div>
        <p className="text-[10px] leading-tight">
          This site is protected by reCAPTCHA and the{" "}
          <span className="underline">Google privacy Policy</span> and Terms of
          Service apply
        </p>
      </div>
    </div>
  );
};

export default CaptainSignup;
