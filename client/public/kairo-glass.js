/* ==========================================================================
   KAIRO — LIQUID GLASS INTERACTIONS
   Vanilla JS shared by every page. Static pages auto-init on DOMContentLoaded;
   React pages call window.KairoGlass.init(root) after mount and run the
   returned cleanup on unmount.
   ========================================================================== */
(function () {
  "use strict";

  document.documentElement.classList.add("kg-js");

  var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  var finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");

  function motionAllowed() { return !reducedMotion.matches; }

  /* ---------------------------------------------------------------- Nav --- */

  function initNav(nav, signal, cleanups) {
    var track = nav.querySelector(".kg-nav-links");
    var bubble = nav.querySelector(".kg-nav-bubble");
    if (!track || !bubble) return;
    var items = Array.prototype.slice.call(track.querySelectorAll(".kg-nav-item"));
    if (!items.length) return;

    var selected = items.filter(function (i) { return i.classList.contains("is-current"); })[0] || null;
    var hovering = false;
    var lastTarget = null;
    var morphTimer = null;

    function place(item, animate) {
      if (!item) {
        bubble.classList.remove("is-visible");
        lastTarget = null;
        return;
      }
      var x = item.offsetLeft;
      var w = item.offsetWidth;
      if (!animate || !motionAllowed() || !bubble.classList.contains("is-visible")) {
        bubble.classList.add("is-instant");
        bubble.style.width = w + "px";
        bubble.style.transform = "translateX(" + x + "px)";
        void bubble.offsetWidth; // flush so the next move animates
        bubble.classList.remove("is-instant");
      } else if (item !== lastTarget) {
        bubble.style.width = w + "px";
        bubble.style.transform = "translateX(" + x + "px)";
        bubble.classList.remove("is-moving");
        void bubble.offsetWidth; // restart the morph keyframes
        bubble.classList.add("is-moving");
        clearTimeout(morphTimer);
        morphTimer = setTimeout(function () { bubble.classList.remove("is-moving"); }, 600);
      }
      bubble.classList.add("is-visible");
      lastTarget = item;
    }

    function setSelected(item) {
      selected = item;
      items.forEach(function (i) {
        var on = i === item;
        i.classList.toggle("is-current", on);
        if (on) i.setAttribute("aria-current", "true");
        else i.removeAttribute("aria-current");
      });
    }

    items.forEach(function (item) {
      item.addEventListener("mouseenter", function () { hovering = true; place(item, true); }, { signal: signal });
      item.addEventListener("focus", function () { place(item, true); }, { signal: signal });
      item.addEventListener("click", function () { setSelected(item); place(item, true); }, { signal: signal });
    });
    track.addEventListener("mouseleave", function () { hovering = false; place(selected, true); }, { signal: signal });
    track.addEventListener("focusout", function (e) {
      if (!track.contains(e.relatedTarget)) place(selected, true);
    }, { signal: signal });

    function reposition() { if (lastTarget) place(lastTarget, false); }
    window.addEventListener("resize", reposition, { signal: signal });
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(reposition);

    // Scroll-spy: the section in view becomes the selected item
    var targets = items
      .map(function (i) {
        var href = i.getAttribute("href") || "";
        var id = href.indexOf("#") >= 0 ? href.slice(href.indexOf("#") + 1) : "";
        var el = id ? document.getElementById(id) : null;
        return el ? { item: i, el: el } : null;
      })
      .filter(Boolean);

    if (targets.length && "IntersectionObserver" in window) {
      var visible = new Map();
      var spy = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) { visible.set(e.target, e.isIntersecting); });
        var active = null;
        targets.forEach(function (t) { if (visible.get(t.el)) active = t.item; });
        setSelected(active);
        if (!hovering) place(active, true);
      }, { rootMargin: "-45% 0px -50% 0px" });
      targets.forEach(function (t) { spy.observe(t.el); });
      cleanups.push(function () { spy.disconnect(); });
    }

    place(selected, false);
    cleanups.push(function () { clearTimeout(morphTimer); });
  }

  /* ------------------------------------------------ Cursor depth + tilt --- */

  function initDepth(root, signal, cleanups) {
    var layers = Array.prototype.slice.call(root.querySelectorAll("[data-depth]"));
    var tilts = Array.prototype.slice.call(root.querySelectorAll("[data-tilt]"));
    if (!layers.length && !tilts.length) return;
    if (!finePointer.matches || !motionAllowed()) return;

    var raf = 0;
    var mx = 0, my = 0;
    var STRENGTH = 14; // px per unit of depth at the viewport edge

    function apply() {
      raf = 0;
      layers.forEach(function (el) {
        var d = parseFloat(el.getAttribute("data-depth")) || 0;
        el.style.setProperty("--px", (mx * d * STRENGTH).toFixed(2) + "px");
        el.style.setProperty("--py", (my * d * STRENGTH).toFixed(2) + "px");
      });
    }

    window.addEventListener("mousemove", function (e) {
      var cx = window.innerWidth / 2;
      var cy = window.innerHeight / 2;
      mx = (e.clientX - cx) / cx;
      my = (e.clientY - cy) / cy;
      if (!raf) raf = requestAnimationFrame(apply);
    }, { passive: true, signal: signal });

    tilts.forEach(function (card) {
      card.addEventListener("mousemove", function (e) {
        var r = card.getBoundingClientRect();
        var x = (e.clientX - r.left) / r.width - 0.5;
        var y = (e.clientY - r.top) / r.height - 0.5;
        card.style.setProperty("--ry", (x * 20).toFixed(2) + "deg");
        card.style.setProperty("--rx", (-y * 20).toFixed(2) + "deg");
        card.classList.add("is-tilting");
      }, { signal: signal });
      card.addEventListener("mouseleave", function () {
        card.style.setProperty("--rx", "0deg");
        card.style.setProperty("--ry", "0deg");
        card.classList.remove("is-tilting");
      }, { signal: signal });
    });

    cleanups.push(function () { if (raf) cancelAnimationFrame(raf); });
  }

  /* ------------------------------------------------------------ Toggles --- */

  function initToggles(root, signal) {
    root.querySelectorAll("[data-kg-toggle]").forEach(function (btn) {
      var target = document.getElementById(btn.getAttribute("data-kg-toggle"));
      btn.addEventListener("click", function () {
        var on = btn.getAttribute("aria-pressed") !== "true";
        btn.setAttribute("aria-pressed", on ? "true" : "false");
        if (!target) return;
        target.classList.toggle("is-off", !on);
        var status = target.querySelector("[data-kg-status]");
        if (status) {
          status.classList.toggle("kg-status-idle", !on);
          var text = status.querySelector("[data-kg-status-text]");
          if (text) text.textContent = on ? status.getAttribute("data-on") : status.getAttribute("data-off");
        }
      }, { signal: signal });
    });
  }

  /* ------------------------------------------------------------- Reveal --- */

  function initReveal(root, cleanups) {
    var els = root.querySelectorAll(".kg-reveal");
    if (!els.length) return;
    if (!("IntersectionObserver" in window) || !motionAllowed()) {
      els.forEach(function (el) { el.classList.add("is-in"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); }
      });
    }, { threshold: 0.08, rootMargin: "0px 0px -40px 0px" });
    els.forEach(function (el) { io.observe(el); });
    cleanups.push(function () { io.disconnect(); });
  }

  /* ------------------------------------- Pause animations off screen --- */

  function initPause(root, cleanups) {
    if (!("IntersectionObserver" in window)) return;
    var zones = root.querySelectorAll(".kg-hero, .kg-section, .kg-section-tight, .kg-footer");
    if (!zones.length) return;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { e.target.classList.toggle("kg-offscreen", !e.isIntersecting); });
    }, { rootMargin: "120px 0px" });
    zones.forEach(function (z) { io.observe(z); });
    cleanups.push(function () { io.disconnect(); });
  }

  /* --------------------------------------------------------------- Init --- */

  function init(root) {
    root = root || document;
    var controller = new AbortController();
    var signal = controller.signal;
    var cleanups = [];

    root.querySelectorAll(".kg-nav").forEach(function (nav) { initNav(nav, signal, cleanups); });
    initDepth(root, signal, cleanups);
    initToggles(root, signal);
    initReveal(root, cleanups);
    initPause(root, cleanups);

    return function destroy() {
      controller.abort();
      cleanups.forEach(function (fn) { fn(); });
    };
  }

  window.KairoGlass = { init: init };

  // Static pages opt in with <body data-kg-auto>
  function auto() { if (document.body && document.body.hasAttribute("data-kg-auto")) init(document); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", auto);
  else auto();
})();
