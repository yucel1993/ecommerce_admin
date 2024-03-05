import paypal from "@paypal/checkout-server-sdk";
import { NextResponse } from "next/server";

const clientId = process.env.NEXT_PAYPAL_CLIENT_ID!;
const clientSecret = process.env.NEXT_PAYPAL_SECRET_ID!;
const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL!;

const environment = new paypal.core.SandboxEnvironment(clientId, clientSecret);
const client = new paypal.core.PayPalHttpClient(environment);

export async function POST() {
  const request = new paypal.orders.OrdersCreateRequest();
  request.requestBody({
    intent: "CAPTURE",
    purchase_units: [
      {
        amount: {
          currency_code: "USD",
          value: "2.00",
          breakdown: {
            item_total: {
              currency_code: "USD",
              value: "2.00",
            },
            discount: {
              currency_code: "USD",
              value: "0.00", // You can adjust this value if there's a discount
            },
            handling: {
              currency_code: "USD",
              value: "0.00", // You can adjust this value if there's handling cost
            },
            insurance: {
              currency_code: "USD",
              value: "0.00", // You can adjust this value if there's insurance cost
            },
            shipping_discount: {
              currency_code: "USD",
              value: "0.00", // You can adjust this value if there's a shipping discount
            },
            shipping: {
              currency_code: "USD",
              value: "0.00", // You can adjust this value based on shipping cost
            },
            tax_total: {
              currency_code: "USD",
              value: "0.00", // You can adjust this value based on tax
            },
          },
        },
        items: [
          {
            name: "Book of react",
            category: "PHYSICAL_GOODS",
            quantity: "1",
            description: "Book of react",
            unit_amount: {
              currency_code: "USD",
              value: "1.00",
            },
          },
          {
            name: "Book of react",
            category: "PHYSICAL_GOODS",
            quantity: "1",
            description: "Book of react",
            unit_amount: {
              currency_code: "USD",
              value: "1.00",
            },
          },
        ],
      },
    ],
    application_context: {
      return_url: `${serverUrl}/profile`,
      cancel_url: serverUrl,
    },
  });

  try {
    const response = await client.execute(request);
    console.log(response);

    return NextResponse.json({
      id: response.result.id,
    });
  } catch (error) {
    console.error("Error creating PayPal order:", error);
    return NextResponse.error();
  }
}
