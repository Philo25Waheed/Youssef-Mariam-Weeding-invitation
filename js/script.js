/**
 * ==========================================================================
 * LUXURY WEDDING INVITATION CONFIGURATION & APPLICATION LOGIC
 * ==========================================================================
 * 
 * QUICK CUSTOMIZATION GUIDE:
 * Modify the values in the WEDDING_CONFIG object below. The website will
 * dynamically update all texts, dates, countdown timers, venue links,
 * and gallery images across the entire page.
 */

const WEDDING_CONFIG = {
  // Couple Information (Groom First)
  groomName: "Youssef",
  brideName: "Mariam",

  // Wedding Date & Time
  // Format for countdown: YYYY-MM-DDTHH:MM:SS
  weddingDate: "2026-10-26T18:00:00", 
  weddingDateFull: "Monday, October 26, 2026 • 6:00 PM",
  weddingDateSimple: "October 26, 2026 • 6:00 PM",

  // Church Venue & Location
  venueName: "Virgin Mary & St. Rewais Church",
  venueAddress: "Hadayek Al-Ahram (Pyramids Gardens), Giza, Egypt",
  venueCity: "Hadayek Al-Ahram & 6th of October, Giza",
  googleMapsUrl: "https://maps.app.goo.gl/CBjrAVfnbpcSWrjf9",

  // Hall Venue & Location (Added after the Church)
  hallName: "Mountain Rose Hall (ماونتن روز)",
  hallAddress: "First 6th of October, Giza Governorate, Egypt",
  hallCity: "6th of October, Giza",
  hallMapsUrl: "https://maps.app.goo.gl/5ZekUeBHkc76AMQB8",

  // Story Images (Folder images)
  storyImage1: "WhatsApp Image 2026-10-17 at 8.07.45 PM.jpeg",
  storyImage2: "WhatsApp Image 2026-10-17 at 8.07.45 PM (1).jpeg",

  // Venue Images
  venueImage: "https://images.unsplash.com/photo-1545232979-8bf68ee9b1af?auto=format&fit=crop&w=1400&q=85",
  hallImage: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1400&q=85",

  // Gallery Photos (Folder images)
  galleryImages: [
    {
      src: "WhatsApp Image 2026-10-17 at 8.07.45 PM.jpeg",
      caption: "Youssef & Mariam"
    },
    {
      src: "WhatsApp Image 2026-10-17 at 8.07.45 PM (1).jpeg",
      caption: "A Celebration of Love"
    },
    {
      src: "WhatsApp Image 2026-10-17 at 8.07.46 PM.jpeg",
      caption: "Sunset Whispers"
    }
  ],

  // Optional background audio file URL (Leave empty to use built-in ambient harmonic chime synthesizer)
  audioUrl: ""
};


/* ==========================================================================
   APPLICATION ENGINE & MODULES
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  initDynamicConfig();
  initCountdown();
  initStickyHeader();
  initMobileNav();
  initScrollReveal();
  initGalleryLightbox();
  initCalendarGenerator();
  initAmbientAudio();
});


/**
 * 1. DYNAMIC CONFIGURATION BINDER
 * Injects values from WEDDING_CONFIG into all corresponding DOM elements.
 */
function initDynamicConfig() {
  // Update Bride Name
  document.querySelectorAll(".data-bride-name").forEach(el => {
    el.textContent = WEDDING_CONFIG.brideName;
  });

  // Update Groom Name
  document.querySelectorAll(".data-groom-name").forEach(el => {
    el.textContent = WEDDING_CONFIG.groomName;
  });

  // Update Full Wedding Date
  document.querySelectorAll(".data-wedding-date-full").forEach(el => {
    el.textContent = WEDDING_CONFIG.weddingDateFull;
  });

  // Update Simple Wedding Date
  document.querySelectorAll(".data-wedding-date-simple").forEach(el => {
    el.textContent = WEDDING_CONFIG.weddingDateSimple;
  });

  // Update Venue Info
  document.querySelectorAll(".data-venue-name").forEach(el => {
    el.textContent = WEDDING_CONFIG.venueName;
  });
  document.querySelectorAll(".data-venue-address").forEach(el => {
    el.textContent = WEDDING_CONFIG.venueAddress;
  });
  document.querySelectorAll(".data-venue-city").forEach(el => {
    el.textContent = WEDDING_CONFIG.venueCity;
  });

  // Update Google Maps Link
  document.querySelectorAll(".data-google-maps-url").forEach(el => {
    if (el.tagName === "A") {
      el.href = WEDDING_CONFIG.googleMapsUrl;
    }
  });

  // Update Hall Info (Mountain Rose)
  document.querySelectorAll(".data-hall-name").forEach(el => {
    el.textContent = WEDDING_CONFIG.hallName;
  });
  document.querySelectorAll(".data-hall-address").forEach(el => {
    el.textContent = WEDDING_CONFIG.hallAddress;
  });
  document.querySelectorAll(".data-hall-maps-url").forEach(el => {
    if (el.tagName === "A") {
      el.href = WEDDING_CONFIG.hallMapsUrl;
    }
  });

  // Update Story Images
  if (WEDDING_CONFIG.storyImage1) {
    document.querySelectorAll(".data-story-img-1").forEach(el => {
      el.src = WEDDING_CONFIG.storyImage1;
    });
  }
  if (WEDDING_CONFIG.storyImage2) {
    document.querySelectorAll(".data-story-img-2").forEach(el => {
      el.src = WEDDING_CONFIG.storyImage2;
    });
  }

  // Update Document Title
  document.title = `${WEDDING_CONFIG.groomName} & ${WEDDING_CONFIG.brideName} — Wedding Invitation`;
}


/**
 * 2. LIVE COUNTDOWN TIMER
 * Accurately updates Days, Hours, Minutes, and Seconds based on weddingDate.
 */
function initCountdown() {
  const daysEl = document.getElementById("countDays");
  const hoursEl = document.getElementById("countHours");
  const minutesEl = document.getElementById("countMinutes");
  const secondsEl = document.getElementById("countSeconds");
  const timerContainer = document.getElementById("countdownTimer");

  if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;

  const targetTime = new Date(WEDDING_CONFIG.weddingDate).getTime();

  function updateTimer() {
    const now = new Date().getTime();
    const distance = targetTime - now;

    if (distance <= 0) {
      daysEl.textContent = "00";
      hoursEl.textContent = "00";
      minutesEl.textContent = "00";
      secondsEl.textContent = "00";
      if (timerContainer) {
        timerContainer.setAttribute("title", "The celebration has begun!");
      }
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    daysEl.textContent = String(days).padStart(2, "0");
    hoursEl.textContent = String(hours).padStart(2, "0");
    minutesEl.textContent = String(minutes).padStart(2, "0");
    secondsEl.textContent = String(seconds).padStart(2, "0");
  }

  updateTimer();
  setInterval(updateTimer, 1000);
}


/**
 * 3. STICKY HEADER & SCROLL BEHAVIOR
 * Adds background blur and compact padding when scrolling.
 */
function initStickyHeader() {
  const header = document.getElementById("siteHeader");
  if (!header) return;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 40) {
      header.classList.add("is-scrolled");
    } else {
      header.classList.remove("is-scrolled");
    }
  }, { passive: true });
}


/**
 * 4. MOBILE NAVIGATION DRAWER
 * Toggles mobile drawer, handles accessibility attributes and outside clicks.
 */
function initMobileNav() {
  const toggleBtn = document.getElementById("navToggle");
  const drawer = document.getElementById("navMobileDrawer");
  if (!toggleBtn || !drawer) return;

  const navLinks = drawer.querySelectorAll(".nav-mobile-link");

  function toggleMenu(forceClose = false) {
    const isOpen = forceClose ? false : !drawer.classList.contains("is-open");
    drawer.classList.toggle("is-open", isOpen);
    toggleBtn.setAttribute("aria-expanded", String(isOpen));
    drawer.setAttribute("aria-hidden", String(!isOpen));
    document.body.style.overflow = isOpen ? "hidden" : "";
  }

  toggleBtn.addEventListener("click", () => toggleMenu());

  navLinks.forEach(link => {
    link.addEventListener("click", () => toggleMenu(true));
  });

  // Close on Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && drawer.classList.contains("is-open")) {
      toggleMenu(true);
    }
  });
}


/**
 * 5. SCROLL REVEAL ANIMATIONS
 * Uses IntersectionObserver to reveal sections with smooth, luxury fade-up motion.
 */
function initScrollReveal() {
  const revealElements = document.querySelectorAll(".reveal-item");
  if (!revealElements.length) return;

  // Fallback if browser doesn't support IntersectionObserver
  if (!("IntersectionObserver" in window)) {
    revealElements.forEach(el => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        obs.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: "0px 0px -40px 0px"
  });

  revealElements.forEach(el => observer.observe(el));
}


/**
 * 6. FULLSCREEN GALLERY LIGHTBOX
 * Manages photo viewing with keyboard navigation, swipe gestures, and smooth scaling.
 */
function initGalleryLightbox() {
  const modal = document.getElementById("lightboxModal");
  const modalImg = document.getElementById("lightboxImg");
  const modalCaption = document.getElementById("lightboxCaption");
  const modalCounter = document.getElementById("lightboxCounter");
  const btnClose = document.getElementById("lightboxClose");
  const btnPrev = document.getElementById("lightboxPrev");
  const btnNext = document.getElementById("lightboxNext");
  const backdrop = document.getElementById("lightboxBackdrop");
  const galleryItems = document.querySelectorAll(".gallery-item");

  if (!modal || !modalImg || !galleryItems.length) return;

  let currentIndex = 0;
  const galleryData = WEDDING_CONFIG.galleryImages;

  function openLightbox(index) {
    currentIndex = index;
    updateLightboxContent();
    modal.classList.add("is-active");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    modal.classList.remove("is-active");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  function updateLightboxContent() {
    const item = galleryData[currentIndex];
    if (!item) return;

    modalImg.src = item.src;
    modalImg.alt = item.caption || "Wedding gallery photograph";
    modalCaption.textContent = item.caption || "";
    modalCounter.textContent = `${currentIndex + 1} / ${galleryData.length}`;
  }

  function showNext() {
    currentIndex = (currentIndex + 1) % galleryData.length;
    updateLightboxContent();
  }

  function showPrev() {
    currentIndex = (currentIndex - 1 + galleryData.length) % galleryData.length;
    updateLightboxContent();
  }

  // Bind clicks on gallery cards
  galleryItems.forEach(card => {
    card.addEventListener("click", () => {
      const idx = parseInt(card.getAttribute("data-index") || "0", 10);
      openLightbox(idx);
    });
  });

  // Modal Controls
  if (btnClose) btnClose.addEventListener("click", closeLightbox);
  if (backdrop) backdrop.addEventListener("click", closeLightbox);
  if (btnNext) btnNext.addEventListener("click", showNext);
  if (btnPrev) btnPrev.addEventListener("click", showPrev);

  // Keyboard navigation
  document.addEventListener("keydown", (e) => {
    if (!modal.classList.contains("is-active")) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowRight") showNext();
    if (e.key === "ArrowLeft") showPrev();
  });

  // Mobile Touch Swipe Support
  let touchStartX = 0;
  let touchEndX = 0;

  modal.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  modal.addEventListener("touchend", (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  }, { passive: true });

  function handleSwipe() {
    const threshold = 45;
    if (touchEndX < touchStartX - threshold) {
      showNext(); // Swiped left
    } else if (touchEndX > touchStartX + threshold) {
      showPrev(); // Swiped right
    }
  }
}



/**
 * 8. ADD TO CALENDAR (.ICS GENERATOR)
 * Generates an iCalendar file for Apple Calendar, Google Calendar, Outlook.
 */
function initCalendarGenerator() {
  const btn = document.getElementById("btnAddToCalendar");
  if (!btn) return;

  btn.addEventListener("click", () => {
    const title = `${WEDDING_CONFIG.groomName} & ${WEDDING_CONFIG.brideName}'s Wedding`;
    const description = `Celebrate the holy matrimony of ${WEDDING_CONFIG.groomName} and ${WEDDING_CONFIG.brideName}.`;
    const location = `${WEDDING_CONFIG.venueName} & ${WEDDING_CONFIG.hallName}`;

    // Target start and end time in UTC
    const startDate = new Date(WEDDING_CONFIG.weddingDate);
    const endDate = new Date(startDate.getTime() + (5 * 60 * 60 * 1000)); // 5 hours duration

    function formatDate(date) {
      return date.toISOString().replace(/-|:|\.\d+/g, "");
    }

    const icsContent = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Youssef & Mariam Wedding//EN",
      "CALSCALE:GREGORIAN",
      "METHOD:PUBLISH",
      "BEGIN:VEVENT",
      `SUMMARY:${title}`,
      `DESCRIPTION:${description}`,
      `LOCATION:${location}`,
      `DTSTART:${formatDate(startDate)}`,
      `DTEND:${formatDate(endDate)}`,
      "STATUS:CONFIRMED",
      "END:VEVENT",
      "END:VCALENDAR"
    ].join("\r\n");

    const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `wedding-${WEDDING_CONFIG.groomName.toLowerCase()}-${WEDDING_CONFIG.brideName.toLowerCase()}.ics`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  });
}


/**
 * 9. AMBIENT AUDIO CONTROLLER
 * Strictly opt-in (no autoplay). Includes a soft harmonic harp & chime synthesizer
 * fallback via the Web Audio API so it plays soothing ambient wedding chords
 * out of the box with zero external dependencies!
 */
function initAmbientAudio() {
  const widget = document.getElementById("audioWidget");
  const btn = document.getElementById("audioBtn");
  const label = document.getElementById("audioLabel");
  if (!widget || !btn) return;

  let isPlaying = false;
  let audioContext = null;
  let synthInterval = null;
  let audioElement = null;

  // If a custom audio file is provided in config, use HTML5 Audio
  if (WEDDING_CONFIG.audioUrl) {
    audioElement = new Audio(WEDDING_CONFIG.audioUrl);
    audioElement.loop = true;
  }

  // Built-in romantic acoustic harp chord generator (Fmaj7 - C - Dm7 - Bbmaj7)
  const chordNotes = [
    [349.23, 440.00, 523.25, 659.25], // Fmaj7 (F4, A4, C5, E5)
    [261.63, 329.63, 392.00, 523.25], // Cmaj (C4, E4, G4, C5)
    [293.66, 349.23, 440.00, 523.25], // Dm7 (D4, F4, A4, C5)
    [233.08, 349.23, 466.16, 587.33]  // Bbmaj7 (Bb3, F4, Bb4, D5)
  ];
  let chordIndex = 0;

  function playAmbientChime() {
    if (!audioContext) {
      audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioContext.state === "suspended") {
      audioContext.resume();
    }

    const currentChord = chordNotes[chordIndex];
    chordIndex = (chordIndex + 1) % chordNotes.length;

    currentChord.forEach((freq, i) => {
      setTimeout(() => {
        if (!isPlaying || !audioContext) return;
        const osc = audioContext.createOscillator();
        const gain = audioContext.createGain();

        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, audioContext.currentTime);

        // Soft, gentle attack and long romantic decay
        gain.gain.setValueAtTime(0.0001, audioContext.currentTime);
        gain.gain.linearRampToValueAtTime(0.04, audioContext.currentTime + 0.15);
        gain.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + 2.8);

        osc.connect(gain);
        gain.connect(audioContext.destination);

        osc.start();
        osc.stop(audioContext.currentTime + 3.0);
      }, i * 380);
    });
  }

  btn.addEventListener("click", () => {
    isPlaying = !isPlaying;

    if (isPlaying) {
      widget.classList.add("is-playing");
      if (label) label.textContent = "Pause Music";

      if (audioElement) {
        audioElement.play().catch(() => {});
      } else {
        playAmbientChime();
        synthInterval = setInterval(playAmbientChime, 3200);
      }
    } else {
      widget.classList.remove("is-playing");
      if (label) label.textContent = "Play Music";

      if (audioElement) {
        audioElement.pause();
      } else if (synthInterval) {
        clearInterval(synthInterval);
        synthInterval = null;
      }
    }
  });
}
