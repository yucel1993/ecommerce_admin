"use client";

import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex flex-col h-full gap-y-10 max-w-[1100px] justify-center items-center mx-auto ">
      <h2 className=" font-bold text-2xl text-purple-500">
        Ops, Something went wrong!
      </h2>
      <Button onClick={() => reset()}>Try again</Button>
      <p className="font-bold text-2xl text-blue-500/100 text-center">
        Or close this session and open a new session 🚀
      </p>
    </div>
  );
}
