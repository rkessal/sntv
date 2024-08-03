import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <>
      <html className="font-sans-serif bg-secondary text-primary" lang="en">
        <head>
          <link rel="stylesheet" href="https://use.typekit.net/qfu8cpk.css"/>
          <link rel="stylesheet" href="https://unpkg.com/lenis@1.1.8/dist/lenis.css"/>
          <meta 
            name="viewport" 
            content="height=device-height, 
                        width=device-width, initial-scale=1.0, 
                        minimum-scale=1.0, maximum-scale=1.0"></meta>
        </head>
        <body>{children}</body>
      </html>
    </>
  );
}
