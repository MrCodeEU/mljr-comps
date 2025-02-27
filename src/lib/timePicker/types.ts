export type TimeFormat = '12' | '24';
export type TimeMode = 'hours' | 'minutes' | 'seconds';
export type TimePickerVariant = 'primary' | 'secondary' | 'tertiary' | 'accent' | 'muted' | 'error' | 'success' | 'warning' | 'info';

export interface Face {
    r: number;
    markers: number[];
    markerRadius?: number;
    class?: string;
}

export interface Mode {
    div: number;
    step?: number;
    faces: Face[];
}
