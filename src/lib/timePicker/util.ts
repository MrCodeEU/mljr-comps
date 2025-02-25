export const markerIndex2Rad = (markerIndex: number, div: number) => 
  (-markerIndex / (div / 2)) * Math.PI + Math.PI;

const sico = (fn: (x: number) => number) =>
  (markerIndex: number, r: number, div = 12) => 
    r * fn(markerIndex2Rad(markerIndex, div));

export const cx = sico(Math.sin);
export const cy = sico(Math.cos);
