import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Setup from "@/components/Setup";
import { createClient } from "@/prismicio";
import TermsAndConditions from "@/components/TermsAndConditions";

export async function generateMetadata() {
  const client = createClient();
  const home = await client.getSingle("accueil");

  return {
    title: home.data.meta_title,
    description: home.data.meta_description,
    openGraph: {
      title: home.data.meta_title ?? undefined,
      images: [{ url: home.data.meta_image.url ?? "" }],
    },
  };
}

export default async function Confidentialite() {
  const client = createClient();
  const navigation = await client.getSingle("navigation");
  const terms = await client.getSingle("confidentialite")
  const footer = await client.getSingle("footer", {
    fetchLinks: [
      "navigation.slices",
      "navigation.slices1",
      "navigation.slices2",
      "navigation.location",
    ],
  });

  return (
    <main className="relative">
      <Setup />
      <Navbar navigation={navigation} />
      <TermsAndConditions slice={terms} />
      <Footer footer={footer} />
    </main>
  );
}
