export const priceFormat = new Intl.NumberFormat( 'en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 3,
    trailingZeroDisplay: 'stripIfInteger'
})