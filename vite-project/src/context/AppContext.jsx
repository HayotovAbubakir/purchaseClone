import { createContext, useCallback, useContext, useEffect, useMemo, useReducer } from 'react';

export const STORAGE_KEY = 'lookingglass-app-state';

const AppContext = createContext(null);

const defaultDrafts = {
  donations: null,
  giftVouchers: null,
  checkout: null,
  promoCode: '',
  loginEmail: '',
};

const defaultState = {
  basket: [],
  user: null,
  drafts: defaultDrafts,
};

function normalizeDrafts(drafts) {
  return {
    ...defaultDrafts,
    ...(drafts && typeof drafts === 'object' ? drafts : {}),
  };
}

export function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultState;
    const parsed = JSON.parse(raw);
    return {
      basket: Array.isArray(parsed.basket) ? parsed.basket : [],
      user: parsed.user ?? null,
      drafts: normalizeDrafts(parsed.drafts),
    };
  } catch {
    return defaultState;
  }
}

function saveState(state) {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ basket: state.basket, user: state.user, drafts: state.drafts }),
    );
  } catch {
    // ignore quota / private mode errors
  }
}

function reducer(state, action) {
  switch (action.type) {
    case 'SYNC':
      return { ...state, ...action.payload };
    case 'ADD_TO_BASKET': {
      const existing = state.basket.find((item) => item.key === action.payload.key);
      if (existing) {
        return {
          ...state,
          basket: state.basket.map((item) =>
            item.key === action.payload.key ? { ...item, quantity: item.quantity + 1 } : item,
          ),
        };
      }
      return { ...state, basket: [...state.basket, { ...action.payload, quantity: 1 }] };
    }
    case 'REMOVE_FROM_BASKET':
      return { ...state, basket: state.basket.filter((item) => item.key !== action.payload) };
    case 'REMOVE_ALL':
      return { ...state, basket: [] };
    case 'UPDATE_QUANTITY':
      return {
        ...state,
        basket: state.basket.map((item) =>
          item.key === action.payload.key ? { ...item, quantity: action.payload.quantity } : item,
        ),
      };
    case 'LOGIN':
      return { ...state, user: action.payload };
    case 'LOGOUT':
      return { ...state, user: null };
    case 'SET_DRAFT':
      return {
        ...state,
        drafts: {
          ...state.drafts,
          [action.payload.key]: action.payload.value,
        },
      };
    case 'CLEAR_DRAFT':
      return {
        ...state,
        drafts: {
          ...state.drafts,
          [action.payload]: defaultDrafts[action.payload] ?? null,
        },
      };
    case 'CLEAR_ALL':
      return defaultState;
    default:
      return state;
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, defaultState, loadState);

  useEffect(() => {
    saveState(state);
  }, [state]);

  useEffect(() => {
    const onStorage = (event) => {
      if (event.key !== STORAGE_KEY || !event.newValue) return;
      try {
        const parsed = JSON.parse(event.newValue);
        dispatch({
          type: 'SYNC',
          payload: {
            basket: Array.isArray(parsed.basket) ? parsed.basket : [],
            user: parsed.user ?? null,
            drafts: normalizeDrafts(parsed.drafts),
          },
        });
      } catch {
        // ignore invalid cross-tab payloads
      }
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const setDraft = useCallback(
    (key, value) => dispatch({ type: 'SET_DRAFT', payload: { key, value } }),
    [],
  );

  const clearDraft = useCallback(
    (key) => dispatch({ type: 'CLEAR_DRAFT', payload: key }),
    [],
  );

  const value = useMemo(
    () => ({
      ...state,
      basketCount: state.basket.reduce((sum, item) => sum + item.quantity, 0),
      basketTotal: state.basket.reduce((sum, item) => sum + item.price * item.quantity, 0),
      addToBasket: (item) => dispatch({ type: 'ADD_TO_BASKET', payload: item }),
      removeFromBasket: (key) => dispatch({ type: 'REMOVE_FROM_BASKET', payload: key }),
      clearBasket: () => dispatch({ type: 'REMOVE_ALL' }),
      updateQuantity: (key, quantity) =>
        dispatch({ type: 'UPDATE_QUANTITY', payload: { key, quantity } }),
      login: (user) => dispatch({ type: 'LOGIN', payload: user }),
      logout: () => dispatch({ type: 'LOGOUT' }),
      setDraft,
      clearDraft,
      clearAllStorage: () => dispatch({ type: 'CLEAR_ALL' }),
    }),
    [state, setDraft, clearDraft],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
};

export function useDraft(draftKey, initialValue) {
  const { drafts, setDraft } = useApp();
  const stored = drafts[draftKey];
  const value = stored ?? initialValue;

  const setValue = useCallback(
    (next) => {
      setDraft(
        draftKey,
        typeof next === 'function' ? next(stored ?? initialValue) : next,
      );
    },
    [draftKey, initialValue, setDraft, stored],
  );

  return [value, setValue];
}
