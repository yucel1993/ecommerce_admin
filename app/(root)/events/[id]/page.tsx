import CheckoutButton from "@/components/shared/CheckoutButton";
import Collection from "@/components/shared/Collection";
import PayPalButton from "@/components/shared/PayPalButton";
import {
  getEventById,
  getRelatedEventsByCategory,
} from "@/lib/database/actions/event.actions";
import { SearchParamProps } from "@/types";
import Image from "next/image";

const EventDetails = async ({
  params: { id },
  searchParams,
}: SearchParamProps) => {
  const event = await getEventById(id);

  const relatedEvents = await getRelatedEventsByCategory({
    categoryId: event.category._id,
    eventId: event._id,
    page: searchParams.page as string,
  });

  return (
    <>
      <section className="flex justify-center bg-primary-50 bg-dotted-pattern bg-contain">
        <div className="grid grid-cols-1 md:grid-cols-2 2xl:max-w-7xl">
          <Image
            src={event.imageUrl}
            alt="hero image"
            width={1000}
            height={1000}
            className="h-full min-h-[300px] object-contain  w-min-[300px] lg:w-[1200px]"
          />

          <div className="flex w-full flex-col gap-8 p-5 md:p-10">
            <div className="flex flex-col gap-6">
              <h2 className="h2-bold">{event.title}</h2>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <div className="flex gap-3">
                  <p className="p-bold-20 rounded-full bg-green-500/10 px-5 py-2 text-green-700">
                    ${event.price}
                  </p>
                  <p className="p-medium-16 rounded-full bg-grey-500/10 px-4 py-2.5 text-grey-500">
                    {event.category.name}
                  </p>
                </div>
              </div>
            </div>

            <CheckoutButton event={event} />

            <PayPalButton event={event} />

            <div className="flex flex-col gap-5"></div>
            <p className="p-medium-16 lg:p-regular-18  text-primary-500 font-extrabold ">
              {event.brand.name}
            </p>
            <div className="flex flex-col gap-2">
              <p className="p-bold-20 text-grey-600">Description:</p>
              <p className="p-medium-16 lg:p-regular-18">{event.description}</p>
            </div>
          </div>
        </div>
      </section>

      {/* EVENTS with the same category */}
      <section className="wrapper my-8 flex flex-col gap-8 md:gap-12">
        <h2 className="h2-bold">Related Products</h2>

        <Collection
          data={relatedEvents?.data}
          emptyTitle="No Product Found"
          emptyStateSubtext="Come back later"
          collectionType="All_Events"
          limit={3}
          page={searchParams.page as string}
          totalPages={relatedEvents?.totalPages}
        />
      </section>
    </>
  );
};

export default EventDetails;
