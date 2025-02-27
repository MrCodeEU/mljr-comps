export function cx(i: number, r: number, div = 12): number {
    return Math.sin((Math.PI * 2 * i) / div) * r;
}

export function cy(i: number, r: number, div = 12): number {
    return -Math.cos((Math.PI * 2 * i) / div) * r;
}

export function markerIndex2Rad(i: number, div = 12): number {
    return (Math.PI * 2 * i) / div;
}
