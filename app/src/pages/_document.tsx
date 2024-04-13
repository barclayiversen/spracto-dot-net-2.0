import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="preload" href="/black-logo.png" as="image" />
        <meta
          name="description"
          content="Spracto is a bro just tryin' to be a guy, man!"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              url: "https://spracto.net",
              logo: "https://spracto.net/logo-black.png",
              name: "Spracto",
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+1-415-598-8365",
                contactType: "customer support",
              },
              sameAs: [
                "https://facebook.com/spracto",
                "https://instagram.com/spracto",
                "https://twitter.com/spracto",
              ],
            }),
          }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
