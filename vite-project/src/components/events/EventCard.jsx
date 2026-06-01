import { useState } from 'react';

export default function EventCard({ event, onBookNow }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <article
      className="EventItem flex w-[345px] max-w-full shrink-0 flex-col overflow-hidden rounded-[4px] border border-white bg-white shadow-[0_2px_1px_0_rgba(0,0,0,0.2),0_3px_25px_0_rgba(0,0,0,0.12),0_2px_6px_0_rgba(0,0,0,0.05)]"
      style={{ marginBottom: 12 }}
    >
      <div
        className="h-[194px] bg-cover bg-center"
        style={{ backgroundImage: `url(${event.imageUrl})` }}
        role="img"
        title={`${event.name} image`}
      />

      <div className="flex min-h-[48px] items-center justify-end">
        <button
          type="button"
          onClick={() => onBookNow(event)}
          className="custom-button cursor-pointer bg-[#ff9217] px-[14px] py-3 font-sans text-base font-medium uppercase leading-6 tracking-[0.15px] text-black transition-colors hover:bg-[#e07a0f]"
        >
          Book Now
        </button>
      </div>

      <div className="px-4 pb-4 pt-1">
        <h2 className="custom-body-text mb-0.5 font-sans text-base font-bold leading-6 tracking-[0.15px] text-[rgba(0,0,0,0.87)]">
          {event.name}
        </h2>
        <p
          className="custom-body-text mb-2 font-sans text-base capitalize leading-6 tracking-[0.15px] text-[rgba(0,0,0,0.87)]"
        >
          {event.dateRange}
        </p>
        <p className="custom-body-text font-sans text-base leading-6 tracking-[0.15px] text-[rgba(0,0,0,0.87)]">
          {expanded ? event.htmlDescription.replace(/<[^>]+>/g, '') : event.teaser}
          {!expanded && (
            <>
              {'\u00a0'}
              <button
                type="button"
                onClick={() => setExpanded(true)}
                className="cursor-pointer border-none bg-transparent p-0 font-inherit text-black hover:underline"
              >
                Read more
              </button>
            </>
          )}
        </p>
      </div>
    </article>
  );
}
