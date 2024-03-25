"use client";

import { IEvent } from "@/lib/database/models/event.model";
import { SignedIn, SignedOut, auth } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import Checkout from "./Checkout";

const CheckoutButton = ({ event }: { event: IEvent }) => {
  const { sessionClaims } = auth();

  const userId = sessionClaims?.userId as string;
  const hasStockFinished = +event.stock < 1;

  return (
    <div className="flex items-center gap-3">
      {hasStockFinished ? (
        <p className="p-2 text-red-400">
          Sorry, Products are no longer available.
        </p>
      ) : (
        <>
          <SignedOut>
            <Button asChild className="w-full" size="lg">
              <Link href="/sign-in">Get Product with Stripe</Link>
            </Button>
          </SignedOut>

          <SignedIn>
            <Checkout event={event} userId={userId} />
          </SignedIn>
        </>
      )}
    </div>
  );
};

export default CheckoutButton;
