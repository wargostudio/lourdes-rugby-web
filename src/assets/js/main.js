/* ==========================================================================
   Lourdes Rugby Club — interacción y animación
   Patrón IIFE (sin módulos). Cada init va envuelto en safe(): si uno falla,
   el resto sigue funcionando. El contenido nunca depende del JS para leerse.
   ========================================================================== */
(function () {
  "use strict";

  var doc = document.documentElement;
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  var hasGsap = typeof window.gsap !== "undefined";
  var WA = "5493515199569";

  function safe(fn, name) {
    try { fn(); } catch (e) { if (window.console) console.warn("[lrc] " + name + ":", e); }
  }
  function $(s, ctx) { return (ctx || document).querySelector(s); }
  function $$(s, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(s)); }

  if (hasGsap) {
    var plugins = [window.ScrollTrigger, window.SplitText, window.DrawSVGPlugin].filter(Boolean);
    gsap.registerPlugin.apply(gsap, plugins);
  }
  var hasST = hasGsap && typeof window.ScrollTrigger !== "undefined";

  /* ---------- Header: sólido al bajar, se oculta al scrollear hacia abajo ---------- */
  function initHeader() {
    var header = $("[data-header]");
    if (!header) return;
    var last = window.scrollY, ticking = false;
    function update() {
      var y = window.scrollY;
      header.classList.toggle("is-solid", y > 12);
      var menuOpen = doc.classList.contains("menu-open");
      var focusInside = header.contains(document.activeElement);
      if (!menuOpen && !focusInside && y > 320 && y > last + 4) header.classList.add("is-hidden");
      else if (y < last - 4 || y < 320 || focusInside) header.classList.remove("is-hidden");
      last = y; ticking = false;
    }
    window.addEventListener("scroll", function () {
      if (!ticking) { ticking = true; requestAnimationFrame(update); }
    }, { passive: true });
    header.addEventListener("focusin", function () { header.classList.remove("is-hidden"); });
    update();
  }

  /* ---------- Menú móvil accesible ---------- */
  function initMenu() {
    var btn = $("[data-menu-toggle]"), menu = $("[data-mobile-menu]");
    if (!btn || !menu) return;
    var label = $("[data-menu-label]", btn);
    function focusables() { return [btn].concat($$("a, button", menu)); }
    function open() {
      menu.hidden = false;
      doc.classList.add("menu-open");
      btn.setAttribute("aria-expanded", "true");
      if (label) label.textContent = "Cerrar menú";
      if (hasGsap && !reduced) {
        gsap.fromTo(menu, { clipPath: "circle(0% at 92% 4%)" }, { clipPath: "circle(150% at 92% 4%)", duration: 0.7, ease: "power3.inOut" });
        gsap.from($$("nav li", menu), { y: 30, opacity: 0, duration: 0.6, stagger: 0.05, delay: 0.2, ease: "power3.out" });
      }
      var first = $("nav a", menu);
      if (first) first.focus();
    }
    function close(returnFocus) {
      menu.hidden = true;
      doc.classList.remove("menu-open");
      btn.setAttribute("aria-expanded", "false");
      if (label) label.textContent = "Abrir menú";
      if (returnFocus) btn.focus();
    }
    btn.addEventListener("click", function () { menu.hidden ? open() : close(true); });
    document.addEventListener("keydown", function (e) {
      if (menu.hidden) return;
      if (e.key === "Escape") close(true);
      if (e.key === "Tab") {
        var f = focusables(), i = f.indexOf(document.activeElement);
        if (e.shiftKey && i <= 0) { e.preventDefault(); f[f.length - 1].focus(); }
        else if (!e.shiftKey && i === f.length - 1) { e.preventDefault(); f[0].focus(); }
      }
    });
    $$("a", menu).forEach(function (a) { a.addEventListener("click", function () { close(false); }); });
    window.addEventListener("resize", function () { if (window.innerWidth >= 1080 && !menu.hidden) close(false); });
  }

  /* ---------- Revelados con IntersectionObserver (+ red de seguridad) ---------- */
  function initReveal() {
    var els = $$("[data-reveal]");
    if (!els.length) return;
    // Escalonado entre hermanos
    els.forEach(function (el) {
      var sibs = $$(":scope > [data-reveal]", el.parentElement);
      var i = sibs.indexOf(el);
      if (i > 0) el.style.setProperty("--d", Math.min(i, 6) * 0.08 + "s");
    });
    if (!("IntersectionObserver" in window)) { els.forEach(function (el) { el.classList.add("is-in"); }); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); }
      });
    }, { threshold: 0.01, rootMargin: "0px 0px -6% 0px" });
    els.forEach(function (el) { io.observe(el); });
    // Red de seguridad: a los 6 s todo queda visible
    setTimeout(function () { els.forEach(function (el) { el.classList.add("is-in"); }); }, 6000);
  }

  /* ---------- Títulos: líneas que suben desde una máscara ---------- */
  function initSplit() {
    if (!hasST || !window.SplitText) return;
    var targets = $$("[data-split]");
    targets.forEach(function (el) {
      SplitText.create(el, {
        type: "lines",
        mask: "lines",
        linesClass: "split-line",
        autoSplit: true,
        aria: "auto",
        onSplit: function (self) {
          return gsap.from(self.lines, {
            yPercent: 110,
            duration: reduced ? 0.01 : 1.05,
            stagger: 0.09,
            ease: "expo.out",
            scrollTrigger: { trigger: el, start: "top 90%", once: true },
          });
        },
      });
    });
  }

  /* ---------- Hero ---------- */
  function initHero() {
    var title = $("[data-hero-title]");
    if (!title || !hasGsap) return;
    var lines = $$(".hero__line", title);
    lines.forEach(function (l) {
      l.style.overflow = "clip";
      l.innerHTML = '<span style="display:block">' + l.innerHTML + "</span>";
    });
    var tl = gsap.timeline({ defaults: { ease: "expo.out" } });
    tl.from(lines.map(function (l) { return l.firstChild; }), { yPercent: 115, duration: reduced ? 0.01 : 1.2, stagger: 0.12 })
      .fromTo(title.querySelector(".hero__line--gold"), { "--u": 0 }, { "--u": 1, duration: 0.9, ease: "power3.inOut" }, "-=0.5")
      .from("[data-stack-card]", { y: 80, rotation: function (i) { return (i - 1.5) * 9; }, opacity: 0, duration: 1.1, stagger: 0.1, clearProps: "transform,opacity" }, 0.15)
      .from(".hero__sticker", { scale: 0, rotation: -40, duration: 0.8, ease: "back.out(2)", clearProps: "transform" }, 0.9);
  }

  /* ---------- Pila de fotos (clic, deslizar o automático) ---------- */
  function initStack() {
    var stack = $("[data-stack]");
    if (!stack) return;
    var nextBtn = $("[data-stack-next]", stack);
    var busy = false, timer = null, inView = true, hovering = false;
    function cards() { return $$("[data-stack-card]", stack); }
    function relayout() { cards().forEach(function (c, i) { c.style.setProperty("--i", i); }); }
    function next() {
      if (busy) return;
      var list = cards(), top = list[list.length - 1];
      if (!top) return;
      busy = true;
      function finish() {
        stack.insertBefore(top, list[0]);
        relayout();
        busy = false;
      }
      if (hasGsap && !reduced) {
        gsap.to(top, {
          x: 140, y: -30, rotation: 18, opacity: 0, duration: 0.45, ease: "power2.in",
          onComplete: function () {
            finish();
            gsap.fromTo(top, { x: 0, y: 0, rotation: 0, opacity: 0 }, { opacity: 1, duration: 0.4, clearProps: "all" });
            top.style.setProperty("--i", 0);
          },
        });
      } else finish();
    }
    nextBtn && nextBtn.addEventListener("click", function () { next(); restart(); });
    // Deslizar en pantallas táctiles
    var sx = null;
    stack.addEventListener("pointerdown", function (e) { sx = e.clientX; });
    stack.addEventListener("pointerup", function (e) {
      if (sx !== null && Math.abs(e.clientX - sx) > 40) { next(); restart(); }
      sx = null;
    });
    stack.addEventListener("mouseover", function () { hovering = true; });
    stack.addEventListener("mouseout", function (e) { if (!stack.contains(e.relatedTarget)) hovering = false; });
    function restart() {
      if (reduced) return;
      clearInterval(timer);
      timer = setInterval(function () { if (inView && !hovering && !document.hidden) next(); }, 4800);
    }
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (en) { inView = en[0].isIntersecting; }).observe(stack);
    }
    restart();
  }

  /* ---------- Trazos de tiza ---------- */
  function initChalk() {
    if (!hasST || !window.DrawSVGPlugin) return;
    $$("[data-chalk]").forEach(function (svg) {
      var paths = $$("path, circle", svg);
      gsap.from(paths, {
        drawSVG: 0,
        duration: reduced ? 0.01 : 1.4,
        stagger: 0.18,
        ease: "power2.inOut",
        scrollTrigger: { trigger: svg, start: "top 92%", once: true },
      });
    });
  }

  /* ---------- Manifiesto: las palabras se encienden al hacer scroll ---------- */
  function initHighlight() {
    var el = $("[data-highlight]");
    if (!el || !hasST) return;
    var walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
    var nodes = [], n;
    while ((n = walker.nextNode())) if (n.textContent.trim()) nodes.push(n);
    nodes.forEach(function (node) {
      var frag = document.createDocumentFragment();
      node.textContent.split(/(\s+)/).forEach(function (w) {
        if (!w) return;
        if (/^\s+$/.test(w)) { frag.appendChild(document.createTextNode(w)); return; }
        var s = document.createElement("span");
        s.className = "hl-word";
        s.textContent = w;
        frag.appendChild(s);
      });
      node.parentNode.replaceChild(frag, node);
    });
    var words = $$(".hl-word", el);
    ScrollTrigger.create({
      trigger: el,
      start: "top 78%",
      end: "bottom 50%",
      scrub: true,
      onUpdate: function (self) {
        var k = Math.round(self.progress * words.length);
        words.forEach(function (w, i) { w.classList.toggle("is-lit", i < k); });
      },
    });
    gsap.from($$(".pill-photo", el), {
      scale: 0, rotation: -20, duration: 0.8, ease: "back.out(2)", stagger: 0.15,
      scrollTrigger: { trigger: el, start: "top 75%", once: true },
    });
  }

  /* ---------- Pilares: la carta anterior se achica cuando llega la siguiente ---------- */
  function initPillars() {
    if (!hasST || reduced) return;
    var cards = $$("[data-pillar]");
    cards.forEach(function (card, i) {
      var nextCard = cards[i + 1];
      if (!nextCard) return;
      gsap.to(card, {
        scale: 0.93,
        filter: "brightness(0.82)",
        ease: "none",
        scrollTrigger: { trigger: nextCard, start: "top 85%", end: "top 20%", scrub: true },
      });
    });
  }

  /* ---------- Parallax suave ---------- */
  function initParallax() {
    if (!hasST || reduced) return;
    $$("[data-parallax]").forEach(function (box) {
      var im = $("img", box);
      if (!im) return;
      gsap.fromTo(im, { yPercent: -6 }, { yPercent: 6, ease: "none", scrollTrigger: { trigger: box, start: "top bottom", end: "bottom top", scrub: true } });
    });
  }

  /* ---------- Línea de tiempo que se dibuja ---------- */
  function initTimeline() {
    var wrap = $("[data-timeline]");
    if (!wrap || !hasST || !window.DrawSVGPlugin) return;
    gsap.from($("[data-timeline-line]", wrap), {
      drawSVG: 0, ease: "none",
      scrollTrigger: { trigger: wrap, start: "top 70%", end: "bottom 60%", scrub: true },
    });
  }

  /* ---------- Marquesinas: se pausan fuera de pantalla ---------- */
  function initMarquee() {
    if (!("IntersectionObserver" in window)) return;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { en.target.classList.toggle("is-paused", !en.isIntersecting); });
    });
    $$(".tape, .reel__row").forEach(function (el) { io.observe(el); });
  }

  /* ---------- Botones magnéticos y tarjetas con inclinación ---------- */
  function initMagnet() {
    if (!finePointer || !hasGsap) return;
    $$("[data-magnet]").forEach(function (el) {
      el.addEventListener("mousemove", function (e) {
        var r = el.getBoundingClientRect();
        gsap.to(el, { x: (e.clientX - r.left - r.width / 2) * 0.22, y: (e.clientY - r.top - r.height / 2) * 0.3, duration: 0.4, ease: "power3.out" });
      });
      el.addEventListener("mouseout", function (e) {
        if (!el.contains(e.relatedTarget)) gsap.to(el, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1, 0.4)" });
      });
    });
  }
  function initTilt() {
    if (!finePointer || !hasGsap) return;
    $$("[data-tilt]").forEach(function (el) {
      el.addEventListener("mousemove", function (e) {
        var r = el.getBoundingClientRect();
        var px = (e.clientX - r.left) / r.width - 0.5, py = (e.clientY - r.top) / r.height - 0.5;
        gsap.to(el, { rotationY: px * 7, rotationX: -py * 7, transformPerspective: 900, duration: 0.5, ease: "power2.out" });
      });
      el.addEventListener("mouseout", function (e) {
        if (!el.contains(e.relatedTarget)) gsap.to(el, { rotationY: 0, rotationX: 0, duration: 0.8, ease: "power3.out" });
      });
    });
  }

  /* ---------- Subnavegación: resalta la sección visible ---------- */
  function initSubnav() {
    var links = $$(".subnav a[href^='#']");
    if (!links.length || !("IntersectionObserver" in window)) return;
    var map = {};
    links.forEach(function (a) { var t = document.getElementById(a.getAttribute("href").slice(1)); if (t) map[t.id] = a; });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          links.forEach(function (a) { a.classList.remove("is-active"); a.removeAttribute("aria-current"); });
          var a = map[en.target.id];
          if (a) { a.classList.add("is-active"); a.setAttribute("aria-current", "true"); }
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    Object.keys(map).forEach(function (id) { io.observe(document.getElementById(id)); });
  }

  /* ---------- Galería: filtros + lightbox ---------- */
  function initGallery() {
    var grid = $("[data-gallery]");
    if (!grid) return;
    var items = $$(".masonry__item", grid);
    var status = $("[data-filter-status]");
    $$("[data-filter]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var f = btn.getAttribute("data-filter");
        $$("[data-filter]").forEach(function (b) { b.setAttribute("aria-pressed", String(b === btn)); });
        var shown = 0;
        items.forEach(function (it) {
          var ok = f === "todas" || it.getAttribute("data-cat") === f;
          it.classList.toggle("is-hidden", !ok);
          if (ok) shown++;
        });
        if (status) status.textContent = "Mostrando " + shown + " fotos";
        if (hasGsap && !reduced) gsap.fromTo(items.filter(function (i) { return !i.classList.contains("is-hidden"); }), { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.03, ease: "power2.out", clearProps: "all" });
        if (hasST) ScrollTrigger.refresh();
      });
    });

    var root = $("[data-lightbox-root]");
    if (!root) return;
    var imgEl = $("[data-lightbox-img]", root), cap = $("[data-lb-caption]", root);
    var current = 0, opener = null;
    function visibleBtns() { return items.filter(function (i) { return !i.classList.contains("is-hidden"); }).map(function (i) { return $(".masonry__btn", i); }); }
    function show(btn) {
      var thumb = $("img", btn);
      imgEl.src = btn.getAttribute("data-lightbox");
      imgEl.width = +btn.getAttribute("data-w");
      imgEl.height = +btn.getAttribute("data-h");
      imgEl.alt = thumb.alt;
      cap.textContent = thumb.alt;
    }
    function open(btn) {
      opener = btn;
      current = visibleBtns().indexOf(btn);
      show(btn);
      root.hidden = false;
      doc.classList.add("menu-open"); // bloquea el scroll del fondo
      $("[data-lb-close]", root).focus();
      if (hasGsap && !reduced) gsap.fromTo(imgEl, { scale: 0.92, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.45, ease: "power3.out" });
    }
    function close() {
      root.hidden = true;
      doc.classList.remove("menu-open");
      if (opener) opener.focus();
    }
    function step(d) {
      var list = visibleBtns();
      current = (current + d + list.length) % list.length;
      show(list[current]);
      if (hasGsap && !reduced) gsap.fromTo(imgEl, { x: d * 40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.35, ease: "power2.out" });
    }
    items.forEach(function (it) { $(".masonry__btn", it).addEventListener("click", function () { open(this); }); });
    $("[data-lb-close]", root).addEventListener("click", close);
    $("[data-lb-prev]", root).addEventListener("click", function () { step(-1); });
    $("[data-lb-next]", root).addEventListener("click", function () { step(1); });
    root.addEventListener("click", function (e) { if (e.target === root) close(); });
    document.addEventListener("keydown", function (e) {
      if (root.hidden) return;
      if (e.key === "Escape") close();
      else if (e.key === "ArrowLeft") step(-1);
      else if (e.key === "ArrowRight") step(1);
      else if (e.key === "Tab") {
        var f = $$("button", root), i = f.indexOf(document.activeElement);
        if (e.shiftKey && i <= 0) { e.preventDefault(); f[f.length - 1].focus(); }
        else if (!e.shiftKey && i === f.length - 1) { e.preventDefault(); f[0].focus(); }
      }
    });
    var sx = null;
    root.addEventListener("touchstart", function (e) { sx = e.touches[0].clientX; }, { passive: true });
    root.addEventListener("touchend", function (e) {
      if (sx === null) return;
      var dx = e.changedTouches[0].clientX - sx;
      if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
      sx = null;
    });
  }

  /* ---------- Formulario de contacto ---------- */
  function initForm() {
    var form = $("[data-contact-form]");
    if (!form) return;
    var mode = form.getAttribute("data-mode") || "email";
    var status = $("[data-form-status]", form);
    function field(name) { return name === "mensaje" ? $("[data-field='mensaje']", form) : form.elements[name]; }
    var submit = $("[data-submit]", form), submitLabel = $("[data-submit-label]", form);
    var t = $("[data-form-time]", form);
    if (t) t.value = String(Date.now());

    // Motivo preseleccionado desde la URL (?motivo=empresa)
    var params = new URLSearchParams(location.search);
    var motivo = params.get("motivo"), sel = $("[data-motivo]", form);
    if (motivo && sel && $("option[value='" + motivo.replace(/[^a-z]/g, "") + "']", sel)) sel.value = motivo;

    function setStatus(kind, html) {
      status.hidden = false;
      status.className = "form__status is-" + kind;
      status.innerHTML = html;
      status.focus();
    }
    // Resultado del envío sin JavaScript (redirección del PHP)
    var estado = params.get("estado");
    if (estado === "enviado") setStatus("ok", "¡Gracias por tu mensaje! Ya lo recibimos y te vamos a responder a la brevedad.");
    if (estado === "error") setStatus("error", "No pudimos enviar tu mensaje. Probá de nuevo o <a href=\"https://wa.me/" + WA + "\" target=\"_blank\" rel=\"noopener\">escribinos por WhatsApp</a>.");

    var allRules = {
      nombre: function (v) { return v.trim().length >= 2 || "Ingresá tu nombre."; },
      email: function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) || "Ingresá un email válido."; },
      mensaje: function (v) { return v.trim().length >= 10 || "Contanos un poco más (mínimo 10 caracteres)."; },
      acepto: function (_, el) { return el.checked || "Necesitamos tu consentimiento para responderte."; },
    };
    // Solo se validan los campos que existen en el modo actual
    var rules = {};
    Object.keys(allRules).forEach(function (k) { if (field(k)) rules[k] = allRules[k]; });
    function setError(name, msg) {
      var el = field(name), box = $("[data-error-for='" + name + "']", form);
      if (!el) return;
      el.setAttribute("aria-invalid", msg ? "true" : "false");
      if (box) box.textContent = msg || "";
    }
    function validate(only) {
      var firstBad = null;
      Object.keys(rules).forEach(function (name) {
        if (only && only.indexOf(name) < 0) return;
        var el = field(name);
        var r = rules[name](el.value, el);
        setError(name, r === true ? "" : r);
        if (r !== true && !firstBad) firstBad = el;
      });
      return firstBad;
    }
    Object.keys(rules).forEach(function (name) {
      var el = field(name);
      el.addEventListener("blur", function () { if (el.value || el.type === "checkbox") validate([name]); });
      el.addEventListener("input", function () { if (el.getAttribute("aria-invalid") === "true") validate([name]); });
    });

    function waText() {
      var m = sel ? sel.options[sel.selectedIndex].text : "";
      var parts = ["Hola, les escribo desde la página web de Lourdes Rugby Club."];
      if (form.elements.nombre.value.trim()) parts.push("Soy " + form.elements.nombre.value.trim() + ".");
      if (m) parts.push("Motivo: " + m + ".");
      if (field("mensaje").value.trim()) parts.push(field("mensaje").value.trim());
      return "https://wa.me/" + WA + "?text=" + encodeURIComponent(parts.join("\n"));
    }
    var waBtn = $("[data-wa-send]", form);
    if (waBtn) waBtn.addEventListener("click", function () { window.open(waText(), "_blank", "noopener"); });

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var bad = validate();
      if (bad) {
        setStatus("error", "Revisá los campos marcados.");
        bad.focus();
        return;
      }
      if (mode === "whatsapp") {
        var url = waText();
        var win = window.open(url, "_blank"); // sin "noopener": con esa opción window.open devuelve null
        if (win) win.opener = null;
        setStatus("ok", "¡Listo! Abrimos WhatsApp con tu mensaje: solo falta tocar “Enviar”. Si no se abrió, <a href=\"" + url + "\" target=\"_blank\" rel=\"noopener\">tocá acá</a>.");
        if (!win) location.href = url;
        return;
      }
      submit.disabled = true;
      submitLabel.textContent = "Enviando…";
      fetch(form.action, { method: "POST", body: new FormData(form), headers: { Accept: "application/json" } })
        .then(function (r) { return r.json().catch(function () { return { ok: false }; }); })
        .then(function (data) {
          if (data && data.ok) {
            form.reset();
            if (t) t.value = String(Date.now());
            setStatus("ok", "¡Gracias por tu mensaje! " + (data.message ? data.message.replace(/^Gracias por tu mensaje\.?\s*/, "") : ""));
          } else {
            if (data && data.errors) Object.keys(data.errors).forEach(function (k) { setError(k, data.errors[k]); });
            fail((data && data.message) || "No pudimos enviar tu mensaje.");
          }
        })
        .catch(function () { fail("No pudimos conectar con el servidor."); })
        .then(function () {
          submit.disabled = false;
          submitLabel.textContent = "Enviar mensaje";
        });
    });
    function fail(msg) {
      setStatus("error", msg + ' Podés <a href="' + waText() + '" target="_blank" rel="noopener">enviarlo por WhatsApp</a> con un clic.');
    }
  }


  function boot() {
    safe(initHeader, "header");
    safe(initMenu, "menu");
    safe(initReveal, "reveal");
    safe(initStack, "stack");
    safe(initMarquee, "marquee");
    safe(initGallery, "gallery");
    safe(initForm, "form");
    safe(initSubnav, "subnav");
    safe(initMagnet, "magnet");
    safe(initTilt, "tilt");
    safe(initHero, "hero");
    var fontsReady = document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve();
    fontsReady.then(function () {
      safe(initSplit, "split");
      safe(initChalk, "chalk");
      safe(initHighlight, "highlight");
      safe(initPillars, "pillars");
      safe(initParallax, "parallax");
      safe(initTimeline, "timeline");
      if (hasST) ScrollTrigger.refresh();
    });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
