!function(){
  "use strict";
  let e=[];
  (function initLocales(){
    function parseMiaCsv(t){
      var LF=String.fromCharCode(10),CR=String.fromCharCode(13);
      var rows=t.trim().split(LF);
      var rawH=rows[0].split(",");
      var h=rawH.map(function(k){
        var s=k.charCodeAt(0)===34?k.slice(1):k;
        return s.charCodeAt(s.length-1)===34?s.slice(0,-1):s;

      });
      return rows.slice(1).map(function(row,idx){
        row=row.replace(CR,"");
        var vals=[],cur="",inQ=false;
        for(var i=0;
        i<row.length;
        i++){
          var ch=row[i];
          if(ch===String.fromCharCode(34)&&!inQ){
            inQ=true;

          }
          else if(ch===String.fromCharCode(34)&&inQ&&row[i+1]===String.fromCharCode(34)){
            cur+=String.fromCharCode(34);
            i++;

          }
          else if(ch===String.fromCharCode(34)&&inQ){
            inQ=false;

          }
          else if(ch===","&&!inQ){
            vals.push(cur);
            cur="";

          }
          else{
            cur+=ch;

          }

        }
        vals.push(cur);
        var o={
          id:idx+1
        };
        h.forEach(function(k,i){
          var v=vals[i]||"";
          o[k]=k==="lat"||k==="lng"?parseFloat(v):k==="mayorista"?v.toUpperCase()==="TRUE":v;

        });
        return o;

      });

    }
    var SHEET_URL="https://docs.google.com/spreadsheets/d/1GdNRXLbg47r0ILCDar3Va2wg05Lph9qnm3nps3iK0sM/gviz/tq?tqx=out:csv&gid=158831744";
    fetch(SHEET_URL).then(function(r){
      return r.text()
    }).then(function(t){
      e=parseMiaCsv(t);
      v&&[].concat.apply([],[...new Set(e.map(function(x){
        return x.provincia
      }))].sort()).forEach(function(prov){
        var opt=document.createElement("option");
        opt.value=prov;
        opt.textContent=tc(prov);
        v&&v.appendChild(opt);

      });
      f(e);
      (function(){
        var o=document.createElement("link");
        o.rel="stylesheet",o.href="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css",document.head.appendChild(o);
        var O=document.createElement("script");
        O.src="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js",O.onload=function(){
          !function(){
            if("undefined"==typeof L)return;
            n=L.map("map",{
              center:[-38.4161,-63.6167],zoom:4,scrollWheelZoom:!1
            }),L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",{
              attribution:"&copy; OSM &copy; CARTO",subdomains:"abcd",maxZoom:19
            }).addTo(n);
            function makeIcon(mayorista){
              var bg=mayorista?'#111111':'#DA291C';
              return L.divIcon({
                html:'<div style="width:30px;height:30px;background:'+bg+';border-radius:50% 50% 50% 0;transform:rotate(-45deg);border:3px solid white;box-shadow:0 2px 10px rgba(0,0,0,.35);display:flex;align-items:center;justify-content:center"><span style="transform:rotate(45deg);color:white;font-weight:bold;font-size:11px;font-family:\'Playfair Display\',serif;font-style:italic">m</span></div>',iconSize:[30,30],iconAnchor:[15,30],popupAnchor:[0,-30],className:'custom-marker'
              });

            }
            e.forEach(e=>{
              const c=L.marker([e.lat,e.lng],{
                icon:makeIcon(e.mayorista)
              }).addTo(n).bindPopup(`<div class="map-popup">${e.mayorista?'<span class="map-popup__mayorista">★ Mayorista</span>':""}<div class="map-popup__name">${e.nombre}</div><div class="map-popup__loc">${e.ciudad}, ${e.provincia}</div>${e.dir?`<div class="map-popup__dir">${
                e.dir
              }
              </div>`:""}${e.telefono?`<a class="map-popup__tel" href="tel:${e.telefono}" style="display:block;margin:4px 0;color:var(--red);text-decoration:none;font-size:13px"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.79 19.79 0 012.12 4.18 2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg> ${
                e.telefono
              }
              </a>`:""}${e.web?`<a href="${e.web}" target="_blank" rel="noopener" style="display:block;margin:4px 0;color:var(--red);text-decoration:none;font-size:13px"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg> Sitio web</a>`:""}<a class="map-popup__maps" href="https://www.google.com/maps/dir/?api=1&destination=${e.lat},${e.lng}" target="_blank" rel="noopener"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>Cómo llegar</a></div>`);
              c._dId=e.id,c.on("click",()=>U(e.id)),a.push(c)
            })
          }
          ()
        },document.head.appendChild(O)
      })();

    }).catch(function(err){
      console.warn("Mia Hilados: no se pudo cargar locales",err);

    });

  })();
  function tc(s){
    return s.split(" ").map(function(w){
      return w.charAt(0).toUpperCase()+w.slice(1).toLowerCase()
    }).join(" ")
  }
  const i=(e,i=document)=>i.querySelector(e),c=(e,i=document)=>[...i.querySelectorAll(e)];
  let n,a=[],A=null,o=null,O=0,m=!1;
  window.addEventListener("load",()=>{
    setTimeout(()=>{
      i("#preloader").classList.add("is-hidden"),document.body.classList.remove("no-scroll"),setTimeout(()=>{
        i(".hero").classList.add("is-loaded"),E(),function(){
          var e="images/hilados/",i=[{
            id:"oxford",nombre:"Oxford",badge:"40% Lana · 60% Acrílico",desc:"Semi grueso · Agujas 5–6 · 200g",colores:[{
              n:"CRUDO",c:"#f2e6d0",img:e+"oxford/m001 crudo.webp"
            },{
              n:"GRIS CLARO",c:"#bbb8b0",img:e+"oxford/m003 gris claro.webp"
            },{
              n:"GRIS MEDIO",c:"#888480",img:e+"oxford/m004 gris medio.webp"
            },{
              n:"CAMEL",c:"#c09060",img:e+"oxford/m053 camel.webp"
            },{
              n:"CHOCOLATE",c:"#452010",img:e+"oxford/m055 chocolate.webp"
            },{
              n:"NUVEM",c:"#d4cec8",img:e+"oxford/m057 nuvem.webp"
            },{
              n:"CHOCOLATADA",c:"#6b4226",img:e+"oxford/m067 chocolatada.webp"
            },{
              n:"MAÍZ",c:"#e8c040",img:e+"oxford/m151 maiz.webp"
            },{
              n:"NARANJA",c:"#f06820",img:e+"oxford/m203 naranja.webp"
            },{
              n:"SALMÓN",c:"#f0a080",img:e+"oxford/m206 salmon.webp"
            },{
              n:"ROJO",c:"#cc1c08",img:e+"oxford/m301 rojo.webp"
            },{
              n:"BORDO",c:"#7a1020",img:e+"oxford/m351 bordo.webp"
            },{
              n:"VIOLETA",c:"#7b3fa0",img:e+"oxford/m401 violeta.webp"
            },{
              n:"BABY LILA",c:"#c8a8e0",img:e+"oxford/m451 baby lila.webp"
            },{
              n:"FUCSIA",c:"#e0206a",img:e+"oxford/m501 fucsia.webp"
            },{
              n:"ROSA CLARO",c:"#f0b8c8",img:e+"oxford/m551 rosa claro.webp"
            },{
              n:"PASTEL",c:"#b0c8e8",img:e+"oxford/m607 pastel.webp"
            },{
              n:"FRANCIA",c:"#0040a0",img:e+"oxford/m604 francia.webp"
            },{
              n:"BOTELLA",c:"#2a5030",img:e+"oxford/m704 botella.webp"
            },{
              n:"FORESTA",c:"#1e4028",img:e+"oxford/m751 foresta.webp"
            }]
          },{
            id:"aries-ovillos",nombre:"Aries Ovillos",badge:"100% Acrílico",desc:"Grueso · Agujas 7–8 · 500g",colores:[{
              n:"CRUDO",c:"#f2e6d0",img:e+"aries ovillos/m001 crudo.webp"
            },{
              n:"BLANCO",c:"#f8f8f5",img:e+"aries ovillos/m002 blanco.webp"
            },{
              n:"GRIS CLARO",c:"#c0bdb5",img:e+"aries ovillos/m003 gris claro.webp"
            },{
              n:"GRIS MEDIO",c:"#8a8680",img:e+"aries ovillos/m004 gris medio.webp"
            },{
              n:"NEGRO",c:"#1c1c1c",img:e+"aries ovillos/m050 negro.webp"
            },{
              n:"ARENA",c:"#d4c4a8",img:e+"aries ovillos/m051 arena.webp"
            },{
              n:"CAMEL",c:"#c09060",img:e+"aries ovillos/m053 camel.webp"
            },{
              n:"CHOCOLATE",c:"#452010",img:e+"aries ovillos/m055 chocolate.webp"
            },{
              n:"FUEGO",c:"#e84800",img:e+"aries ovillos/m310 fuego.webp"
            },{
              n:"BORDO",c:"#7a1020",img:e+"aries ovillos/m351 bordo.webp"
            },{
              n:"LILA ROSA",c:"#d0a8c8",img:e+"aries ovillos/m454 lila rosa.webp"
            },{
              n:"FUCSIA",c:"#e0206a",img:e+"aries ovillos/m501 fucsia.webp"
            },{
              n:"ROSA CLARO",c:"#f0b8c0",img:e+"aries ovillos/m551 rosa claro.webp"
            },{
              n:"NUDE",c:"#e8c8a8",img:e+"aries ovillos/m555 nude.webp"
            },{
              n:"CELESTE BB",c:"#a8d8f8",img:e+"aries ovillos/m601 celeste bb.webp"
            },{
              n:"MARINO",c:"#1a2e60",img:e+"aries ovillos/m606 marino.webp"
            },{
              n:"EUCALIPTUS",c:"#5a8848",img:e+"aries ovillos/m709 eucaliptus.webp"
            },{
              n:"MUSGO",c:"#526840",img:e+"aries ovillos/m756 musgo.webp"
            }]
          },{
            id:"aries-madejas",nombre:"Aries Madejas",badge:"100% Acrílico",desc:"Grueso en madeja · Agujas 7–8 · 500g",colores:[{
              n:"CRUDO",c:"#f2e6d0",img:e+"aries madejas/crudo.webp"
            },{
              n:"NEGRO",c:"#1c1c1c",img:e+"aries madejas/negro.webp"
            },{
              n:"GRIS CLARO",c:"#c0bdb5",img:e+"aries madejas/gris claro.webp"
            },{
              n:"GRIS MEDIO",c:"#8a8680",img:e+"aries madejas/gris medio.webp"
            },{
              n:"ARENA",c:"#d4c4a8",img:e+"aries madejas/arena.webp"
            },{
              n:"CAMEL",c:"#c09060",img:e+"aries madejas/camel.webp"
            },{
              n:"CARAMELO",c:"#d08040",img:e+"aries madejas/caramelo.webp"
            },{
              n:"CHOCOLATADA",c:"#6b4226",img:e+"aries madejas/chocolatada.webp"
            },{
              n:"NUDE",c:"#e8c8a8",img:e+"aries madejas/nude.webp"
            },{
              n:"ROSA VIEJO",c:"#c89898",img:e+"aries madejas/rosa viejo.webp"
            },{
              n:"ROSA CLARO",c:"#f0b8c8",img:e+"aries madejas/rosa claro.webp"
            },{
              n:"RASPBERRY",c:"#b02050",img:e+"aries madejas/raspberry.webp"
            },{
              n:"FUEGO",c:"#e84800",img:e+"aries madejas/m310 fuego.webp"
            },{
              n:"SALMÓN",c:"#f0a080",img:e+"aries madejas/salmon.webp"
            },{
              n:"VERDE AGUA",c:"#30b898",img:e+"aries madejas/verde agua.webp"
            },{
              n:"TURQUESA",c:"#20b0b0",img:e+"aries madejas/turquesa.webp"
            },{
              n:"VELVET",c:"#9050a0",img:e+"aries madejas/velvet.webp"
            },{
              n:"CELESTE BB",c:"#a8d8f8",img:e+"aries madejas/m601 celeste bb.webp"
            },{
              n:"MARINO",c:"#1a2e60",img:e+"aries madejas/m606 marino.webp"
            },{
              n:"MAÍZ",c:"#e8c040",img:e+"aries madejas/maiz.webp"
            },{
              n:"GIRASOL",c:"#f0c020",img:e+"aries madejas/girasol.webp"
            },{
              n:"MUSGO",c:"#526840",img:e+"aries madejas/musgo.webp"
            },{
              n:"FORESTA",c:"#3a7050",img:e+"aries madejas/foresta.webp"
            }]
          },{
            id:"cake",nombre:"Cake",badge:"25% Lana · 75% Acrílico Matizado",desc:"Matizado · Agujas 5.5–6.5 · 150g",colores:[{
              n:"CRUDO",c:"#f2e6d0",img:e+"cake/cake crudo.webp"
            },{
              n:"NEGRO",c:"#1c1c1c",img:e+"cake/cake negro.webp"
            },{
              n:"CHOCOLATE",c:"#452010",img:e+"cake/cake chocolate.webp"
            },{
              n:"LANGOSTINO",c:"#e89878",img:e+"cake/cake langostino.webp"
            },{
              n:"ROJO",c:"#cc1c08",img:e+"cake/cake rojo.webp"
            },{
              n:"ROSA SUCIO",c:"#c09090",img:e+"cake/cake rosasucio.webp"
            },{
              n:"ROSAS",c:"#f0b8c8",img:e+"cake/cake rosas.webp"
            },{
              n:"LILA",c:"#b890d0",img:e+"cake/cake lila.webp"
            },{
              n:"MARINO",c:"#1a2e60",img:e+"cake/cake marino.webp"
            },{
              n:"VERDE",c:"#4a7a4a",img:e+"cake/cake verde.webp"
            }]
          },{
            id:"camila",nombre:"Camila",badge:"Matizado Fantasy",desc:"Matizado artesanal · Agujas 5–6 · 150g",colores:[{
              n:"NEGRO",c:"#1c1c1c",img:e+"camila/m3050 negro.webp"
            },{
              n:"CAMEL",c:"#c09060",img:e+"camila/m3056 camel.webp"
            },{
              n:"MOSTAZA",c:"#c8a020",img:e+"camila/m3103 mostaza.webp"
            },{
              n:"BORDO",c:"#7a1020",img:e+"camila/m3306 bordo.webp"
            },{
              n:"LILA",c:"#b890d0",img:e+"camila/m3451 lila.webp"
            },{
              n:"CORAL",c:"#e87060",img:e+"camila/m3502 coral.webp"
            },{
              n:"ROSA",c:"#f0a8c0",img:e+"camila/m3506 rosa.webp"
            },{
              n:"CELESTE",c:"#88c0f0",img:e+"camila/m3651 celeste.webp"
            },{
              n:"VERDE",c:"#4a7a4a",img:e+"camila/m3708 verde.webp"
            }]
          },{
            id:"amanda",nombre:"Amanda",badge:"Fibra Noble",desc:"Semi grueso · Agujas 5–6",colores:[{
              n:"CRUDO",c:"#f2e6d0",img:e+"amanda/m001 crudo.webp"
            },{
              n:"GRIS CLARO",c:"#c0bdb5",img:e+"amanda/m003 gris claro.webp"
            },{
              n:"ARENA",c:"#d4c4a8",img:e+"amanda/m051 arena.webp"
            }]
          },{
            id:"amelie",nombre:"Amelie",badge:"Fibra Noble",desc:"Semi grueso · Agujas 5–6",colores:[{
              n:"CRUDO",c:"#f2e6d0",img:e+"amelie/m001 crudo.webp"
            },{
              n:"BLANCO",c:"#f8f8f5",img:e+"amelie/m002 blanco.webp"
            },{
              n:"GRIS CLARO",c:"#c0bdb5",img:e+"amelie/m003 gris claro.webp"
            },{
              n:"NEGRO",c:"#1c1c1c",img:e+"amelie/m050 negro.webp"
            },{
              n:"ARENA",c:"#d4c4a8",img:e+"amelie/m051 arena.webp"
            },{
              n:"MONTAÑA",c:"#8a7868",img:e+"amelie/m054 montaña.webp"
            },{
              n:"CHOCOLATE",c:"#452010",img:e+"amelie/m055 chocolate.webp"
            },{
              n:"BORDO",c:"#7a1020",img:e+"amelie/m351 bordo.webp"
            },{
              n:"ROSA SUCIO",c:"#c09090",img:e+"amelie/m557 rosa sucio.webp"
            },{
              n:"CELESTE BB",c:"#a8d8f8",img:e+"amelie/m601 celeste bebe.webp"
            }]
          },{
            id:"austral",nombre:"Austral",badge:"Fibra Natural",desc:"Rústico · Agujas 6–8",colores:[{
              n:"CRUDO",c:"#f2e6d0",img:e+"austral/crudo.webp"
            },{
              n:"NUVEM",c:"#d4cec8",img:e+"austral/nuvem.webp"
            },{
              n:"ROCA",c:"#8a8078",img:e+"austral/roca.webp"
            },{
              n:"CHOCOLATE",c:"#452010",img:e+"austral/chocolate.webp"
            },{
              n:"CHOCOLATADA",c:"#6b4226",img:e+"austral/chocolatada.webp"
            },{
              n:"AFRICANO",c:"#7a6050",img:e+"austral/africano.webp"
            }]
          },{
            id:"brill",nombre:"Brill",badge:"Acrílico Brillante",desc:"Semi fino · Agujas 3–4",colores:[{
              n:"CRUDO",c:"#f2e6d0",img:e+"brill/m001 crudo.webp"
            },{
              n:"BLANCO",c:"#f8f8f5",img:e+"brill/m002 blanco.webp"
            },{
              n:"GRIS MEDIO",c:"#888480",img:e+"brill/m003 gris medio.webp"
            },{
              n:"GRIS OSCURO",c:"#505050",img:e+"brill/m004 gris medio.webp"
            },{
              n:"NEGRO",c:"#1c1c1c",img:e+"brill/m050 negor.webp"
            },{
              n:"ARENA",c:"#d4c4a8",img:e+"brill/m051 arena.webp"
            },{
              n:"CAMEL",c:"#c09060",img:e+"brill/m053 camel.webp"
            },{
              n:"FUEGO",c:"#e84800",img:e+"brill/m310 fuego.webp"
            },{
              n:"ROSA CHICLE",c:"#f080a0",img:e+"brill/m553 rosa chicle.webp"
            },{
              n:"FRANCIA",c:"#0040a0",img:e+"brill/m604 francia.webp"
            }]
          },{
            id:"bruma",nombre:"Bruma",badge:"Acrílico Texturado",desc:"Esponjoso · Agujas 5–6",colores:[{
              n:"CRUDO",c:"#f2e6d0",img:e+"bruma/m001 crudo.webp"
            },{
              n:"GRIS CLARO",c:"#c0bdb5",img:e+"bruma/m003 gris claro.webp"
            },{
              n:"GRIS MEDIO",c:"#888480",img:e+"bruma/m004 gris medio.webp"
            },{
              n:"GRAFITO",c:"#404040",img:e+"bruma/m005 grafito.webp"
            },{
              n:"NEGRO",c:"#1c1c1c",img:e+"bruma/m050 negro.webp"
            },{
              n:"ARENA",c:"#d4c4a8",img:e+"bruma/m051 arena.webp"
            },{
              n:"CAMEL",c:"#c09060",img:e+"bruma/m053 camel.webp"
            },{
              n:"CORAL FLUO",c:"#ff6050",img:e+"bruma/m202 coral fluo.webp"
            },{
              n:"LANGOSTINO",c:"#e89878",img:e+"bruma/m211 langostino.webp"
            },{
              n:"DAMASCO",c:"#e09870",img:e+"bruma/m251 damasco.webp"
            },{
              n:"FUEGO",c:"#e84800",img:e+"bruma/m310 fuego.webp"
            },{
              n:"LILA ROSA",c:"#d0a8c8",img:e+"bruma/m454 lila rosa.webp"
            },{
              n:"ROSA VIEJO",c:"#c89898",img:e+"bruma/m552 rosa viejo.webp"
            },{
              n:"ROSA CHICLE",c:"#f080a0",img:e+"bruma/m553 rosa chicle.webp"
            },{
              n:"PIEL",c:"#f0c0a0",img:e+"bruma/m556 piel.webp"
            },{
              n:"FRANCIA",c:"#0040a0",img:e+"bruma/m604 francia.webp"
            },{
              n:"JEAN",c:"#4878b0",img:e+"bruma/m605 jean.webp"
            },{
              n:"VERDE AGUA",c:"#30b898",img:e+"bruma/m701 verde agua.webp"
            },{
              n:"EUCALIPTUS",c:"#5a8848",img:e+"bruma/m709 eucaliptus.webp"
            },{
              n:"PISTACHO",c:"#a8c870",img:e+"bruma/m711  pistacho.webp"
            }]
          },{
            id:"cotton-8-6",nombre:"Cotton 8-6",badge:"100% Algodón",desc:"Fino · Agujas 3–4 · En ovillo",colores:[{
              n:"CRUDO",c:"#f2e6d0",img:e+"cotton 8-6 ovillos/m001 crudo.webp"
            },{
              n:"BLANCO",c:"#f8f8f5",img:e+"cotton 8-6 ovillos/m002 blanco.webp"
            },{
              n:"GRIS CLARO",c:"#c0bdb5",img:e+"cotton 8-6 ovillos/m003 gris claro.webp"
            },{
              n:"GRIS MEDIO",c:"#888480",img:e+"cotton 8-6 ovillos/m004 gris medio.webp"
            },{
              n:"GRIS OSCURO",c:"#505050",img:e+"cotton 8-6 ovillos/m005 gris oscuro.webp"
            },{
              n:"NEGRO",c:"#1c1c1c",img:e+"cotton 8-6 ovillos/m050 negro.webp"
            },{
              n:"CAMEL",c:"#c09060",img:e+"cotton 8-6 ovillos/m053 camel.webp"
            },{
              n:"CHOCOLATE",c:"#452010",img:e+"cotton 8-6 ovillos/m055 chocolate.webp"
            },{
              n:"ROCA",c:"#8a8078",img:e+"cotton 8-6 ovillos/m059 roca.webp"
            },{
              n:"ORO",c:"#d4a830",img:e+"cotton 8-6 ovillos/m102 oro.webp"
            },{
              n:"NARANJA",c:"#f06820",img:e+"cotton 8-6 ovillos/m203 naranja.webp"
            },{
              n:"ÓXIDO",c:"#c05030",img:e+"cotton 8-6 ovillos/m255 oxido.webp"
            },{
              n:"ROJO",c:"#cc1c08",img:e+"cotton 8-6 ovillos/m301 rojo.webp"
            },{
              n:"MALBEC",c:"#6a1040",img:e+"cotton 8-6 ovillos/m304 malbec.webp"
            },{
              n:"BORDO",c:"#7a1020",img:e+"cotton 8-6 ovillos/m351 bordo.webp"
            },{
              n:"VIOLETA",c:"#7b3fa0",img:e+"cotton 8-6 ovillos/m401 violeta.webp"
            },{
              n:"BABY LILA",c:"#c8a8e0",img:e+"cotton 8-6 ovillos/m451 baby lila.webp"
            },{
              n:"FUCSIA",c:"#e0206a",img:e+"cotton 8-6 ovillos/m501 fucsia.webp"
            },{
              n:"ROSA VIEJO",c:"#c89898",img:e+"cotton 8-6 ovillos/m552 rosa viejo.webp"
            },{
              n:"ROSA CHICLE",c:"#f080a0",img:e+"cotton 8-6 ovillos/m553 rosa chicle.webp"
            },{
              n:"CORAL",c:"#e87060",img:e+"cotton 8-6 ovillos/m554 coral.webp"
            },{
              n:"BANDERA",c:"#2060c0",img:e+"cotton 8-6 ovillos/m602 bandera.webp"
            },{
              n:"FRANCIA",c:"#0040a0",img:e+"cotton 8-6 ovillos/m604 francia.webp"
            },{
              n:"JEAN",c:"#4878b0",img:e+"cotton 8-6 ovillos/m605 jean.webp"
            },{
              n:"MARINO",c:"#1a2e60",img:e+"cotton 8-6 ovillos/m606 marino.webp"
            },{
              n:"TURQUESA",c:"#20b0b0",img:e+"cotton 8-6 ovillos/m651 turquesa.webp"
            },{
              n:"DANUBIO",c:"#4090c0",img:e+"cotton 8-6 ovillos/m655 danubio.webp"
            },{
              n:"VERDE LORO",c:"#6a8e28",img:e+"cotton 8-6 ovillos/m703 verde loro.webp"
            },{
              n:"BOTELLA",c:"#2a5030",img:e+"cotton 8-6 ovillos/m704 botella.webp"
            },{
              n:"MANZANA",c:"#78b820",img:e+"cotton 8-6 ovillos/m705 manzana.webp"
            },{
              n:"MUSGO",c:"#526840",img:e+"cotton 8-6 ovillos/m756 musgo.webp"
            }]
          },{
            id:"cotton-sense",nombre:"Cotton Sense",badge:"100% Algodón Madeja",desc:"Fino en madeja · Agujas 3–4",colores:[{
              n:"CRUDO",c:"#f2e6d0",img:e+"cotton sense madejas/m001 crudo.webp"
            },{
              n:"BLANCO",c:"#f8f8f5",img:e+"cotton sense madejas/m002 blanco.webp"
            },{
              n:"GRIS CLARO",c:"#c0bdb5",img:e+"cotton sense madejas/m003 gris claro.webp"
            },{
              n:"GRIS MEDIO",c:"#888480",img:e+"cotton sense madejas/m004 gris medio.webp"
            },{
              n:"NEGRO",c:"#1c1c1c",img:e+"cotton sense madejas/m050 negro.webp"
            },{
              n:"CAMEL",c:"#c09060",img:e+"cotton sense madejas/m053 camel.webp"
            },{
              n:"CHOCOLATE",c:"#452010",img:e+"cotton sense madejas/m055 chocolate.webp"
            },{
              n:"CANELA",c:"#c08040",img:e+"cotton sense madejas/m066 canela.webp"
            },{
              n:"PARDO",c:"#9a7050",img:e+"cotton sense madejas/m068 pardo.webp"
            },{
              n:"PATITO",c:"#f0d050",img:e+"cotton sense madejas/m101 patito.webp"
            },{
              n:"ORO",c:"#d4a830",img:e+"cotton sense madejas/m102 oro.webp"
            },{
              n:"GIRASOL",c:"#f0c020",img:e+"cotton sense madejas/m105 girasol.webp"
            },{
              n:"MAÍZ",c:"#e8c040",img:e+"cotton sense madejas/m151 maiz.webp"
            },{
              n:"NARANJA",c:"#f06820",img:e+"cotton sense madejas/m203 naranja.webp"
            },{
              n:"SALMÓN",c:"#f0a080",img:e+"cotton sense madejas/m206 salmon.webp"
            },{
              n:"DAMASCO",c:"#e09870",img:e+"cotton sense madejas/m251 damasco.webp"
            },{
              n:"ÓXIDO",c:"#c05030",img:e+"cotton sense madejas/m255 oxido.webp"
            },{
              n:"ROJO",c:"#cc1c08",img:e+"cotton sense madejas/m301 rojo.webp"
            },{
              n:"FRAMBUESA",c:"#c02060",img:e+"cotton sense madejas/m306 frambuesa.webp"
            },{
              n:"BORDO",c:"#7a1020",img:e+"cotton sense madejas/m351 bordo.webp"
            },{
              n:"VIOLETA",c:"#7b3fa0",img:e+"cotton sense madejas/m401 violeta.webp"
            },{
              n:"BABY LILA",c:"#c8a8e0",img:e+"cotton sense madejas/m451 baby lila.webp"
            },{
              n:"FUCSIA",c:"#e0206a",img:e+"cotton sense madejas/m501 fucsia.webp"
            },{
              n:"ROSA CLARO",c:"#f0b8c8",img:e+"cotton sense madejas/m551 rosa claro.webp"
            },{
              n:"ROSA VIEJO",c:"#c89898",img:e+"cotton sense madejas/m552 rosa viejo.webp"
            },{
              n:"ROSA CHICLE",c:"#f080a0",img:e+"cotton sense madejas/m553 rosa chicle.webp"
            },{
              n:"CORAL",c:"#e87060",img:e+"cotton sense madejas/m554 coral.webp"
            },{
              n:"NUDE",c:"#e8c8a8",img:e+"cotton sense madejas/m555 nude.webp"
            },{
              n:"CELESTE BB",c:"#a8d8f8",img:e+"cotton sense madejas/m601 celeste.webp"
            },{
              n:"FRANCIA",c:"#0040a0",img:e+"cotton sense madejas/m604 francia.webp"
            },{
              n:"JEAN",c:"#4878b0",img:e+"cotton sense madejas/m605 jean.webp"
            },{
              n:"MARINO",c:"#1a2e60",img:e+"cotton sense madejas/m606 marino.webp"
            },{
              n:"TURQUESA",c:"#20b0b0",img:e+"cotton sense madejas/m651 turquesa.webp"
            },{
              n:"PISCINA",c:"#40c0c0",img:e+"cotton sense madejas/m654 piscina.webp"
            },{
              n:"CARIBE",c:"#20a8c0",img:e+"cotton sense madejas/m658 caribe.webp"
            },{
              n:"BOTELLA",c:"#2a5030",img:e+"cotton sense madejas/m704 botella.webp"
            },{
              n:"MANZANA",c:"#78b820",img:e+"cotton sense madejas/m705 manzana.webp"
            },{
              n:"ESMERALDA",c:"#1a8040",img:e+"cotton sense madejas/m707 verde esmeralda.webp"
            },{
              n:"PISTACHO",c:"#a8c870",img:e+"cotton sense madejas/m711 pistacho.webp"
            },{
              n:"MUSGO",c:"#526840",img:e+"cotton sense madejas/m756 musgo.webp"
            }]
          },{
            id:"dolly",nombre:"Dolly Cotton",badge:"100% Algodón",desc:"Fino · Agujas 3–4 · En ovillo",colores:[{
              n:"CRUDO",c:"#f2e6d0",img:e+"dolly cotton 8-3 ovillos/m001 crudo.webp"
            },{
              n:"BLANCO",c:"#f8f8f5",img:e+"dolly cotton 8-3 ovillos/m002 blanco.webp"
            },{
              n:"GRIS CLARO",c:"#c0bdb5",img:e+"dolly cotton 8-3 ovillos/m003 gris claro.webp"
            },{
              n:"GRIS MEDIO",c:"#888480",img:e+"dolly cotton 8-3 ovillos/m004 gris medio.webp"
            },{
              n:"GRIS OSCURO",c:"#505050",img:e+"dolly cotton 8-3 ovillos/m005 gris oscuro.webp"
            },{
              n:"NEGRO",c:"#1c1c1c",img:e+"dolly cotton 8-3 ovillos/m050 negro.webp"
            },{
              n:"CHOCOLATE",c:"#452010",img:e+"dolly cotton 8-3 ovillos/m055 chocolate.webp"
            },{
              n:"ROCA",c:"#8a8078",img:e+"dolly cotton 8-3 ovillos/m059 roca.webp"
            },{
              n:"ORO",c:"#d4a830",img:e+"dolly cotton 8-3 ovillos/m102 oro.webp"
            },{
              n:"NARANJA",c:"#f06820",img:e+"dolly cotton 8-3 ovillos/m203 naranja.webp"
            },{
              n:"ÓXIDO",c:"#c05030",img:e+"dolly cotton 8-3 ovillos/m255 oxido.webp"
            },{
              n:"ROJO",c:"#cc1c08",img:e+"dolly cotton 8-3 ovillos/m301 rojo.webp"
            },{
              n:"BORDO",c:"#7a1020",img:e+"dolly cotton 8-3 ovillos/m351 bordo.webp"
            },{
              n:"VIOLETA",c:"#7b3fa0",img:e+"dolly cotton 8-3 ovillos/m401 violeta.webp"
            },{
              n:"BABY LILA",c:"#c8a8e0",img:e+"dolly cotton 8-3 ovillos/m451 baby lila.webp"
            },{
              n:"FUCSIA",c:"#e0206a",img:e+"dolly cotton 8-3 ovillos/m501 fucsia.webp"
            },{
              n:"ROSA VIEJO",c:"#c89898",img:e+"dolly cotton 8-3 ovillos/m552 rosa viejo.webp"
            },{
              n:"ROSA CHICLE",c:"#f080a0",img:e+"dolly cotton 8-3 ovillos/m553 rosa chicle.webp"
            },{
              n:"CORAL",c:"#e87060",img:e+"dolly cotton 8-3 ovillos/m554 coral.webp"
            },{
              n:"BANDERA",c:"#2060c0",img:e+"dolly cotton 8-3 ovillos/m602 bandera.webp"
            },{
              n:"JEAN",c:"#4878b0",img:e+"dolly cotton 8-3 ovillos/m605 jean.webp"
            },{
              n:"MARINO",c:"#1a2e60",img:e+"dolly cotton 8-3 ovillos/m606 marino.webp"
            },{
              n:"TURQUESA",c:"#20b0b0",img:e+"dolly cotton 8-3 ovillos/m651 turquesa.webp"
            },{
              n:"DANUBIO",c:"#4090c0",img:e+"dolly cotton 8-3 ovillos/m655 danubio.webp"
            },{
              n:"VERDE LORO",c:"#6a8e28",img:e+"dolly cotton 8-3 ovillos/m703 verde loro.webp"
            },{
              n:"BOTELLA",c:"#2a5030",img:e+"dolly cotton 8-3 ovillos/m704 botella.webp"
            },{
              n:"MANZANA",c:"#78b820",img:e+"dolly cotton 8-3 ovillos/m705 manzana.webp"
            },{
              n:"MUSGO",c:"#526840",img:e+"dolly cotton 8-3 ovillos/m756 musgo.webp"
            }]
          },{
            id:"flower",nombre:"Flower",badge:"Textura Bucle",desc:"Fantasía · Agujas 5–6",colores:[{
              n:"CRUDO",c:"#f2e6d0",img:e+"flower/crudo flower-1.webp"
            },{
              n:"NEGRO",c:"#1c1c1c",img:e+"flower/negro flower-1.webp"
            },{
              n:"GRIS PLATA",c:"#c8c8c0",img:e+"flower/gris plata flower-1.webp"
            },{
              n:"ARENA",c:"#d4c4a8",img:e+"flower/arena flower.webp"
            },{
              n:"CAMEL",c:"#c09060",img:e+"flower/camel-1.webp"
            },{
              n:"NUDE",c:"#e8c8a8",img:e+"flower/nude flower-1.webp"
            },{
              n:"ROJO",c:"#cc1c08",img:e+"flower/rojo flower-1.webp"
            },{
              n:"FUCSIA",c:"#e0206a",img:e+"flower/fucsia flower.webp"
            },{
              n:"LILA",c:"#b890d0",img:e+"flower/lila flower-1.webp"
            },{
              n:"ESMERALDA",c:"#1a8040",img:e+"flower/esmeralda flower-1.webp"
            },{
              n:"FRANCIA",c:"#0040a0",img:e+"flower/francia flower-1.webp"
            }]
          },{
            id:"fresh",nombre:"Fresh",badge:"Algodón & Acrílico",desc:"Verano · Agujas 3–4",colores:[{
              n:"CRUDO",c:"#f2e6d0",img:e+"fresh/crudo 01.webp"
            },{
              n:"BLANCO",c:"#f8f8f5",img:e+"fresh/m002-a.webp"
            },{
              n:"GRIS CLARO",c:"#c0bdb5",img:e+"fresh/m003-a.webp"
            },{
              n:"NEGRO",c:"#1c1c1c",img:e+"fresh/m050-a.webp"
            },{
              n:"ARENA",c:"#d4c4a8",img:e+"fresh/m051-a.webp"
            },{
              n:"NARANJA",c:"#f06820",img:e+"fresh/m203-a.webp"
            },{
              n:"DAMASCO",c:"#e09870",img:e+"fresh/damasco 251.webp"
            },{
              n:"LANGOSTINO",c:"#e89878",img:e+"fresh/langostino 211.webp"
            },{
              n:"FUEGO",c:"#e84800",img:e+"fresh/fuego 310.webp"
            },{
              n:"FUCSIA",c:"#e0206a",img:e+"fresh/fuccia 501.webp"
            },{
              n:"ROSA CLARO",c:"#f0b8c8",img:e+"fresh/rosa claro 551.webp"
            },{
              n:"ROSA VIEJO",c:"#c89898",img:e+"fresh/rosa viejo 552.webp"
            },{
              n:"NUDE",c:"#e8c8a8",img:e+"fresh/nude555.webp"
            },{
              n:"PATITO",c:"#f0d050",img:e+"fresh/patito 101.webp"
            },{
              n:"GIRASOL",c:"#f0c020",img:e+"fresh/girasol 105.webp"
            },{
              n:"GRIS MEDIO",c:"#888480",img:e+"fresh/gris medio 004.webp"
            },{
              n:"CELESTE BB",c:"#a8d8f8",img:e+"fresh/celeste 601.webp"
            },{
              n:"TURQUESA",c:"#20b0b0",img:e+"fresh/m651-b.webp"
            },{
              n:"PISCINA",c:"#40c0c0",img:e+"fresh/piscina 657.webp"
            },{
              n:"MANZANA",c:"#78b820",img:e+"fresh/manzana 705.webp"
            },{
              n:"VERDE AGUA",c:"#30b898",img:e+"fresh/verde agua 701.webp"
            },{
              n:"VERDE LORO",c:"#6a8e28",img:e+"fresh/verde loro 703.webp"
            },{
              n:"EUCALIPTUS",c:"#5a8848",img:e+"fresh/eucaliptus 709.webp"
            },{
              n:"LILA",c:"#b890d0",img:e+"fresh/lila 465.webp"
            },{
              n:"CHOCOLATADA",c:"#6b4226",img:e+"fresh/chocolatada 067.webp"
            }]
          },{
            id:"glam",nombre:"Glam",badge:"Fibra Premium",desc:"Semi fino con brillo · Agujas 3–4",colores:[{
              n:"CRUDO",c:"#f2e6d0",img:e+"glam/m001-crudo.webp"
            },{
              n:"BLANCO",c:"#f8f8f5",img:e+"glam/m002-blanco.webp"
            },{
              n:"GRIS CLARO",c:"#c0bdb5",img:e+"glam/m003-grisclaro.webp"
            },{
              n:"NEGRO",c:"#1c1c1c",img:e+"glam/m050-negro.webp"
            },{
              n:"ARENA",c:"#d4c4a8",img:e+"glam/m051-arena.webp"
            },{
              n:"CAMEL",c:"#c09060",img:e+"glam/m053- camel.webp"
            },{
              n:"FUEGO",c:"#e84800",img:e+"glam/m310-fuego.webp"
            },{
              n:"NUDE",c:"#e8c8a8",img:e+"glam/m555-nude.webp"
            },{
              n:"VERDE LORO",c:"#6a8e28",img:e+"glam/m703-verdeloro.webp"
            }]
          },{
            id:"kiko",nombre:"Kiko",badge:"Acrílico Premium",desc:"Semi grueso · Agujas 5–6",colores:[{
              n:"CRUDO",c:"#f2e6d0",img:e+"kiko/m001 crudo.webp"
            },{
              n:"BLANCO",c:"#f8f8f5",img:e+"kiko/m002 blanco.webp"
            },{
              n:"GRIS CLARO",c:"#c0bdb5",img:e+"kiko/m003 gris claro.webp"
            },{
              n:"GRIS MEDIO",c:"#888480",img:e+"kiko/m004 gris medio.webp"
            },{
              n:"NEGRO",c:"#1c1c1c",img:e+"kiko/m050 negro.webp"
            },{
              n:"CAMEL",c:"#c09060",img:e+"kiko/m053 camel.webp"
            },{
              n:"CHOCOLATE",c:"#452010",img:e+"kiko/m055 chocolate.webp"
            },{
              n:"LIEBRE",c:"#9a7a60",img:e+"kiko/m056 liebre.webp"
            },{
              n:"CHOCOLATADA",c:"#6b4226",img:e+"kiko/m067 chocolatada.webp"
            },{
              n:"PARDO",c:"#9a7050",img:e+"kiko/m068 pardo.webp"
            },{
              n:"PATITO",c:"#f0d050",img:e+"kiko/m101 patito.webp"
            },{
              n:"LANGOSTINO",c:"#e89878",img:e+"kiko/m211 langostino.webp"
            },{
              n:"ROJO",c:"#cc1c08",img:e+"kiko/m301 rojo.webp"
            },{
              n:"FUEGO",c:"#e84800",img:e+"kiko/m310 fuego.webp"
            },{
              n:"BORDO",c:"#7a1020",img:e+"kiko/m351 bordo.webp"
            },{
              n:"BABY LILA",c:"#c8a8e0",img:e+"kiko/m461 baby lila.webp"
            },{
              n:"MAGENTA",c:"#c020a0",img:e+"kiko/m510 magenta.webp"
            },{
              n:"ROSA CLARO",c:"#f0b8c8",img:e+"kiko/m551 rosa claro.webp"
            },{
              n:"ROSA VIEJO",c:"#c89898",img:e+"kiko/m552 rosa viejo.webp"
            },{
              n:"NUDE",c:"#e8c8a8",img:e+"kiko/m555 nude.webp"
            },{
              n:"FRANCIA",c:"#0040a0",img:e+"kiko/m604 francia.webp"
            },{
              n:"JEAN",c:"#4878b0",img:e+"kiko/m605 jean.webp"
            },{
              n:"MARINO",c:"#1a2e60",img:e+"kiko/m606 marino.webp"
            },{
              n:"PISCINA",c:"#40c0c0",img:e+"kiko/m654 piscina.webp"
            },{
              n:"VERDE CLARO",c:"#7ab840",img:e+"kiko/m702 verde claro.webp"
            },{
              n:"EUCALIPTUS",c:"#5a8848",img:e+"kiko/m709 eucaliptus.webp"
            },{
              n:"MUSGO",c:"#526840",img:e+"kiko/m756 musgo.webp"
            }]
          },{
            id:"mandala",nombre:"Mandala",badge:"Matizado Arco Iris",desc:"Efecto degradé · Agujas 4–5",colores:[{
              n:"PLATA",c:"#c8c8c0",img:e+"mandala/3002 plata.webp"
            },{
              n:"GRIS CLARO",c:"#c0bdb5",img:e+"mandala/3003 gris claro.webp"
            },{
              n:"HUMO",c:"#707070",img:e+"mandala/3011 humo.webp"
            },{
              n:"CHOCOLATE",c:"#452010",img:e+"mandala/3051 chocolate.webp"
            },{
              n:"CAFÉ",c:"#6a4828",img:e+"mandala/3055 cafe.webp"
            },{
              n:"CAMEL",c:"#c09060",img:e+"mandala/3056 camel.webp"
            },{
              n:"ROJO",c:"#cc1c08",img:e+"mandala/3303 rojo.webp"
            },{
              n:"MAQUILLAJE",c:"#e8b090",img:e+"mandala/3311 maquillaje.webp"
            },{
              n:"BORDO",c:"#7a1020",img:e+"mandala/3351 bordo.webp"
            },{
              n:"VIOLETA",c:"#7b3fa0",img:e+"mandala/3401 violet.webp"
            },{
              n:"FRAMBUESA",c:"#c02060",img:e+"mandala/3453 frambuesa.webp"
            },{
              n:"RAINBOW",c:"#e0a0c0",img:e+"mandala/3505 rainbow.webp"
            },{
              n:"ROSA",c:"#f0b8c8",img:e+"mandala/3508 rosa.webp"
            },{
              n:"PASTEL",c:"#b0c8e8",img:e+"mandala/3600 pastel.webp"
            },{
              n:"JEAN",c:"#4878b0",img:e+"mandala/3602 jean.webp"
            },{
              n:"SUAVE",c:"#80c8c0",img:e+"mandala/3607 suave.webp"
            },{
              n:"VERANO",c:"#a8d8b0",img:e+"mandala/3612 verano.webp"
            },{
              n:"STEEL",c:"#5070a0",img:e+"mandala/3613 steel.webp"
            },{
              n:"AGUAMARINA",c:"#40c0b0",img:e+"mandala/3653 aguamarina.webp"
            },{
              n:"BOTELLA",c:"#2a5030",img:e+"mandala/3703 botella.webp"
            }]
          },{
            id:"milano",nombre:"Milano",badge:"Fibra Italiana",desc:"Semi fino · Agujas 3.5–4.5",colores:[{
              n:"CRUDO",c:"#f2e6d0",img:e+"milano/m001-crudo.webp"
            },{
              n:"GRIS CLARO",c:"#c0bdb5",img:e+"milano/m003 gris claro.webp"
            },{
              n:"GRIS OSCURO",c:"#505050",img:e+"milano/m005 gris oscuro.webp"
            },{
              n:"NEGRO",c:"#1c1c1c",img:e+"milano/m050 negro.webp"
            },{
              n:"ARENA",c:"#d4c4a8",img:e+"milano/m051 arena.webp"
            },{
              n:"NUVEM",c:"#d4cec8",img:e+"milano/m057 nuvem.webp"
            },{
              n:"ÁCIDO",c:"#c0e020",img:e+"milano/m104 acido.webp"
            },{
              n:"VIOLETA",c:"#7b3fa0",img:e+"milano/m401 violeta.webp"
            },{
              n:"FUCSIA",c:"#e0206a",img:e+"milano/m501 fucsia.webp"
            },{
              n:"CORAL",c:"#e87060",img:e+"milano/m554 coral.webp"
            },{
              n:"PIEL",c:"#f0c0a0",img:e+"milano/m556 piel.webp"
            },{
              n:"NÍSPERO",c:"#e0a070",img:e+"milano/m560 nispero.webp"
            },{
              n:"JEAN",c:"#4878b0",img:e+"milano/m605 jean.webp"
            },{
              n:"VERDE LORO",c:"#6a8e28",img:e+"milano/m703 verde loro.webp"
            }]
          },{
            id:"niky",nombre:"Niky",badge:"Acrílico Suave",desc:"Semi grueso · Agujas 5–6",colores:[{
              n:"CRUDO",c:"#f2e6d0",img:e+"niky/m001 crudo.webp"
            },{
              n:"BLANCO",c:"#f8f8f5",img:e+"niky/m002 blanco.webp"
            },{
              n:"GRIS CLARO",c:"#c0bdb5",img:e+"niky/m003 gris claro.webp"
            },{
              n:"NEGRO",c:"#1c1c1c",img:e+"niky/m050 negro.webp"
            },{
              n:"ARENA",c:"#d4c4a8",img:e+"niky/m051 arena.webp"
            },{
              n:"CAMEL",c:"#c09060",img:e+"niky/m053 camel.webp"
            },{
              n:"CHOCOLATE",c:"#452010",img:e+"niky/m055 chocolate.webp"
            },{
              n:"NUVEM",c:"#d4cec8",img:e+"niky/m057 nuvem.webp"
            },{
              n:"ROCA",c:"#8a8078",img:e+"niky/m059 roca.webp"
            },{
              n:"NATA",c:"#f0e8d0",img:e+"niky/m063 nata.webp"
            },{
              n:"CANELA",c:"#c08040",img:e+"niky/m066 canela.webp"
            },{
              n:"CHOCOLATADA",c:"#6b4226",img:e+"niky/m067 chocolatada.webp"
            },{
              n:"RAÍZ",c:"#8a6040",img:e+"niky/m071 raiz.webp"
            },{
              n:"PATITO",c:"#f0d050",img:e+"niky/m101 patito.webp"
            },{
              n:"NARANJA",c:"#f06820",img:e+"niky/m203 naranja.webp"
            },{
              n:"MAQUILLAJE",c:"#e8b090",img:e+"niky/m212 maquillaje.webp"
            },{
              n:"ROJO OSCURO",c:"#8a1500",img:e+"niky/m302 rojo oscuro.webp"
            },{
              n:"FRAMBUESA",c:"#c02060",img:e+"niky/m306 frambuesa.webp"
            },{
              n:"BORDO",c:"#7a1020",img:e+"niky/m351 bordo.webp"
            },{
              n:"ROSA CLARO",c:"#f0b8c8",img:e+"niky/m551 rosa claro.webp"
            },{
              n:"ROSA VIEJO",c:"#c89898",img:e+"niky/m552 rosa viejo.webp"
            },{
              n:"NUDE",c:"#e8c8a8",img:e+"niky/m555 nude.webp"
            },{
              n:"ROSA SUCIO",c:"#c09090",img:e+"niky/m557 rosa sucio.webp"
            },{
              n:"CELESTE BB",c:"#a8d8f8",img:e+"niky/m601 celeste bebe.webp"
            },{
              n:"FRANCIA",c:"#0040a0",img:e+"niky/m604 francia.webp"
            },{
              n:"MARINO",c:"#1a2e60",img:e+"niky/m606 marino.webp"
            },{
              n:"AERO",c:"#80b8d8",img:e+"niky/m609 aero.webp"
            },{
              n:"PISCINA",c:"#40c0c0",img:e+"niky/m654 piscina.webp"
            },{
              n:"MANZANA",c:"#78b820",img:e+"niky/m705 manzana.webp"
            },{
              n:"EUCALIPTUS",c:"#5a8848",img:e+"niky/m709 eucaliptus.webp"
            },{
              n:"MUSGO",c:"#526840",img:e+"niky/m756 musgo.webp"
            }]
          },{
            id:"nordico",nombre:"Nórdico",badge:"Lana & Acrílico",desc:"Grueso texturado · Agujas 6–8",colores:[{
              n:"CRUDO",c:"#f2e6d0",img:e+"nordico/m001 crudo.webp"
            },{
              n:"BLANCO",c:"#f8f8f5",img:e+"nordico/m002 blanco.webp"
            },{
              n:"GRIS CLARO",c:"#c0bdb5",img:e+"nordico/m003 gris claro.webp"
            },{
              n:"NEGRO",c:"#1c1c1c",img:e+"nordico/m050 negro.webp"
            },{
              n:"CAMEL",c:"#c09060",img:e+"nordico/m053 camel.webp"
            },{
              n:"CHOCOLATE",c:"#452010",img:e+"nordico/m055 chocolate.webp"
            },{
              n:"NUVEM",c:"#d4cec8",img:e+"nordico/m057 nuvem.webp"
            },{
              n:"ROCA",c:"#8a8078",img:e+"nordico/m059 roca.webp"
            },{
              n:"ROSA CLARO",c:"#f0b8c8",img:e+"nordico/m551 rosa claro.webp"
            },{
              n:"CELESTE BB",c:"#a8d8f8",img:e+"nordico/m601 celeste bebe.webp"
            },{
              n:"JEAN",c:"#4878b0",img:e+"nordico/m605 jean.webp"
            },{
              n:"EUCALIPTUS",c:"#5a8848",img:e+"nordico/m709 eucaliptus.webp"
            }]
          },{
            id:"pampa",nombre:"Pampa",badge:"Lana & Fibras",desc:"Grueso rústico · Agujas 6–8",colores:[{
              n:"CRUDO",c:"#f2e6d0",img:e+"pampa/m001 - crudo.webp"
            },{
              n:"GRIS CLARO",c:"#c0bdb5",img:e+"pampa/m003 - gris claro.webp"
            },{
              n:"GRIS MEDIO",c:"#888480",img:e+"pampa/m004 - gris medio.webp"
            },{
              n:"CAMEL",c:"#c09060",img:e+"pampa/m053 - camel.webp"
            },{
              n:"CHOCOLATE",c:"#452010",img:e+"pampa/m055-chocolate.webp"
            },{
              n:"TOSTADO",c:"#a07840",img:e+"pampa/m062 - tostado.webp"
            },{
              n:"PARDO",c:"#9a7050",img:e+"pampa/pardo-m068.webp"
            },{
              n:"LIEBRE",c:"#9a7a60",img:e+"pampa/liebre-m056.webp"
            },{
              n:"NUVEM",c:"#d4cec8",img:e+"pampa/nuvem-m057.webp"
            },{
              n:"LADRILLO",c:"#b04030",img:e+"pampa/m256 - ladrillo.webp"
            },{
              n:"ROJIZO",c:"#c03020",img:e+"pampa/m308 - rojizo.webp"
            },{
              n:"DAMASCO",c:"#e09870",img:e+"pampa/damascoo-m251.webp"
            },{
              n:"BORDO",c:"#7a1020",img:e+"pampa/bordo-m351.webp"
            },{
              n:"MAQUILLAJE",c:"#e8b090",img:e+"pampa/maquillaje-m212.webp"
            },{
              n:"NUDE",c:"#e8c8a8",img:e+"pampa/m555 - nude .webp"
            },{
              n:"ROSA VIEJO",c:"#c89898",img:e+"pampa/pampa rosa viejo-m552.webp"
            },{
              n:"VELVET",c:"#9050a0",img:e+"pampa/pampa velvet- m455.webp"
            },{
              n:"ACERO",c:"#607080",img:e+"pampa/m613 - acero.webp"
            },{
              n:"DENIM",c:"#4878b0",img:e+"pampa/pampa denim-m611.webp"
            },{
              n:"MARINO",c:"#1a2e60",img:e+"pampa/pampa marino-m606.webp"
            },{
              n:"CELESTE SUCIO",c:"#8ab8d8",img:e+"pampa/celeste sucio m610.webp"
            },{
              n:"MANZANA",c:"#78b820",img:e+"pampa/manzana m705.webp"
            },{
              n:"EUCALIPTUS",c:"#5a8848",img:e+"pampa/m709 - eucalipto.webp"
            },{
              n:"MUSGO",c:"#526840",img:e+"pampa/pampa musgo-m756.webp"
            },{
              n:"HOJA",c:"#4a6028",img:e+"pampa/hoja m756.webp"
            },{
              n:"LANGOSTINO",c:"#e89878",img:e+"pampa/langostino m211.webp"
            }]
          },{
            id:"peluche",nombre:"Peluche",badge:"Fibra Suave",desc:"Efecto peluche · Agujas 5–6",colores:[{
              n:"CRUDO",c:"#f2e6d0",img:e+"peluche/m001 crudo.webp"
            },{
              n:"BLANCO",c:"#f8f8f5",img:e+"peluche/m002 blanco.webp"
            },{
              n:"GRIS CLARO",c:"#c0bdb5",img:e+"peluche/m003 gris claro.webp"
            },{
              n:"NEGRO",c:"#1c1c1c",img:e+"peluche/m050 negro.webp"
            },{
              n:"ARENA",c:"#d4c4a8",img:e+"peluche/m051 arena.webp"
            },{
              n:"CAMEL",c:"#c09060",img:e+"peluche/m053 camel.webp"
            },{
              n:"CHOCOLATE",c:"#452010",img:e+"peluche/m055 chocolate.webp"
            },{
              n:"RAÍZ",c:"#8a6040",img:e+"peluche/m071 raiz.webp"
            },{
              n:"FUEGO",c:"#e84800",img:e+"peluche/m310 fuego.webp"
            },{
              n:"ROSA CLARO",c:"#f0b8c8",img:e+"peluche/m551 rosa claro.webp"
            },{
              n:"NUDE",c:"#e8c8a8",img:e+"peluche/m555 nude.webp"
            },{
              n:"CELESTE BB",c:"#a8d8f8",img:e+"peluche/m601 celeste bebe.webp"
            },{
              n:"FRANCIA",c:"#0040a0",img:e+"peluche/m604 francia.webp"
            },{
              n:"VERDE AGUA",c:"#30b898",img:e+"peluche/m701 verde agua.webp"
            },{
              n:"OLIVA",c:"#6a7030",img:e+"peluche/m755 oliva.webp"
            }]
          },{
            id:"plush",nombre:"Plush",badge:"Micro Peluche",desc:"Ultra suave · Agujas 4–5",colores:[{
              n:"CRUDO",c:"#f2e6d0",img:e+"plush/m001 crudo.webp"
            },{
              n:"GRIS CLARO",c:"#c0bdb5",img:e+"plush/m003 gris claro.webp"
            },{
              n:"GRIS MEDIO",c:"#888480",img:e+"plush/m004 gris medio.webp"
            },{
              n:"NEGRO",c:"#1c1c1c",img:e+"plush/m050 negro.webp"
            },{
              n:"ARENA",c:"#d4c4a8",img:e+"plush/m051 arena.webp"
            },{
              n:"ÁCIDO",c:"#c0e020",img:e+"plush/m104 acido.webp"
            },{
              n:"NARANJA",c:"#f06820",img:e+"plush/m203 naranja.webp"
            },{
              n:"FUEGO",c:"#e84800",img:e+"plush/m310 fuego.webp"
            },{
              n:"VIOLETA",c:"#7b3fa0",img:e+"plush/m401 violeta.webp"
            },{
              n:"BABY LILA",c:"#c8a8e0",img:e+"plush/m451 baby lila.webp"
            },{
              n:"PÚRPURA",c:"#7020a0",img:e+"plush/m453 purpura.webp"
            },{
              n:"FUCSIA",c:"#e0206a",img:e+"plush/m501 fucsia.webp"
            },{
              n:"CORAL",c:"#e87060",img:e+"plush/m554 coral.webp"
            },{
              n:"PIEL",c:"#f0c0a0",img:e+"plush/m556 piel.webp"
            },{
              n:"CELESTE BB",c:"#a8d8f8",img:e+"plush/m601 celeste bb.webp"
            },{
              n:"AERO",c:"#80b8d8",img:e+"plush/m609 aero.webp"
            },{
              n:"DANUBIO",c:"#4090c0",img:e+"plush/m655 danubio.webp"
            },{
              n:"VERDE AGUA",c:"#30b898",img:e+"plush/m701 verde agua.webp"
            },{
              n:"VERDE LORO",c:"#6a8e28",img:e+"plush/m703 verde loro.webp"
            },{
              n:"BOTELLA",c:"#2a5030",img:e+"plush/m704 botella.webp"
            },{
              n:"LIMA",c:"#d0e850",img:e+"plush/m715 lima.webp"
            },{
              n:"MUSGO",c:"#526840",img:e+"plush/m756 musgo.webp"
            }]
          },{
            id:"pura",nombre:"Pura",badge:"Natural & Rústico",desc:"Textura artesanal · Agujas 6–8",colores:[{
              n:"CRUDO",c:"#f2e6d0",img:e+"pura/m001 crudo.webp"
            },{
              n:"CHOCOLATE",c:"#452010",img:e+"pura/m055 chocolate.webp"
            },{
              n:"NUVEM",c:"#d4cec8",img:e+"pura/m057 nuvem.webp"
            },{
              n:"ROCA",c:"#8a8078",img:e+"pura/m059 roca.webp"
            },{
              n:"CHOCOLATADA",c:"#6b4226",img:e+"pura/m067 chocolatada.webp"
            },{
              n:"AFRICANO",c:"#7a6050",img:e+"pura/m070-africano.webp"
            }]
          },{
            id:"rendimax",nombre:"Rendimax",badge:"100% Acrílico",desc:"Grueso rendidor · Agujas 6–7 · 500g",colores:[{
              n:"CRUDO",c:"#f2e6d0",img:e+"rendimax/m001-crudo (1).webp"
            },{
              n:"BLANCO",c:"#f8f8f5",img:e+"rendimax/m002-blanco (2).webp"
            },{
              n:"GRIS CLARO",c:"#c0bdb5",img:e+"rendimax/m003-grisclaro (1).webp"
            },{
              n:"NEGRO",c:"#1c1c1c",img:e+"rendimax/m050-negro (1).webp"
            },{
              n:"ARENA",c:"#d4c4a8",img:e+"rendimax/m051-arena (1).webp"
            },{
              n:"CAMEL",c:"#c09060",img:e+"rendimax/m053-camel (1).webp"
            },{
              n:"CHOCOLATE",c:"#452010",img:e+"rendimax/m055-chocolate (1).webp"
            },{
              n:"PATITO",c:"#f0d050",img:e+"rendimax/m101-patito (1).webp"
            },{
              n:"ORO",c:"#d4a830",img:e+"rendimax/m102-oro (1).webp"
            },{
              n:"ROJO",c:"#cc1c08",img:e+"rendimax/m301-rojo (1).webp"
            },{
              n:"ROJO OSCURO",c:"#8a1500",img:e+"rendimax/m302-rojooscuro (1).webp"
            },{
              n:"FUEGO",c:"#e84800",img:e+"rendimax/m310-fuego (1).webp"
            },{
              n:"BORDO",c:"#7a1020",img:e+"rendimax/m351-bordo (2).webp"
            },{
              n:"VIOLETA",c:"#7b3fa0",img:e+"rendimax/m401-violeta (1).webp"
            },{
              n:"LILA ROSA",c:"#d0a8c8",img:e+"rendimax/m454-lilarosa (1).webp"
            },{
              n:"FUCSIA",c:"#e0206a",img:e+"rendimax/m501-fucsia (1).webp"
            },{
              n:"ROSA CLARO",c:"#f0b8c8",img:e+"rendimax/m551-rosaclaro (1).webp"
            },{
              n:"CORAL",c:"#e87060",img:e+"rendimax/m554-coral (1).webp"
            },{
              n:"CELESTE BB",c:"#a8d8f8",img:e+"rendimax/m601-celestebb (1).webp"
            },{
              n:"STEEL",c:"#5070a0",img:e+"rendimax/m603-steel (1).webp"
            },{
              n:"FRANCIA",c:"#0040a0",img:e+"rendimax/m604-francia (1).webp"
            },{
              n:"JEAN",c:"#4878b0",img:e+"rendimax/m606-jean (1).webp"
            },{
              n:"MARINO",c:"#1a2e60",img:e+"rendimax/m606-marino (1).webp"
            },{
              n:"TURQUESA",c:"#20b0b0",img:e+"rendimax/m651-turquesa (1).webp"
            },{
              n:"DANUBIO",c:"#4090c0",img:e+"rendimax/m655-danubio (1).webp"
            },{
              n:"VERDE AGUA",c:"#30b898",img:e+"rendimax/m701-verdeagua (1).webp"
            },{
              n:"VERDE LORO",c:"#6a8e28",img:e+"rendimax/m703-loro (1).webp"
            },{
              n:"BOTELLA",c:"#2a5030",img:e+"rendimax/m704-botella (1).webp"
            },{
              n:"EUCALIPTUS",c:"#5a8848",img:e+"rendimax/m709-eucaliptus (1).webp"
            },{
              n:"FORESTA",c:"#1e4028",img:e+"rendimax/m751-foresta (2).webp"
            },{
              n:"MUSGO",c:"#526840",img:e+"rendimax/m756-musgo (1).webp"
            }]
          },{
            id:"sheep",nombre:"Sheep",badge:"Matizado Fantasy",desc:"Efecto bouclé · Agujas 4–5",colores:[{
              n:"GRIS CLARO",c:"#c0bdb5",img:e+"sheep/3003 gris claro.webp"
            },{
              n:"NEGRO",c:"#1c1c1c",img:e+"sheep/3050 negro.webp"
            },{
              n:"CHOCOLATE",c:"#452010",img:e+"sheep/3051 chocolate.webp"
            },{
              n:"MOSTAZA",c:"#c8a020",img:e+"sheep/3103 mostaza.webp"
            },{
              n:"ROJO",c:"#cc1c08",img:e+"sheep/3303 rojo.webp"
            },{
              n:"CORAL",c:"#e87060",img:e+"sheep/3502 coral.webp"
            },{
              n:"RAINBOW",c:"#e0a0c0",img:e+"sheep/3505 rainbow.webp"
            },{
              n:"ROSA VIEJO",c:"#c89898",img:e+"sheep/3551 rosa viejo.webp"
            },{
              n:"MARINO",c:"#1a2e60",img:e+"sheep/3606 marino.webp"
            },{
              n:"MUSGO",c:"#526840",img:e+"sheep/3707 musgo.webp"
            },{
              n:"VERDE",c:"#4a7a4a",img:e+"sheep/3708 verde.webp"
            },{
              n:"CAMEL AQUA AZUL",c:"#80b8b0",img:e+"sheep/3710 camel aqua azul.webp"
            },{
              n:"PATITO CAMEL ROSA",c:"#e8d0a0",img:e+"sheep/3712 patito camel rosa.webp"
            }]
          },{
            id:"viscolan",nombre:"Viscolan",badge:"Viscosa & Lana",desc:"Madeja · Semi fino brillante · Agujas 4–5",colores:[{
              n:"CRUDO",c:"#f2e6d0",img:e+"viscolan/m001 crudo.webp"
            },{
              n:"GRIS CLARO",c:"#c0bdb5",img:e+"viscolan/m003 gris claro.webp"
            },{
              n:"GRIS MEDIO",c:"#888480",img:e+"viscolan/m004 gris medio.webp"
            },{
              n:"NEGRO",c:"#1c1c1c",img:e+"viscolan/m050 negro.webp"
            },{
              n:"CAMEL",c:"#c09060",img:e+"viscolan/m053 camel.webp"
            },{
              n:"CHOCOLATE",c:"#452010",img:e+"viscolan/m055 chocolate.webp"
            },{
              n:"NUVEM",c:"#d4cec8",img:e+"viscolan/m057 nuvem.webp"
            },{
              n:"NARANJA",c:"#f06820",img:e+"viscolan/m203 naranja.webp"
            },{
              n:"ÓXIDO",c:"#c05030",img:e+"viscolan/m255 oxido.webp"
            },{
              n:"ROJO",c:"#cc1c08",img:e+"viscolan/m301 rojo.webp"
            },{
              n:"FRAMBUESA",c:"#c02060",img:e+"viscolan/m306 frambuesa.webp"
            },{
              n:"VIOLETA",c:"#7b3fa0",img:e+"viscolan/m401 violeta.webp"
            },{
              n:"LILA",c:"#b890d0",img:e+"viscolan/m451 lila.webp"
            },{
              n:"ROSA VIEJO",c:"#c89898",img:e+"viscolan/m552 rosa viejo.webp"
            },{
              n:"CORAL",c:"#e87060",img:e+"viscolan/m554 coral.webp"
            },{
              n:"FRANCIA",c:"#0040a0",img:e+"viscolan/m604 francia.webp"
            },{
              n:"MARINO",c:"#1a2e60",img:e+"viscolan/m606 marino.webp"
            },{
              n:"PASTEL",c:"#b0c8e8",img:e+"viscolan/m608 pastel.webp"
            },{
              n:"VERDE AGUA",c:"#30b898",img:e+"viscolan/m701 verde agua.webp"
            },{
              n:"HOJA",c:"#4a6028",img:e+"viscolan/m759 hoja.webp"
            }]
          },{
            id:"c27",nombre:"Classic 2/7",badge:"100% Acrílico",desc:"Fino · Agujas 2–3 · 100g",colores:[{
              n:"CRUDO",c:"#f2e6d0",img:e+"2-7/m001-crudo-27 (1).webp"
            },{
              n:"BLANCO",c:"#f8f8f5",img:e+"2-7/m002-blanco-27 (1).webp"
            },{
              n:"GRIS CLARO",c:"#c0bdb5",img:e+"2-7/m003 - gris claro 27 (1).webp"
            },{
              n:"GRIS MEDIO",c:"#888480",img:e+"2-7/m004 - gris medio 27 (1).webp"
            },{
              n:"GRIS OSCURO",c:"#505050",img:e+"2-7/m005 - grisoscuro27.webp"
            },{
              n:"NEGRO",c:"#1c1c1c",img:e+"2-7/m050 - negro (5).webp"
            },{
              n:"ARENA",c:"#d4c4a8",img:e+"2-7/m051-arena-27 (1).webp"
            },{
              n:"MARRÓN CLARO",c:"#a87a5a",img:e+"2-7/m052- marron claro 27.webp"
            },{
              n:"CAMEL",c:"#c09060",img:e+"2-7/m053-camel-27 (3).webp"
            },{
              n:"MARRÓN OSCURO",c:"#6b4030",img:e+"2-7/m054 - marron oscuro 27.webp"
            },{
              n:"CHOCOLATE",c:"#452010",img:e+"2-7/m055 - chocolate (4).webp"
            },{
              n:"LIEBRE",c:"#9a7a60",img:e+"2-7/m056-liebre-27 (1).webp"
            },{
              n:"ROCA",c:"#8a8078",img:e+"2-7/rocam059-1 (1).webp"
            },{
              n:"PATITO",c:"#f0d050",img:e+"2-7/m101- patito -27.webp"
            },{
              n:"ORO",c:"#d4a830",img:e+"2-7/m102 - oro (5).webp"
            },{
              n:"GIRASOL",c:"#f0c020",img:e+"2-7/m105-girasol (1).webp"
            },{
              n:"OCRE",c:"#c8a030",img:e+"2-7/m151-ocre.webp"
            },{
              n:"MAÍZ",c:"#e8c040",img:e+"2-7/m151 maiz (1).webp"
            },{
              n:"VERDE AGUA",c:"#30b898",img:e+"2-7/m201 - verdeagua.webp"
            },{
              n:"CORAL FLUO",c:"#ff6050",img:e+"2-7/m202 - coral fluo.webp"
            },{
              n:"NARANJA",c:"#f06820",img:e+"2-7/m203 - naranja (1).webp"
            },{
              n:"SALMÓN",c:"#f0a080",img:e+"2-7/m206 - salmon (2).webp"
            },{
              n:"DAMASCO",c:"#e09870",img:e+"2-7/m251 damasco.webp"
            },{
              n:"ROJO",c:"#cc1c08",img:e+"2-7/m301 - rojo (2).webp"
            },{
              n:"ROJO OSCURO",c:"#8a1500",img:e+"2-7/m302 - rojo oscuro.webp"
            },{
              n:"FUEGO",c:"#e84800",img:e+"2-7/m310 fuego.webp"
            },{
              n:"BORDO",c:"#7a1020",img:e+"2-7/m351 - bordo (3).webp"
            },{
              n:"VIOLETA",c:"#7b3fa0",img:e+"2-7/m401 - violeta (1).webp"
            },{
              n:"LILA ROSA",c:"#d0a8c8",img:e+"2-7/m454 - lila rosa (2).webp"
            },{
              n:"VELVET",c:"#9050a0",img:e+"2-7/m455 - velvet (1).webp"
            },{
              n:"BARNEY",c:"#8030a0",img:e+"2-7/m456 barney (5).webp"
            },{
              n:"FUCSIA",c:"#e0206a",img:e+"2-7/m501 -  fucsia.webp"
            },{
              n:"ROSA BB",c:"#f0c0d0",img:e+"2-7/m551 - rosabb (1).webp"
            },{
              n:"ROSA VIEJO",c:"#c89898",img:e+"2-7/m552 - rosa viejo (1).webp"
            },{
              n:"NUDE",c:"#e8c8a8",img:e+"2-7/nude m555.webp"
            },{
              n:"ROSA CHICLE",c:"#f080a0",img:e+"2-7/rosa chicle m553.webp"
            },{
              n:"ROSA CORAL",c:"#f09090",img:e+"2-7/m554 - rosacoral (4).webp"
            },{
              n:"CELESTE BB",c:"#a8d8f8",img:e+"2-7/m601- celestebb -.webp"
            },{
              n:"STEEL",c:"#5070a0",img:e+"2-7/m603 - steel.webp"
            },{
              n:"AZUL FRANCIA",c:"#0040a0",img:e+"2-7/m604-  azul francia.webp"
            },{
              n:"AZUL JEAN",c:"#4878b0",img:e+"2-7/m605 - azul jean (3).webp"
            },{
              n:"AZUL MARINO",c:"#1a2e60",img:e+"2-7/m606 - azul marino (4).webp"
            },{
              n:"TURQUESA",c:"#20b0b0",img:e+"2-7/m651- turquesa - edit (4).webp"
            },{
              n:"DANUBIO",c:"#4090c0",img:e+"2-7/m655 - danubio (1).webp"
            },{
              n:"VERDE CLARO",c:"#7ab840",img:e+"2-7/m702 - verdeclaro - 47 (4).webp"
            },{
              n:"VERDE LORO",c:"#6a8e28",img:e+"2-7/m703 - verdeloro - 47 (3).webp"
            },{
              n:"VERDE BOTELLA",c:"#2a5030",img:e+"2-7/m704 - verdebotella - 47 (3).webp"
            },{
              n:"MANZANA",c:"#78b820",img:e+"2-7/m705 - manzana (1).webp"
            },{
              n:"VERDE KHAKI",c:"#7a8050",img:e+"2-7/m752 - verde khaki (1).webp"
            },{
              n:"MUSGO",c:"#526840",img:e+"2-7/m756 - musgo (6).webp"
            }]
          },{
            id:"c316",nombre:"Classic 3/16",badge:"100% Acrílico",desc:"Súper fino · Agujas 3–4 · 100g",colores:[{
              n:"CRUDO",c:"#f2e6d0",img:e+"3-16/316crudo-1a (1).webp"
            },{
              n:"GRIS CLARO",c:"#c0bdb5",img:e+"3-16/316grisclaro-1 (2).webp"
            },{
              n:"NEGRO",c:"#1c1c1c",img:e+"3-16/316negro1 (1).webp"
            },{
              n:"ARENA",c:"#d4c4a8",img:e+"3-16/316arena-1 (1).webp"
            },{
              n:"CAMEL",c:"#c09060",img:e+"3-16/316camel-1 (1).webp"
            },{
              n:"CHOCOLATE",c:"#452010",img:e+"3-16/m055 chocolate (2).webp"
            },{
              n:"NUDE",c:"#e8c8a8",img:e+"3-16/316 nude.webp"
            },{
              n:"MOSTAZA",c:"#c8a020",img:e+"3-16/316mostaza1 (1).webp"
            },{
              n:"GIRASOL",c:"#f0c020",img:e+"3-16/3-16 girasol m105.webp"
            },{
              n:"PATITO",c:"#f0d050",img:e+"3-16/316patito1 (1).webp"
            },{
              n:"VERDE AGUA",c:"#30b898",img:e+"3-16/3_16verdeagua1.webp"
            },{
              n:"NARANJA",c:"#f06820",img:e+"3-16/316 naranja m203.webp"
            },{
              n:"SALMÓN",c:"#f0a080",img:e+"3-16/316salmon-1 (3).webp"
            },{
              n:"FUEGO",c:"#e84800",img:e+"3-16/m310 fuego (2).webp"
            },{
              n:"ROJO",c:"#cc1c08",img:e+"3-16/316rojo-1 (2).webp"
            },{
              n:"BORDO",c:"#7a1020",img:e+"3-16/316 bordo m351.webp"
            },{
              n:"ROSA CHICLE",c:"#f080a0",img:e+"3-16/m553 rosa chicle (2).webp"
            },{
              n:"ROSA CLARO",c:"#f0b8c8",img:e+"3-16/316rosaclaro1 (2).webp"
            },{
              n:"VELVET",c:"#9050a0",img:e+"3-16/316 velvet m455.webp"
            },{
              n:"CELESTE BB",c:"#a8d8f8",img:e+"3-16/316celestebb-1 (2).webp"
            },{
              n:"BANDERA",c:"#2060c0",img:e+"3-16/316 bandera m602.webp"
            },{
              n:"AZUL FRANCIA",c:"#0040a0",img:e+"3-16/316frnacia-1 (1).webp"
            },{
              n:"TURQUESA",c:"#20b0b0",img:e+"3-16/m651 turquesa (2).webp"
            },{
              n:"DANUBIO",c:"#4090c0",img:e+"3-16/m655 danubio (2).webp"
            },{
              n:"FORESTA",c:"#1e4028",img:e+"3-16/316 foresta m751.webp"
            },{
              n:"VERDE CLARO",c:"#7ab840",img:e+"3-16/m702 verde claro (2).webp"
            },{
              n:"MANZANA",c:"#78b820",img:e+"3-16/316 manzana m705.webp"
            },{
              n:"EUCALIPTUS",c:"#5a8848",img:e+"3-16/m709 eucaliptus (2).webp"
            }]
          },{
            id:"c47",nombre:"Classic 4/7",badge:"100% Acrílico",desc:"Semi grueso · Agujas 4–5 · 100g",colores:[{
              n:"CRUDO",c:"#f2e6d0",img:e+"4-7/m001-crudo-47 (2).webp"
            },{
              n:"BLANCO",c:"#f8f8f5",img:e+"4-7/m002-blanco-47 (2).webp"
            },{
              n:"GRIS CLARO",c:"#c0bdb5",img:e+"4-7/m003 - gris claro 47 (2).webp"
            },{
              n:"GRIS MEDIO",c:"#888480",img:e+"4-7/m004 - gris medio 47 (2).webp"
            },{
              n:"GRIS OSCURO",c:"#505050",img:e+"4-7/m005 - grisoscuro.webp"
            },{
              n:"NEGRO",c:"#1c1c1c",img:e+"4-7/m050 - negro (4).webp"
            },{
              n:"ARENA",c:"#d4c4a8",img:e+"4-7/m051-arena-47 (1).webp"
            },{
              n:"MARRÓN CLARO",c:"#a87a5a",img:e+"4-7/m052- marron claro 47 (1).webp"
            },{
              n:"CAMEL",c:"#c09060",img:e+"4-7/m053-camel-47 (2).webp"
            },{
              n:"MARRÓN OSCURO",c:"#6b4030",img:e+"4-7/m054 - marron oscuro 47.webp"
            },{
              n:"CHOCOLATE",c:"#452010",img:e+"4-7/m055 - chocolate (3).webp"
            },{
              n:"LIEBRE",c:"#9a7a60",img:e+"4-7/m056-liebre-47 (2).webp"
            },{
              n:"NUDE",c:"#e8c8a8",img:e+"4-7/m555 - nude.webp"
            },{
              n:"PATITO",c:"#f0d050",img:e+"4-7/m101- patito -47 (2).webp"
            },{
              n:"ORO",c:"#d4a830",img:e+"4-7/m102 - oro (4).webp"
            },{
              n:"GIRASOL",c:"#f0c020",img:e+"4-7/m105-girasol-47.webp"
            },{
              n:"OCRE",c:"#c8a030",img:e+"4-7/m151-ocre -47.webp"
            },{
              n:"VERDE AGUA",c:"#30b898",img:e+"4-7/m201 - verdeagua - 47 (2).webp"
            },{
              n:"CORAL FLUO",c:"#ff6050",img:e+"4-7/m202 - coral fluo - 47 (3).webp"
            },{
              n:"NARANJA",c:"#f06820",img:e+"4-7/m203 - naranja 47 (1).webp"
            },{
              n:"SALMÓN",c:"#f0a080",img:e+"4-7/m206 - salmon 47 (2).webp"
            },{
              n:"ÓXIDO",c:"#c05030",img:e+"4-7/m251 - oxido.webp"
            },{
              n:"ROJO",c:"#cc1c08",img:e+"4-7/m301 - rojo - 47 (1).webp"
            },{
              n:"ROJO OSCURO",c:"#8a1500",img:e+"4-7/m302 - rojo oscuro 47 (1).webp"
            },{
              n:"BORDO",c:"#7a1020",img:e+"4-7/m351 - bordo (1).webp"
            },{
              n:"VELVET",c:"#9050a0",img:e+"4-7/m455 - velvet - 47 (2).webp"
            },{
              n:"BARNEY",c:"#8030a0",img:e+"4-7/m456 barney (4).webp"
            },{
              n:"FUCSIA",c:"#e0206a",img:e+"4-7/m501 -  fucsia - 47 (1).webp"
            },{
              n:"ROSA BB",c:"#f0c0d0",img:e+"4-7/m551 - rosabb - 47 (2).webp"
            },{
              n:"ROSA VIEJO",c:"#c89898",img:e+"4-7/m552 - rosa viejo 47 (2).webp"
            },{
              n:"ROSA CHICLE",c:"#f080a0",img:e+"4-7/m553 - rosa chicle (1).webp"
            },{
              n:"ROSA CORAL",c:"#f09090",img:e+"4-7/m554 - rosacoral (3).webp"
            },{
              n:"CELESTE BB",c:"#a8d8f8",img:e+"4-7/m601- celestebb - 47 (1).webp"
            },{
              n:"STEEL",c:"#5070a0",img:e+"4-7/m603 - steel 47 (1).webp"
            },{
              n:"AZUL FRANCIA",c:"#0040a0",img:e+"4-7/m604-  azul francia - 47 (1).webp"
            },{
              n:"AZUL JEAN",c:"#4878b0",img:e+"4-7/m605 - azul jean (2).webp"
            },{
              n:"BANDERA",c:"#2060c0",img:e+"4-7/m602 - bandera.webp"
            },{
              n:"AZUL MARINO",c:"#1a2e60",img:e+"4-7/m606 - azul marino (3).webp"
            },{
              n:"TURQUESA",c:"#20b0b0",img:e+"4-7/m651- turquesa - edit (3).webp"
            },{
              n:"DANUBIO",c:"#4090c0",img:e+"4-7/m655 - danubio.webp"
            },{
              n:"MANZANA",c:"#78b820",img:e+"4-7/m705 - manzana.webp"
            },{
              n:"EUCALIPTUS",c:"#5a8848",img:e+"4-7/m709 - eucaliptus (2).webp"
            },{
              n:"VERDE KHAKI",c:"#7a8050",img:e+"4-7/m752 - verde khaki.webp"
            },{
              n:"MUSGO",c:"#526840",img:e+"4-7/m756 - musgo (5).webp"
            }]
          },{
            id:"matizadas",nombre:"4/7 Matizadas",badge:"Matizado Multicolor",desc:"Madejas matizadas · Agujas 4–5",colores:[{
              n:"3050",c:"#1c1c1c",img:e+"4-7 madejas matizadas/3050.webp"
            },{
              n:"3056",c:"#c09060",img:e+"4-7 madejas matizadas/3056.webp"
            },{
              n:"3206",c:"#f0a080",img:e+"4-7 madejas matizadas/3206.webp"
            },{
              n:"3252",c:"#e09870",img:e+"4-7 madejas matizadas/3252.webp"
            },{
              n:"3301",c:"#cc1c08",img:e+"4-7 madejas matizadas/3301.webp"
            },{
              n:"3303",c:"#8a1500",img:e+"4-7 madejas matizadas/3303.webp"
            },{
              n:"3307",c:"#e84800",img:e+"4-7 madejas matizadas/3307.webp"
            },{
              n:"3502",c:"#e87060",img:e+"4-7 madejas matizadas/3502.webp"
            },{
              n:"3503",c:"#f080a0",img:e+"4-7 madejas matizadas/3503.webp"
            },{
              n:"3601",c:"#a8d8f8",img:e+"4-7 madejas matizadas/3601.webp"
            },{
              n:"3652",c:"#4090c0",img:e+"4-7 madejas matizadas/3652.webp"
            },{
              n:"3707",c:"#526840",img:e+"4-7 madejas matizadas/3707.webp"
            },{
              n:"3715",c:"#a8c870",img:e+"4-7 madejas matizadas/3715.webp"
            }]
          },{
            id:"cottonlux",nombre:"CottonLux",badge:"100% Algodón Mercerizado",desc:"Fino brillante · Agujas 3–4",colores:[{
              n:"CRUDO",c:"#f2e6d0",img:e+"cottonlux/m001 crudo.webp"
            },{
              n:"BLANCO",c:"#f8f8f5",img:e+"cottonlux/m002 blanco.webp"
            },{
              n:"NEGRO",c:"#1c1c1c",img:e+"cottonlux/m050 negro.webp"
            }]
          }],c="images/catalogo hilados/",n={
            oxford:c+"carta oxford.webp","aries-ovillos":c+"carta aries ovillos.webp","aries-madejas":c+"carta aries.webp",cake:c+"carta cake 2024.webp",camila:c+"carta camila.webp",amanda:c+"carta amanda.webp",amelie:c+"carta amelie.webp",austral:c+"carta austral.webp",brill:c+"carta brill.webp",bruma:c+"carta bruma.webp","cotton-8-6":c+"carta 8-6_8-3.webp","cotton-sense":c+"carta cotton.webp",flower:c+"flower-madeja2021 (2) (1).webp",fresh:c+"carta fresh.webp",glam:c+"glamcarta.webp",kiko:c+"carta kiko.webp",mandala:c+"carta mandala 2026.webp",matice:c+"carta matice.webp",milano:c+"carta milano.webp",niky:c+"carta niky 2026.webp",nordico:c+"carta nordico.webp",pampa:c+"carta pampa 2026.webp",peluche:c+"carta peluche.webp",plush:c+"carta plush.webp",sheep:c+"carta sheep.webp",viscolan:c+"carta viscolan.webp",c47:c+"carta classic 4_7.webp",matizadas:c+"4-7madejas carta.webp",cottonlux:c+"cotton lux carta.webp"
          },a=document.getElementById("colecTabs"),A=document.getElementById("colecImg"),o=document.getElementById("colecBadge"),O=document.getElementById("colecHeading"),m=document.getElementById("colecDescEl"),t=document.getElementById("colecColorName"),r=document.getElementById("colecSwatches"),b=document.getElementById("colecCount"),d=0,E=0,s=null,g=document.getElementById("tabsArrowPrev"),l=document.getElementById("tabsArrowNext");
          g&&g.addEventListener("click",function(){
            a.scrollBy({
              left:-220,behavior:"smooth"
            })
          });
          l&&l.addEventListener("click",function(){
            a.scrollBy({
              left:220,behavior:"smooth"
            })
          });
          function p(e,i){
            O.textContent=e.nombre,m.textContent=e.desc,o.textContent=e.badge,b.innerHTML="<strong>"+e.colores.length+"</strong> colores disponibles",E=i,r.innerHTML="",e.colores.forEach(function(e,c){
              const n=document.createElement("button");
              n.className="colec__swatch"+(c===i?" is-active":""),n.style.background=e.c,n.title=e.n,n.setAttribute("aria-label",e.n),n.addEventListener("click",function(){
                c!==E&&(E=c,r.querySelectorAll(".colec__swatch").forEach(function(e,i){
                  e.classList.toggle("is-active",i===c)
                }),L(e))
              }),r.appendChild(n)
            });
            const c=e.colores[i];
            A.src=c.img,A.alt=e.nombre+" — "+c.n,t.textContent=c.n,A.classList.remove("is-fading");
            var a=document.getElementById("colecCartaWrap"),d=document.getElementById("colecCartaBtn"),s=n[e.id]||null;
            a&&(a.style.display=s?"":"none",s&&d&&(d.onclick=function(){
              window.openCarta(s,e.nombre)
            }))
          }
          function L(e){
            clearTimeout(s),A.classList.add("is-fading"),s=setTimeout(function(){
              A.src=e.img,A.alt="Hilados Mía — "+e.n,t.textContent=e.n,A.onload=function(){
                A.classList.remove("is-fading")
              },A.complete&&A.classList.remove("is-fading")
            },220)
          }
          i.forEach(function(e,i){
            var c=document.createElement("button");
            c.className="colec__tab"+(0===i?" is-active":""),c.textContent=e.nombre,c.setAttribute("role","tab"),c.setAttribute("aria-selected",0===i?"true":"false"),c.addEventListener("click",function(){
              if(i!==d){
                d=i,a.querySelectorAll(".colec__tab").forEach(function(e,c){
                  e.classList.toggle("is-active",c===i),e.setAttribute("aria-selected",c===i?"true":"false")
                });
                var n=c.offsetLeft,A=c.offsetWidth,o=a.offsetWidth;
                a.scrollTo({
                  left:n-(o-A)/2,behavior:"smooth"
                }),p(e,i%e.colores.length)
              }

            }),a.appendChild(c)
          }),p(i[0],0)
        }
        ()
      },200)
    },600)
  }),c("[data-magnetic]").forEach(e=>{
    e.addEventListener("mousemove",i=>{
      const c=e.getBoundingClientRect(),n=i.clientX-c.left-c.width/2,a=i.clientY-c.top-c.height/2;
      e.style.transform=`translate(${.15*n}px,${.15*a}px)`
    }),e.addEventListener("mouseleave",()=>{
      e.style.transform=""
    })
  });
  let t=0;
  const r=i("#header");
  window.addEventListener("scroll",function(){
    O=window.scrollY,r.classList.toggle("is-scrolled",O>60),O>300?r.classList.toggle("is-hidden",O>t&&O-t>5):r.classList.remove("is-hidden"),t=O,c("section[id]").forEach(e=>{
      const i=e.offsetTop,n=e.offsetHeight,a=e.id;
      O+200>=i&&O+200<i+n&&c(".nav__link").forEach(e=>e.classList.toggle("is-active",e.dataset.section===a))
    }),m||(requestAnimationFrame(()=>{
      !function(){
        if(window.innerWidth<768)return;
        c(".parallax-layer").forEach(e=>{
          const i=parseFloat(e.dataset.speed)||.1,c=e.getBoundingClientRect(),n=(c.top+c.height/2-window.innerHeight/2)*i;
          e.style.transform=`translateY(${n}px)`
        })
      }
      (),E(),m=!1
    }),m=!0)
  },{
    passive:!0
  });
  const b=i("#navToggle"),d=i("#mobileMenu");
  function E(){
    c(".reveal-up,.reveal-left,.reveal-right,.reveal-fade").forEach(e=>{
      e.getBoundingClientRect().top<.88*window.innerHeight&&e.classList.add("is-visible")
    })
  }
  b.addEventListener("click",()=>{
    const e=d.classList.contains("is-open");
    b.classList.toggle("is-active"),d.classList.toggle("is-open"),d.setAttribute("aria-hidden",e),b.setAttribute("aria-expanded",!e),document.body.classList.toggle("no-scroll")
  }),c(".mobile-menu__link").forEach(e=>{
    e.addEventListener("click",()=>{
      b.classList.remove("is-active"),d.classList.remove("is-open"),d.setAttribute("aria-hidden","true"),document.body.classList.remove("no-scroll")
    })
  }),c('a[href^="#"]').forEach(e=>{
    e.addEventListener("click",c=>{
      const n=i(e.getAttribute("href"));
      n&&(c.preventDefault(),window.scrollTo({
        top:n.offsetTop-(parseInt(getComputedStyle(document.documentElement).getPropertyValue("--header-h"))||76),behavior:"smooth"
      }))
    })
  }),window.addEventListener("resize",E,{
    passive:!0
  });
  const s=i("#whatsappBtn"),g=i("#whatsappMenu"),l=i("#whatsapp");
  s.addEventListener("click",()=>{
    const e=l.classList.contains("is-open");
    l.classList.toggle("is-open"),g.hidden=e
  }),document.addEventListener("click",e=>{
    l.contains(e.target)||(l.classList.remove("is-open"),g.hidden=!0)
  });
  const p={
    comercio:e=>e.trim().length>=2?"":"Ingresá el nombre del comercio.",cuit:e=>{
      const i=e.replace(/\D/g,"");
      return 11!==i.length?"El CUIT debe tener 11 dígitos.":["20","23","24","25","26","27","30","33","34"].includes(i.substring(0,2))?"":"Prefijo inválido."
    },provincia:e=>e?"":"Seleccioná una provincia.",ciudad:e=>e.trim().length>=2?"":"Ingresá la ciudad.",instagram:e=>e.trim().length>=2?"":"Ingresá Instagram.",volumen:e=>e?"":"Seleccioná el volumen."
  },R=i("#cuit");
  R&&R.addEventListener("input",e=>{
    let i=e.target.value.replace(/\D/g,"").slice(0,11);
    i.length>2&&i.length<=10?i=i.slice(0,2)+"-"+i.slice(2):i.length>10&&(i=i.slice(0,2)+"-"+i.slice(2,10)+"-"+i.slice(10)),e.target.value=i
  });
  const M=i("#noWeb"),S=i("#web");
  function C(e){
    const c=i(`#${e}`);
    if(!c||!p[e])return!0;
    const n=p[e](c.value),a=i(`#${e}Error`);
    return n?(c.classList.remove("is-valid"),c.classList.add("is-invalid"),a&&(a.textContent=n),!1):(c.classList.remove("is-invalid"),c.classList.add("is-valid"),a&&(a.textContent=""),!0)
  }
  function w(){
    const e=i("#submitMayorista");
    e&&(e.disabled=!Object.keys(p).every(e=>{
      const c=i(`#${e}`);
      return c&&c.value.trim()&&!p[e](c.value)
    }))
  }
  M&&S&&M.addEventListener("change",()=>{
    S.disabled=M.checked,M.checked&&(S.value="",S.classList.remove("is-invalid"))
  }),Object.keys(p).forEach(e=>{
    const c=i(`#${e}`);
    c&&(c.addEventListener("blur",()=>C(e)),c.addEventListener("input",()=>{
      c.classList.contains("is-invalid")&&C(e),w()
    }),c.addEventListener("change",()=>{
      C(e),w()
    }))
  });
  let I=0;
  const N=i("#mayoristasForm");
  N&&N.addEventListener("submit",e=>{
    e.preventDefault();
    const c=Date.now();
    if(c-I<6e4)return void alert("Por favor esperá un momento antes de volver a enviar.");
    let n=!0;
    if(Object.keys(p).forEach(e=>{
      C(e)||(n=!1)
    }),!n)return;
    I=c;
    const a=i("#submitMayorista");
    if(a){
      a.disabled=!0;
      const e=a.querySelector(".btn__text");
      e&&(e.textContent="Enviando...")
    }
    fetch("https://api.web3forms.com/submit",{
      method:"POST",body:new FormData(N)
    }).then(()=>{
      N.style.display="none",i("#formSuccess").hidden=!1
    }).catch(()=>{
      N.style.display="none",i("#formSuccess").hidden=!1
    })
  });
  const u=i("#contactForm");
  let T=null,D=0;
  function U(i){
    A=i,c(".dist-card").forEach(e=>{
      const c=parseInt(e.dataset.id)===i;
      e.classList.toggle("is-active",c),c&&e.scrollIntoView({
        behavior:"smooth",block:"nearest"
      })
    });
    const o=e.find(e=>e.id===i);
    o&&n&&(n.flyTo([o.lat,o.lng],12,{
      duration:.8
    }),a.forEach(e=>{
      e._dId===i&&e.openPopup()
    }))
  }
  function f(e){
    const c=i("#distribuidoresList");
    c&&(c.innerHTML="",e.length?e.forEach(e=>{
      const i=null!=e._distance?`<span class="dist-card__dist">${Math.round(e._distance)} km</span>`:"",n=document.createElement("div");
      n.className="dist-card",n.dataset.id=e.id;
      const a=`https://www.google.com/maps/dir/?api=1&destination=${e.lat},${e.lng}`,A=e.mayorista?'<span class="dist-card__badge dist-card__badge--mayorista">Mayorista</span>':'<span class="dist-card__badge">Distribuidor</span>',o=e.dir?`<div class="dist-card__dir"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>${e.dir}</div>`:"",O=e.telefono?`<a class="dist-card__link dist-card__link--wa" href="https://wa.me/${e.telefono}?text=Hola!" target="_blank" rel="noopener"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"/></svg>WhatsApp</a>`:"";
      var W=e.web?`<a class="dist-card__link" href="${e.web}" target="_blank" rel="noopener"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>Web</a>`:"";
      n.innerHTML=`<div class="dist-card__header"><span class="dist-card__name">${e.nombre}</span>${A}</div><div class="dist-card__loc">${e.ciudad}, ${e.provincia}</div>${o}<div class="dist-card__actions">${O}${W}<a class="dist-card__link dist-card__link--maps" href="${a}" target="_blank" rel="noopener"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>Cómo llegar</a>${i}</div>`,n.addEventListener("click",i=>{
        i.target.closest("a")||U(e.id)
      }),c.appendChild(n)
    }):c.innerHTML='<div style="padding:2rem;text-align:center;color:var(--gray-400)"><p>No se encontraron distribuidores.</p></div>')
  }
  u&&u.addEventListener("submit",e=>{
    e.preventDefault();
    const i=Date.now();
    if(i-D<6e4)return void alert("Por favor esperá un momento antes de volver a enviar.");
    D=i;
    const c=u.querySelector('button[type="submit"] .btn__text'),n=u.querySelector('button[type="submit"]');
    c&&(c.textContent="Enviando..."),n&&(n.disabled=!0),fetch("https://api.web3forms.com/submit",{
      method:"POST",body:new FormData(u)
    }).then(()=>{
      c&&(c.textContent="¡Mensaje enviado!"),n&&(n.style.background="#2d8a4e"),clearTimeout(T),T=setTimeout(()=>{
        u.reset(),c&&(c.textContent="Enviar mensaje"),n&&(n.disabled=!1,n.style.background="")
      },3e3)
    }).catch(()=>{
      c&&(c.textContent="¡Mensaje enviado!"),n&&(n.style.background="#2d8a4e"),clearTimeout(T),T=setTimeout(()=>{
        u.reset(),c&&(c.textContent="Enviar mensaje"),n&&(n.disabled=!1,n.style.background="")
      },3e3)
    })
  });
  const v=i("#filterProvincia"),B=i("#filterCiudad"),h=i("#geolocateBtn");
  function V(){
    let i=[...e];
    v&&v.value&&(i=i.filter(e=>e.provincia===v.value)),B&&B.value&&(i=i.filter(e=>e.ciudad===B.value)),o&&(i=i.map(e=>({
      ...e,_distance:G(o.lat,o.lng,e.lat,e.lng)
    })).sort((e,i)=>e._distance-i._distance)),f(i),n&&i.length&&n.fitBounds(L.latLngBounds(i.map(e=>[e.lat,e.lng])),{
      padding:[40,40],maxZoom:10
    }),a.forEach(e=>{
      const c=i.some(i=>i.id===e._dId);
      c&&!n.hasLayer(e)&&e.addTo(n),!c&&n.hasLayer(e)&&n.removeLayer(e)
    })
  }
  function G(e,i,c,n){
    const a=(c-e)*Math.PI/180,A=(n-i)*Math.PI/180,o=Math.sin(a/2)**2+Math.cos(e*Math.PI/180)*Math.cos(c*Math.PI/180)*Math.sin(A/2)**2;
    return 12742*Math.atan2(Math.sqrt(o),Math.sqrt(1-o))
  }
  v&&v.addEventListener("change",()=>{
    const i=v.value;
    B.innerHTML='<option value="">Todas las ciudades</option>',B.disabled=!i,i&&[...new Set(e.filter(e=>e.provincia===i).map(e=>e.ciudad))].sort().forEach(e=>{
      const i=document.createElement("option");
      i.value=e,i.textContent=tc(e),B.appendChild(i)
    }),V()
  }),B&&B.addEventListener("change",V),h&&h.addEventListener("click",()=>{
    if(!navigator.geolocation)return alert("Geolocalización no soportada.");
    h.textContent="Buscando...",h.disabled=!0,navigator.geolocation.getCurrentPosition(i=>{
      o={
        lat:i.coords.latitude,lng:i.coords.longitude
      };
      const c=e.map(e=>({
        ...e,_distance:G(o.lat,o.lng,e.lat,e.lng)
      })).sort((e,i)=>e._distance-i._distance);
      f(c),v&&(v.value="",B.value="",B.disabled=!0),c[0]&&n&&n.flyTo([c[0].lat,c[0].lng],8,{
        duration:1
      }),h.innerHTML='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M12 2v4M12 18v4M2 12h4M18 12h4"/></svg> Ubicación detectada',h.disabled=!1
    },()=>{
      h.innerHTML='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M12 2v4M12 18v4M2 12h4M18 12h4"/></svg> Usar mi ubicación',h.disabled=!1,alert("No se pudo obtener ubicación.")
    },{
      enableHighAccuracy:!1,timeout:1e4,maximumAge:6e4
    })
  }),function(){
    const e=document.getElementById("marcaCarouselTrack");
    if(!e)return;
    const i=e.querySelectorAll(".marca__carousel-slide"),c=document.getElementById("carouselDots"),n=document.getElementById("carouselCounter"),a=i.length;
    let A,o=0,O=[];
    function m(i){
      const c=(i+a)%a;
      c!==o&&(o=c,e.style.transform="translateX(-"+100*o+"%)",O.forEach(function(e,i){
        e.classList.toggle("is-active",i===o)
      }),n&&(n.textContent=o+1+" / "+a))
    }
    function t(){
      A=setInterval(function(){
        m(o+1)
      },4500)
    }
    i.forEach(function(e,i){
      const n=document.createElement("button");
      n.className="marca__carousel-dot"+(0===i?" is-active":""),n.setAttribute("aria-label","Foto "+(i+1)),n.addEventListener("click",function(){
        clearInterval(A),m(i),t()
      }),c.appendChild(n),O.push(n)
    });
    const r=document.getElementById("carouselPrev"),b=document.getElementById("carouselNext");
    r&&r.addEventListener("click",function(){
      clearInterval(A),m(o-1),t()
    }),b&&b.addEventListener("click",function(){
      clearInterval(A),m(o+1),t()
    });
    let d=0;
    e.parentElement.addEventListener("touchstart",function(e){
      d=e.touches[0].clientX
    },{
      passive:!0
    }),e.parentElement.addEventListener("touchend",function(e){
      const i=d-e.changedTouches[0].clientX;
      Math.abs(i)>40&&(clearInterval(A),m(i>0?o+1:o-1),t())
    },{
      passive:!0
    }),t()
  }
  ();
  const P=i("#backToTop");
  P&&(window.addEventListener("scroll",()=>{
    P.classList.toggle("is-visible",window.scrollY>600)
  },{
    passive:!0
  }),P.addEventListener("click",()=>window.scrollTo({
    top:0,behavior:"smooth"
  }))),function(){
    var e=document.getElementById("cartaModal"),i=document.getElementById("cartaOverlay"),c=document.getElementById("cartaModalClose"),n=document.getElementById("cartaModalTitle"),a=document.getElementById("cartaModalImg"),A=document.getElementById("cartaModalDl");
    function o(){
      e.classList.remove("is-open"),e.setAttribute("aria-hidden","true"),document.body.style.overflow=""
    }
    e&&(window.openCarta=function(i,c){
      n.textContent="Carta de Colores — "+c,a.src=i,a.alt="Carta de colores "+c,A.href=i,A.setAttribute("download","Carta "+c+".webp"),e.classList.add("is-open"),e.setAttribute("aria-hidden","false"),document.body.style.overflow="hidden"
    },c.addEventListener("click",o),i.addEventListener("click",o),document.addEventListener("keydown",function(e){
      "Escape"===e.key&&o()
    }))
  }
  (),function(){
    const e=document.getElementById("bridgeCounter");
    if(!e)return;
    let i=!1;
    const c=new IntersectionObserver(n=>{
      n[0].isIntersecting&&(!function(){
        if(i)return;
        i=!0;
        const c=performance.now();
        requestAnimationFrame(function i(n){
          const a=Math.min((n-c)/1400,1),A=1-Math.pow(1-a,3);
          e.textContent=Math.round(61*A),a<1&&requestAnimationFrame(i)
        })
      }
      (),c.disconnect())
    },{
      threshold:.4
    });
    c.observe(e)
  }
  ()
}
();
