import { useState, useEffect } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';

function QuantityControl({ value, onChange, max = 10 }) {
  return (
    <div className="inline-flex items-center border border-[#ccc]">
      <button
        type="button"
        onClick={() => onChange(Math.max(0, value - 1))}
        disabled={value <= 0}
        className="flex h-9 w-9 items-center justify-center text-black transition-colors hover:bg-[#f5f5f5] disabled:cursor-not-allowed disabled:opacity-40"
        aria-label="Decrease quantity"
      >
        <RemoveIcon sx={{ fontSize: 18 }} />
      </button>
      <span className="flex h-9 min-w-10 items-center justify-center border-x border-[#ccc] font-sans text-base font-bold">
        {value}
      </span>
      <button
        type="button"
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        className="flex h-9 w-9 items-center justify-center text-black transition-colors hover:bg-[#f5f5f5] disabled:cursor-not-allowed disabled:opacity-40"
        aria-label="Increase quantity"
      >
        <AddIcon sx={{ fontSize: 18 }} />
      </button>
    </div>
  );
}

export default function TicketModal({ event, open, onClose }) {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    if (event?.ticketTypes) {
      setQuantities(Object.fromEntries(event.ticketTypes.map((t) => [t.id, 0])));
      setStep(1);
    }
  }, [event]);

  if (!open || !event) return null;

  const ticketTypes = event.ticketTypes ?? [];
  const totalQty = Object.values(quantities).reduce((sum, q) => sum + q, 0);
  const totalPrice = ticketTypes.reduce((sum, t) => sum + (quantities[t.id] || 0) * t.price, 0);

  const resetAndClose = () => {
    setStep(1);
    setQuantities(Object.fromEntries(ticketTypes.map((t) => [t.id, 0])));
    onClose();
  };

  const handleContinue = () => {
    if (step === 1) {
      if (totalQty === 0) return;
      setStep(2);
      return;
    }
    navigate(`/EventAvailability?EventId=${event.id}&ref=bookNow&scroll=timeAndDates`);
    resetAndClose();
  };

  return (
    <div
      className="fixed inset-0 z-[1400] flex items-center justify-center bg-black/55 p-4 backdrop-blur-[1px]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="ticket-modal-title"
      onClick={resetAndClose}
    >
      <div
        className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto bg-white shadow-[0_24px_48px_rgba(0,0,0,0.22)]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={resetAndClose}
          className="absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center text-black transition-colors hover:bg-[#f5f5f5]"
          aria-label="Close"
        >
          <CloseIcon />
        </button>

        <div
          className="h-48 bg-cover bg-center"
          style={{ backgroundImage: `url(${event.imageUrl})` }}
          role="img"
          aria-label={event.name}
        />

        <div className="p-6 md:p-8">
          <p className="mb-1 font-sans text-xs font-bold uppercase tracking-[0.12em] text-[#ff9217]">
            {step === 1 ? 'Select Tickets' : 'Order Summary'}
          </p>
          <h2 id="ticket-modal-title" className="mb-2 font-sans text-[28px] font-bold leading-tight tracking-[-0.55px] text-black md:text-[32px]">
            {event.name}
          </h2>
          <p className="mb-1 font-sans text-base capitalize text-black">{event.dateRange}</p>
          <p className="mb-6 font-sans text-sm text-[#666]">
            {event.venue} · {event.address}
          </p>

          {step === 1 ? (
            <div className="space-y-3">
              {ticketTypes.map((ticket) => (
                <div
                  key={ticket.id}
                  className="flex flex-wrap items-center justify-between gap-3 border border-[#e8e8e8] bg-[#fafafa] px-4 py-3 transition-colors hover:border-[#ccc]"
                >
                  <div>
                    <p className="font-sans text-base font-bold text-black">{ticket.label}</p>
                    <p className="font-sans text-sm text-[#666]">${ticket.price.toFixed(2)} each</p>
                  </div>
                  <QuantityControl
                    value={quantities[ticket.id] || 0}
                    onChange={(val) => setQuantities((prev) => ({ ...prev, [ticket.id]: val }))}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-3 border border-[#e8e8e8] bg-[#fafafa] p-4">
              {ticketTypes
                .filter((t) => quantities[t.id] > 0)
                .map((t) => (
                  <div key={t.id} className="flex justify-between font-sans text-base">
                    <span>
                      {quantities[t.id]} × {t.label}
                    </span>
                    <span className="font-bold">${(quantities[t.id] * t.price).toFixed(2)}</span>
                  </div>
                ))}
              <div className="flex justify-between border-t border-[#ddd] pt-3 font-sans text-lg font-bold">
                <span>Total</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
            </div>
          )}

          <div className="mt-8 flex flex-wrap gap-3">
            {step === 2 && (
              <button
                type="button"
                onClick={() => setStep(1)}
                className="border border-black px-5 py-3 font-sans text-base font-medium uppercase text-black transition-colors hover:bg-[#f5f5f5]"
              >
                Back
              </button>
            )}
            <button
              type="button"
              onClick={handleContinue}
              disabled={step === 1 && totalQty === 0}
              className="bg-[#ff9217] px-6 py-3 font-sans text-base font-medium uppercase text-black transition-colors hover:bg-[#e07a0f] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {step === 1 ? 'Continue' : 'Choose Date & Time'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
