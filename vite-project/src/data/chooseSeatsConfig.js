const tierPricing = {
  pricingStyle: 'tier',
  instructions: 'Please select your seats (maximum 9 for this event per order)',
  maxTickets: 9,
  tiers: [
    { label: 'TIER 1', price: 78.48, serviceCharge: 6.48 },
    { label: 'TIER 2', price: 56.68, serviceCharge: 4.68 },
    { label: 'TIER 3', price: 38.15, serviceCharge: 3.15 },
    { label: 'TIER 4', price: 32.7, serviceCharge: 2.7 },
  ],
};

const pwycPricing = {
  pricingStyle: 'pwyc',
  instructions: 'Please select your seats (maximum 10 for this event per order)',
  maxTickets: 10,
  tiers: [
    { label: '$40 PWYC', price: 40 },
    { label: '$30 PWYC', price: 30 },
    { label: '$20 PWYC', price: 20 },
    { label: '$15 PWYC', price: 15 },
    { label: '$10 PWYC', price: 10 },
  ],
};

export const chooseSeatsConfig = {
  '11801': {
    mode: 'seated',
    seatingPlanId: '50803',
    venueLine:
      '2026 Seating, The Joan and Paul Theatre, Lookingglass Theatre Company, 163 E Pearson St at Michigan Ave',
    pwycInstanceIds: ['56801', '57001'],
    ...tierPricing,
  },
  '13801': {
    mode: 'quantity',
    venueLine: 'Education Classes and Camps, Lookingglass Theatre, 163 E Pearson St at Michigan Ave',
    instructions: 'How many tickets would you like? (maximum 10 for this event per order)',
    maxTickets: 10,
    tiers: [
      { label: '$15 PWYC', price: 15 },
      { label: '$20 PWYC', price: 20 },
      { label: '$10 PWYC', price: 10 },
      { label: '$5 PWYC', price: 5 },
      { label: '$0 PWYC', price: 0 },
    ],
  },
};

export function formatInstanceTitle(event, instance) {
  const [datePart, timePart] = instance.datetime.split('|').map((s) => s.trim());
  const time = timePart.replace(/\s+(AM|PM)$/i, '$1');
  return `${event.name}, ${instance.day}, ${datePart}, ${time}`;
}

export function formatCalendarDate(instance) {
  const [datePart, timePart] = instance.datetime.split('|').map((s) => s.trim());
  const time = timePart.replace(/\s+(AM|PM)$/i, '$1');
  return `${datePart} ${time}`;
}

export function getChooseSeatsConfig(eventId, instanceId) {
  const base = chooseSeatsConfig[eventId] ?? chooseSeatsConfig['11801'];
  if (base.pwycInstanceIds?.includes(instanceId)) {
    return { ...base, ...pwycPricing };
  }
  return base;
}
