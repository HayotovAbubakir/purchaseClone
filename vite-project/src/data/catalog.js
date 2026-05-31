export const subNavLinks = [
  { label: 'EVENTS', path: '/Events' },
  { label: 'GIFT CERTIFICATES', path: '/GiftVouchers' },
  { label: 'MONTHLY GIVING', path: '/Memberships' },
  { label: 'DONATE NOW', path: '/Donations' },
  { label: "COME AS YOU AREN'T BALL", path: 'https://www.comeasyouarent.com/', external: true },
];

export const footerLinks = [
  { label: 'Privacy Policy', path: '/privacy' },
  { label: 'Terms & Conditions', path: '/tandc' },
  { label: 'Join Our Email List', path: '/Signup' },
];

export const monthlyDonations = [
  { id: 'md-100', name: 'Monthly $100 Donation', price: 100, description: 'Support Lookingglass with a recurring gift!' },
  { id: 'md-15', name: 'Monthly $15 Donation', price: 15, description: 'Support Lookingglass with a recurring gift!' },
  { id: 'md-25', name: 'Monthly $25 Donation', price: 25, description: 'Support Lookingglass with a recurring gift!' },
  {
    id: 'md-37',
    name: 'Monthly $37 Donation',
    price: 37,
    description: 'In honor of our 37th Season, support Lookingglass with a recurring gift!',
  },
  { id: 'md-50', name: 'Monthly $50 Donation', price: 50, description: 'Support Lookingglass with a recurring gift!' },
  { id: 'md-75', name: 'Monthly $75 Donation', price: 75, description: 'Support Lookingglass with a recurring gift!' },
];

export const donationFunds = [
  {
    id: 'wonderland-society',
    name: 'Wonderland Society',
    defaultAmount: 50,
    description:
      'Join the Wonderland Society with a gift of $1,000 or more annually and receive exclusive benefits including invitations to special events, priority seating, and recognition in our programs. Your leadership gift powers transformative theatre at Lookingglass.',
  },
  {
    id: 'come-as-you-arent',
    name: "Come As You Aren't Ball",
    defaultAmount: 100,
    description:
      "Support our annual Come As You Aren't Ball gala — a spectacular evening of costumes, performances, and community celebration that raises critical funds for Lookingglass Theatre Company's artistic and education programs.",
  },
  {
    id: 'lookingglass-education',
    name: 'Lookingglass Education',
    defaultAmount: 50,
    description:
      'Help us spark creativity through Young Ensemble, summer camps, and school programs that reach young people across Chicago. Your gift directly supports the next generation of artists and audiences.',
  },
];

export const giftVouchers = [{ id: 'gv-custom', amount: null, label: 'Custom Amount' }];

export const merchandise = [];
export const ticketSubscriptions = [];
export const fixedSeries = [];
export const supplementaryEvents = [];
