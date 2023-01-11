export interface IMenu {
    id: number;
    title: string;
    url: string;
    className?: string;
    type: 'text' | 'button'
}