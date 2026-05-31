import eventInstances from './event-instances.json';

export const events = [
  {
    id: '11801',
    slug: 'untitled-vampire-play',
    name: 'UNTITLED VAMPIRE PLAY',
    imageUrl: '/vampire-play.jpg',
    dateRange: 'Thu June 04, 2026 - Sun July 12, 2026',
    teaser:
      "Think you've got baggage? Try dating when you have centuries of dating history and a literal body co...",
    htmlDescription:
      "<p>Think you've got baggage? Try dating when you have centuries of dating history and a literal body count. Coming soon to Lookingglass Theatre.</p>",
    venue: 'The Joan and Paul Weill Theatre',
    address: '163 E Pearson St at Michigan Ave, Chicago, IL 60611',
    instances: eventInstances['11801'],
  },
  {
    id: '13801',
    slug: 'lookingclass-stage-combat-101',
    name: 'LookingClass: Stage Combat 101',
    imageUrl: '/stage-combat.jpg',
    dateRange: 'Wed June 17, 2026 - Sat July 11, 2026',
    teaser:
      'Have you ever wanted to (safely) punch someone in the face? Go behind the scenes of every production...',
    htmlDescription:
      '<p>Have you ever wanted to (safely) punch someone in the face? Go behind the scenes of every production with this hands-on stage combat workshop.</p>',
    venue: 'Lookingglass Theatre',
    address: '163 E Pearson St at Michigan Ave, Chicago, IL 60611',
    instances: eventInstances['13801'],
  },
];

export const getEventById = (id) => events.find((e) => e.id === id || e.slug === id);

export const getInstanceById = (instanceId) => {
  for (const event of events) {
    const instance = event.instances.find((i) => i.id === instanceId);
    if (instance) return { event, instance };
  }
  return null;
};
