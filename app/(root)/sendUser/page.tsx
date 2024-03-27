import { SignOutButton } from "@clerk/nextjs";

const UserSender = () => {
  return (
    <div className="flex justify-center items-center h-full max-w-[1000px] mx-auto ">
      <SignOutButton>
        <a
          href="https://ecommerce-admin-gray-seven.vercel.app"
          rel=" noopener"
          target="_blank"
          className="text-purple-500 font-bold text-xl underline"
        >
          Click to sign in in the new tab 🚀 to carry out your crediantials
          securely
        </a>
      </SignOutButton>
    </div>
  );
};

export default UserSender;
