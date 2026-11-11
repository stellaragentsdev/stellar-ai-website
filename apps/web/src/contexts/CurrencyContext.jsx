import React, { createContext, useContext, useState, useEffect } from 'react';

export const CURRENCIES = {
    USD: { code: 'USD', symbol: '$', rate: 1, flag: '🇺🇸', label: 'USD ($)' },
    INR: { code: 'INR', symbol: '₹', rate: 83.5, flag: '🇮🇳', label: 'INR (₹)' },
    EUR: { code: 'EUR', symbol: '€', rate: 0.92, flag: '🇪🇺', label: 'EUR (€)' },
    GBP: { code: 'GBP', symbol: '£', rate: 0.79, flag: '🇬🇧', label: 'GBP (£)' },
    AED: { code: 'AED', symbol: 'AED ', rate: 3.67, flag: '🇦🇪', label: 'AED' }
};

const CurrencyContext = createContext();

export const CurrencyProvider = ({ children }) => {
    // Start in USD so the prerendered HTML and the first client render match,
    // then apply the visitor's saved choice after mount.
    const [currency, setCurrencyState] = useState('USD');

    useEffect(() => {
        try {
            const saved = window.localStorage.getItem('stellar_currency');
            if (saved && CURRENCIES[saved]) setCurrencyState(saved);
        } catch { /* storage unavailable */ }
    }, []);

    const setCurrency = (code) => {
        if (CURRENCIES[code]) {
            setCurrencyState(code);
            try { window.localStorage.setItem('stellar_currency', code); } catch { /* storage unavailable */ }
        }
    };

    const convert = (amountInUSD) => {
        const curr = CURRENCIES[currency] || CURRENCIES.USD;
        return Math.round(amountInUSD * curr.rate);
    };

    const format = (amountInUSD, options = {}) => {
        const curr = CURRENCIES[currency] || CURRENCIES.USD;
        const converted = Math.round(amountInUSD * curr.rate);

        if (options.compact && converted >= 1000) {
            if (currency === 'INR') {
                if (converted >= 10000000) return `${curr.symbol}${(converted / 10000000).toFixed(1)} Cr`;
                if (converted >= 100000) return `${curr.symbol}${(converted / 100000).toFixed(1)} L`;
                return `${curr.symbol}${(converted / 1000).toFixed(0)}k`;
            }
            return `${curr.symbol}${(converted / 1000).toFixed(0)}k`;
        }

        return `${curr.symbol}${converted.toLocaleString(currency === 'INR' ? 'en-IN' : 'en-US')}`;
    };

    return (
        <CurrencyContext.Provider value={{ currency, setCurrency, convert, format, current: CURRENCIES[currency] || CURRENCIES.USD }}>
            {children}
        </CurrencyContext.Provider>
    );
};

export const useCurrency = () => {
    const context = useContext(CurrencyContext);
    if (!context) {
        throw new Error('useCurrency must be used within a CurrencyProvider');
    }
    return context;
};
