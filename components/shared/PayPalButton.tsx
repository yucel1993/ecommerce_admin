"use client";

import { IEvent } from "@/lib/database/models/event.model";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { SignedIn, SignedOut, useUser } from "@clerk/nextjs";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";

const PayPalButton = ({ event }: { event: IEvent }) => {
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const { user } = useUser();
  const userId = user?.publicMetadata.userId as string;
  const hasStockFinished = +event.stock < 1;

  const addPaypalScript = () => {
    if (window.paypal) {
      setScriptLoaded(true);
      return;
    }
    const script = document.createElement("script");
    script.src = `https://www.paypal.com/sdk/js?client-id=${process.env.NEXT_PUBLIC_CLIENT_ID}&vault=true`;
    script.type = "text/javascript";
    script.async = true;
    script.onload = () => setScriptLoaded(true);
    document.body.appendChild(script);
  };
  useEffect(() => {
    addPaypalScript();
  }, []);

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
              <Link href="/sign-in">Get Product with PayPal</Link>
            </Button>
          </SignedOut>

          <SignedIn>
            <div className="w-full">
              {scriptLoaded ? (
                <>
                  <PayPalScriptProvider
                    options={{ clientId: process.env.NEXT_PUCLIC_CLIENT_ID! }}
                  >
                    <PayPalButtons
                      style={{ layout: "horizontal", label: "paypal" }}
                      createOrder={async () => {
                        const res = await fetch(`/api/checkout`, {
                          method: "POST",
                        });
                        const order = await res.json();
                        console.log(order);
                        return order.id;
                      }}
                      onApprove={async (data, actions) => {
                        console.log(data);
                        if (actions && actions.order) {
                          await actions.order.capture();
                          // Return a promise indicating the completion of the transaction
                          return new Promise<void>((resolve, reject) => {
                            // You can perform any additional logic here
                            // Resolve the promise to indicate successful transaction completion
                            resolve();
                          });
                        } else {
                          // Handle the case where actions or actions.order is not defined
                          console.error(
                            "Actions or Actions.order is not defined"
                          );
                          // Return a rejected promise to indicate failure
                          return Promise.reject(
                            "Actions or Actions.order is not defined"
                          );
                        }
                      }}
                      onCancel={(data, actions) => {
                        console.log(data);
                        actions.redirect();
                      }}
                    />
                  </PayPalScriptProvider>
                </>
              ) : (
                "Loading"
              )}
            </div>
          </SignedIn>
        </>
      )}
    </div>
  );
};

export default PayPalButton;
