import { ContextMenu } from './context_menu.js';
export declare class MenuStore {
    private menu;
    protected store: HTMLElement[];
    private _active;
    private counter;
    private attachedClass;
    private taborder;
    private attrMap;
    constructor(menu: ContextMenu);
    set active(element: HTMLElement);
    get active(): HTMLElement;
    next(): HTMLElement;
    previous(): HTMLElement;
    clear(): void;
    insert(element: HTMLElement): void;
    insert(elements: HTMLElement[]): void;
    insert(elements: NodeListOf<HTMLElement>): void;
    remove(element: HTMLElement): void;
    remove(element: HTMLElement[]): void;
    remove(element: NodeListOf<HTMLElement>): void;
    inTaborder(flag: boolean): void;
    insertTaborder(): void;
    removeTaborder(): void;
    private insertElement;
    private removeElement;
    private sort;
    private insertTaborder_;
    private removeTaborder_;
    private addTabindex;
    private removeTabindex;
    private addEvents;
    private addEvent;
    private removeEvents;
    private removeEvent;
    private keydown;
}
