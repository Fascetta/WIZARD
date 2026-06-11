document.addEventListener('DOMContentLoaded', () => {

  // 1. Mobile Navbar Toggle
  const burger = document.querySelector('.navbar-burger');
  const menu = document.querySelector('.navbar-menu');
  
  if (burger && menu) {
    burger.addEventListener('click', () => {
      burger.classList.toggle('is-active');
      menu.classList.toggle('is-active');
    });
  }

  // 2. Lazy Load & Auto-Pause Videos (Intersection Observer)
  // Ensures videos only play when visible on screen, saving CPU and battery.
  let lazyVideos = [].slice.call(document.querySelectorAll("video.lazy"));

  if ("IntersectionObserver" in window) {
    let lazyVideoObserver = new IntersectionObserver(function(entries, observer) {
      entries.forEach(function(videoEntry) {
        let video = videoEntry.target;
        if (videoEntry.isIntersecting) {
          video.play().catch(error => console.log("Autoplay prevented:", error));
        } else {
          video.pause();
        }
      });
    }, { rootMargin: "0px 0px -10% 0px" });

    lazyVideos.forEach(function(lazyVideo) {
      lazyVideoObserver.observe(lazyVideo);
    });
  }

  // 3. Copy BibTeX to Clipboard
  const copyBtn = document.getElementById('copy-bibtex');
  const bibtexCode = document.getElementById('bibtex-code');

  if (copyBtn && bibtexCode) {
    copyBtn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(bibtexCode.innerText);
        
        // Visual feedback
        const copyText = copyBtn.querySelector('.copy-text');
        const icon = copyBtn.querySelector('.icon i');
        
        copyBtn.classList.add('copied');
        copyText.innerText = 'Copied!';
        icon.classList.remove('far', 'fa-copy');
        icon.classList.add('fas', 'fa-check');

        // Reset button state after 2 seconds
        setTimeout(() => {
          copyBtn.classList.remove('copied');
          copyText.innerText = 'Copy';
          icon.classList.remove('fas', 'fa-check');
          icon.classList.add('far', 'fa-copy');
        }, 2000);
      } catch (err) {
        console.error('Failed to copy text: ', err);
      }
    });
  }

});
