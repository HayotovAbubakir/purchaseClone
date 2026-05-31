import seatingPlan50803 from './seating-plan-50803.json';

function parseSeatTitle(title) {
  if (!title || title === 'Unavailable') return null;
  const match = title.match(/^([A-Z]+\d+)/);
  const priceMatch = title.match(/\$([\d.]+)/);
  return {
    id: match?.[1] ?? title,
    label: title,
    price: priceMatch ? parseFloat(priceMatch[1]) : 0,
  };
}

export function getSeatingPlan(planId = '50803') {
  if (planId !== '50803') return null;
  const seats = seatingPlan50803.seats
    .filter((s) => s.title && s.width !== '100%')
    .map((s) => {
      const parsed = parseSeatTitle(s.title);
      return {
        ...s,
        id: parsed?.id ?? s.title,
        price: parsed?.price ?? 0,
        label: parsed?.label ?? s.title,
      };
    });
  return {
    background: '/seating-plan.gif',
    width: 1080,
    height: 800,
    seats,
  };
}
