const CUR_RATES = { USD: 1, EUR: 0.92, GBP: 0.79, IDR: 15800 };
const CUR_SYMS  = { USD: '$', EUR: '\u20ac', GBP: '\u00a3', IDR: 'IDR\u00a0' };

let VILLAS = [];
let activeCur = localStorage.getItem('sundara-currency') || 'USD';

async function loadVillas() {
  try {
    const res = await fetch('data/villas.json');
    const data = await res.json();
    VILLAS = data.villas;
    return VILLAS;
  } catch(e) {
    console.error('Erreur chargement villas.json', e);
    return [];
  }
}

function fmtPrice(usd, cur, idr) {
  if (cur === 'IDR') {
    const val = (idr !== undefined && idr !== null)
      ? idr
      : Math.round((usd || 0) * CUR_RATES['IDR']);
    return 'IDR\u00a0' + val.toLocaleString('id-ID');
  }
  const val = Math.round((usd || 0) * CUR_RATES[cur]);
  return CUR_SYMS[cur] + val.toLocaleString('en-US');
}

function getMainIdr(v) {
  return v.price_idr_month || v.price_idr_night || null;
}

function getMainUsd(v) {
  const idr = getMainIdr(v);
  if (idr) return idr / 15800;
  return v.price_usd_night || 0;
}

function setCurrency(cur) {
  activeCur = cur;
  localStorage.setItem('sundara-currency', cur);
  document.querySelectorAll('[data-price-idr],[data-price-usd]').forEach(el => {
    el.classList.add('updating');
    setTimeout(() => {
      const idr = el.dataset.priceIdr ? +el.dataset.priceIdr : undefined;
      const usd = el.dataset.priceUsd ? +el.dataset.priceUsd : 0;
      el.textContent = fmtPrice(usd, activeCur, idr) + (el.dataset.suffix || '');
      el.classList.remove('updating');
    }, 150);
  });
  syncCurBtns();
}

function syncCurBtns() {
  document.querySelectorAll('.cur-btn,.rent-cur-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.cur === activeCur);
  });
}
