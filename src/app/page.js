import { createClient } from "@/prismicio";
import { PrismicRichText } from "@prismicio/react";
import Link from "@/slices/Link";
import Section from "@/slices/Section";
import Navbar from "@/components/Navbar";
import { PrismicNextImage } from "@prismicio/next";
import Footer from "@/components/Footer";
import Setup from "@/components/Setup";


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
      <section id="back-to-top" className="flex flex-col px-4 md:px-16 items-center justify-center w-full h-[80vh] md:h-auto md:pt-[8rem]">
        <PrismicRichText 
          components={{
            paragraph: ({children}) => 
            <p 
              className="font-serif mb-[1.25rem] mt-64 md:mt-0 leading-[11rem] text-[14rem] md:leading-[21.125rem] font-medium md:text-[24.8125rem] text-primary uppercase max-w-[45rem] md:max-w-[80rem] w-full text-center"
            >
                  {children}
              </p>
          }} 
          field={home.data.hero.data.title} />
        <PrismicRichText 
          components={{
            paragraph: ({children}) => 
              <p 
                className="mb-[2.5rem] text-[2rem] md:text-[1.125rem] text-primary md:max-w-[38.625rem] w-full text-center"
              >
                  {children}
              </p>
          }} 
          field={home.data.hero.data.subtitle}
        />
        <Link 
          slice={home.data.hero.data.slices[0]} 
          slices={home.data.hero.data.slices} 
          index={0}
        />
        <div className="relative w-full px-4 mt-32 overflow-hidden md:px-16">
          <div className="flex flex-row w-full ">
            {
              brands.data.slices.map(slice => (
                <figure key={slice.id} className="h-[4.5rem] w-auto mr-32 shrink-0">
                  <PrismicNextImage alt="" className="object-contain w-full h-full" field={slice.primary.image} />
                </figure>
              ))
            }
          </div>
        </div>
      </section>
      {
        home.data.slices.filter(slice => slice.slice_type === 'section').map(slice => (
          <Section key={slice.id} slice={slice} />
        ))
      }
      <Footer footer={footer} />
    </main>
  );
}
