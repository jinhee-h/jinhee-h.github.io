// script.js

// Footer year
(function setYear() {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();

// Copy-to-clipboard (any element with [data-copy])
(function enableCopyButtons() {
  const buttons = document.querySelectorAll("[data-copy]");

  buttons.forEach((btn) => {
    btn.addEventListener("click", async (e) => {
      e.preventDefault();

      const toCopy = btn.dataset.copy;
      const labelEl = btn.querySelector(".label");
      const original = btn.dataset.label || (labelEl ? labelEl.textContent : "");

      if (!toCopy) return;

      const setLabel = (text) => {
        if (labelEl) labelEl.textContent = text;
      };

      try {
        await navigator.clipboard.writeText(toCopy);
        setLabel("Copied!");
      } catch {
        // Fallback for older browsers
        try {
          const temp = document.createElement("textarea");
          temp.value = toCopy;
          temp.style.position = "fixed";
          temp.style.left = "-9999px";
          document.body.appendChild(temp);
          temp.select();
          document.execCommand("copy");
          document.body.removeChild(temp);
          setLabel("Copied!");
        } catch {
          setLabel("Failed");
        }
      } finally {
        if (labelEl) setTimeout(() => setLabel(original), 1200);
      }
    });
  });
})();
