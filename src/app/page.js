import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Setup from "@/components/Setup";
import { createClient } from "@/prismicio";
import Section from "@/slices/Section";


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

export default async function Home({ searchParams }) {
  const client = createClient();
  const navigation = await client.getSingle('navigation')
  const footer = await client.getSingle('footer', {
    fetchLinks: [
      'navigation.slices',
      'navigation.slices1',
      'navigation.slices2',
      'navigation.location'
    ]
  })
  const home = await client.getSingle("accueil", {
    fetchLinks: [
      'hero.title',
      'hero.subtitle',
      'hero.slices',
      'hero.brands',
      'influencer.name',
      'influencer.image',
      'influencer.description',
      'influencer.slices',
      'marquee.slices',
    ],
    graphQuery: `{
      accueil {
        hero
        slices {
          ...on section {
            variation {
              ...on services {
                primary {
                  ...primaryFields
                  sections {
                    section {
                      ...sectionFields
                    }
                  }
                }
              }
            }
          }
        }
      }
    }`
  });

  const { brands } = home.data.hero.data

  return (
    <main>
      <Setup />
      <Navbar navigation={navigation} />
      <Hero home={home} brands={brands} />
      {
        home.data.slices.filter(slice => slice.slice_type === 'section').map(slice => (
          <Section key={slice.id} slice={slice} />
        ))
      }
      <Footer footer={footer} />
    </main>
  );
}
