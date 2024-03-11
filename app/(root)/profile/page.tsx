import CategoryFilter from "@/components/shared/CategoryFilter";
import Collection from "@/components/shared/Collection";
import Search from "@/components/shared/Search";
import { Button } from "@/components/ui/button";
import {
  getAllEvents,
  getEventsByUser,
} from "@/lib/database/actions/event.actions";
import { getOrdersByUser } from "@/lib/database/actions/order.actions";
import { IOrder } from "@/lib/database/models/order.model";
import { SearchParamProps } from "@/types";
import { auth } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";

const ProfilePage = async ({ searchParams }: SearchParamProps) => {
  const { sessionClaims } = auth();

  const userId = sessionClaims?.userId as string;

  const ordersPage = Number(searchParams?.ordersPage) || 1;
  const eventsPage = Number(searchParams?.eventsPage) || 1;

  const orders = await getOrdersByUser({ userId, page: ordersPage });

  const orderedEvents = orders?.data.map((order: IOrder) => order.event) || [];
  const organizedEvents = await getEventsByUser({ userId, page: eventsPage });
  const adminCheck = userId === process.env.NEXT_ADMIN_SECRET;

  const page = Number(searchParams?.page) || 1;
  const searchText = (searchParams?.query as string) || "";
  const category = (searchParams?.category as string) || "";
  const events = await getAllEvents({
    query: searchText,
    category,
    page,
    limit: 6,
  });
  return (
    <>
      {!adminCheck ? (
        <>
          <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
            <div className="wrapper flex items-center justify-center sm:justify-between">
              <h3 className="h3-bold text-center sm:text-left">I bought</h3>
              <Button asChild size="lg" className="button hidden sm:flex">
                <Link href="/#events">Explore More Products</Link>
              </Button>
            </div>
          </section>

          <section className="wrapper my-8">
            <Collection
              data={orderedEvents}
              emptyTitle="No product purchased yet"
              emptyStateSubtext="No worries - plenty of exciting Productsto explore!"
              collectionType="My_Tickets"
              limit={3}
              page={ordersPage}
              urlParamName="ordersPage"
              totalPages={orders?.totalPages}
            />
          </section>
        </>
      ) : (
        <>
          <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
            <div className="wrapper flex items-center justify-center sm:justify-between">
              <h3 className="h3-bold text-center sm:text-left">Products</h3>
              <Button asChild size="lg" className="button hidden sm:flex">
                <Link href="/events/create">Create New Product</Link>
              </Button>
            </div>
          </section>

          <div className="flex mt-10 w-full flex-col gap-5 md:flex-row">
            <Search />
            <CategoryFilter />
          </div>

          <section className="wrapper my-8">
            <Collection
              data={events?.data}
              emptyTitle="No Products Found"
              emptyStateSubtext="Come back later"
              collectionType="All_Events"
              limit={6}
              page={page}
              totalPages={events?.totalPages}
              homePage={true}
            />
          </section>
        </>
      )}
    </>
  );
};

export default ProfilePage;
