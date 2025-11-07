export function calcFeeCents(amountCents: number) {
  const pct = Math.round(amountCents * 0.049);
  const fee = pct + 30;
  return Math.min(Math.max(fee, 49), 999);
}
