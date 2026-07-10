import "@testing-library/jest-dom";

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => {},
  }),
});

Object.defineProperty(globalThis, "localStorage", {
  configurable: true,
  value: window.localStorage,
});

const intersectionObservers = new Set<IntersectionObserverMock>();

class IntersectionObserverMock implements IntersectionObserver {
  readonly root = null;
  readonly rootMargin: string;
  readonly thresholds: number[];
  private readonly callback: IntersectionObserverCallback;
  private readonly observed = new Set<Element>();

  constructor(callback: IntersectionObserverCallback, options: IntersectionObserverInit = {}) {
    this.callback = callback;
    this.rootMargin = options.rootMargin ?? "0px";
    this.thresholds = Array.isArray(options.threshold)
      ? [...options.threshold]
      : [options.threshold ?? 0];
    intersectionObservers.add(this);
  }

  disconnect() {
    this.observed.clear();
    intersectionObservers.delete(this);
  }

  observe(target: Element) {
    this.observed.add(target);
  }

  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }

  unobserve(target: Element) {
    this.observed.delete(target);
  }

  trigger(target: Element, isIntersecting: boolean) {
    if (!this.observed.has(target)) return;

    const bounds = target.getBoundingClientRect();
    const entry = {
      boundingClientRect: bounds,
      intersectionRatio: isIntersecting ? 1 : 0,
      intersectionRect: isIntersecting ? bounds : new DOMRectReadOnly(),
      isIntersecting,
      rootBounds: null,
      target,
      time: Date.now(),
    } as IntersectionObserverEntry;

    this.callback([entry], this);
  }
}

declare global {
  var triggerIntersection: (target: Element, isIntersecting?: boolean) => void;
}

globalThis.triggerIntersection = (target, isIntersecting = true) => {
  for (const observer of intersectionObservers) {
    observer.trigger(target, isIntersecting);
  }
};

Object.defineProperty(window, "IntersectionObserver", {
  configurable: true,
  writable: true,
  value: IntersectionObserverMock,
});

Object.defineProperty(globalThis, "IntersectionObserver", {
  configurable: true,
  writable: true,
  value: IntersectionObserverMock,
});
