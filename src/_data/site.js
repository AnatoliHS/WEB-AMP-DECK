// Site-wide settings used for SEO tags (canonical URLs, Open Graph, sitemap, structured data).
// SITE_URL can override the production domain at build time (no trailing slash).
module.exports = {
  url: (process.env.SITE_URL || "https://theampdeck.com").replace(/\/$/, ""),
  name: "The AMP Deck",
  organization: "AMP Visual Media",
  locale: "en_CA",
  defaultTitle: "AMP | Digital Marketing Agency - Canada",
  defaultDescription:
    "As a strategy‑driven creative studio, AMP helps bold brands clarify their voice, design sites that convert and amplify growth with campaigns that compound.",
  ogImage: "/images/og-image.png",
  ogImageWidth: 1909,
  ogImageHeight: 869,
  ogImageAlt: "The AMP Deck by AMP Visual Media",
  telephone: "+1-613-889-2770",
  email: "theampdeck@ampvisualmedia.com",
  address: {
    street: "1325 Highway 2, Unit 4",
    city: "Belleville",
    region: "ON",
    postalCode: "K8P 4T3",
    country: "CA",
  },
  sameAs: [
    "https://www.linkedin.com/company/amptheagency",
    "https://www.facebook.com/AMPVisualMedia",
    "https://www.instagram.com/ampvisualmedia/",
    "https://www.youtube.com/@ampvisualmedia",
  ],
};
