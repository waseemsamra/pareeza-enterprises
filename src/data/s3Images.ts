// S3 Image URLs Configuration
// All homepage images hosted on S3 in /hero folder

export const S3_BUCKET = 'agrofeed-content-agrofeed-536217686312';
export const S3_BASE_URL = `https://${S3_BUCKET}.s3.amazonaws.com`;

export const HOMEPAGE_S3_IMAGES = {
  // Hero Section
  heroMain: `${S3_BASE_URL}/hero/01-hero-main-tea-plantation.jpg`,

  // Portfolio Section
  portfolioRiceSpices: `${S3_BASE_URL}/hero/02-portfolio-rice-spices.jpg`,
  portfolioCitrus: `${S3_BASE_URL}/hero/03-portfolio-seasonal-citrus.jpg`,
  portfolioGrains: `${S3_BASE_URL}/hero/04-portfolio-global-grains.jpg`,
  portfolioProduce: `${S3_BASE_URL}/hero/05-portfolio-organic-produce.jpg`,

  // Leadership Section
  leadershipCeo: `${S3_BASE_URL}/hero/06-leadership-ceo-portrait.jpg`,

  // Infrastructure Section
  infrastructureLogistics: `${S3_BASE_URL}/hero/07-infrastructure-logistics-center.jpg`,

  // Global Network Section
  networkMap: `${S3_BASE_URL}/hero/08-network-global-map.jpg`,

  // CSR Section
  csrSoilHands: `${S3_BASE_URL}/hero/09-csr-soil-hands.jpg`,
  csrSolarPanels: `${S3_BASE_URL}/hero/10-csr-solar-panels.jpg`,

  // News Section
  newsGenevaMeeting: `${S3_BASE_URL}/hero/11-news-geneva-meeting.jpg`,
  newsAgriLab: `${S3_BASE_URL}/hero/12-news-agricultural-lab.jpg`,
  newsCoffeeHandshake: `${S3_BASE_URL}/hero/13-news-coffee-handshake.jpg`,

  // CTA Section
  ctaWheatPattern: `${S3_BASE_URL}/hero/14-cta-wheat-pattern-bg.jpg`
};

export default HOMEPAGE_S3_IMAGES;
