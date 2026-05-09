      (function () {
        document.addEventListener("DOMContentLoaded", function () {
          var colecTabs = document.getElementById("colecTabs");
          var colecImg = document.getElementById("colecImg");
          var colecWrap = document.getElementById("colecImgWrap");

          function showSkeleton() {
            if (colecWrap) colecWrap.classList.add("is-loading");
          }
          function hideSkeleton() {
            if (colecWrap) colecWrap.classList.remove("is-loading");
          }

          // Mostrar skeleton al arrancar (src vacío)
          showSkeleton();

          if (colecImg) {
            // Ocultar skeleton cuando la imagen carga
            colecImg.addEventListener("load", hideSkeleton);
            colecImg.addEventListener("error", hideSkeleton);

            // Observar cambios de src (tab click → JS interno cambia src)
            new MutationObserver(function (mutations) {
              mutations.forEach(function (m) {
                if (m.attributeName === "src") showSkeleton();
              });
            }).observe(colecImg, {
              attributes: true,
              attributeFilter: ["src"],
            });
          }

          // Mostrar skeleton al hacer click en tab (antes de que el JS interno actúe)
          if (colecTabs) {
            colecTabs.addEventListener(
              "click",
              function (e) {
                var btn = e.target.closest(".colec__tab");
                if (btn && !btn.classList.contains("is-active")) showSkeleton();
              },
              true,
            );
          }
        });

        // Galería: entrada escalonada
        (function(){
          var galeria = document.getElementById('marcaGaleria');
          if(!galeria) return;
          new IntersectionObserver(function(entries){
            if(entries[0].isIntersecting) galeria.classList.add('is-visible');
          }, { threshold: 0.1 }).observe(galeria);

          // Carrusel mobile infinito con transform + transitionend
          if(window.matchMedia('(max-width:768px)').matches){
            var strip    = document.getElementById('marcaGaleriaStrip');
            var track    = document.getElementById('marcaGaleriaTrack');
            var dots     = document.querySelectorAll('.marca__galeria-dot');
            var origItems = Array.from(track.querySelectorAll('.marca__galeria-item'));
            var total    = origItems.length;
            var current  = total; // empieza en primer original
            var autoTimer;

            // Clonar: prepend clones al inicio, append al final
            origItems.slice().reverse().forEach(function(item){
              var c = item.cloneNode(true); c.setAttribute('aria-hidden','true');
              track.insertBefore(c, track.firstChild);
            });
            origItems.forEach(function(item){
              var c = item.cloneNode(true); c.setAttribute('aria-hidden','true');
              track.appendChild(c);
            });

            var allItems = Array.from(track.querySelectorAll('.marca__galeria-item'));

            function getX(idx){
              return strip.offsetWidth / 2 - allItems[idx].offsetLeft - allItems[idx].offsetWidth / 2;
            }

            function goTo(idx, animate){
              current = idx;
              track.style.transition = (animate === false)
                ? 'none'
                : 'transform .52s cubic-bezier(0.16,1,0.3,1)';
              track.style.transform = 'translateX(' + getX(idx) + 'px)';
              var dotIdx = ((idx - total) % total + total) % total;
              dots.forEach(function(d,i){ d.classList.toggle('is-active', i === dotIdx); });
            }

            // Salto silencioso después de la transición (loop infinito)
            track.addEventListener('transitionend', function(){
              if(current >= total * 2) goTo(current - total, false);
              else if(current < total)  goTo(current + total, false);
            });

            function startAuto(){
              clearInterval(autoTimer);
              autoTimer = setInterval(function(){ goTo(current + 1); }, 3200);
            }

            // Touch swipe
            var txStart = 0;
            strip.addEventListener('touchstart', function(e){ txStart = e.touches[0].clientX; clearInterval(autoTimer); }, {passive:true});
            strip.addEventListener('touchend',   function(e){
              var dx = txStart - e.changedTouches[0].clientX;
              if(Math.abs(dx) > 40) goTo(dx > 0 ? current + 1 : current - 1);
              startAuto();
            }, {passive:true});

            // Flechas
            var btnPrev = document.getElementById('galeriaPrev');
            var btnNext = document.getElementById('galeriaNext');
            if(btnPrev) btnPrev.addEventListener('click', function(){ goTo(current - 1); startAuto(); });
            if(btnNext) btnNext.addEventListener('click', function(){ goTo(current + 1); startAuto(); });

            // Dots
            dots.forEach(function(dot){
              dot.addEventListener('click', function(){
                goTo(total + parseInt(dot.dataset.index)); startAuto();
              });
            });

            goTo(total, false);
            startAuto();
          }
        })();

        // Autoplay YouTube cuando llega a la sección
        (function(){
          var iframe = document.getElementById('marcaVideoIframe');
          if(!iframe) return;
          var loaded = false;
          new IntersectionObserver(function(entries){
            if(entries[0].isIntersecting && !loaded){
              loaded = true;
              iframe.src = iframe.dataset.src;
            }
          }, { threshold: 0.4 }).observe(iframe);
        })();

        // 3. Interceptar openCarta para transición en modal
        window.addEventListener("load", function () {
          var orig = window.openCarta;
          if (!orig) return;
          window.openCarta = function (src, nombre) {
            var img = document.getElementById("cartaModalImg");
            if (img) {
              img.classList.add("is-fading");
              img.onload = function () {
                img.classList.remove("is-fading");
              };
              img.onerror = function () {
                img.classList.remove("is-fading");
              };
            }
            orig(src, nombre);
          };
        });
      })();
