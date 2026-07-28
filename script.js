(() => {
  const i18n = {
    it: {
      brand: "Traduzione docx locale — per sempre.",
      navPricing: "Vedi prezzo",
      beforeLabel: "Prima",
      beforeText:
        "Sostituisci 30.000 parole a mano oppure copia-incolli da ChatGPT in cloud.",
      afterLabel: "Dopo",
      afterText:
        'Fai partire una traduzione, 30 minuti dopo controlli. Quanto è accurato? <a href="__MAILTO__">Prova adesso</a>.',
      heroNote:
        "Comparazione basata su un documento medio di 150 pagine con paragrafi, tabelle, elenchi, riferimenti. Il testo all’interno delle immagini <strong>non</strong> viene tradotto.",
      ctaHero: "Prova adesso",
      testMailSubject: "Prova gratis — traduzione docx",
      featuresAria: "Vantaggi",
      featPrivacyTitle: "100% privato",
      featPrivacyText:
        "Tutti i tuoi documenti restano sul tuo MiniPc 128GB. Nessun dato esce mai.",
      featSpeedTitle: "30–60 minuti",
      featSpeedText:
        "Invece che settimane in uno studio esterno. Un intero manuale in meno di un’ora.",
      featDocxTitle: "Mantiene il docx",
      featDocxText:
        "Elenchi, tabelle, formattazioni, intestazioni, note e immagini restano intatte.",
      featLdapTitle: "Auth LDAP",
      featLdapText:
        "Accesso aziendale con LDAP. Controlli chi entra, senza account esterni.",
      galleryAria: "Galleria",
      imgLaunch: "MiniPc 128GB con flusso di traduzione documenti",
      imgSystem: "Sistema di traduzione su MiniPc 128GB",
      imgProduct: "Lancio prodotto Translation System on MiniPc 128GB",
      videoHint: "Video in arrivo",
      softwareLabel: "Document-first",
      softwareTitle: "Traduci. Controlla. Esporta.",
      imgScreenshot: "Interfaccia di traduzione",
      pricingLabel: "Prezzo",
      pricingTitle: "Una sola opzione.",
      pricingDesc: "Hardware + sistema di traduzione. Locale. Privato. Pronto all’uso.",
      pricingCta: "Paga ora",
      footer:
        "Sviluppato da <strong>Luca Miglioli</strong> — AI Engineer &amp; Full-Stack Developer",
    },
    en: {
      brand: "Local docx translation — forever.",
      navPricing: "See pricing",
      beforeLabel: "Before",
      beforeText:
        "Replace 30,000 words by hand or copy-paste from ChatGPT in the cloud.",
      afterLabel: "After",
      afterText:
        'Start a translation, review it 30 minutes later. How accurate is it? <a href="__MAILTO__">Try now</a>.',
      heroNote:
        "Comparison based on a typical 150-page document with paragraphs, tables, lists, and references. Text inside images is <strong>not</strong> translated.",
      ctaHero: "Try now",
      testMailSubject: "Free trial — docx translation",
      featuresAria: "Features",
      featPrivacyTitle: "100% private",
      featPrivacyText:
        "All your documents stay on your MiniPc 128GB. No data ever leaves.",
      featSpeedTitle: "30–60 minutes",
      featSpeedText:
        "Instead of weeks at an external agency. A full manual in under an hour.",
      featDocxTitle: "Keeps the docx",
      featDocxText:
        "Lists, tables, formatting, headings, notes, and images stay intact.",
      featLdapTitle: "LDAP auth",
      featLdapText:
        "Enterprise access with LDAP. You control who gets in — no external accounts.",
      galleryAria: "Gallery",
      imgLaunch: "MiniPc 128GB with document translation flow",
      imgSystem: "Translation system on MiniPc 128GB",
      imgProduct: "Product launch Translation System on MiniPc 128GB",
      videoHint: "Video coming soon",
      softwareLabel: "Document-first",
      softwareTitle: "Translate. Review. Export.",
      imgScreenshot: "Translation interface",
      pricingLabel: "Pricing",
      pricingTitle: "One option.",
      pricingDesc: "Hardware + translation system. Local. Private. Ready to use.",
      pricingCta: "Pay now",
      footer:
        "Developed by <strong>Luca Miglioli</strong> — AI Engineer &amp; Full-Stack Developer",
    },
  };

  const MAILTO = "hello@example.com";

  const setLang = (lang) => {
    const dict = i18n[lang];
    if (!dict) return;

    document.documentElement.lang = lang;
    localStorage.setItem("lang", lang);

    const mailtoHref = `mailto:${MAILTO}?subject=${encodeURIComponent(dict.testMailSubject)}`;

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (dict[key] != null) el.textContent = dict[key];
    });

    document.querySelectorAll("[data-i18n-html]").forEach((el) => {
      const key = el.getAttribute("data-i18n-html");
      if (dict[key] != null) {
        el.innerHTML = dict[key].replace(/__MAILTO__/g, mailtoHref);
      }
    });

    document.querySelectorAll("[data-i18n-aria]").forEach((el) => {
      const key = el.getAttribute("data-i18n-aria");
      if (dict[key] != null) el.setAttribute("aria-label", dict[key]);
    });

    document.querySelectorAll("[data-i18n-alt]").forEach((el) => {
      const key = el.getAttribute("data-i18n-alt");
      if (dict[key] != null) el.setAttribute("alt", dict[key]);
    });

    document.querySelectorAll("[data-i18n-mailto-subject]").forEach((el) => {
      const key = el.getAttribute("data-i18n-mailto-subject");
      if (dict[key] != null && el.href.startsWith("mailto:")) {
        const base = el.href.split("?")[0];
        el.href = `${base}?subject=${encodeURIComponent(dict[key])}`;
      }
    });

    document.querySelectorAll(".lang-btn").forEach((btn) => {
      const active = btn.dataset.lang === lang;
      btn.classList.toggle("is-active", active);
      btn.setAttribute("aria-pressed", active ? "true" : "false");
    });
  };

  document.querySelectorAll(".lang-btn").forEach((btn) => {
    btn.addEventListener("click", () => setLang(btn.dataset.lang));
  });

  const saved = localStorage.getItem("lang");
  setLang(saved === "en" ? "en" : "it");

  const reveals = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
    );
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add("is-in"));
  }

  const video = document.getElementById("demo-video");
  if (video) {
    const markReady = () => {
      if (video.readyState >= 2) video.dataset.ready = "";
    };
    video.addEventListener("loadeddata", markReady);
    video.addEventListener("canplay", markReady);
    markReady();
  }
})();
