import A11yElement from './A11yElement';
import BaseNavigationMode from './BaseNavigationMode';
import Keyboard, { IKeyboardEvent } from '../keyboard/Keyboard';
import FocusTransition from '../focus/FocusTransition';

export default class ArrowNavigation extends BaseNavigationMode {
  // A map to save where the last focused element for each zone was (key=>zone root, value=>last focused element)
  // private static _lastFocusedMap: Map<HTMLElement, HTMLElement> = new Map<HTMLElement, HTMLElement>();

  public get name(): string {
    return 'Arrow';
  }

  public get supportedSelectors(): string[] {
    return ['firstChild', 'lastChild', 'parent'];
  }

  protected _select(modeRoot: HTMLElement, selector: string, currentElement: HTMLElement): HTMLElement | undefined {
    const focusableChildren: A11yElement[] = this.manager.a11yElement(currentElement).focusTree.children;
    let target: HTMLElement | undefined;

    switch (selector) {
      case 'firstChild':
        target = focusableChildren[0] ? focusableChildren[0].htmlElement : undefined;
        break;

      case 'lastChild':
        const lastChild: A11yElement | undefined =
          focusableChildren.length > 0 ? focusableChildren[focusableChildren.length - 1] : undefined;
        target = lastChild ? lastChild.htmlElement : undefined;
        break;

      case 'parent':
        target = this.manager.a11yElement(currentElement).focusTree.parent.htmlElement;
        break;
    }

    return target;
  }

  protected _navigate(
    modeRoot: HTMLElement,
    event: IKeyboardEvent,
    currentElement: HTMLElement, params?: string[]
  ): HTMLElement | undefined {
    const zone: A11yElement = this.manager.a11yElement(modeRoot);
    const current: A11yElement = this.manager.a11yElement(currentElement);
    let horizontal: boolean = !!params && params.map((p: string) => p.toLowerCase()).filter((p: string) => p === 'horizontal').length > 0;
    let vertical: boolean = !!params && params.map((p: string) => p.toLowerCase()).filter((p: string) => p === 'vertical').length > 0;

    if (!horizontal && !vertical) {
      // If none is specified, then support both by default
      horizontal = vertical = true;
    }

    if (Keyboard.isTab(event)) {
      return zone.focusTree.nextSibling.htmlElement;
    } else if (Keyboard.isShiftTab(event)) {
      return zone.focusTree.prevSibling.htmlElement;
    } else {
      switch (event.keyCode) {
        case 37: /* Left  */ return horizontal ? current.focusTree.scopeTo(modeRoot).prevSibling.htmlElement : undefined;
        case 39: /* Right */ return horizontal ? current.focusTree.scopeTo(modeRoot).nextSibling.htmlElement : undefined;
        case 38: /* Up    */ return vertical ? current.focusTree.scopeTo(modeRoot).prevSibling.htmlElement : undefined;
        case 40: /* Down  */ return vertical ? current.focusTree.scopeTo(modeRoot).nextSibling.htmlElement : undefined;
      }
    }

    return undefined;
  }

  protected _onInwardFocus(modeRoot: HTMLElement, focusTransition: FocusTransition): void {
    // console.log(focusTransition);
    // const lastFocused: HTMLElement | undefined = ArrowNavigation._lastFocusedMap.get(modeRoot);

    // if (lastFocused) {
    //   this.manager.focusTo(lastFocused);
    // }
  }

  protected _onOutwardFocus(modeRoot: HTMLElement, focusTransition: FocusTransition): void {
    // if (focusTransition.src) {
    //   ArrowNavigation._lastFocusedMap.set(modeRoot, focusTransition.src);
    // }
  }
}
