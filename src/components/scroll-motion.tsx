"use client";

import { createContext, useCallback, useLayoutEffect, useRef, type ReactNode } from "react";
import { usePathname } from "next/navigation";

export const MotionRefreshContext = createContext<(animateNew?: boolean) => void>(() => {});

export function ScrollMotionProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const registerRef = useRef<(animateNew?: boolean) => void>(() => {});
  const refresh = useCallback((animateNew?: boolean) => registerRef.current(animateNew), []);

  useLayoutEffect(() => {
    if (typeof window.IntersectionObserver !== "function") return;

    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const revealed = new WeakSet<Element>();
    const pending = new Set<Element>();
    let observer: IntersectionObserver | undefined;
    let scrollTimer = 0;

    const reveal = (element: Element) => {
      revealed.add(element);
      pending.delete(element);
      element.removeAttribute("data-motion-state");
      observer?.unobserve(element);
    };

    const hashTarget = () => {
      if (!location.hash) return null;
      try {
        return document.getElementById(decodeURIComponent(location.hash.slice(1)));
      } catch {
        return null;
      }
    };

    const revealPendingAncestor = (target: EventTarget | Element | null) => {
      if (!(target instanceof Element)) return;
      const pending = target.closest<HTMLElement>("[data-motion-state]");
      if (pending) {
        pending.style.setProperty("--motion-duration", "0ms");
        pending.style.setProperty("--motion-delay", "0ms");
        reveal(pending);
      }
    };

    const register = (animateNew = false) => {
      const targets = document.querySelectorAll<HTMLElement>("[data-motion]");
      pending.forEach((element) => { if (!element.isConnected) reveal(element); });
      if (preference.matches) {
        document.documentElement.dataset.motionReduced = "true";
        targets.forEach(reveal);
        return;
      }
      observer ??= new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting || entry.boundingClientRect.bottom < 0) reveal(entry.target);
        });
      }, { threshold: 0.01 });

      targets.forEach((element) => {
        if (element.dataset.motionState || revealed.has(element)) return;
        const box = element.getBoundingClientRect();
        if (box.top < window.innerHeight || element.contains(document.activeElement) || hashTarget()?.contains(element)) {
          revealed.add(element);
          if (animateNew && box.bottom > 0 && element.matches(".product-card")) element.dataset.motionState = "entering";
          return;
        }
        element.dataset.motionState = "pending";
        pending.add(element);
        observer?.observe(element);
      });
    };

    const showFocusedTarget = (event: Event) => revealPendingAncestor(event.target);
    const showAnchorTarget = () => {
      const target = hashTarget();
      revealPendingAncestor(target);
      target?.querySelectorAll('[data-motion-state="pending"]').forEach(revealPendingAncestor);
    };
    const revealAfterScroll = () => {
      window.clearTimeout(scrollTimer);
      scrollTimer = window.setTimeout(() => {
        pending.forEach((element) => {
          const box = element.getBoundingClientRect();
          if (box.bottom < 0 || (box.top < window.innerHeight && box.bottom > 0)) reveal(element);
        });
      }, 90);
    };
    const handlePreference = () => {
      if (preference.matches) {
        document.documentElement.dataset.motionReduced = "true";
        document.querySelectorAll('[data-motion]').forEach(reveal);
        observer?.disconnect();
        observer = undefined;
      } else {
        showAnchorTarget();
        register();
      }
    };

    registerRef.current = register;
    document.addEventListener("focusin", showFocusedTarget, true);
    window.addEventListener("hashchange", showAnchorTarget);
    window.addEventListener("scroll", revealAfterScroll, { passive: true });
    preference.addEventListener("change", handlePreference);
    register();

    return () => {
      document.removeEventListener("focusin", showFocusedTarget, true);
      window.removeEventListener("hashchange", showAnchorTarget);
      window.removeEventListener("scroll", revealAfterScroll);
      window.clearTimeout(scrollTimer);
      preference.removeEventListener("change", handlePreference);
      observer?.disconnect();
      pending.clear();
      delete document.documentElement.dataset.motionReduced;
      document.querySelectorAll('[data-motion-state="pending"]').forEach((element) => element.removeAttribute("data-motion-state"));
      registerRef.current = () => {};
    };
  }, [pathname]);

  return <MotionRefreshContext.Provider value={refresh}>{children}</MotionRefreshContext.Provider>;
}
