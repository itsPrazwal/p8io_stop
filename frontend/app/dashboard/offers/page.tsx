"use client";

import { OfferListTable } from "@/app/dashboard/offers/components/OfferList";
import { useOffers } from "@/lib/hooks/offer.queries";
import { OfferHeader } from "@/app/dashboard/offers/components/OfferHeader";

export default function OffersPage() {

  const {data} = useOffers()

  return (
    <div className="w-full mx-auto p-4">
      <OfferHeader />
      <OfferListTable offers={data?.offers || []} />
    </div>
  )
}