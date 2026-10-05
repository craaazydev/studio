import type { Metadata } from "next";
import PrintShop from "./print-shop";

export const metadata: Metadata = {
  title: "Fine Art Photo Prints | Maya Bennett",
  description:
    "Bring a little more feeling home. Shop archival photo prints, made slowly and printed to order.",
};

export default function PrintsPage() {
  return <PrintShop />;
}
