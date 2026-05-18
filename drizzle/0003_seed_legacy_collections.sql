-- Seed legacy collections and their items from the public catalog
insert into collections (
  name,
  slug,
  short_description,
  long_description,
  status,
  sort_order,
  cover_image_path,
  color_card_path,
  published_at
)
values
(
  'Oxford',
  'oxford',
  '40% Lana · 60% Acrílico',
  'Semi grueso · Agujas 5–6 · 200g',
  'published',
  0,
  '/images/hilados/oxford/m001 crudo.webp',
  '/images/catalogo hilados/carta oxford.webp',
  now()
),
(
  'Aries Ovillos',
  'aries-ovillos',
  '100% Acrílico',
  'Grueso · Agujas 7–8 · 500g',
  'published',
  1,
  '/images/hilados/aries ovillos/m001 crudo.webp',
  '/images/catalogo hilados/carta aries ovillos.webp',
  now()
),
(
  'Aries Madejas',
  'aries-madejas',
  '100% Acrílico',
  'Grueso en madeja · Agujas 7–8 · 500g',
  'published',
  2,
  '/images/hilados/aries madejas/crudo.webp',
  '/images/catalogo hilados/carta aries.webp',
  now()
),
(
  'Cake',
  'cake',
  '25% Lana · 75% Acrílico Matizado',
  'Matizado · Agujas 5.5–6.5 · 150g',
  'published',
  3,
  '/images/hilados/cake/cake crudo.webp',
  '/images/catalogo hilados/carta cake 2024.webp',
  now()
),
(
  'Camila',
  'camila',
  'Matizado Fantasy',
  'Matizado artesanal · Agujas 5–6 · 150g',
  'published',
  4,
  '/images/hilados/camila/m3050 negro.webp',
  '/images/catalogo hilados/carta camila.webp',
  now()
),
(
  'Amanda',
  'amanda',
  'Fibra Noble',
  'Semi grueso · Agujas 5–6',
  'published',
  5,
  '/images/hilados/amanda/m001 crudo.webp',
  '/images/catalogo hilados/carta amanda.webp',
  now()
),
(
  'Amelie',
  'amelie',
  'Fibra Noble',
  'Semi grueso · Agujas 5–6',
  'published',
  6,
  '/images/hilados/amelie/m001 crudo.webp',
  '/images/catalogo hilados/carta amelie.webp',
  now()
),
(
  'Austral',
  'austral',
  'Fibra Natural',
  'Rústico · Agujas 6–8',
  'published',
  7,
  '/images/hilados/austral/crudo.webp',
  '/images/catalogo hilados/carta austral.webp',
  now()
),
(
  'Brill',
  'brill',
  'Acrílico Brillante',
  'Semi fino · Agujas 3–4',
  'published',
  8,
  '/images/hilados/brill/m001 crudo.webp',
  '/images/catalogo hilados/carta brill.webp',
  now()
),
(
  'Bruma',
  'bruma',
  'Acrílico Texturado',
  'Esponjoso · Agujas 5–6',
  'published',
  9,
  '/images/hilados/bruma/m001 crudo.webp',
  '/images/catalogo hilados/carta bruma.webp',
  now()
),
(
  'Cotton 8-6',
  'cotton-8-6',
  '100% Algodón',
  'Fino · Agujas 3–4 · En ovillo',
  'published',
  10,
  '/images/hilados/cotton 8-6 ovillos/m001 crudo.webp',
  '/images/catalogo hilados/carta 8-6_8-3.webp',
  now()
),
(
  'Cotton Sense',
  'cotton-sense',
  '100% Algodón Madeja',
  'Fino en madeja · Agujas 3–4',
  'published',
  11,
  '/images/hilados/cotton sense madejas/m001 crudo.webp',
  '/images/catalogo hilados/carta cotton.webp',
  now()
),
(
  'Dolly Cotton',
  'dolly',
  '100% Algodón',
  'Fino · Agujas 3–4 · En ovillo',
  'published',
  12,
  '/images/hilados/dolly cotton 8-3 ovillos/m001 crudo.webp',
  null,
  now()
),
(
  'Flower',
  'flower',
  'Textura Bucle',
  'Fantasía · Agujas 5–6',
  'published',
  13,
  '/images/hilados/flower/crudo flower-1.webp',
  '/images/catalogo hilados/flower-madeja2021 (2) (1).webp',
  now()
),
(
  'Fresh',
  'fresh',
  'Algodón & Acrílico',
  'Verano · Agujas 3–4',
  'published',
  14,
  '/images/hilados/fresh/crudo 01.webp',
  '/images/catalogo hilados/carta fresh.webp',
  now()
),
(
  'Glam',
  'glam',
  'Fibra Premium',
  'Semi fino con brillo · Agujas 3–4',
  'published',
  15,
  '/images/hilados/glam/m001-crudo.webp',
  '/images/catalogo hilados/glamcarta.webp',
  now()
),
(
  'Kiko',
  'kiko',
  'Acrílico Premium',
  'Semi grueso · Agujas 5–6',
  'published',
  16,
  '/images/hilados/kiko/m001 crudo.webp',
  '/images/catalogo hilados/carta kiko.webp',
  now()
),
(
  'Mandala',
  'mandala',
  'Matizado Arco Iris',
  'Efecto degradé · Agujas 4–5',
  'published',
  17,
  '/images/hilados/mandala/3002 plata.webp',
  '/images/catalogo hilados/carta mandala 2026.webp',
  now()
),
(
  'Milano',
  'milano',
  'Fibra Italiana',
  'Semi fino · Agujas 3.5–4.5',
  'published',
  18,
  '/images/hilados/milano/m001-crudo.webp',
  '/images/catalogo hilados/carta milano.webp',
  now()
),
(
  'Niky',
  'niky',
  'Acrílico Suave',
  'Semi grueso · Agujas 5–6',
  'published',
  19,
  '/images/hilados/niky/m001 crudo.webp',
  '/images/catalogo hilados/carta niky 2026.webp',
  now()
),
(
  'Nórdico',
  'nordico',
  'Lana & Acrílico',
  'Grueso texturado · Agujas 6–8',
  'published',
  20,
  '/images/hilados/nordico/m001 crudo.webp',
  '/images/catalogo hilados/carta nordico.webp',
  now()
),
(
  'Pampa',
  'pampa',
  'Lana & Fibras',
  'Grueso rústico · Agujas 6–8',
  'published',
  21,
  '/images/hilados/pampa/m001 - crudo.webp',
  '/images/catalogo hilados/carta pampa 2026.webp',
  now()
),
(
  'Peluche',
  'peluche',
  'Fibra Suave',
  'Efecto peluche · Agujas 5–6',
  'published',
  22,
  '/images/hilados/peluche/m001 crudo.webp',
  '/images/catalogo hilados/carta peluche.webp',
  now()
),
(
  'Plush',
  'plush',
  'Micro Peluche',
  'Ultra suave · Agujas 4–5',
  'published',
  23,
  '/images/hilados/plush/m001 crudo.webp',
  '/images/catalogo hilados/carta plush.webp',
  now()
),
(
  'Pura',
  'pura',
  'Natural & Rústico',
  'Textura artesanal · Agujas 6–8',
  'published',
  24,
  '/images/hilados/pura/m001 crudo.webp',
  null,
  now()
),
(
  'Rendimax',
  'rendimax',
  '100% Acrílico',
  'Grueso rendidor · Agujas 6–7 · 500g',
  'published',
  25,
  '/images/hilados/rendimax/m001-crudo (1).webp',
  null,
  now()
),
(
  'Sheep',
  'sheep',
  'Matizado Fantasy',
  'Efecto bouclé · Agujas 4–5',
  'published',
  26,
  '/images/hilados/sheep/3003 gris claro.webp',
  '/images/catalogo hilados/carta sheep.webp',
  now()
),
(
  'Viscolan',
  'viscolan',
  'Viscosa & Lana',
  'Madeja · Semi fino brillante · Agujas 4–5',
  'published',
  27,
  '/images/hilados/viscolan/m001 crudo.webp',
  '/images/catalogo hilados/carta viscolan.webp',
  now()
),
(
  'Classic 2/7',
  'c27',
  '100% Acrílico',
  'Fino · Agujas 2–3 · 100g',
  'published',
  28,
  '/images/hilados/2-7/m001-crudo-27 (1).webp',
  null,
  now()
),
(
  'Classic 3/16',
  'c316',
  '100% Acrílico',
  'Súper fino · Agujas 3–4 · 100g',
  'published',
  29,
  '/images/hilados/3-16/316crudo-1a (1).webp',
  null,
  now()
),
(
  'Classic 4/7',
  'c47',
  '100% Acrílico',
  'Semi grueso · Agujas 4–5 · 100g',
  'published',
  30,
  '/images/hilados/4-7/m001-crudo-47 (2).webp',
  '/images/catalogo hilados/carta classic 4_7.webp',
  now()
),
(
  '4/7 Matizadas',
  'matizadas',
  'Matizado Multicolor',
  'Madejas matizadas · Agujas 4–5',
  'published',
  31,
  '/images/hilados/4-7 madejas matizadas/3050.webp',
  '/images/catalogo hilados/4-7madejas carta.webp',
  now()
),
(
  'CottonLux',
  'cottonlux',
  '100% Algodón Mercerizado',
  'Fino brillante · Agujas 3–4',
  'published',
  32,
  '/images/hilados/cottonlux/m001 crudo.webp',
  '/images/catalogo hilados/cotton lux carta.webp',
  now()
)
on conflict (slug) do update
set
  name = excluded.name,
  short_description = excluded.short_description,
  long_description = excluded.long_description,
  status = excluded.status,
  sort_order = excluded.sort_order,
  cover_image_path = excluded.cover_image_path,
  color_card_path = excluded.color_card_path,
  published_at = excluded.published_at;

delete from collection_items
where collection_id in (
  select id from collections where slug in ('oxford', 'aries-ovillos', 'aries-madejas', 'cake', 'camila', 'amanda', 'amelie', 'austral', 'brill', 'bruma', 'cotton-8-6', 'cotton-sense', 'dolly', 'flower', 'fresh', 'glam', 'kiko', 'mandala', 'milano', 'niky', 'nordico', 'pampa', 'peluche', 'plush', 'pura', 'rendimax', 'sheep', 'viscolan', 'c27', 'c316', 'c47', 'matizadas', 'cottonlux')
);

insert into collection_items (
  collection_id,
  name,
  sku,
  image_path,
  color_name,
  color_hex,
  sort_order,
  is_active
)
values
(
  (select id from collections where slug = 'oxford'),
  'CRUDO',
  null,
  '/images/hilados/oxford/m001 crudo.webp',
  'CRUDO',
  '#f2e6d0',
  0,
  true
),
(
  (select id from collections where slug = 'oxford'),
  'GRIS CLARO',
  null,
  '/images/hilados/oxford/m003 gris claro.webp',
  'GRIS CLARO',
  '#bbb8b0',
  1,
  true
),
(
  (select id from collections where slug = 'oxford'),
  'GRIS MEDIO',
  null,
  '/images/hilados/oxford/m004 gris medio.webp',
  'GRIS MEDIO',
  '#888480',
  2,
  true
),
(
  (select id from collections where slug = 'oxford'),
  'CAMEL',
  null,
  '/images/hilados/oxford/m053 camel.webp',
  'CAMEL',
  '#c09060',
  3,
  true
),
(
  (select id from collections where slug = 'oxford'),
  'CHOCOLATE',
  null,
  '/images/hilados/oxford/m055 chocolate.webp',
  'CHOCOLATE',
  '#452010',
  4,
  true
),
(
  (select id from collections where slug = 'oxford'),
  'NUVEM',
  null,
  '/images/hilados/oxford/m057 nuvem.webp',
  'NUVEM',
  '#d4cec8',
  5,
  true
),
(
  (select id from collections where slug = 'oxford'),
  'CHOCOLATADA',
  null,
  '/images/hilados/oxford/m067 chocolatada.webp',
  'CHOCOLATADA',
  '#6b4226',
  6,
  true
),
(
  (select id from collections where slug = 'oxford'),
  'MAÍZ',
  null,
  '/images/hilados/oxford/m151 maiz.webp',
  'MAÍZ',
  '#e8c040',
  7,
  true
),
(
  (select id from collections where slug = 'oxford'),
  'NARANJA',
  null,
  '/images/hilados/oxford/m203 naranja.webp',
  'NARANJA',
  '#f06820',
  8,
  true
),
(
  (select id from collections where slug = 'oxford'),
  'SALMÓN',
  null,
  '/images/hilados/oxford/m206 salmon.webp',
  'SALMÓN',
  '#f0a080',
  9,
  true
),
(
  (select id from collections where slug = 'oxford'),
  'ROJO',
  null,
  '/images/hilados/oxford/m301 rojo.webp',
  'ROJO',
  '#cc1c08',
  10,
  true
),
(
  (select id from collections where slug = 'oxford'),
  'BORDO',
  null,
  '/images/hilados/oxford/m351 bordo.webp',
  'BORDO',
  '#7a1020',
  11,
  true
),
(
  (select id from collections where slug = 'oxford'),
  'VIOLETA',
  null,
  '/images/hilados/oxford/m401 violeta.webp',
  'VIOLETA',
  '#7b3fa0',
  12,
  true
),
(
  (select id from collections where slug = 'oxford'),
  'BABY LILA',
  null,
  '/images/hilados/oxford/m451 baby lila.webp',
  'BABY LILA',
  '#c8a8e0',
  13,
  true
),
(
  (select id from collections where slug = 'oxford'),
  'FUCSIA',
  null,
  '/images/hilados/oxford/m501 fucsia.webp',
  'FUCSIA',
  '#e0206a',
  14,
  true
),
(
  (select id from collections where slug = 'oxford'),
  'ROSA CLARO',
  null,
  '/images/hilados/oxford/m551 rosa claro.webp',
  'ROSA CLARO',
  '#f0b8c8',
  15,
  true
),
(
  (select id from collections where slug = 'oxford'),
  'PASTEL',
  null,
  '/images/hilados/oxford/m607 pastel.webp',
  'PASTEL',
  '#b0c8e8',
  16,
  true
),
(
  (select id from collections where slug = 'oxford'),
  'FRANCIA',
  null,
  '/images/hilados/oxford/m604 francia.webp',
  'FRANCIA',
  '#0040a0',
  17,
  true
),
(
  (select id from collections where slug = 'oxford'),
  'BOTELLA',
  null,
  '/images/hilados/oxford/m704 botella.webp',
  'BOTELLA',
  '#2a5030',
  18,
  true
),
(
  (select id from collections where slug = 'oxford'),
  'FORESTA',
  null,
  '/images/hilados/oxford/m751 foresta.webp',
  'FORESTA',
  '#1e4028',
  19,
  true
),
(
  (select id from collections where slug = 'aries-ovillos'),
  'CRUDO',
  null,
  '/images/hilados/aries ovillos/m001 crudo.webp',
  'CRUDO',
  '#f2e6d0',
  0,
  true
),
(
  (select id from collections where slug = 'aries-ovillos'),
  'BLANCO',
  null,
  '/images/hilados/aries ovillos/m002 blanco.webp',
  'BLANCO',
  '#f8f8f5',
  1,
  true
),
(
  (select id from collections where slug = 'aries-ovillos'),
  'GRIS CLARO',
  null,
  '/images/hilados/aries ovillos/m003 gris claro.webp',
  'GRIS CLARO',
  '#c0bdb5',
  2,
  true
),
(
  (select id from collections where slug = 'aries-ovillos'),
  'GRIS MEDIO',
  null,
  '/images/hilados/aries ovillos/m004 gris medio.webp',
  'GRIS MEDIO',
  '#8a8680',
  3,
  true
),
(
  (select id from collections where slug = 'aries-ovillos'),
  'NEGRO',
  null,
  '/images/hilados/aries ovillos/m050 negro.webp',
  'NEGRO',
  '#1c1c1c',
  4,
  true
),
(
  (select id from collections where slug = 'aries-ovillos'),
  'ARENA',
  null,
  '/images/hilados/aries ovillos/m051 arena.webp',
  'ARENA',
  '#d4c4a8',
  5,
  true
),
(
  (select id from collections where slug = 'aries-ovillos'),
  'CAMEL',
  null,
  '/images/hilados/aries ovillos/m053 camel.webp',
  'CAMEL',
  '#c09060',
  6,
  true
),
(
  (select id from collections where slug = 'aries-ovillos'),
  'CHOCOLATE',
  null,
  '/images/hilados/aries ovillos/m055 chocolate.webp',
  'CHOCOLATE',
  '#452010',
  7,
  true
),
(
  (select id from collections where slug = 'aries-ovillos'),
  'FUEGO',
  null,
  '/images/hilados/aries ovillos/m310 fuego.webp',
  'FUEGO',
  '#e84800',
  8,
  true
),
(
  (select id from collections where slug = 'aries-ovillos'),
  'BORDO',
  null,
  '/images/hilados/aries ovillos/m351 bordo.webp',
  'BORDO',
  '#7a1020',
  9,
  true
),
(
  (select id from collections where slug = 'aries-ovillos'),
  'LILA ROSA',
  null,
  '/images/hilados/aries ovillos/m454 lila rosa.webp',
  'LILA ROSA',
  '#d0a8c8',
  10,
  true
),
(
  (select id from collections where slug = 'aries-ovillos'),
  'FUCSIA',
  null,
  '/images/hilados/aries ovillos/m501 fucsia.webp',
  'FUCSIA',
  '#e0206a',
  11,
  true
),
(
  (select id from collections where slug = 'aries-ovillos'),
  'ROSA CLARO',
  null,
  '/images/hilados/aries ovillos/m551 rosa claro.webp',
  'ROSA CLARO',
  '#f0b8c0',
  12,
  true
),
(
  (select id from collections where slug = 'aries-ovillos'),
  'NUDE',
  null,
  '/images/hilados/aries ovillos/m555 nude.webp',
  'NUDE',
  '#e8c8a8',
  13,
  true
),
(
  (select id from collections where slug = 'aries-ovillos'),
  'CELESTE BB',
  null,
  '/images/hilados/aries ovillos/m601 celeste bb.webp',
  'CELESTE BB',
  '#a8d8f8',
  14,
  true
),
(
  (select id from collections where slug = 'aries-ovillos'),
  'MARINO',
  null,
  '/images/hilados/aries ovillos/m606 marino.webp',
  'MARINO',
  '#1a2e60',
  15,
  true
),
(
  (select id from collections where slug = 'aries-ovillos'),
  'EUCALIPTUS',
  null,
  '/images/hilados/aries ovillos/m709 eucaliptus.webp',
  'EUCALIPTUS',
  '#5a8848',
  16,
  true
),
(
  (select id from collections where slug = 'aries-ovillos'),
  'MUSGO',
  null,
  '/images/hilados/aries ovillos/m756 musgo.webp',
  'MUSGO',
  '#526840',
  17,
  true
),
(
  (select id from collections where slug = 'aries-madejas'),
  'CRUDO',
  null,
  '/images/hilados/aries madejas/crudo.webp',
  'CRUDO',
  '#f2e6d0',
  0,
  true
),
(
  (select id from collections where slug = 'aries-madejas'),
  'NEGRO',
  null,
  '/images/hilados/aries madejas/negro.webp',
  'NEGRO',
  '#1c1c1c',
  1,
  true
),
(
  (select id from collections where slug = 'aries-madejas'),
  'GRIS CLARO',
  null,
  '/images/hilados/aries madejas/gris claro.webp',
  'GRIS CLARO',
  '#c0bdb5',
  2,
  true
),
(
  (select id from collections where slug = 'aries-madejas'),
  'GRIS MEDIO',
  null,
  '/images/hilados/aries madejas/gris medio.webp',
  'GRIS MEDIO',
  '#8a8680',
  3,
  true
),
(
  (select id from collections where slug = 'aries-madejas'),
  'ARENA',
  null,
  '/images/hilados/aries madejas/arena.webp',
  'ARENA',
  '#d4c4a8',
  4,
  true
),
(
  (select id from collections where slug = 'aries-madejas'),
  'CAMEL',
  null,
  '/images/hilados/aries madejas/camel.webp',
  'CAMEL',
  '#c09060',
  5,
  true
),
(
  (select id from collections where slug = 'aries-madejas'),
  'CARAMELO',
  null,
  '/images/hilados/aries madejas/caramelo.webp',
  'CARAMELO',
  '#d08040',
  6,
  true
),
(
  (select id from collections where slug = 'aries-madejas'),
  'CHOCOLATADA',
  null,
  '/images/hilados/aries madejas/chocolatada.webp',
  'CHOCOLATADA',
  '#6b4226',
  7,
  true
),
(
  (select id from collections where slug = 'aries-madejas'),
  'NUDE',
  null,
  '/images/hilados/aries madejas/nude.webp',
  'NUDE',
  '#e8c8a8',
  8,
  true
),
(
  (select id from collections where slug = 'aries-madejas'),
  'ROSA VIEJO',
  null,
  '/images/hilados/aries madejas/rosa viejo.webp',
  'ROSA VIEJO',
  '#c89898',
  9,
  true
),
(
  (select id from collections where slug = 'aries-madejas'),
  'ROSA CLARO',
  null,
  '/images/hilados/aries madejas/rosa claro.webp',
  'ROSA CLARO',
  '#f0b8c8',
  10,
  true
),
(
  (select id from collections where slug = 'aries-madejas'),
  'RASPBERRY',
  null,
  '/images/hilados/aries madejas/raspberry.webp',
  'RASPBERRY',
  '#b02050',
  11,
  true
),
(
  (select id from collections where slug = 'aries-madejas'),
  'FUEGO',
  null,
  '/images/hilados/aries madejas/m310 fuego.webp',
  'FUEGO',
  '#e84800',
  12,
  true
),
(
  (select id from collections where slug = 'aries-madejas'),
  'SALMÓN',
  null,
  '/images/hilados/aries madejas/salmon.webp',
  'SALMÓN',
  '#f0a080',
  13,
  true
),
(
  (select id from collections where slug = 'aries-madejas'),
  'VERDE AGUA',
  null,
  '/images/hilados/aries madejas/verde agua.webp',
  'VERDE AGUA',
  '#30b898',
  14,
  true
),
(
  (select id from collections where slug = 'aries-madejas'),
  'TURQUESA',
  null,
  '/images/hilados/aries madejas/turquesa.webp',
  'TURQUESA',
  '#20b0b0',
  15,
  true
),
(
  (select id from collections where slug = 'aries-madejas'),
  'VELVET',
  null,
  '/images/hilados/aries madejas/velvet.webp',
  'VELVET',
  '#9050a0',
  16,
  true
),
(
  (select id from collections where slug = 'aries-madejas'),
  'CELESTE BB',
  null,
  '/images/hilados/aries madejas/m601 celeste bb.webp',
  'CELESTE BB',
  '#a8d8f8',
  17,
  true
),
(
  (select id from collections where slug = 'aries-madejas'),
  'MARINO',
  null,
  '/images/hilados/aries madejas/m606 marino.webp',
  'MARINO',
  '#1a2e60',
  18,
  true
),
(
  (select id from collections where slug = 'aries-madejas'),
  'MAÍZ',
  null,
  '/images/hilados/aries madejas/maiz.webp',
  'MAÍZ',
  '#e8c040',
  19,
  true
),
(
  (select id from collections where slug = 'aries-madejas'),
  'GIRASOL',
  null,
  '/images/hilados/aries madejas/girasol.webp',
  'GIRASOL',
  '#f0c020',
  20,
  true
),
(
  (select id from collections where slug = 'aries-madejas'),
  'MUSGO',
  null,
  '/images/hilados/aries madejas/musgo.webp',
  'MUSGO',
  '#526840',
  21,
  true
),
(
  (select id from collections where slug = 'aries-madejas'),
  'FORESTA',
  null,
  '/images/hilados/aries madejas/foresta.webp',
  'FORESTA',
  '#3a7050',
  22,
  true
),
(
  (select id from collections where slug = 'cake'),
  'CRUDO',
  null,
  '/images/hilados/cake/cake crudo.webp',
  'CRUDO',
  '#f2e6d0',
  0,
  true
),
(
  (select id from collections where slug = 'cake'),
  'NEGRO',
  null,
  '/images/hilados/cake/cake negro.webp',
  'NEGRO',
  '#1c1c1c',
  1,
  true
),
(
  (select id from collections where slug = 'cake'),
  'CHOCOLATE',
  null,
  '/images/hilados/cake/cake chocolate.webp',
  'CHOCOLATE',
  '#452010',
  2,
  true
),
(
  (select id from collections where slug = 'cake'),
  'LANGOSTINO',
  null,
  '/images/hilados/cake/cake langostino.webp',
  'LANGOSTINO',
  '#e89878',
  3,
  true
),
(
  (select id from collections where slug = 'cake'),
  'ROJO',
  null,
  '/images/hilados/cake/cake rojo.webp',
  'ROJO',
  '#cc1c08',
  4,
  true
),
(
  (select id from collections where slug = 'cake'),
  'ROSA SUCIO',
  null,
  '/images/hilados/cake/cake rosasucio.webp',
  'ROSA SUCIO',
  '#c09090',
  5,
  true
),
(
  (select id from collections where slug = 'cake'),
  'ROSAS',
  null,
  '/images/hilados/cake/cake rosas.webp',
  'ROSAS',
  '#f0b8c8',
  6,
  true
),
(
  (select id from collections where slug = 'cake'),
  'LILA',
  null,
  '/images/hilados/cake/cake lila.webp',
  'LILA',
  '#b890d0',
  7,
  true
),
(
  (select id from collections where slug = 'cake'),
  'MARINO',
  null,
  '/images/hilados/cake/cake marino.webp',
  'MARINO',
  '#1a2e60',
  8,
  true
),
(
  (select id from collections where slug = 'cake'),
  'VERDE',
  null,
  '/images/hilados/cake/cake verde.webp',
  'VERDE',
  '#4a7a4a',
  9,
  true
),
(
  (select id from collections where slug = 'camila'),
  'NEGRO',
  null,
  '/images/hilados/camila/m3050 negro.webp',
  'NEGRO',
  '#1c1c1c',
  0,
  true
),
(
  (select id from collections where slug = 'camila'),
  'CAMEL',
  null,
  '/images/hilados/camila/m3056 camel.webp',
  'CAMEL',
  '#c09060',
  1,
  true
),
(
  (select id from collections where slug = 'camila'),
  'MOSTAZA',
  null,
  '/images/hilados/camila/m3103 mostaza.webp',
  'MOSTAZA',
  '#c8a020',
  2,
  true
),
(
  (select id from collections where slug = 'camila'),
  'BORDO',
  null,
  '/images/hilados/camila/m3306 bordo.webp',
  'BORDO',
  '#7a1020',
  3,
  true
),
(
  (select id from collections where slug = 'camila'),
  'LILA',
  null,
  '/images/hilados/camila/m3451 lila.webp',
  'LILA',
  '#b890d0',
  4,
  true
),
(
  (select id from collections where slug = 'camila'),
  'CORAL',
  null,
  '/images/hilados/camila/m3502 coral.webp',
  'CORAL',
  '#e87060',
  5,
  true
),
(
  (select id from collections where slug = 'camila'),
  'ROSA',
  null,
  '/images/hilados/camila/m3506 rosa.webp',
  'ROSA',
  '#f0a8c0',
  6,
  true
),
(
  (select id from collections where slug = 'camila'),
  'CELESTE',
  null,
  '/images/hilados/camila/m3651 celeste.webp',
  'CELESTE',
  '#88c0f0',
  7,
  true
),
(
  (select id from collections where slug = 'camila'),
  'VERDE',
  null,
  '/images/hilados/camila/m3708 verde.webp',
  'VERDE',
  '#4a7a4a',
  8,
  true
),
(
  (select id from collections where slug = 'amanda'),
  'CRUDO',
  null,
  '/images/hilados/amanda/m001 crudo.webp',
  'CRUDO',
  '#f2e6d0',
  0,
  true
),
(
  (select id from collections where slug = 'amanda'),
  'GRIS CLARO',
  null,
  '/images/hilados/amanda/m003 gris claro.webp',
  'GRIS CLARO',
  '#c0bdb5',
  1,
  true
),
(
  (select id from collections where slug = 'amanda'),
  'ARENA',
  null,
  '/images/hilados/amanda/m051 arena.webp',
  'ARENA',
  '#d4c4a8',
  2,
  true
),
(
  (select id from collections where slug = 'amelie'),
  'CRUDO',
  null,
  '/images/hilados/amelie/m001 crudo.webp',
  'CRUDO',
  '#f2e6d0',
  0,
  true
),
(
  (select id from collections where slug = 'amelie'),
  'BLANCO',
  null,
  '/images/hilados/amelie/m002 blanco.webp',
  'BLANCO',
  '#f8f8f5',
  1,
  true
),
(
  (select id from collections where slug = 'amelie'),
  'GRIS CLARO',
  null,
  '/images/hilados/amelie/m003 gris claro.webp',
  'GRIS CLARO',
  '#c0bdb5',
  2,
  true
),
(
  (select id from collections where slug = 'amelie'),
  'NEGRO',
  null,
  '/images/hilados/amelie/m050 negro.webp',
  'NEGRO',
  '#1c1c1c',
  3,
  true
),
(
  (select id from collections where slug = 'amelie'),
  'ARENA',
  null,
  '/images/hilados/amelie/m051 arena.webp',
  'ARENA',
  '#d4c4a8',
  4,
  true
),
(
  (select id from collections where slug = 'amelie'),
  'MONTAÑA',
  null,
  '/images/hilados/amelie/m054 montaña.webp',
  'MONTAÑA',
  '#8a7868',
  5,
  true
),
(
  (select id from collections where slug = 'amelie'),
  'CHOCOLATE',
  null,
  '/images/hilados/amelie/m055 chocolate.webp',
  'CHOCOLATE',
  '#452010',
  6,
  true
),
(
  (select id from collections where slug = 'amelie'),
  'BORDO',
  null,
  '/images/hilados/amelie/m351 bordo.webp',
  'BORDO',
  '#7a1020',
  7,
  true
),
(
  (select id from collections where slug = 'amelie'),
  'ROSA SUCIO',
  null,
  '/images/hilados/amelie/m557 rosa sucio.webp',
  'ROSA SUCIO',
  '#c09090',
  8,
  true
),
(
  (select id from collections where slug = 'amelie'),
  'CELESTE BB',
  null,
  '/images/hilados/amelie/m601 celeste bebe.webp',
  'CELESTE BB',
  '#a8d8f8',
  9,
  true
),
(
  (select id from collections where slug = 'austral'),
  'CRUDO',
  null,
  '/images/hilados/austral/crudo.webp',
  'CRUDO',
  '#f2e6d0',
  0,
  true
),
(
  (select id from collections where slug = 'austral'),
  'NUVEM',
  null,
  '/images/hilados/austral/nuvem.webp',
  'NUVEM',
  '#d4cec8',
  1,
  true
),
(
  (select id from collections where slug = 'austral'),
  'ROCA',
  null,
  '/images/hilados/austral/roca.webp',
  'ROCA',
  '#8a8078',
  2,
  true
),
(
  (select id from collections where slug = 'austral'),
  'CHOCOLATE',
  null,
  '/images/hilados/austral/chocolate.webp',
  'CHOCOLATE',
  '#452010',
  3,
  true
),
(
  (select id from collections where slug = 'austral'),
  'CHOCOLATADA',
  null,
  '/images/hilados/austral/chocolatada.webp',
  'CHOCOLATADA',
  '#6b4226',
  4,
  true
),
(
  (select id from collections where slug = 'austral'),
  'AFRICANO',
  null,
  '/images/hilados/austral/africano.webp',
  'AFRICANO',
  '#7a6050',
  5,
  true
),
(
  (select id from collections where slug = 'brill'),
  'CRUDO',
  null,
  '/images/hilados/brill/m001 crudo.webp',
  'CRUDO',
  '#f2e6d0',
  0,
  true
),
(
  (select id from collections where slug = 'brill'),
  'BLANCO',
  null,
  '/images/hilados/brill/m002 blanco.webp',
  'BLANCO',
  '#f8f8f5',
  1,
  true
),
(
  (select id from collections where slug = 'brill'),
  'GRIS MEDIO',
  null,
  '/images/hilados/brill/m003 gris medio.webp',
  'GRIS MEDIO',
  '#888480',
  2,
  true
),
(
  (select id from collections where slug = 'brill'),
  'GRIS OSCURO',
  null,
  '/images/hilados/brill/m004 gris medio.webp',
  'GRIS OSCURO',
  '#505050',
  3,
  true
),
(
  (select id from collections where slug = 'brill'),
  'NEGRO',
  null,
  '/images/hilados/brill/m050 negor.webp',
  'NEGRO',
  '#1c1c1c',
  4,
  true
),
(
  (select id from collections where slug = 'brill'),
  'ARENA',
  null,
  '/images/hilados/brill/m051 arena.webp',
  'ARENA',
  '#d4c4a8',
  5,
  true
),
(
  (select id from collections where slug = 'brill'),
  'CAMEL',
  null,
  '/images/hilados/brill/m053 camel.webp',
  'CAMEL',
  '#c09060',
  6,
  true
),
(
  (select id from collections where slug = 'brill'),
  'FUEGO',
  null,
  '/images/hilados/brill/m310 fuego.webp',
  'FUEGO',
  '#e84800',
  7,
  true
),
(
  (select id from collections where slug = 'brill'),
  'ROSA CHICLE',
  null,
  '/images/hilados/brill/m553 rosa chicle.webp',
  'ROSA CHICLE',
  '#f080a0',
  8,
  true
),
(
  (select id from collections where slug = 'brill'),
  'FRANCIA',
  null,
  '/images/hilados/brill/m604 francia.webp',
  'FRANCIA',
  '#0040a0',
  9,
  true
),
(
  (select id from collections where slug = 'bruma'),
  'CRUDO',
  null,
  '/images/hilados/bruma/m001 crudo.webp',
  'CRUDO',
  '#f2e6d0',
  0,
  true
),
(
  (select id from collections where slug = 'bruma'),
  'GRIS CLARO',
  null,
  '/images/hilados/bruma/m003 gris claro.webp',
  'GRIS CLARO',
  '#c0bdb5',
  1,
  true
),
(
  (select id from collections where slug = 'bruma'),
  'GRIS MEDIO',
  null,
  '/images/hilados/bruma/m004 gris medio.webp',
  'GRIS MEDIO',
  '#888480',
  2,
  true
),
(
  (select id from collections where slug = 'bruma'),
  'GRAFITO',
  null,
  '/images/hilados/bruma/m005 grafito.webp',
  'GRAFITO',
  '#404040',
  3,
  true
),
(
  (select id from collections where slug = 'bruma'),
  'NEGRO',
  null,
  '/images/hilados/bruma/m050 negro.webp',
  'NEGRO',
  '#1c1c1c',
  4,
  true
),
(
  (select id from collections where slug = 'bruma'),
  'ARENA',
  null,
  '/images/hilados/bruma/m051 arena.webp',
  'ARENA',
  '#d4c4a8',
  5,
  true
),
(
  (select id from collections where slug = 'bruma'),
  'CAMEL',
  null,
  '/images/hilados/bruma/m053 camel.webp',
  'CAMEL',
  '#c09060',
  6,
  true
),
(
  (select id from collections where slug = 'bruma'),
  'CORAL FLUO',
  null,
  '/images/hilados/bruma/m202 coral fluo.webp',
  'CORAL FLUO',
  '#ff6050',
  7,
  true
),
(
  (select id from collections where slug = 'bruma'),
  'LANGOSTINO',
  null,
  '/images/hilados/bruma/m211 langostino.webp',
  'LANGOSTINO',
  '#e89878',
  8,
  true
),
(
  (select id from collections where slug = 'bruma'),
  'DAMASCO',
  null,
  '/images/hilados/bruma/m251 damasco.webp',
  'DAMASCO',
  '#e09870',
  9,
  true
),
(
  (select id from collections where slug = 'bruma'),
  'FUEGO',
  null,
  '/images/hilados/bruma/m310 fuego.webp',
  'FUEGO',
  '#e84800',
  10,
  true
),
(
  (select id from collections where slug = 'bruma'),
  'LILA ROSA',
  null,
  '/images/hilados/bruma/m454 lila rosa.webp',
  'LILA ROSA',
  '#d0a8c8',
  11,
  true
),
(
  (select id from collections where slug = 'bruma'),
  'ROSA VIEJO',
  null,
  '/images/hilados/bruma/m552 rosa viejo.webp',
  'ROSA VIEJO',
  '#c89898',
  12,
  true
),
(
  (select id from collections where slug = 'bruma'),
  'ROSA CHICLE',
  null,
  '/images/hilados/bruma/m553 rosa chicle.webp',
  'ROSA CHICLE',
  '#f080a0',
  13,
  true
),
(
  (select id from collections where slug = 'bruma'),
  'PIEL',
  null,
  '/images/hilados/bruma/m556 piel.webp',
  'PIEL',
  '#f0c0a0',
  14,
  true
),
(
  (select id from collections where slug = 'bruma'),
  'FRANCIA',
  null,
  '/images/hilados/bruma/m604 francia.webp',
  'FRANCIA',
  '#0040a0',
  15,
  true
),
(
  (select id from collections where slug = 'bruma'),
  'JEAN',
  null,
  '/images/hilados/bruma/m605 jean.webp',
  'JEAN',
  '#4878b0',
  16,
  true
),
(
  (select id from collections where slug = 'bruma'),
  'VERDE AGUA',
  null,
  '/images/hilados/bruma/m701 verde agua.webp',
  'VERDE AGUA',
  '#30b898',
  17,
  true
),
(
  (select id from collections where slug = 'bruma'),
  'EUCALIPTUS',
  null,
  '/images/hilados/bruma/m709 eucaliptus.webp',
  'EUCALIPTUS',
  '#5a8848',
  18,
  true
),
(
  (select id from collections where slug = 'bruma'),
  'PISTACHO',
  null,
  '/images/hilados/bruma/m711  pistacho.webp',
  'PISTACHO',
  '#a8c870',
  19,
  true
),
(
  (select id from collections where slug = 'cotton-8-6'),
  'CRUDO',
  null,
  '/images/hilados/cotton 8-6 ovillos/m001 crudo.webp',
  'CRUDO',
  '#f2e6d0',
  0,
  true
),
(
  (select id from collections where slug = 'cotton-8-6'),
  'BLANCO',
  null,
  '/images/hilados/cotton 8-6 ovillos/m002 blanco.webp',
  'BLANCO',
  '#f8f8f5',
  1,
  true
),
(
  (select id from collections where slug = 'cotton-8-6'),
  'GRIS CLARO',
  null,
  '/images/hilados/cotton 8-6 ovillos/m003 gris claro.webp',
  'GRIS CLARO',
  '#c0bdb5',
  2,
  true
),
(
  (select id from collections where slug = 'cotton-8-6'),
  'GRIS MEDIO',
  null,
  '/images/hilados/cotton 8-6 ovillos/m004 gris medio.webp',
  'GRIS MEDIO',
  '#888480',
  3,
  true
),
(
  (select id from collections where slug = 'cotton-8-6'),
  'GRIS OSCURO',
  null,
  '/images/hilados/cotton 8-6 ovillos/m005 gris oscuro.webp',
  'GRIS OSCURO',
  '#505050',
  4,
  true
),
(
  (select id from collections where slug = 'cotton-8-6'),
  'NEGRO',
  null,
  '/images/hilados/cotton 8-6 ovillos/m050 negro.webp',
  'NEGRO',
  '#1c1c1c',
  5,
  true
),
(
  (select id from collections where slug = 'cotton-8-6'),
  'CAMEL',
  null,
  '/images/hilados/cotton 8-6 ovillos/m053 camel.webp',
  'CAMEL',
  '#c09060',
  6,
  true
),
(
  (select id from collections where slug = 'cotton-8-6'),
  'CHOCOLATE',
  null,
  '/images/hilados/cotton 8-6 ovillos/m055 chocolate.webp',
  'CHOCOLATE',
  '#452010',
  7,
  true
),
(
  (select id from collections where slug = 'cotton-8-6'),
  'ROCA',
  null,
  '/images/hilados/cotton 8-6 ovillos/m059 roca.webp',
  'ROCA',
  '#8a8078',
  8,
  true
),
(
  (select id from collections where slug = 'cotton-8-6'),
  'ORO',
  null,
  '/images/hilados/cotton 8-6 ovillos/m102 oro.webp',
  'ORO',
  '#d4a830',
  9,
  true
),
(
  (select id from collections where slug = 'cotton-8-6'),
  'NARANJA',
  null,
  '/images/hilados/cotton 8-6 ovillos/m203 naranja.webp',
  'NARANJA',
  '#f06820',
  10,
  true
),
(
  (select id from collections where slug = 'cotton-8-6'),
  'ÓXIDO',
  null,
  '/images/hilados/cotton 8-6 ovillos/m255 oxido.webp',
  'ÓXIDO',
  '#c05030',
  11,
  true
),
(
  (select id from collections where slug = 'cotton-8-6'),
  'ROJO',
  null,
  '/images/hilados/cotton 8-6 ovillos/m301 rojo.webp',
  'ROJO',
  '#cc1c08',
  12,
  true
),
(
  (select id from collections where slug = 'cotton-8-6'),
  'MALBEC',
  null,
  '/images/hilados/cotton 8-6 ovillos/m304 malbec.webp',
  'MALBEC',
  '#6a1040',
  13,
  true
),
(
  (select id from collections where slug = 'cotton-8-6'),
  'BORDO',
  null,
  '/images/hilados/cotton 8-6 ovillos/m351 bordo.webp',
  'BORDO',
  '#7a1020',
  14,
  true
),
(
  (select id from collections where slug = 'cotton-8-6'),
  'VIOLETA',
  null,
  '/images/hilados/cotton 8-6 ovillos/m401 violeta.webp',
  'VIOLETA',
  '#7b3fa0',
  15,
  true
),
(
  (select id from collections where slug = 'cotton-8-6'),
  'BABY LILA',
  null,
  '/images/hilados/cotton 8-6 ovillos/m451 baby lila.webp',
  'BABY LILA',
  '#c8a8e0',
  16,
  true
),
(
  (select id from collections where slug = 'cotton-8-6'),
  'FUCSIA',
  null,
  '/images/hilados/cotton 8-6 ovillos/m501 fucsia.webp',
  'FUCSIA',
  '#e0206a',
  17,
  true
),
(
  (select id from collections where slug = 'cotton-8-6'),
  'ROSA VIEJO',
  null,
  '/images/hilados/cotton 8-6 ovillos/m552 rosa viejo.webp',
  'ROSA VIEJO',
  '#c89898',
  18,
  true
),
(
  (select id from collections where slug = 'cotton-8-6'),
  'ROSA CHICLE',
  null,
  '/images/hilados/cotton 8-6 ovillos/m553 rosa chicle.webp',
  'ROSA CHICLE',
  '#f080a0',
  19,
  true
),
(
  (select id from collections where slug = 'cotton-8-6'),
  'CORAL',
  null,
  '/images/hilados/cotton 8-6 ovillos/m554 coral.webp',
  'CORAL',
  '#e87060',
  20,
  true
),
(
  (select id from collections where slug = 'cotton-8-6'),
  'BANDERA',
  null,
  '/images/hilados/cotton 8-6 ovillos/m602 bandera.webp',
  'BANDERA',
  '#2060c0',
  21,
  true
),
(
  (select id from collections where slug = 'cotton-8-6'),
  'FRANCIA',
  null,
  '/images/hilados/cotton 8-6 ovillos/m604 francia.webp',
  'FRANCIA',
  '#0040a0',
  22,
  true
),
(
  (select id from collections where slug = 'cotton-8-6'),
  'JEAN',
  null,
  '/images/hilados/cotton 8-6 ovillos/m605 jean.webp',
  'JEAN',
  '#4878b0',
  23,
  true
),
(
  (select id from collections where slug = 'cotton-8-6'),
  'MARINO',
  null,
  '/images/hilados/cotton 8-6 ovillos/m606 marino.webp',
  'MARINO',
  '#1a2e60',
  24,
  true
),
(
  (select id from collections where slug = 'cotton-8-6'),
  'TURQUESA',
  null,
  '/images/hilados/cotton 8-6 ovillos/m651 turquesa.webp',
  'TURQUESA',
  '#20b0b0',
  25,
  true
),
(
  (select id from collections where slug = 'cotton-8-6'),
  'DANUBIO',
  null,
  '/images/hilados/cotton 8-6 ovillos/m655 danubio.webp',
  'DANUBIO',
  '#4090c0',
  26,
  true
),
(
  (select id from collections where slug = 'cotton-8-6'),
  'VERDE LORO',
  null,
  '/images/hilados/cotton 8-6 ovillos/m703 verde loro.webp',
  'VERDE LORO',
  '#6a8e28',
  27,
  true
),
(
  (select id from collections where slug = 'cotton-8-6'),
  'BOTELLA',
  null,
  '/images/hilados/cotton 8-6 ovillos/m704 botella.webp',
  'BOTELLA',
  '#2a5030',
  28,
  true
),
(
  (select id from collections where slug = 'cotton-8-6'),
  'MANZANA',
  null,
  '/images/hilados/cotton 8-6 ovillos/m705 manzana.webp',
  'MANZANA',
  '#78b820',
  29,
  true
),
(
  (select id from collections where slug = 'cotton-8-6'),
  'MUSGO',
  null,
  '/images/hilados/cotton 8-6 ovillos/m756 musgo.webp',
  'MUSGO',
  '#526840',
  30,
  true
),
(
  (select id from collections where slug = 'cotton-sense'),
  'CRUDO',
  null,
  '/images/hilados/cotton sense madejas/m001 crudo.webp',
  'CRUDO',
  '#f2e6d0',
  0,
  true
),
(
  (select id from collections where slug = 'cotton-sense'),
  'BLANCO',
  null,
  '/images/hilados/cotton sense madejas/m002 blanco.webp',
  'BLANCO',
  '#f8f8f5',
  1,
  true
),
(
  (select id from collections where slug = 'cotton-sense'),
  'GRIS CLARO',
  null,
  '/images/hilados/cotton sense madejas/m003 gris claro.webp',
  'GRIS CLARO',
  '#c0bdb5',
  2,
  true
),
(
  (select id from collections where slug = 'cotton-sense'),
  'GRIS MEDIO',
  null,
  '/images/hilados/cotton sense madejas/m004 gris medio.webp',
  'GRIS MEDIO',
  '#888480',
  3,
  true
),
(
  (select id from collections where slug = 'cotton-sense'),
  'NEGRO',
  null,
  '/images/hilados/cotton sense madejas/m050 negro.webp',
  'NEGRO',
  '#1c1c1c',
  4,
  true
),
(
  (select id from collections where slug = 'cotton-sense'),
  'CAMEL',
  null,
  '/images/hilados/cotton sense madejas/m053 camel.webp',
  'CAMEL',
  '#c09060',
  5,
  true
),
(
  (select id from collections where slug = 'cotton-sense'),
  'CHOCOLATE',
  null,
  '/images/hilados/cotton sense madejas/m055 chocolate.webp',
  'CHOCOLATE',
  '#452010',
  6,
  true
),
(
  (select id from collections where slug = 'cotton-sense'),
  'CANELA',
  null,
  '/images/hilados/cotton sense madejas/m066 canela.webp',
  'CANELA',
  '#c08040',
  7,
  true
),
(
  (select id from collections where slug = 'cotton-sense'),
  'PARDO',
  null,
  '/images/hilados/cotton sense madejas/m068 pardo.webp',
  'PARDO',
  '#9a7050',
  8,
  true
),
(
  (select id from collections where slug = 'cotton-sense'),
  'PATITO',
  null,
  '/images/hilados/cotton sense madejas/m101 patito.webp',
  'PATITO',
  '#f0d050',
  9,
  true
),
(
  (select id from collections where slug = 'cotton-sense'),
  'ORO',
  null,
  '/images/hilados/cotton sense madejas/m102 oro.webp',
  'ORO',
  '#d4a830',
  10,
  true
),
(
  (select id from collections where slug = 'cotton-sense'),
  'GIRASOL',
  null,
  '/images/hilados/cotton sense madejas/m105 girasol.webp',
  'GIRASOL',
  '#f0c020',
  11,
  true
),
(
  (select id from collections where slug = 'cotton-sense'),
  'MAÍZ',
  null,
  '/images/hilados/cotton sense madejas/m151 maiz.webp',
  'MAÍZ',
  '#e8c040',
  12,
  true
),
(
  (select id from collections where slug = 'cotton-sense'),
  'NARANJA',
  null,
  '/images/hilados/cotton sense madejas/m203 naranja.webp',
  'NARANJA',
  '#f06820',
  13,
  true
),
(
  (select id from collections where slug = 'cotton-sense'),
  'SALMÓN',
  null,
  '/images/hilados/cotton sense madejas/m206 salmon.webp',
  'SALMÓN',
  '#f0a080',
  14,
  true
),
(
  (select id from collections where slug = 'cotton-sense'),
  'DAMASCO',
  null,
  '/images/hilados/cotton sense madejas/m251 damasco.webp',
  'DAMASCO',
  '#e09870',
  15,
  true
),
(
  (select id from collections where slug = 'cotton-sense'),
  'ÓXIDO',
  null,
  '/images/hilados/cotton sense madejas/m255 oxido.webp',
  'ÓXIDO',
  '#c05030',
  16,
  true
),
(
  (select id from collections where slug = 'cotton-sense'),
  'ROJO',
  null,
  '/images/hilados/cotton sense madejas/m301 rojo.webp',
  'ROJO',
  '#cc1c08',
  17,
  true
),
(
  (select id from collections where slug = 'cotton-sense'),
  'FRAMBUESA',
  null,
  '/images/hilados/cotton sense madejas/m306 frambuesa.webp',
  'FRAMBUESA',
  '#c02060',
  18,
  true
),
(
  (select id from collections where slug = 'cotton-sense'),
  'BORDO',
  null,
  '/images/hilados/cotton sense madejas/m351 bordo.webp',
  'BORDO',
  '#7a1020',
  19,
  true
),
(
  (select id from collections where slug = 'cotton-sense'),
  'VIOLETA',
  null,
  '/images/hilados/cotton sense madejas/m401 violeta.webp',
  'VIOLETA',
  '#7b3fa0',
  20,
  true
),
(
  (select id from collections where slug = 'cotton-sense'),
  'BABY LILA',
  null,
  '/images/hilados/cotton sense madejas/m451 baby lila.webp',
  'BABY LILA',
  '#c8a8e0',
  21,
  true
),
(
  (select id from collections where slug = 'cotton-sense'),
  'FUCSIA',
  null,
  '/images/hilados/cotton sense madejas/m501 fucsia.webp',
  'FUCSIA',
  '#e0206a',
  22,
  true
),
(
  (select id from collections where slug = 'cotton-sense'),
  'ROSA CLARO',
  null,
  '/images/hilados/cotton sense madejas/m551 rosa claro.webp',
  'ROSA CLARO',
  '#f0b8c8',
  23,
  true
),
(
  (select id from collections where slug = 'cotton-sense'),
  'ROSA VIEJO',
  null,
  '/images/hilados/cotton sense madejas/m552 rosa viejo.webp',
  'ROSA VIEJO',
  '#c89898',
  24,
  true
),
(
  (select id from collections where slug = 'cotton-sense'),
  'ROSA CHICLE',
  null,
  '/images/hilados/cotton sense madejas/m553 rosa chicle.webp',
  'ROSA CHICLE',
  '#f080a0',
  25,
  true
),
(
  (select id from collections where slug = 'cotton-sense'),
  'CORAL',
  null,
  '/images/hilados/cotton sense madejas/m554 coral.webp',
  'CORAL',
  '#e87060',
  26,
  true
),
(
  (select id from collections where slug = 'cotton-sense'),
  'NUDE',
  null,
  '/images/hilados/cotton sense madejas/m555 nude.webp',
  'NUDE',
  '#e8c8a8',
  27,
  true
),
(
  (select id from collections where slug = 'cotton-sense'),
  'CELESTE BB',
  null,
  '/images/hilados/cotton sense madejas/m601 celeste.webp',
  'CELESTE BB',
  '#a8d8f8',
  28,
  true
),
(
  (select id from collections where slug = 'cotton-sense'),
  'FRANCIA',
  null,
  '/images/hilados/cotton sense madejas/m604 francia.webp',
  'FRANCIA',
  '#0040a0',
  29,
  true
),
(
  (select id from collections where slug = 'cotton-sense'),
  'JEAN',
  null,
  '/images/hilados/cotton sense madejas/m605 jean.webp',
  'JEAN',
  '#4878b0',
  30,
  true
),
(
  (select id from collections where slug = 'cotton-sense'),
  'MARINO',
  null,
  '/images/hilados/cotton sense madejas/m606 marino.webp',
  'MARINO',
  '#1a2e60',
  31,
  true
),
(
  (select id from collections where slug = 'cotton-sense'),
  'TURQUESA',
  null,
  '/images/hilados/cotton sense madejas/m651 turquesa.webp',
  'TURQUESA',
  '#20b0b0',
  32,
  true
),
(
  (select id from collections where slug = 'cotton-sense'),
  'PISCINA',
  null,
  '/images/hilados/cotton sense madejas/m654 piscina.webp',
  'PISCINA',
  '#40c0c0',
  33,
  true
),
(
  (select id from collections where slug = 'cotton-sense'),
  'CARIBE',
  null,
  '/images/hilados/cotton sense madejas/m658 caribe.webp',
  'CARIBE',
  '#20a8c0',
  34,
  true
),
(
  (select id from collections where slug = 'cotton-sense'),
  'BOTELLA',
  null,
  '/images/hilados/cotton sense madejas/m704 botella.webp',
  'BOTELLA',
  '#2a5030',
  35,
  true
),
(
  (select id from collections where slug = 'cotton-sense'),
  'MANZANA',
  null,
  '/images/hilados/cotton sense madejas/m705 manzana.webp',
  'MANZANA',
  '#78b820',
  36,
  true
),
(
  (select id from collections where slug = 'cotton-sense'),
  'ESMERALDA',
  null,
  '/images/hilados/cotton sense madejas/m707 verde esmeralda.webp',
  'ESMERALDA',
  '#1a8040',
  37,
  true
),
(
  (select id from collections where slug = 'cotton-sense'),
  'PISTACHO',
  null,
  '/images/hilados/cotton sense madejas/m711 pistacho.webp',
  'PISTACHO',
  '#a8c870',
  38,
  true
),
(
  (select id from collections where slug = 'cotton-sense'),
  'MUSGO',
  null,
  '/images/hilados/cotton sense madejas/m756 musgo.webp',
  'MUSGO',
  '#526840',
  39,
  true
),
(
  (select id from collections where slug = 'dolly'),
  'CRUDO',
  null,
  '/images/hilados/dolly cotton 8-3 ovillos/m001 crudo.webp',
  'CRUDO',
  '#f2e6d0',
  0,
  true
),
(
  (select id from collections where slug = 'dolly'),
  'BLANCO',
  null,
  '/images/hilados/dolly cotton 8-3 ovillos/m002 blanco.webp',
  'BLANCO',
  '#f8f8f5',
  1,
  true
),
(
  (select id from collections where slug = 'dolly'),
  'GRIS CLARO',
  null,
  '/images/hilados/dolly cotton 8-3 ovillos/m003 gris claro.webp',
  'GRIS CLARO',
  '#c0bdb5',
  2,
  true
),
(
  (select id from collections where slug = 'dolly'),
  'GRIS MEDIO',
  null,
  '/images/hilados/dolly cotton 8-3 ovillos/m004 gris medio.webp',
  'GRIS MEDIO',
  '#888480',
  3,
  true
),
(
  (select id from collections where slug = 'dolly'),
  'GRIS OSCURO',
  null,
  '/images/hilados/dolly cotton 8-3 ovillos/m005 gris oscuro.webp',
  'GRIS OSCURO',
  '#505050',
  4,
  true
),
(
  (select id from collections where slug = 'dolly'),
  'NEGRO',
  null,
  '/images/hilados/dolly cotton 8-3 ovillos/m050 negro.webp',
  'NEGRO',
  '#1c1c1c',
  5,
  true
),
(
  (select id from collections where slug = 'dolly'),
  'CHOCOLATE',
  null,
  '/images/hilados/dolly cotton 8-3 ovillos/m055 chocolate.webp',
  'CHOCOLATE',
  '#452010',
  6,
  true
),
(
  (select id from collections where slug = 'dolly'),
  'ROCA',
  null,
  '/images/hilados/dolly cotton 8-3 ovillos/m059 roca.webp',
  'ROCA',
  '#8a8078',
  7,
  true
),
(
  (select id from collections where slug = 'dolly'),
  'ORO',
  null,
  '/images/hilados/dolly cotton 8-3 ovillos/m102 oro.webp',
  'ORO',
  '#d4a830',
  8,
  true
),
(
  (select id from collections where slug = 'dolly'),
  'NARANJA',
  null,
  '/images/hilados/dolly cotton 8-3 ovillos/m203 naranja.webp',
  'NARANJA',
  '#f06820',
  9,
  true
),
(
  (select id from collections where slug = 'dolly'),
  'ÓXIDO',
  null,
  '/images/hilados/dolly cotton 8-3 ovillos/m255 oxido.webp',
  'ÓXIDO',
  '#c05030',
  10,
  true
),
(
  (select id from collections where slug = 'dolly'),
  'ROJO',
  null,
  '/images/hilados/dolly cotton 8-3 ovillos/m301 rojo.webp',
  'ROJO',
  '#cc1c08',
  11,
  true
),
(
  (select id from collections where slug = 'dolly'),
  'BORDO',
  null,
  '/images/hilados/dolly cotton 8-3 ovillos/m351 bordo.webp',
  'BORDO',
  '#7a1020',
  12,
  true
),
(
  (select id from collections where slug = 'dolly'),
  'VIOLETA',
  null,
  '/images/hilados/dolly cotton 8-3 ovillos/m401 violeta.webp',
  'VIOLETA',
  '#7b3fa0',
  13,
  true
),
(
  (select id from collections where slug = 'dolly'),
  'BABY LILA',
  null,
  '/images/hilados/dolly cotton 8-3 ovillos/m451 baby lila.webp',
  'BABY LILA',
  '#c8a8e0',
  14,
  true
),
(
  (select id from collections where slug = 'dolly'),
  'FUCSIA',
  null,
  '/images/hilados/dolly cotton 8-3 ovillos/m501 fucsia.webp',
  'FUCSIA',
  '#e0206a',
  15,
  true
),
(
  (select id from collections where slug = 'dolly'),
  'ROSA VIEJO',
  null,
  '/images/hilados/dolly cotton 8-3 ovillos/m552 rosa viejo.webp',
  'ROSA VIEJO',
  '#c89898',
  16,
  true
),
(
  (select id from collections where slug = 'dolly'),
  'ROSA CHICLE',
  null,
  '/images/hilados/dolly cotton 8-3 ovillos/m553 rosa chicle.webp',
  'ROSA CHICLE',
  '#f080a0',
  17,
  true
),
(
  (select id from collections where slug = 'dolly'),
  'CORAL',
  null,
  '/images/hilados/dolly cotton 8-3 ovillos/m554 coral.webp',
  'CORAL',
  '#e87060',
  18,
  true
),
(
  (select id from collections where slug = 'dolly'),
  'BANDERA',
  null,
  '/images/hilados/dolly cotton 8-3 ovillos/m602 bandera.webp',
  'BANDERA',
  '#2060c0',
  19,
  true
),
(
  (select id from collections where slug = 'dolly'),
  'JEAN',
  null,
  '/images/hilados/dolly cotton 8-3 ovillos/m605 jean.webp',
  'JEAN',
  '#4878b0',
  20,
  true
),
(
  (select id from collections where slug = 'dolly'),
  'MARINO',
  null,
  '/images/hilados/dolly cotton 8-3 ovillos/m606 marino.webp',
  'MARINO',
  '#1a2e60',
  21,
  true
),
(
  (select id from collections where slug = 'dolly'),
  'TURQUESA',
  null,
  '/images/hilados/dolly cotton 8-3 ovillos/m651 turquesa.webp',
  'TURQUESA',
  '#20b0b0',
  22,
  true
),
(
  (select id from collections where slug = 'dolly'),
  'DANUBIO',
  null,
  '/images/hilados/dolly cotton 8-3 ovillos/m655 danubio.webp',
  'DANUBIO',
  '#4090c0',
  23,
  true
),
(
  (select id from collections where slug = 'dolly'),
  'VERDE LORO',
  null,
  '/images/hilados/dolly cotton 8-3 ovillos/m703 verde loro.webp',
  'VERDE LORO',
  '#6a8e28',
  24,
  true
),
(
  (select id from collections where slug = 'dolly'),
  'BOTELLA',
  null,
  '/images/hilados/dolly cotton 8-3 ovillos/m704 botella.webp',
  'BOTELLA',
  '#2a5030',
  25,
  true
),
(
  (select id from collections where slug = 'dolly'),
  'MANZANA',
  null,
  '/images/hilados/dolly cotton 8-3 ovillos/m705 manzana.webp',
  'MANZANA',
  '#78b820',
  26,
  true
),
(
  (select id from collections where slug = 'dolly'),
  'MUSGO',
  null,
  '/images/hilados/dolly cotton 8-3 ovillos/m756 musgo.webp',
  'MUSGO',
  '#526840',
  27,
  true
),
(
  (select id from collections where slug = 'flower'),
  'CRUDO',
  null,
  '/images/hilados/flower/crudo flower-1.webp',
  'CRUDO',
  '#f2e6d0',
  0,
  true
),
(
  (select id from collections where slug = 'flower'),
  'NEGRO',
  null,
  '/images/hilados/flower/negro flower-1.webp',
  'NEGRO',
  '#1c1c1c',
  1,
  true
),
(
  (select id from collections where slug = 'flower'),
  'GRIS PLATA',
  null,
  '/images/hilados/flower/gris plata flower-1.webp',
  'GRIS PLATA',
  '#c8c8c0',
  2,
  true
),
(
  (select id from collections where slug = 'flower'),
  'ARENA',
  null,
  '/images/hilados/flower/arena flower.webp',
  'ARENA',
  '#d4c4a8',
  3,
  true
),
(
  (select id from collections where slug = 'flower'),
  'CAMEL',
  null,
  '/images/hilados/flower/camel-1.webp',
  'CAMEL',
  '#c09060',
  4,
  true
),
(
  (select id from collections where slug = 'flower'),
  'NUDE',
  null,
  '/images/hilados/flower/nude flower-1.webp',
  'NUDE',
  '#e8c8a8',
  5,
  true
),
(
  (select id from collections where slug = 'flower'),
  'ROJO',
  null,
  '/images/hilados/flower/rojo flower-1.webp',
  'ROJO',
  '#cc1c08',
  6,
  true
),
(
  (select id from collections where slug = 'flower'),
  'FUCSIA',
  null,
  '/images/hilados/flower/fucsia flower.webp',
  'FUCSIA',
  '#e0206a',
  7,
  true
),
(
  (select id from collections where slug = 'flower'),
  'LILA',
  null,
  '/images/hilados/flower/lila flower-1.webp',
  'LILA',
  '#b890d0',
  8,
  true
),
(
  (select id from collections where slug = 'flower'),
  'ESMERALDA',
  null,
  '/images/hilados/flower/esmeralda flower-1.webp',
  'ESMERALDA',
  '#1a8040',
  9,
  true
),
(
  (select id from collections where slug = 'flower'),
  'FRANCIA',
  null,
  '/images/hilados/flower/francia flower-1.webp',
  'FRANCIA',
  '#0040a0',
  10,
  true
),
(
  (select id from collections where slug = 'fresh'),
  'CRUDO',
  null,
  '/images/hilados/fresh/crudo 01.webp',
  'CRUDO',
  '#f2e6d0',
  0,
  true
),
(
  (select id from collections where slug = 'fresh'),
  'BLANCO',
  null,
  '/images/hilados/fresh/m002-a.webp',
  'BLANCO',
  '#f8f8f5',
  1,
  true
),
(
  (select id from collections where slug = 'fresh'),
  'GRIS CLARO',
  null,
  '/images/hilados/fresh/m003-a.webp',
  'GRIS CLARO',
  '#c0bdb5',
  2,
  true
),
(
  (select id from collections where slug = 'fresh'),
  'NEGRO',
  null,
  '/images/hilados/fresh/m050-a.webp',
  'NEGRO',
  '#1c1c1c',
  3,
  true
),
(
  (select id from collections where slug = 'fresh'),
  'ARENA',
  null,
  '/images/hilados/fresh/m051-a.webp',
  'ARENA',
  '#d4c4a8',
  4,
  true
),
(
  (select id from collections where slug = 'fresh'),
  'NARANJA',
  null,
  '/images/hilados/fresh/m203-a.webp',
  'NARANJA',
  '#f06820',
  5,
  true
),
(
  (select id from collections where slug = 'fresh'),
  'DAMASCO',
  null,
  '/images/hilados/fresh/damasco 251.webp',
  'DAMASCO',
  '#e09870',
  6,
  true
),
(
  (select id from collections where slug = 'fresh'),
  'LANGOSTINO',
  null,
  '/images/hilados/fresh/langostino 211.webp',
  'LANGOSTINO',
  '#e89878',
  7,
  true
),
(
  (select id from collections where slug = 'fresh'),
  'FUEGO',
  null,
  '/images/hilados/fresh/fuego 310.webp',
  'FUEGO',
  '#e84800',
  8,
  true
),
(
  (select id from collections where slug = 'fresh'),
  'FUCSIA',
  null,
  '/images/hilados/fresh/fuccia 501.webp',
  'FUCSIA',
  '#e0206a',
  9,
  true
),
(
  (select id from collections where slug = 'fresh'),
  'ROSA CLARO',
  null,
  '/images/hilados/fresh/rosa claro 551.webp',
  'ROSA CLARO',
  '#f0b8c8',
  10,
  true
),
(
  (select id from collections where slug = 'fresh'),
  'ROSA VIEJO',
  null,
  '/images/hilados/fresh/rosa viejo 552.webp',
  'ROSA VIEJO',
  '#c89898',
  11,
  true
),
(
  (select id from collections where slug = 'fresh'),
  'NUDE',
  null,
  '/images/hilados/fresh/nude555.webp',
  'NUDE',
  '#e8c8a8',
  12,
  true
),
(
  (select id from collections where slug = 'fresh'),
  'PATITO',
  null,
  '/images/hilados/fresh/patito 101.webp',
  'PATITO',
  '#f0d050',
  13,
  true
),
(
  (select id from collections where slug = 'fresh'),
  'GIRASOL',
  null,
  '/images/hilados/fresh/girasol 105.webp',
  'GIRASOL',
  '#f0c020',
  14,
  true
),
(
  (select id from collections where slug = 'fresh'),
  'GRIS MEDIO',
  null,
  '/images/hilados/fresh/gris medio 004.webp',
  'GRIS MEDIO',
  '#888480',
  15,
  true
),
(
  (select id from collections where slug = 'fresh'),
  'CELESTE BB',
  null,
  '/images/hilados/fresh/celeste 601.webp',
  'CELESTE BB',
  '#a8d8f8',
  16,
  true
),
(
  (select id from collections where slug = 'fresh'),
  'TURQUESA',
  null,
  '/images/hilados/fresh/m651-b.webp',
  'TURQUESA',
  '#20b0b0',
  17,
  true
),
(
  (select id from collections where slug = 'fresh'),
  'PISCINA',
  null,
  '/images/hilados/fresh/piscina 657.webp',
  'PISCINA',
  '#40c0c0',
  18,
  true
),
(
  (select id from collections where slug = 'fresh'),
  'MANZANA',
  null,
  '/images/hilados/fresh/manzana 705.webp',
  'MANZANA',
  '#78b820',
  19,
  true
),
(
  (select id from collections where slug = 'fresh'),
  'VERDE AGUA',
  null,
  '/images/hilados/fresh/verde agua 701.webp',
  'VERDE AGUA',
  '#30b898',
  20,
  true
),
(
  (select id from collections where slug = 'fresh'),
  'VERDE LORO',
  null,
  '/images/hilados/fresh/verde loro 703.webp',
  'VERDE LORO',
  '#6a8e28',
  21,
  true
),
(
  (select id from collections where slug = 'fresh'),
  'EUCALIPTUS',
  null,
  '/images/hilados/fresh/eucaliptus 709.webp',
  'EUCALIPTUS',
  '#5a8848',
  22,
  true
),
(
  (select id from collections where slug = 'fresh'),
  'LILA',
  null,
  '/images/hilados/fresh/lila 465.webp',
  'LILA',
  '#b890d0',
  23,
  true
),
(
  (select id from collections where slug = 'fresh'),
  'CHOCOLATADA',
  null,
  '/images/hilados/fresh/chocolatada 067.webp',
  'CHOCOLATADA',
  '#6b4226',
  24,
  true
),
(
  (select id from collections where slug = 'glam'),
  'CRUDO',
  null,
  '/images/hilados/glam/m001-crudo.webp',
  'CRUDO',
  '#f2e6d0',
  0,
  true
),
(
  (select id from collections where slug = 'glam'),
  'BLANCO',
  null,
  '/images/hilados/glam/m002-blanco.webp',
  'BLANCO',
  '#f8f8f5',
  1,
  true
),
(
  (select id from collections where slug = 'glam'),
  'GRIS CLARO',
  null,
  '/images/hilados/glam/m003-grisclaro.webp',
  'GRIS CLARO',
  '#c0bdb5',
  2,
  true
),
(
  (select id from collections where slug = 'glam'),
  'NEGRO',
  null,
  '/images/hilados/glam/m050-negro.webp',
  'NEGRO',
  '#1c1c1c',
  3,
  true
),
(
  (select id from collections where slug = 'glam'),
  'ARENA',
  null,
  '/images/hilados/glam/m051-arena.webp',
  'ARENA',
  '#d4c4a8',
  4,
  true
),
(
  (select id from collections where slug = 'glam'),
  'CAMEL',
  null,
  '/images/hilados/glam/m053- camel.webp',
  'CAMEL',
  '#c09060',
  5,
  true
),
(
  (select id from collections where slug = 'glam'),
  'FUEGO',
  null,
  '/images/hilados/glam/m310-fuego.webp',
  'FUEGO',
  '#e84800',
  6,
  true
),
(
  (select id from collections where slug = 'glam'),
  'NUDE',
  null,
  '/images/hilados/glam/m555-nude.webp',
  'NUDE',
  '#e8c8a8',
  7,
  true
),
(
  (select id from collections where slug = 'glam'),
  'VERDE LORO',
  null,
  '/images/hilados/glam/m703-verdeloro.webp',
  'VERDE LORO',
  '#6a8e28',
  8,
  true
),
(
  (select id from collections where slug = 'kiko'),
  'CRUDO',
  null,
  '/images/hilados/kiko/m001 crudo.webp',
  'CRUDO',
  '#f2e6d0',
  0,
  true
),
(
  (select id from collections where slug = 'kiko'),
  'BLANCO',
  null,
  '/images/hilados/kiko/m002 blanco.webp',
  'BLANCO',
  '#f8f8f5',
  1,
  true
),
(
  (select id from collections where slug = 'kiko'),
  'GRIS CLARO',
  null,
  '/images/hilados/kiko/m003 gris claro.webp',
  'GRIS CLARO',
  '#c0bdb5',
  2,
  true
),
(
  (select id from collections where slug = 'kiko'),
  'GRIS MEDIO',
  null,
  '/images/hilados/kiko/m004 gris medio.webp',
  'GRIS MEDIO',
  '#888480',
  3,
  true
),
(
  (select id from collections where slug = 'kiko'),
  'NEGRO',
  null,
  '/images/hilados/kiko/m050 negro.webp',
  'NEGRO',
  '#1c1c1c',
  4,
  true
),
(
  (select id from collections where slug = 'kiko'),
  'CAMEL',
  null,
  '/images/hilados/kiko/m053 camel.webp',
  'CAMEL',
  '#c09060',
  5,
  true
),
(
  (select id from collections where slug = 'kiko'),
  'CHOCOLATE',
  null,
  '/images/hilados/kiko/m055 chocolate.webp',
  'CHOCOLATE',
  '#452010',
  6,
  true
),
(
  (select id from collections where slug = 'kiko'),
  'LIEBRE',
  null,
  '/images/hilados/kiko/m056 liebre.webp',
  'LIEBRE',
  '#9a7a60',
  7,
  true
),
(
  (select id from collections where slug = 'kiko'),
  'CHOCOLATADA',
  null,
  '/images/hilados/kiko/m067 chocolatada.webp',
  'CHOCOLATADA',
  '#6b4226',
  8,
  true
),
(
  (select id from collections where slug = 'kiko'),
  'PARDO',
  null,
  '/images/hilados/kiko/m068 pardo.webp',
  'PARDO',
  '#9a7050',
  9,
  true
),
(
  (select id from collections where slug = 'kiko'),
  'PATITO',
  null,
  '/images/hilados/kiko/m101 patito.webp',
  'PATITO',
  '#f0d050',
  10,
  true
),
(
  (select id from collections where slug = 'kiko'),
  'LANGOSTINO',
  null,
  '/images/hilados/kiko/m211 langostino.webp',
  'LANGOSTINO',
  '#e89878',
  11,
  true
),
(
  (select id from collections where slug = 'kiko'),
  'ROJO',
  null,
  '/images/hilados/kiko/m301 rojo.webp',
  'ROJO',
  '#cc1c08',
  12,
  true
),
(
  (select id from collections where slug = 'kiko'),
  'FUEGO',
  null,
  '/images/hilados/kiko/m310 fuego.webp',
  'FUEGO',
  '#e84800',
  13,
  true
),
(
  (select id from collections where slug = 'kiko'),
  'BORDO',
  null,
  '/images/hilados/kiko/m351 bordo.webp',
  'BORDO',
  '#7a1020',
  14,
  true
),
(
  (select id from collections where slug = 'kiko'),
  'BABY LILA',
  null,
  '/images/hilados/kiko/m461 baby lila.webp',
  'BABY LILA',
  '#c8a8e0',
  15,
  true
),
(
  (select id from collections where slug = 'kiko'),
  'MAGENTA',
  null,
  '/images/hilados/kiko/m510 magenta.webp',
  'MAGENTA',
  '#c020a0',
  16,
  true
),
(
  (select id from collections where slug = 'kiko'),
  'ROSA CLARO',
  null,
  '/images/hilados/kiko/m551 rosa claro.webp',
  'ROSA CLARO',
  '#f0b8c8',
  17,
  true
),
(
  (select id from collections where slug = 'kiko'),
  'ROSA VIEJO',
  null,
  '/images/hilados/kiko/m552 rosa viejo.webp',
  'ROSA VIEJO',
  '#c89898',
  18,
  true
),
(
  (select id from collections where slug = 'kiko'),
  'NUDE',
  null,
  '/images/hilados/kiko/m555 nude.webp',
  'NUDE',
  '#e8c8a8',
  19,
  true
),
(
  (select id from collections where slug = 'kiko'),
  'FRANCIA',
  null,
  '/images/hilados/kiko/m604 francia.webp',
  'FRANCIA',
  '#0040a0',
  20,
  true
),
(
  (select id from collections where slug = 'kiko'),
  'JEAN',
  null,
  '/images/hilados/kiko/m605 jean.webp',
  'JEAN',
  '#4878b0',
  21,
  true
),
(
  (select id from collections where slug = 'kiko'),
  'MARINO',
  null,
  '/images/hilados/kiko/m606 marino.webp',
  'MARINO',
  '#1a2e60',
  22,
  true
),
(
  (select id from collections where slug = 'kiko'),
  'PISCINA',
  null,
  '/images/hilados/kiko/m654 piscina.webp',
  'PISCINA',
  '#40c0c0',
  23,
  true
),
(
  (select id from collections where slug = 'kiko'),
  'VERDE CLARO',
  null,
  '/images/hilados/kiko/m702 verde claro.webp',
  'VERDE CLARO',
  '#7ab840',
  24,
  true
),
(
  (select id from collections where slug = 'kiko'),
  'EUCALIPTUS',
  null,
  '/images/hilados/kiko/m709 eucaliptus.webp',
  'EUCALIPTUS',
  '#5a8848',
  25,
  true
),
(
  (select id from collections where slug = 'kiko'),
  'MUSGO',
  null,
  '/images/hilados/kiko/m756 musgo.webp',
  'MUSGO',
  '#526840',
  26,
  true
),
(
  (select id from collections where slug = 'mandala'),
  'PLATA',
  null,
  '/images/hilados/mandala/3002 plata.webp',
  'PLATA',
  '#c8c8c0',
  0,
  true
),
(
  (select id from collections where slug = 'mandala'),
  'GRIS CLARO',
  null,
  '/images/hilados/mandala/3003 gris claro.webp',
  'GRIS CLARO',
  '#c0bdb5',
  1,
  true
),
(
  (select id from collections where slug = 'mandala'),
  'HUMO',
  null,
  '/images/hilados/mandala/3011 humo.webp',
  'HUMO',
  '#707070',
  2,
  true
),
(
  (select id from collections where slug = 'mandala'),
  'CHOCOLATE',
  null,
  '/images/hilados/mandala/3051 chocolate.webp',
  'CHOCOLATE',
  '#452010',
  3,
  true
),
(
  (select id from collections where slug = 'mandala'),
  'CAFÉ',
  null,
  '/images/hilados/mandala/3055 cafe.webp',
  'CAFÉ',
  '#6a4828',
  4,
  true
),
(
  (select id from collections where slug = 'mandala'),
  'CAMEL',
  null,
  '/images/hilados/mandala/3056 camel.webp',
  'CAMEL',
  '#c09060',
  5,
  true
),
(
  (select id from collections where slug = 'mandala'),
  'ROJO',
  null,
  '/images/hilados/mandala/3303 rojo.webp',
  'ROJO',
  '#cc1c08',
  6,
  true
),
(
  (select id from collections where slug = 'mandala'),
  'MAQUILLAJE',
  null,
  '/images/hilados/mandala/3311 maquillaje.webp',
  'MAQUILLAJE',
  '#e8b090',
  7,
  true
),
(
  (select id from collections where slug = 'mandala'),
  'BORDO',
  null,
  '/images/hilados/mandala/3351 bordo.webp',
  'BORDO',
  '#7a1020',
  8,
  true
),
(
  (select id from collections where slug = 'mandala'),
  'VIOLETA',
  null,
  '/images/hilados/mandala/3401 violet.webp',
  'VIOLETA',
  '#7b3fa0',
  9,
  true
),
(
  (select id from collections where slug = 'mandala'),
  'FRAMBUESA',
  null,
  '/images/hilados/mandala/3453 frambuesa.webp',
  'FRAMBUESA',
  '#c02060',
  10,
  true
),
(
  (select id from collections where slug = 'mandala'),
  'RAINBOW',
  null,
  '/images/hilados/mandala/3505 rainbow.webp',
  'RAINBOW',
  '#e0a0c0',
  11,
  true
),
(
  (select id from collections where slug = 'mandala'),
  'ROSA',
  null,
  '/images/hilados/mandala/3508 rosa.webp',
  'ROSA',
  '#f0b8c8',
  12,
  true
),
(
  (select id from collections where slug = 'mandala'),
  'PASTEL',
  null,
  '/images/hilados/mandala/3600 pastel.webp',
  'PASTEL',
  '#b0c8e8',
  13,
  true
),
(
  (select id from collections where slug = 'mandala'),
  'JEAN',
  null,
  '/images/hilados/mandala/3602 jean.webp',
  'JEAN',
  '#4878b0',
  14,
  true
),
(
  (select id from collections where slug = 'mandala'),
  'SUAVE',
  null,
  '/images/hilados/mandala/3607 suave.webp',
  'SUAVE',
  '#80c8c0',
  15,
  true
),
(
  (select id from collections where slug = 'mandala'),
  'VERANO',
  null,
  '/images/hilados/mandala/3612 verano.webp',
  'VERANO',
  '#a8d8b0',
  16,
  true
),
(
  (select id from collections where slug = 'mandala'),
  'STEEL',
  null,
  '/images/hilados/mandala/3613 steel.webp',
  'STEEL',
  '#5070a0',
  17,
  true
),
(
  (select id from collections where slug = 'mandala'),
  'AGUAMARINA',
  null,
  '/images/hilados/mandala/3653 aguamarina.webp',
  'AGUAMARINA',
  '#40c0b0',
  18,
  true
),
(
  (select id from collections where slug = 'mandala'),
  'BOTELLA',
  null,
  '/images/hilados/mandala/3703 botella.webp',
  'BOTELLA',
  '#2a5030',
  19,
  true
),
(
  (select id from collections where slug = 'milano'),
  'CRUDO',
  null,
  '/images/hilados/milano/m001-crudo.webp',
  'CRUDO',
  '#f2e6d0',
  0,
  true
),
(
  (select id from collections where slug = 'milano'),
  'GRIS CLARO',
  null,
  '/images/hilados/milano/m003 gris claro.webp',
  'GRIS CLARO',
  '#c0bdb5',
  1,
  true
),
(
  (select id from collections where slug = 'milano'),
  'GRIS OSCURO',
  null,
  '/images/hilados/milano/m005 gris oscuro.webp',
  'GRIS OSCURO',
  '#505050',
  2,
  true
),
(
  (select id from collections where slug = 'milano'),
  'NEGRO',
  null,
  '/images/hilados/milano/m050 negro.webp',
  'NEGRO',
  '#1c1c1c',
  3,
  true
),
(
  (select id from collections where slug = 'milano'),
  'ARENA',
  null,
  '/images/hilados/milano/m051 arena.webp',
  'ARENA',
  '#d4c4a8',
  4,
  true
),
(
  (select id from collections where slug = 'milano'),
  'NUVEM',
  null,
  '/images/hilados/milano/m057 nuvem.webp',
  'NUVEM',
  '#d4cec8',
  5,
  true
),
(
  (select id from collections where slug = 'milano'),
  'ÁCIDO',
  null,
  '/images/hilados/milano/m104 acido.webp',
  'ÁCIDO',
  '#c0e020',
  6,
  true
),
(
  (select id from collections where slug = 'milano'),
  'VIOLETA',
  null,
  '/images/hilados/milano/m401 violeta.webp',
  'VIOLETA',
  '#7b3fa0',
  7,
  true
),
(
  (select id from collections where slug = 'milano'),
  'FUCSIA',
  null,
  '/images/hilados/milano/m501 fucsia.webp',
  'FUCSIA',
  '#e0206a',
  8,
  true
),
(
  (select id from collections where slug = 'milano'),
  'CORAL',
  null,
  '/images/hilados/milano/m554 coral.webp',
  'CORAL',
  '#e87060',
  9,
  true
),
(
  (select id from collections where slug = 'milano'),
  'PIEL',
  null,
  '/images/hilados/milano/m556 piel.webp',
  'PIEL',
  '#f0c0a0',
  10,
  true
),
(
  (select id from collections where slug = 'milano'),
  'NÍSPERO',
  null,
  '/images/hilados/milano/m560 nispero.webp',
  'NÍSPERO',
  '#e0a070',
  11,
  true
),
(
  (select id from collections where slug = 'milano'),
  'JEAN',
  null,
  '/images/hilados/milano/m605 jean.webp',
  'JEAN',
  '#4878b0',
  12,
  true
),
(
  (select id from collections where slug = 'milano'),
  'VERDE LORO',
  null,
  '/images/hilados/milano/m703 verde loro.webp',
  'VERDE LORO',
  '#6a8e28',
  13,
  true
),
(
  (select id from collections where slug = 'niky'),
  'CRUDO',
  null,
  '/images/hilados/niky/m001 crudo.webp',
  'CRUDO',
  '#f2e6d0',
  0,
  true
),
(
  (select id from collections where slug = 'niky'),
  'BLANCO',
  null,
  '/images/hilados/niky/m002 blanco.webp',
  'BLANCO',
  '#f8f8f5',
  1,
  true
),
(
  (select id from collections where slug = 'niky'),
  'GRIS CLARO',
  null,
  '/images/hilados/niky/m003 gris claro.webp',
  'GRIS CLARO',
  '#c0bdb5',
  2,
  true
),
(
  (select id from collections where slug = 'niky'),
  'NEGRO',
  null,
  '/images/hilados/niky/m050 negro.webp',
  'NEGRO',
  '#1c1c1c',
  3,
  true
),
(
  (select id from collections where slug = 'niky'),
  'ARENA',
  null,
  '/images/hilados/niky/m051 arena.webp',
  'ARENA',
  '#d4c4a8',
  4,
  true
),
(
  (select id from collections where slug = 'niky'),
  'CAMEL',
  null,
  '/images/hilados/niky/m053 camel.webp',
  'CAMEL',
  '#c09060',
  5,
  true
),
(
  (select id from collections where slug = 'niky'),
  'CHOCOLATE',
  null,
  '/images/hilados/niky/m055 chocolate.webp',
  'CHOCOLATE',
  '#452010',
  6,
  true
),
(
  (select id from collections where slug = 'niky'),
  'NUVEM',
  null,
  '/images/hilados/niky/m057 nuvem.webp',
  'NUVEM',
  '#d4cec8',
  7,
  true
),
(
  (select id from collections where slug = 'niky'),
  'ROCA',
  null,
  '/images/hilados/niky/m059 roca.webp',
  'ROCA',
  '#8a8078',
  8,
  true
),
(
  (select id from collections where slug = 'niky'),
  'NATA',
  null,
  '/images/hilados/niky/m063 nata.webp',
  'NATA',
  '#f0e8d0',
  9,
  true
),
(
  (select id from collections where slug = 'niky'),
  'CANELA',
  null,
  '/images/hilados/niky/m066 canela.webp',
  'CANELA',
  '#c08040',
  10,
  true
),
(
  (select id from collections where slug = 'niky'),
  'CHOCOLATADA',
  null,
  '/images/hilados/niky/m067 chocolatada.webp',
  'CHOCOLATADA',
  '#6b4226',
  11,
  true
),
(
  (select id from collections where slug = 'niky'),
  'RAÍZ',
  null,
  '/images/hilados/niky/m071 raiz.webp',
  'RAÍZ',
  '#8a6040',
  12,
  true
),
(
  (select id from collections where slug = 'niky'),
  'PATITO',
  null,
  '/images/hilados/niky/m101 patito.webp',
  'PATITO',
  '#f0d050',
  13,
  true
),
(
  (select id from collections where slug = 'niky'),
  'NARANJA',
  null,
  '/images/hilados/niky/m203 naranja.webp',
  'NARANJA',
  '#f06820',
  14,
  true
),
(
  (select id from collections where slug = 'niky'),
  'MAQUILLAJE',
  null,
  '/images/hilados/niky/m212 maquillaje.webp',
  'MAQUILLAJE',
  '#e8b090',
  15,
  true
),
(
  (select id from collections where slug = 'niky'),
  'ROJO OSCURO',
  null,
  '/images/hilados/niky/m302 rojo oscuro.webp',
  'ROJO OSCURO',
  '#8a1500',
  16,
  true
),
(
  (select id from collections where slug = 'niky'),
  'FRAMBUESA',
  null,
  '/images/hilados/niky/m306 frambuesa.webp',
  'FRAMBUESA',
  '#c02060',
  17,
  true
),
(
  (select id from collections where slug = 'niky'),
  'BORDO',
  null,
  '/images/hilados/niky/m351 bordo.webp',
  'BORDO',
  '#7a1020',
  18,
  true
),
(
  (select id from collections where slug = 'niky'),
  'ROSA CLARO',
  null,
  '/images/hilados/niky/m551 rosa claro.webp',
  'ROSA CLARO',
  '#f0b8c8',
  19,
  true
),
(
  (select id from collections where slug = 'niky'),
  'ROSA VIEJO',
  null,
  '/images/hilados/niky/m552 rosa viejo.webp',
  'ROSA VIEJO',
  '#c89898',
  20,
  true
),
(
  (select id from collections where slug = 'niky'),
  'NUDE',
  null,
  '/images/hilados/niky/m555 nude.webp',
  'NUDE',
  '#e8c8a8',
  21,
  true
),
(
  (select id from collections where slug = 'niky'),
  'ROSA SUCIO',
  null,
  '/images/hilados/niky/m557 rosa sucio.webp',
  'ROSA SUCIO',
  '#c09090',
  22,
  true
),
(
  (select id from collections where slug = 'niky'),
  'CELESTE BB',
  null,
  '/images/hilados/niky/m601 celeste bebe.webp',
  'CELESTE BB',
  '#a8d8f8',
  23,
  true
),
(
  (select id from collections where slug = 'niky'),
  'FRANCIA',
  null,
  '/images/hilados/niky/m604 francia.webp',
  'FRANCIA',
  '#0040a0',
  24,
  true
),
(
  (select id from collections where slug = 'niky'),
  'MARINO',
  null,
  '/images/hilados/niky/m606 marino.webp',
  'MARINO',
  '#1a2e60',
  25,
  true
),
(
  (select id from collections where slug = 'niky'),
  'AERO',
  null,
  '/images/hilados/niky/m609 aero.webp',
  'AERO',
  '#80b8d8',
  26,
  true
),
(
  (select id from collections where slug = 'niky'),
  'PISCINA',
  null,
  '/images/hilados/niky/m654 piscina.webp',
  'PISCINA',
  '#40c0c0',
  27,
  true
),
(
  (select id from collections where slug = 'niky'),
  'MANZANA',
  null,
  '/images/hilados/niky/m705 manzana.webp',
  'MANZANA',
  '#78b820',
  28,
  true
),
(
  (select id from collections where slug = 'niky'),
  'EUCALIPTUS',
  null,
  '/images/hilados/niky/m709 eucaliptus.webp',
  'EUCALIPTUS',
  '#5a8848',
  29,
  true
),
(
  (select id from collections where slug = 'niky'),
  'MUSGO',
  null,
  '/images/hilados/niky/m756 musgo.webp',
  'MUSGO',
  '#526840',
  30,
  true
),
(
  (select id from collections where slug = 'nordico'),
  'CRUDO',
  null,
  '/images/hilados/nordico/m001 crudo.webp',
  'CRUDO',
  '#f2e6d0',
  0,
  true
),
(
  (select id from collections where slug = 'nordico'),
  'BLANCO',
  null,
  '/images/hilados/nordico/m002 blanco.webp',
  'BLANCO',
  '#f8f8f5',
  1,
  true
),
(
  (select id from collections where slug = 'nordico'),
  'GRIS CLARO',
  null,
  '/images/hilados/nordico/m003 gris claro.webp',
  'GRIS CLARO',
  '#c0bdb5',
  2,
  true
),
(
  (select id from collections where slug = 'nordico'),
  'NEGRO',
  null,
  '/images/hilados/nordico/m050 negro.webp',
  'NEGRO',
  '#1c1c1c',
  3,
  true
),
(
  (select id from collections where slug = 'nordico'),
  'CAMEL',
  null,
  '/images/hilados/nordico/m053 camel.webp',
  'CAMEL',
  '#c09060',
  4,
  true
),
(
  (select id from collections where slug = 'nordico'),
  'CHOCOLATE',
  null,
  '/images/hilados/nordico/m055 chocolate.webp',
  'CHOCOLATE',
  '#452010',
  5,
  true
),
(
  (select id from collections where slug = 'nordico'),
  'NUVEM',
  null,
  '/images/hilados/nordico/m057 nuvem.webp',
  'NUVEM',
  '#d4cec8',
  6,
  true
),
(
  (select id from collections where slug = 'nordico'),
  'ROCA',
  null,
  '/images/hilados/nordico/m059 roca.webp',
  'ROCA',
  '#8a8078',
  7,
  true
),
(
  (select id from collections where slug = 'nordico'),
  'ROSA CLARO',
  null,
  '/images/hilados/nordico/m551 rosa claro.webp',
  'ROSA CLARO',
  '#f0b8c8',
  8,
  true
),
(
  (select id from collections where slug = 'nordico'),
  'CELESTE BB',
  null,
  '/images/hilados/nordico/m601 celeste bebe.webp',
  'CELESTE BB',
  '#a8d8f8',
  9,
  true
),
(
  (select id from collections where slug = 'nordico'),
  'JEAN',
  null,
  '/images/hilados/nordico/m605 jean.webp',
  'JEAN',
  '#4878b0',
  10,
  true
),
(
  (select id from collections where slug = 'nordico'),
  'EUCALIPTUS',
  null,
  '/images/hilados/nordico/m709 eucaliptus.webp',
  'EUCALIPTUS',
  '#5a8848',
  11,
  true
),
(
  (select id from collections where slug = 'pampa'),
  'CRUDO',
  null,
  '/images/hilados/pampa/m001 - crudo.webp',
  'CRUDO',
  '#f2e6d0',
  0,
  true
),
(
  (select id from collections where slug = 'pampa'),
  'GRIS CLARO',
  null,
  '/images/hilados/pampa/m003 - gris claro.webp',
  'GRIS CLARO',
  '#c0bdb5',
  1,
  true
),
(
  (select id from collections where slug = 'pampa'),
  'GRIS MEDIO',
  null,
  '/images/hilados/pampa/m004 - gris medio.webp',
  'GRIS MEDIO',
  '#888480',
  2,
  true
),
(
  (select id from collections where slug = 'pampa'),
  'CAMEL',
  null,
  '/images/hilados/pampa/m053 - camel.webp',
  'CAMEL',
  '#c09060',
  3,
  true
),
(
  (select id from collections where slug = 'pampa'),
  'CHOCOLATE',
  null,
  '/images/hilados/pampa/m055-chocolate.webp',
  'CHOCOLATE',
  '#452010',
  4,
  true
),
(
  (select id from collections where slug = 'pampa'),
  'TOSTADO',
  null,
  '/images/hilados/pampa/m062 - tostado.webp',
  'TOSTADO',
  '#a07840',
  5,
  true
),
(
  (select id from collections where slug = 'pampa'),
  'PARDO',
  null,
  '/images/hilados/pampa/pardo-m068.webp',
  'PARDO',
  '#9a7050',
  6,
  true
),
(
  (select id from collections where slug = 'pampa'),
  'LIEBRE',
  null,
  '/images/hilados/pampa/liebre-m056.webp',
  'LIEBRE',
  '#9a7a60',
  7,
  true
),
(
  (select id from collections where slug = 'pampa'),
  'NUVEM',
  null,
  '/images/hilados/pampa/nuvem-m057.webp',
  'NUVEM',
  '#d4cec8',
  8,
  true
),
(
  (select id from collections where slug = 'pampa'),
  'LADRILLO',
  null,
  '/images/hilados/pampa/m256 - ladrillo.webp',
  'LADRILLO',
  '#b04030',
  9,
  true
),
(
  (select id from collections where slug = 'pampa'),
  'ROJIZO',
  null,
  '/images/hilados/pampa/m308 - rojizo.webp',
  'ROJIZO',
  '#c03020',
  10,
  true
),
(
  (select id from collections where slug = 'pampa'),
  'DAMASCO',
  null,
  '/images/hilados/pampa/damascoo-m251.webp',
  'DAMASCO',
  '#e09870',
  11,
  true
),
(
  (select id from collections where slug = 'pampa'),
  'BORDO',
  null,
  '/images/hilados/pampa/bordo-m351.webp',
  'BORDO',
  '#7a1020',
  12,
  true
),
(
  (select id from collections where slug = 'pampa'),
  'MAQUILLAJE',
  null,
  '/images/hilados/pampa/maquillaje-m212.webp',
  'MAQUILLAJE',
  '#e8b090',
  13,
  true
),
(
  (select id from collections where slug = 'pampa'),
  'NUDE',
  null,
  '/images/hilados/pampa/m555 - nude .webp',
  'NUDE',
  '#e8c8a8',
  14,
  true
),
(
  (select id from collections where slug = 'pampa'),
  'ROSA VIEJO',
  null,
  '/images/hilados/pampa/pampa rosa viejo-m552.webp',
  'ROSA VIEJO',
  '#c89898',
  15,
  true
),
(
  (select id from collections where slug = 'pampa'),
  'VELVET',
  null,
  '/images/hilados/pampa/pampa velvet- m455.webp',
  'VELVET',
  '#9050a0',
  16,
  true
),
(
  (select id from collections where slug = 'pampa'),
  'ACERO',
  null,
  '/images/hilados/pampa/m613 - acero.webp',
  'ACERO',
  '#607080',
  17,
  true
),
(
  (select id from collections where slug = 'pampa'),
  'DENIM',
  null,
  '/images/hilados/pampa/pampa denim-m611.webp',
  'DENIM',
  '#4878b0',
  18,
  true
),
(
  (select id from collections where slug = 'pampa'),
  'MARINO',
  null,
  '/images/hilados/pampa/pampa marino-m606.webp',
  'MARINO',
  '#1a2e60',
  19,
  true
),
(
  (select id from collections where slug = 'pampa'),
  'CELESTE SUCIO',
  null,
  '/images/hilados/pampa/celeste sucio m610.webp',
  'CELESTE SUCIO',
  '#8ab8d8',
  20,
  true
),
(
  (select id from collections where slug = 'pampa'),
  'MANZANA',
  null,
  '/images/hilados/pampa/manzana m705.webp',
  'MANZANA',
  '#78b820',
  21,
  true
),
(
  (select id from collections where slug = 'pampa'),
  'EUCALIPTUS',
  null,
  '/images/hilados/pampa/m709 - eucalipto.webp',
  'EUCALIPTUS',
  '#5a8848',
  22,
  true
),
(
  (select id from collections where slug = 'pampa'),
  'MUSGO',
  null,
  '/images/hilados/pampa/pampa musgo-m756.webp',
  'MUSGO',
  '#526840',
  23,
  true
),
(
  (select id from collections where slug = 'pampa'),
  'HOJA',
  null,
  '/images/hilados/pampa/hoja m756.webp',
  'HOJA',
  '#4a6028',
  24,
  true
),
(
  (select id from collections where slug = 'pampa'),
  'LANGOSTINO',
  null,
  '/images/hilados/pampa/langostino m211.webp',
  'LANGOSTINO',
  '#e89878',
  25,
  true
),
(
  (select id from collections where slug = 'peluche'),
  'CRUDO',
  null,
  '/images/hilados/peluche/m001 crudo.webp',
  'CRUDO',
  '#f2e6d0',
  0,
  true
),
(
  (select id from collections where slug = 'peluche'),
  'BLANCO',
  null,
  '/images/hilados/peluche/m002 blanco.webp',
  'BLANCO',
  '#f8f8f5',
  1,
  true
),
(
  (select id from collections where slug = 'peluche'),
  'GRIS CLARO',
  null,
  '/images/hilados/peluche/m003 gris claro.webp',
  'GRIS CLARO',
  '#c0bdb5',
  2,
  true
),
(
  (select id from collections where slug = 'peluche'),
  'NEGRO',
  null,
  '/images/hilados/peluche/m050 negro.webp',
  'NEGRO',
  '#1c1c1c',
  3,
  true
),
(
  (select id from collections where slug = 'peluche'),
  'ARENA',
  null,
  '/images/hilados/peluche/m051 arena.webp',
  'ARENA',
  '#d4c4a8',
  4,
  true
),
(
  (select id from collections where slug = 'peluche'),
  'CAMEL',
  null,
  '/images/hilados/peluche/m053 camel.webp',
  'CAMEL',
  '#c09060',
  5,
  true
),
(
  (select id from collections where slug = 'peluche'),
  'CHOCOLATE',
  null,
  '/images/hilados/peluche/m055 chocolate.webp',
  'CHOCOLATE',
  '#452010',
  6,
  true
),
(
  (select id from collections where slug = 'peluche'),
  'RAÍZ',
  null,
  '/images/hilados/peluche/m071 raiz.webp',
  'RAÍZ',
  '#8a6040',
  7,
  true
),
(
  (select id from collections where slug = 'peluche'),
  'FUEGO',
  null,
  '/images/hilados/peluche/m310 fuego.webp',
  'FUEGO',
  '#e84800',
  8,
  true
),
(
  (select id from collections where slug = 'peluche'),
  'ROSA CLARO',
  null,
  '/images/hilados/peluche/m551 rosa claro.webp',
  'ROSA CLARO',
  '#f0b8c8',
  9,
  true
),
(
  (select id from collections where slug = 'peluche'),
  'NUDE',
  null,
  '/images/hilados/peluche/m555 nude.webp',
  'NUDE',
  '#e8c8a8',
  10,
  true
),
(
  (select id from collections where slug = 'peluche'),
  'CELESTE BB',
  null,
  '/images/hilados/peluche/m601 celeste bebe.webp',
  'CELESTE BB',
  '#a8d8f8',
  11,
  true
),
(
  (select id from collections where slug = 'peluche'),
  'FRANCIA',
  null,
  '/images/hilados/peluche/m604 francia.webp',
  'FRANCIA',
  '#0040a0',
  12,
  true
),
(
  (select id from collections where slug = 'peluche'),
  'VERDE AGUA',
  null,
  '/images/hilados/peluche/m701 verde agua.webp',
  'VERDE AGUA',
  '#30b898',
  13,
  true
),
(
  (select id from collections where slug = 'peluche'),
  'OLIVA',
  null,
  '/images/hilados/peluche/m755 oliva.webp',
  'OLIVA',
  '#6a7030',
  14,
  true
),
(
  (select id from collections where slug = 'plush'),
  'CRUDO',
  null,
  '/images/hilados/plush/m001 crudo.webp',
  'CRUDO',
  '#f2e6d0',
  0,
  true
),
(
  (select id from collections where slug = 'plush'),
  'GRIS CLARO',
  null,
  '/images/hilados/plush/m003 gris claro.webp',
  'GRIS CLARO',
  '#c0bdb5',
  1,
  true
),
(
  (select id from collections where slug = 'plush'),
  'GRIS MEDIO',
  null,
  '/images/hilados/plush/m004 gris medio.webp',
  'GRIS MEDIO',
  '#888480',
  2,
  true
),
(
  (select id from collections where slug = 'plush'),
  'NEGRO',
  null,
  '/images/hilados/plush/m050 negro.webp',
  'NEGRO',
  '#1c1c1c',
  3,
  true
),
(
  (select id from collections where slug = 'plush'),
  'ARENA',
  null,
  '/images/hilados/plush/m051 arena.webp',
  'ARENA',
  '#d4c4a8',
  4,
  true
),
(
  (select id from collections where slug = 'plush'),
  'ÁCIDO',
  null,
  '/images/hilados/plush/m104 acido.webp',
  'ÁCIDO',
  '#c0e020',
  5,
  true
),
(
  (select id from collections where slug = 'plush'),
  'NARANJA',
  null,
  '/images/hilados/plush/m203 naranja.webp',
  'NARANJA',
  '#f06820',
  6,
  true
),
(
  (select id from collections where slug = 'plush'),
  'FUEGO',
  null,
  '/images/hilados/plush/m310 fuego.webp',
  'FUEGO',
  '#e84800',
  7,
  true
),
(
  (select id from collections where slug = 'plush'),
  'VIOLETA',
  null,
  '/images/hilados/plush/m401 violeta.webp',
  'VIOLETA',
  '#7b3fa0',
  8,
  true
),
(
  (select id from collections where slug = 'plush'),
  'BABY LILA',
  null,
  '/images/hilados/plush/m451 baby lila.webp',
  'BABY LILA',
  '#c8a8e0',
  9,
  true
),
(
  (select id from collections where slug = 'plush'),
  'PÚRPURA',
  null,
  '/images/hilados/plush/m453 purpura.webp',
  'PÚRPURA',
  '#7020a0',
  10,
  true
),
(
  (select id from collections where slug = 'plush'),
  'FUCSIA',
  null,
  '/images/hilados/plush/m501 fucsia.webp',
  'FUCSIA',
  '#e0206a',
  11,
  true
),
(
  (select id from collections where slug = 'plush'),
  'CORAL',
  null,
  '/images/hilados/plush/m554 coral.webp',
  'CORAL',
  '#e87060',
  12,
  true
),
(
  (select id from collections where slug = 'plush'),
  'PIEL',
  null,
  '/images/hilados/plush/m556 piel.webp',
  'PIEL',
  '#f0c0a0',
  13,
  true
),
(
  (select id from collections where slug = 'plush'),
  'CELESTE BB',
  null,
  '/images/hilados/plush/m601 celeste bb.webp',
  'CELESTE BB',
  '#a8d8f8',
  14,
  true
),
(
  (select id from collections where slug = 'plush'),
  'AERO',
  null,
  '/images/hilados/plush/m609 aero.webp',
  'AERO',
  '#80b8d8',
  15,
  true
),
(
  (select id from collections where slug = 'plush'),
  'DANUBIO',
  null,
  '/images/hilados/plush/m655 danubio.webp',
  'DANUBIO',
  '#4090c0',
  16,
  true
),
(
  (select id from collections where slug = 'plush'),
  'VERDE AGUA',
  null,
  '/images/hilados/plush/m701 verde agua.webp',
  'VERDE AGUA',
  '#30b898',
  17,
  true
),
(
  (select id from collections where slug = 'plush'),
  'VERDE LORO',
  null,
  '/images/hilados/plush/m703 verde loro.webp',
  'VERDE LORO',
  '#6a8e28',
  18,
  true
),
(
  (select id from collections where slug = 'plush'),
  'BOTELLA',
  null,
  '/images/hilados/plush/m704 botella.webp',
  'BOTELLA',
  '#2a5030',
  19,
  true
),
(
  (select id from collections where slug = 'plush'),
  'LIMA',
  null,
  '/images/hilados/plush/m715 lima.webp',
  'LIMA',
  '#d0e850',
  20,
  true
),
(
  (select id from collections where slug = 'plush'),
  'MUSGO',
  null,
  '/images/hilados/plush/m756 musgo.webp',
  'MUSGO',
  '#526840',
  21,
  true
),
(
  (select id from collections where slug = 'pura'),
  'CRUDO',
  null,
  '/images/hilados/pura/m001 crudo.webp',
  'CRUDO',
  '#f2e6d0',
  0,
  true
),
(
  (select id from collections where slug = 'pura'),
  'CHOCOLATE',
  null,
  '/images/hilados/pura/m055 chocolate.webp',
  'CHOCOLATE',
  '#452010',
  1,
  true
),
(
  (select id from collections where slug = 'pura'),
  'NUVEM',
  null,
  '/images/hilados/pura/m057 nuvem.webp',
  'NUVEM',
  '#d4cec8',
  2,
  true
),
(
  (select id from collections where slug = 'pura'),
  'ROCA',
  null,
  '/images/hilados/pura/m059 roca.webp',
  'ROCA',
  '#8a8078',
  3,
  true
),
(
  (select id from collections where slug = 'pura'),
  'CHOCOLATADA',
  null,
  '/images/hilados/pura/m067 chocolatada.webp',
  'CHOCOLATADA',
  '#6b4226',
  4,
  true
),
(
  (select id from collections where slug = 'pura'),
  'AFRICANO',
  null,
  '/images/hilados/pura/m070-africano.webp',
  'AFRICANO',
  '#7a6050',
  5,
  true
),
(
  (select id from collections where slug = 'rendimax'),
  'CRUDO',
  null,
  '/images/hilados/rendimax/m001-crudo (1).webp',
  'CRUDO',
  '#f2e6d0',
  0,
  true
),
(
  (select id from collections where slug = 'rendimax'),
  'BLANCO',
  null,
  '/images/hilados/rendimax/m002-blanco (2).webp',
  'BLANCO',
  '#f8f8f5',
  1,
  true
),
(
  (select id from collections where slug = 'rendimax'),
  'GRIS CLARO',
  null,
  '/images/hilados/rendimax/m003-grisclaro (1).webp',
  'GRIS CLARO',
  '#c0bdb5',
  2,
  true
),
(
  (select id from collections where slug = 'rendimax'),
  'NEGRO',
  null,
  '/images/hilados/rendimax/m050-negro (1).webp',
  'NEGRO',
  '#1c1c1c',
  3,
  true
),
(
  (select id from collections where slug = 'rendimax'),
  'ARENA',
  null,
  '/images/hilados/rendimax/m051-arena (1).webp',
  'ARENA',
  '#d4c4a8',
  4,
  true
),
(
  (select id from collections where slug = 'rendimax'),
  'CAMEL',
  null,
  '/images/hilados/rendimax/m053-camel (1).webp',
  'CAMEL',
  '#c09060',
  5,
  true
),
(
  (select id from collections where slug = 'rendimax'),
  'CHOCOLATE',
  null,
  '/images/hilados/rendimax/m055-chocolate (1).webp',
  'CHOCOLATE',
  '#452010',
  6,
  true
),
(
  (select id from collections where slug = 'rendimax'),
  'PATITO',
  null,
  '/images/hilados/rendimax/m101-patito (1).webp',
  'PATITO',
  '#f0d050',
  7,
  true
),
(
  (select id from collections where slug = 'rendimax'),
  'ORO',
  null,
  '/images/hilados/rendimax/m102-oro (1).webp',
  'ORO',
  '#d4a830',
  8,
  true
),
(
  (select id from collections where slug = 'rendimax'),
  'ROJO',
  null,
  '/images/hilados/rendimax/m301-rojo (1).webp',
  'ROJO',
  '#cc1c08',
  9,
  true
),
(
  (select id from collections where slug = 'rendimax'),
  'ROJO OSCURO',
  null,
  '/images/hilados/rendimax/m302-rojooscuro (1).webp',
  'ROJO OSCURO',
  '#8a1500',
  10,
  true
),
(
  (select id from collections where slug = 'rendimax'),
  'FUEGO',
  null,
  '/images/hilados/rendimax/m310-fuego (1).webp',
  'FUEGO',
  '#e84800',
  11,
  true
),
(
  (select id from collections where slug = 'rendimax'),
  'BORDO',
  null,
  '/images/hilados/rendimax/m351-bordo (2).webp',
  'BORDO',
  '#7a1020',
  12,
  true
),
(
  (select id from collections where slug = 'rendimax'),
  'VIOLETA',
  null,
  '/images/hilados/rendimax/m401-violeta (1).webp',
  'VIOLETA',
  '#7b3fa0',
  13,
  true
),
(
  (select id from collections where slug = 'rendimax'),
  'LILA ROSA',
  null,
  '/images/hilados/rendimax/m454-lilarosa (1).webp',
  'LILA ROSA',
  '#d0a8c8',
  14,
  true
),
(
  (select id from collections where slug = 'rendimax'),
  'FUCSIA',
  null,
  '/images/hilados/rendimax/m501-fucsia (1).webp',
  'FUCSIA',
  '#e0206a',
  15,
  true
),
(
  (select id from collections where slug = 'rendimax'),
  'ROSA CLARO',
  null,
  '/images/hilados/rendimax/m551-rosaclaro (1).webp',
  'ROSA CLARO',
  '#f0b8c8',
  16,
  true
),
(
  (select id from collections where slug = 'rendimax'),
  'CORAL',
  null,
  '/images/hilados/rendimax/m554-coral (1).webp',
  'CORAL',
  '#e87060',
  17,
  true
),
(
  (select id from collections where slug = 'rendimax'),
  'CELESTE BB',
  null,
  '/images/hilados/rendimax/m601-celestebb (1).webp',
  'CELESTE BB',
  '#a8d8f8',
  18,
  true
),
(
  (select id from collections where slug = 'rendimax'),
  'STEEL',
  null,
  '/images/hilados/rendimax/m603-steel (1).webp',
  'STEEL',
  '#5070a0',
  19,
  true
),
(
  (select id from collections where slug = 'rendimax'),
  'FRANCIA',
  null,
  '/images/hilados/rendimax/m604-francia (1).webp',
  'FRANCIA',
  '#0040a0',
  20,
  true
),
(
  (select id from collections where slug = 'rendimax'),
  'JEAN',
  null,
  '/images/hilados/rendimax/m606-jean (1).webp',
  'JEAN',
  '#4878b0',
  21,
  true
),
(
  (select id from collections where slug = 'rendimax'),
  'MARINO',
  null,
  '/images/hilados/rendimax/m606-marino (1).webp',
  'MARINO',
  '#1a2e60',
  22,
  true
),
(
  (select id from collections where slug = 'rendimax'),
  'TURQUESA',
  null,
  '/images/hilados/rendimax/m651-turquesa (1).webp',
  'TURQUESA',
  '#20b0b0',
  23,
  true
),
(
  (select id from collections where slug = 'rendimax'),
  'DANUBIO',
  null,
  '/images/hilados/rendimax/m655-danubio (1).webp',
  'DANUBIO',
  '#4090c0',
  24,
  true
),
(
  (select id from collections where slug = 'rendimax'),
  'VERDE AGUA',
  null,
  '/images/hilados/rendimax/m701-verdeagua (1).webp',
  'VERDE AGUA',
  '#30b898',
  25,
  true
),
(
  (select id from collections where slug = 'rendimax'),
  'VERDE LORO',
  null,
  '/images/hilados/rendimax/m703-loro (1).webp',
  'VERDE LORO',
  '#6a8e28',
  26,
  true
),
(
  (select id from collections where slug = 'rendimax'),
  'BOTELLA',
  null,
  '/images/hilados/rendimax/m704-botella (1).webp',
  'BOTELLA',
  '#2a5030',
  27,
  true
),
(
  (select id from collections where slug = 'rendimax'),
  'EUCALIPTUS',
  null,
  '/images/hilados/rendimax/m709-eucaliptus (1).webp',
  'EUCALIPTUS',
  '#5a8848',
  28,
  true
),
(
  (select id from collections where slug = 'rendimax'),
  'FORESTA',
  null,
  '/images/hilados/rendimax/m751-foresta (2).webp',
  'FORESTA',
  '#1e4028',
  29,
  true
),
(
  (select id from collections where slug = 'rendimax'),
  'MUSGO',
  null,
  '/images/hilados/rendimax/m756-musgo (1).webp',
  'MUSGO',
  '#526840',
  30,
  true
),
(
  (select id from collections where slug = 'sheep'),
  'GRIS CLARO',
  null,
  '/images/hilados/sheep/3003 gris claro.webp',
  'GRIS CLARO',
  '#c0bdb5',
  0,
  true
),
(
  (select id from collections where slug = 'sheep'),
  'NEGRO',
  null,
  '/images/hilados/sheep/3050 negro.webp',
  'NEGRO',
  '#1c1c1c',
  1,
  true
),
(
  (select id from collections where slug = 'sheep'),
  'CHOCOLATE',
  null,
  '/images/hilados/sheep/3051 chocolate.webp',
  'CHOCOLATE',
  '#452010',
  2,
  true
),
(
  (select id from collections where slug = 'sheep'),
  'MOSTAZA',
  null,
  '/images/hilados/sheep/3103 mostaza.webp',
  'MOSTAZA',
  '#c8a020',
  3,
  true
),
(
  (select id from collections where slug = 'sheep'),
  'ROJO',
  null,
  '/images/hilados/sheep/3303 rojo.webp',
  'ROJO',
  '#cc1c08',
  4,
  true
),
(
  (select id from collections where slug = 'sheep'),
  'CORAL',
  null,
  '/images/hilados/sheep/3502 coral.webp',
  'CORAL',
  '#e87060',
  5,
  true
),
(
  (select id from collections where slug = 'sheep'),
  'RAINBOW',
  null,
  '/images/hilados/sheep/3505 rainbow.webp',
  'RAINBOW',
  '#e0a0c0',
  6,
  true
),
(
  (select id from collections where slug = 'sheep'),
  'ROSA VIEJO',
  null,
  '/images/hilados/sheep/3551 rosa viejo.webp',
  'ROSA VIEJO',
  '#c89898',
  7,
  true
),
(
  (select id from collections where slug = 'sheep'),
  'MARINO',
  null,
  '/images/hilados/sheep/3606 marino.webp',
  'MARINO',
  '#1a2e60',
  8,
  true
),
(
  (select id from collections where slug = 'sheep'),
  'MUSGO',
  null,
  '/images/hilados/sheep/3707 musgo.webp',
  'MUSGO',
  '#526840',
  9,
  true
),
(
  (select id from collections where slug = 'sheep'),
  'VERDE',
  null,
  '/images/hilados/sheep/3708 verde.webp',
  'VERDE',
  '#4a7a4a',
  10,
  true
),
(
  (select id from collections where slug = 'sheep'),
  'CAMEL AQUA AZUL',
  null,
  '/images/hilados/sheep/3710 camel aqua azul.webp',
  'CAMEL AQUA AZUL',
  '#80b8b0',
  11,
  true
),
(
  (select id from collections where slug = 'sheep'),
  'PATITO CAMEL ROSA',
  null,
  '/images/hilados/sheep/3712 patito camel rosa.webp',
  'PATITO CAMEL ROSA',
  '#e8d0a0',
  12,
  true
),
(
  (select id from collections where slug = 'viscolan'),
  'CRUDO',
  null,
  '/images/hilados/viscolan/m001 crudo.webp',
  'CRUDO',
  '#f2e6d0',
  0,
  true
),
(
  (select id from collections where slug = 'viscolan'),
  'GRIS CLARO',
  null,
  '/images/hilados/viscolan/m003 gris claro.webp',
  'GRIS CLARO',
  '#c0bdb5',
  1,
  true
),
(
  (select id from collections where slug = 'viscolan'),
  'GRIS MEDIO',
  null,
  '/images/hilados/viscolan/m004 gris medio.webp',
  'GRIS MEDIO',
  '#888480',
  2,
  true
),
(
  (select id from collections where slug = 'viscolan'),
  'NEGRO',
  null,
  '/images/hilados/viscolan/m050 negro.webp',
  'NEGRO',
  '#1c1c1c',
  3,
  true
),
(
  (select id from collections where slug = 'viscolan'),
  'CAMEL',
  null,
  '/images/hilados/viscolan/m053 camel.webp',
  'CAMEL',
  '#c09060',
  4,
  true
),
(
  (select id from collections where slug = 'viscolan'),
  'CHOCOLATE',
  null,
  '/images/hilados/viscolan/m055 chocolate.webp',
  'CHOCOLATE',
  '#452010',
  5,
  true
),
(
  (select id from collections where slug = 'viscolan'),
  'NUVEM',
  null,
  '/images/hilados/viscolan/m057 nuvem.webp',
  'NUVEM',
  '#d4cec8',
  6,
  true
),
(
  (select id from collections where slug = 'viscolan'),
  'NARANJA',
  null,
  '/images/hilados/viscolan/m203 naranja.webp',
  'NARANJA',
  '#f06820',
  7,
  true
),
(
  (select id from collections where slug = 'viscolan'),
  'ÓXIDO',
  null,
  '/images/hilados/viscolan/m255 oxido.webp',
  'ÓXIDO',
  '#c05030',
  8,
  true
),
(
  (select id from collections where slug = 'viscolan'),
  'ROJO',
  null,
  '/images/hilados/viscolan/m301 rojo.webp',
  'ROJO',
  '#cc1c08',
  9,
  true
),
(
  (select id from collections where slug = 'viscolan'),
  'FRAMBUESA',
  null,
  '/images/hilados/viscolan/m306 frambuesa.webp',
  'FRAMBUESA',
  '#c02060',
  10,
  true
),
(
  (select id from collections where slug = 'viscolan'),
  'VIOLETA',
  null,
  '/images/hilados/viscolan/m401 violeta.webp',
  'VIOLETA',
  '#7b3fa0',
  11,
  true
),
(
  (select id from collections where slug = 'viscolan'),
  'LILA',
  null,
  '/images/hilados/viscolan/m451 lila.webp',
  'LILA',
  '#b890d0',
  12,
  true
),
(
  (select id from collections where slug = 'viscolan'),
  'ROSA VIEJO',
  null,
  '/images/hilados/viscolan/m552 rosa viejo.webp',
  'ROSA VIEJO',
  '#c89898',
  13,
  true
),
(
  (select id from collections where slug = 'viscolan'),
  'CORAL',
  null,
  '/images/hilados/viscolan/m554 coral.webp',
  'CORAL',
  '#e87060',
  14,
  true
),
(
  (select id from collections where slug = 'viscolan'),
  'FRANCIA',
  null,
  '/images/hilados/viscolan/m604 francia.webp',
  'FRANCIA',
  '#0040a0',
  15,
  true
),
(
  (select id from collections where slug = 'viscolan'),
  'MARINO',
  null,
  '/images/hilados/viscolan/m606 marino.webp',
  'MARINO',
  '#1a2e60',
  16,
  true
),
(
  (select id from collections where slug = 'viscolan'),
  'PASTEL',
  null,
  '/images/hilados/viscolan/m608 pastel.webp',
  'PASTEL',
  '#b0c8e8',
  17,
  true
),
(
  (select id from collections where slug = 'viscolan'),
  'VERDE AGUA',
  null,
  '/images/hilados/viscolan/m701 verde agua.webp',
  'VERDE AGUA',
  '#30b898',
  18,
  true
),
(
  (select id from collections where slug = 'viscolan'),
  'HOJA',
  null,
  '/images/hilados/viscolan/m759 hoja.webp',
  'HOJA',
  '#4a6028',
  19,
  true
),
(
  (select id from collections where slug = 'c27'),
  'CRUDO',
  null,
  '/images/hilados/2-7/m001-crudo-27 (1).webp',
  'CRUDO',
  '#f2e6d0',
  0,
  true
),
(
  (select id from collections where slug = 'c27'),
  'BLANCO',
  null,
  '/images/hilados/2-7/m002-blanco-27 (1).webp',
  'BLANCO',
  '#f8f8f5',
  1,
  true
),
(
  (select id from collections where slug = 'c27'),
  'GRIS CLARO',
  null,
  '/images/hilados/2-7/m003 - gris claro 27 (1).webp',
  'GRIS CLARO',
  '#c0bdb5',
  2,
  true
),
(
  (select id from collections where slug = 'c27'),
  'GRIS MEDIO',
  null,
  '/images/hilados/2-7/m004 - gris medio 27 (1).webp',
  'GRIS MEDIO',
  '#888480',
  3,
  true
),
(
  (select id from collections where slug = 'c27'),
  'GRIS OSCURO',
  null,
  '/images/hilados/2-7/m005 - grisoscuro27.webp',
  'GRIS OSCURO',
  '#505050',
  4,
  true
),
(
  (select id from collections where slug = 'c27'),
  'NEGRO',
  null,
  '/images/hilados/2-7/m050 - negro (5).webp',
  'NEGRO',
  '#1c1c1c',
  5,
  true
),
(
  (select id from collections where slug = 'c27'),
  'ARENA',
  null,
  '/images/hilados/2-7/m051-arena-27 (1).webp',
  'ARENA',
  '#d4c4a8',
  6,
  true
),
(
  (select id from collections where slug = 'c27'),
  'MARRÓN CLARO',
  null,
  '/images/hilados/2-7/m052- marron claro 27.webp',
  'MARRÓN CLARO',
  '#a87a5a',
  7,
  true
),
(
  (select id from collections where slug = 'c27'),
  'CAMEL',
  null,
  '/images/hilados/2-7/m053-camel-27 (3).webp',
  'CAMEL',
  '#c09060',
  8,
  true
),
(
  (select id from collections where slug = 'c27'),
  'MARRÓN OSCURO',
  null,
  '/images/hilados/2-7/m054 - marron oscuro 27.webp',
  'MARRÓN OSCURO',
  '#6b4030',
  9,
  true
),
(
  (select id from collections where slug = 'c27'),
  'CHOCOLATE',
  null,
  '/images/hilados/2-7/m055 - chocolate (4).webp',
  'CHOCOLATE',
  '#452010',
  10,
  true
),
(
  (select id from collections where slug = 'c27'),
  'LIEBRE',
  null,
  '/images/hilados/2-7/m056-liebre-27 (1).webp',
  'LIEBRE',
  '#9a7a60',
  11,
  true
),
(
  (select id from collections where slug = 'c27'),
  'ROCA',
  null,
  '/images/hilados/2-7/rocam059-1 (1).webp',
  'ROCA',
  '#8a8078',
  12,
  true
),
(
  (select id from collections where slug = 'c27'),
  'PATITO',
  null,
  '/images/hilados/2-7/m101- patito -27.webp',
  'PATITO',
  '#f0d050',
  13,
  true
),
(
  (select id from collections where slug = 'c27'),
  'ORO',
  null,
  '/images/hilados/2-7/m102 - oro (5).webp',
  'ORO',
  '#d4a830',
  14,
  true
),
(
  (select id from collections where slug = 'c27'),
  'GIRASOL',
  null,
  '/images/hilados/2-7/m105-girasol (1).webp',
  'GIRASOL',
  '#f0c020',
  15,
  true
),
(
  (select id from collections where slug = 'c27'),
  'OCRE',
  null,
  '/images/hilados/2-7/m151-ocre.webp',
  'OCRE',
  '#c8a030',
  16,
  true
),
(
  (select id from collections where slug = 'c27'),
  'MAÍZ',
  null,
  '/images/hilados/2-7/m151 maiz (1).webp',
  'MAÍZ',
  '#e8c040',
  17,
  true
),
(
  (select id from collections where slug = 'c27'),
  'VERDE AGUA',
  null,
  '/images/hilados/2-7/m201 - verdeagua.webp',
  'VERDE AGUA',
  '#30b898',
  18,
  true
),
(
  (select id from collections where slug = 'c27'),
  'CORAL FLUO',
  null,
  '/images/hilados/2-7/m202 - coral fluo.webp',
  'CORAL FLUO',
  '#ff6050',
  19,
  true
),
(
  (select id from collections where slug = 'c27'),
  'NARANJA',
  null,
  '/images/hilados/2-7/m203 - naranja (1).webp',
  'NARANJA',
  '#f06820',
  20,
  true
),
(
  (select id from collections where slug = 'c27'),
  'SALMÓN',
  null,
  '/images/hilados/2-7/m206 - salmon (2).webp',
  'SALMÓN',
  '#f0a080',
  21,
  true
),
(
  (select id from collections where slug = 'c27'),
  'DAMASCO',
  null,
  '/images/hilados/2-7/m251 damasco.webp',
  'DAMASCO',
  '#e09870',
  22,
  true
),
(
  (select id from collections where slug = 'c27'),
  'ROJO',
  null,
  '/images/hilados/2-7/m301 - rojo (2).webp',
  'ROJO',
  '#cc1c08',
  23,
  true
),
(
  (select id from collections where slug = 'c27'),
  'ROJO OSCURO',
  null,
  '/images/hilados/2-7/m302 - rojo oscuro.webp',
  'ROJO OSCURO',
  '#8a1500',
  24,
  true
),
(
  (select id from collections where slug = 'c27'),
  'FUEGO',
  null,
  '/images/hilados/2-7/m310 fuego.webp',
  'FUEGO',
  '#e84800',
  25,
  true
),
(
  (select id from collections where slug = 'c27'),
  'BORDO',
  null,
  '/images/hilados/2-7/m351 - bordo (3).webp',
  'BORDO',
  '#7a1020',
  26,
  true
),
(
  (select id from collections where slug = 'c27'),
  'VIOLETA',
  null,
  '/images/hilados/2-7/m401 - violeta (1).webp',
  'VIOLETA',
  '#7b3fa0',
  27,
  true
),
(
  (select id from collections where slug = 'c27'),
  'LILA ROSA',
  null,
  '/images/hilados/2-7/m454 - lila rosa (2).webp',
  'LILA ROSA',
  '#d0a8c8',
  28,
  true
),
(
  (select id from collections where slug = 'c27'),
  'VELVET',
  null,
  '/images/hilados/2-7/m455 - velvet (1).webp',
  'VELVET',
  '#9050a0',
  29,
  true
),
(
  (select id from collections where slug = 'c27'),
  'BARNEY',
  null,
  '/images/hilados/2-7/m456 barney (5).webp',
  'BARNEY',
  '#8030a0',
  30,
  true
),
(
  (select id from collections where slug = 'c27'),
  'FUCSIA',
  null,
  '/images/hilados/2-7/m501 -  fucsia.webp',
  'FUCSIA',
  '#e0206a',
  31,
  true
),
(
  (select id from collections where slug = 'c27'),
  'ROSA BB',
  null,
  '/images/hilados/2-7/m551 - rosabb (1).webp',
  'ROSA BB',
  '#f0c0d0',
  32,
  true
),
(
  (select id from collections where slug = 'c27'),
  'ROSA VIEJO',
  null,
  '/images/hilados/2-7/m552 - rosa viejo (1).webp',
  'ROSA VIEJO',
  '#c89898',
  33,
  true
),
(
  (select id from collections where slug = 'c27'),
  'NUDE',
  null,
  '/images/hilados/2-7/nude m555.webp',
  'NUDE',
  '#e8c8a8',
  34,
  true
),
(
  (select id from collections where slug = 'c27'),
  'ROSA CHICLE',
  null,
  '/images/hilados/2-7/rosa chicle m553.webp',
  'ROSA CHICLE',
  '#f080a0',
  35,
  true
),
(
  (select id from collections where slug = 'c27'),
  'ROSA CORAL',
  null,
  '/images/hilados/2-7/m554 - rosacoral (4).webp',
  'ROSA CORAL',
  '#f09090',
  36,
  true
),
(
  (select id from collections where slug = 'c27'),
  'CELESTE BB',
  null,
  '/images/hilados/2-7/m601- celestebb -.webp',
  'CELESTE BB',
  '#a8d8f8',
  37,
  true
),
(
  (select id from collections where slug = 'c27'),
  'STEEL',
  null,
  '/images/hilados/2-7/m603 - steel.webp',
  'STEEL',
  '#5070a0',
  38,
  true
),
(
  (select id from collections where slug = 'c27'),
  'AZUL FRANCIA',
  null,
  '/images/hilados/2-7/m604-  azul francia.webp',
  'AZUL FRANCIA',
  '#0040a0',
  39,
  true
),
(
  (select id from collections where slug = 'c27'),
  'AZUL JEAN',
  null,
  '/images/hilados/2-7/m605 - azul jean (3).webp',
  'AZUL JEAN',
  '#4878b0',
  40,
  true
),
(
  (select id from collections where slug = 'c27'),
  'AZUL MARINO',
  null,
  '/images/hilados/2-7/m606 - azul marino (4).webp',
  'AZUL MARINO',
  '#1a2e60',
  41,
  true
),
(
  (select id from collections where slug = 'c27'),
  'TURQUESA',
  null,
  '/images/hilados/2-7/m651- turquesa - edit (4).webp',
  'TURQUESA',
  '#20b0b0',
  42,
  true
),
(
  (select id from collections where slug = 'c27'),
  'DANUBIO',
  null,
  '/images/hilados/2-7/m655 - danubio (1).webp',
  'DANUBIO',
  '#4090c0',
  43,
  true
),
(
  (select id from collections where slug = 'c27'),
  'VERDE CLARO',
  null,
  '/images/hilados/2-7/m702 - verdeclaro - 47 (4).webp',
  'VERDE CLARO',
  '#7ab840',
  44,
  true
),
(
  (select id from collections where slug = 'c27'),
  'VERDE LORO',
  null,
  '/images/hilados/2-7/m703 - verdeloro - 47 (3).webp',
  'VERDE LORO',
  '#6a8e28',
  45,
  true
),
(
  (select id from collections where slug = 'c27'),
  'VERDE BOTELLA',
  null,
  '/images/hilados/2-7/m704 - verdebotella - 47 (3).webp',
  'VERDE BOTELLA',
  '#2a5030',
  46,
  true
),
(
  (select id from collections where slug = 'c27'),
  'MANZANA',
  null,
  '/images/hilados/2-7/m705 - manzana (1).webp',
  'MANZANA',
  '#78b820',
  47,
  true
),
(
  (select id from collections where slug = 'c27'),
  'VERDE KHAKI',
  null,
  '/images/hilados/2-7/m752 - verde khaki (1).webp',
  'VERDE KHAKI',
  '#7a8050',
  48,
  true
),
(
  (select id from collections where slug = 'c27'),
  'MUSGO',
  null,
  '/images/hilados/2-7/m756 - musgo (6).webp',
  'MUSGO',
  '#526840',
  49,
  true
),
(
  (select id from collections where slug = 'c316'),
  'CRUDO',
  null,
  '/images/hilados/3-16/316crudo-1a (1).webp',
  'CRUDO',
  '#f2e6d0',
  0,
  true
),
(
  (select id from collections where slug = 'c316'),
  'GRIS CLARO',
  null,
  '/images/hilados/3-16/316grisclaro-1 (2).webp',
  'GRIS CLARO',
  '#c0bdb5',
  1,
  true
),
(
  (select id from collections where slug = 'c316'),
  'NEGRO',
  null,
  '/images/hilados/3-16/316negro1 (1).webp',
  'NEGRO',
  '#1c1c1c',
  2,
  true
),
(
  (select id from collections where slug = 'c316'),
  'ARENA',
  null,
  '/images/hilados/3-16/316arena-1 (1).webp',
  'ARENA',
  '#d4c4a8',
  3,
  true
),
(
  (select id from collections where slug = 'c316'),
  'CAMEL',
  null,
  '/images/hilados/3-16/316camel-1 (1).webp',
  'CAMEL',
  '#c09060',
  4,
  true
),
(
  (select id from collections where slug = 'c316'),
  'CHOCOLATE',
  null,
  '/images/hilados/3-16/m055 chocolate (2).webp',
  'CHOCOLATE',
  '#452010',
  5,
  true
),
(
  (select id from collections where slug = 'c316'),
  'NUDE',
  null,
  '/images/hilados/3-16/316 nude.webp',
  'NUDE',
  '#e8c8a8',
  6,
  true
),
(
  (select id from collections where slug = 'c316'),
  'MOSTAZA',
  null,
  '/images/hilados/3-16/316mostaza1 (1).webp',
  'MOSTAZA',
  '#c8a020',
  7,
  true
),
(
  (select id from collections where slug = 'c316'),
  'GIRASOL',
  null,
  '/images/hilados/3-16/3-16 girasol m105.webp',
  'GIRASOL',
  '#f0c020',
  8,
  true
),
(
  (select id from collections where slug = 'c316'),
  'PATITO',
  null,
  '/images/hilados/3-16/316patito1 (1).webp',
  'PATITO',
  '#f0d050',
  9,
  true
),
(
  (select id from collections where slug = 'c316'),
  'VERDE AGUA',
  null,
  '/images/hilados/3-16/3_16verdeagua1.webp',
  'VERDE AGUA',
  '#30b898',
  10,
  true
),
(
  (select id from collections where slug = 'c316'),
  'NARANJA',
  null,
  '/images/hilados/3-16/316 naranja m203.webp',
  'NARANJA',
  '#f06820',
  11,
  true
),
(
  (select id from collections where slug = 'c316'),
  'SALMÓN',
  null,
  '/images/hilados/3-16/316salmon-1 (3).webp',
  'SALMÓN',
  '#f0a080',
  12,
  true
),
(
  (select id from collections where slug = 'c316'),
  'FUEGO',
  null,
  '/images/hilados/3-16/m310 fuego (2).webp',
  'FUEGO',
  '#e84800',
  13,
  true
),
(
  (select id from collections where slug = 'c316'),
  'ROJO',
  null,
  '/images/hilados/3-16/316rojo-1 (2).webp',
  'ROJO',
  '#cc1c08',
  14,
  true
),
(
  (select id from collections where slug = 'c316'),
  'BORDO',
  null,
  '/images/hilados/3-16/316 bordo m351.webp',
  'BORDO',
  '#7a1020',
  15,
  true
),
(
  (select id from collections where slug = 'c316'),
  'ROSA CHICLE',
  null,
  '/images/hilados/3-16/m553 rosa chicle (2).webp',
  'ROSA CHICLE',
  '#f080a0',
  16,
  true
),
(
  (select id from collections where slug = 'c316'),
  'ROSA CLARO',
  null,
  '/images/hilados/3-16/316rosaclaro1 (2).webp',
  'ROSA CLARO',
  '#f0b8c8',
  17,
  true
),
(
  (select id from collections where slug = 'c316'),
  'VELVET',
  null,
  '/images/hilados/3-16/316 velvet m455.webp',
  'VELVET',
  '#9050a0',
  18,
  true
),
(
  (select id from collections where slug = 'c316'),
  'CELESTE BB',
  null,
  '/images/hilados/3-16/316celestebb-1 (2).webp',
  'CELESTE BB',
  '#a8d8f8',
  19,
  true
),
(
  (select id from collections where slug = 'c316'),
  'BANDERA',
  null,
  '/images/hilados/3-16/316 bandera m602.webp',
  'BANDERA',
  '#2060c0',
  20,
  true
),
(
  (select id from collections where slug = 'c316'),
  'AZUL FRANCIA',
  null,
  '/images/hilados/3-16/316frnacia-1 (1).webp',
  'AZUL FRANCIA',
  '#0040a0',
  21,
  true
),
(
  (select id from collections where slug = 'c316'),
  'TURQUESA',
  null,
  '/images/hilados/3-16/m651 turquesa (2).webp',
  'TURQUESA',
  '#20b0b0',
  22,
  true
),
(
  (select id from collections where slug = 'c316'),
  'DANUBIO',
  null,
  '/images/hilados/3-16/m655 danubio (2).webp',
  'DANUBIO',
  '#4090c0',
  23,
  true
),
(
  (select id from collections where slug = 'c316'),
  'FORESTA',
  null,
  '/images/hilados/3-16/316 foresta m751.webp',
  'FORESTA',
  '#1e4028',
  24,
  true
),
(
  (select id from collections where slug = 'c316'),
  'VERDE CLARO',
  null,
  '/images/hilados/3-16/m702 verde claro (2).webp',
  'VERDE CLARO',
  '#7ab840',
  25,
  true
),
(
  (select id from collections where slug = 'c316'),
  'MANZANA',
  null,
  '/images/hilados/3-16/316 manzana m705.webp',
  'MANZANA',
  '#78b820',
  26,
  true
),
(
  (select id from collections where slug = 'c316'),
  'EUCALIPTUS',
  null,
  '/images/hilados/3-16/m709 eucaliptus (2).webp',
  'EUCALIPTUS',
  '#5a8848',
  27,
  true
),
(
  (select id from collections where slug = 'c47'),
  'CRUDO',
  null,
  '/images/hilados/4-7/m001-crudo-47 (2).webp',
  'CRUDO',
  '#f2e6d0',
  0,
  true
),
(
  (select id from collections where slug = 'c47'),
  'BLANCO',
  null,
  '/images/hilados/4-7/m002-blanco-47 (2).webp',
  'BLANCO',
  '#f8f8f5',
  1,
  true
),
(
  (select id from collections where slug = 'c47'),
  'GRIS CLARO',
  null,
  '/images/hilados/4-7/m003 - gris claro 47 (2).webp',
  'GRIS CLARO',
  '#c0bdb5',
  2,
  true
),
(
  (select id from collections where slug = 'c47'),
  'GRIS MEDIO',
  null,
  '/images/hilados/4-7/m004 - gris medio 47 (2).webp',
  'GRIS MEDIO',
  '#888480',
  3,
  true
),
(
  (select id from collections where slug = 'c47'),
  'GRIS OSCURO',
  null,
  '/images/hilados/4-7/m005 - grisoscuro.webp',
  'GRIS OSCURO',
  '#505050',
  4,
  true
),
(
  (select id from collections where slug = 'c47'),
  'NEGRO',
  null,
  '/images/hilados/4-7/m050 - negro (4).webp',
  'NEGRO',
  '#1c1c1c',
  5,
  true
),
(
  (select id from collections where slug = 'c47'),
  'ARENA',
  null,
  '/images/hilados/4-7/m051-arena-47 (1).webp',
  'ARENA',
  '#d4c4a8',
  6,
  true
),
(
  (select id from collections where slug = 'c47'),
  'MARRÓN CLARO',
  null,
  '/images/hilados/4-7/m052- marron claro 47 (1).webp',
  'MARRÓN CLARO',
  '#a87a5a',
  7,
  true
),
(
  (select id from collections where slug = 'c47'),
  'CAMEL',
  null,
  '/images/hilados/4-7/m053-camel-47 (2).webp',
  'CAMEL',
  '#c09060',
  8,
  true
),
(
  (select id from collections where slug = 'c47'),
  'MARRÓN OSCURO',
  null,
  '/images/hilados/4-7/m054 - marron oscuro 47.webp',
  'MARRÓN OSCURO',
  '#6b4030',
  9,
  true
),
(
  (select id from collections where slug = 'c47'),
  'CHOCOLATE',
  null,
  '/images/hilados/4-7/m055 - chocolate (3).webp',
  'CHOCOLATE',
  '#452010',
  10,
  true
),
(
  (select id from collections where slug = 'c47'),
  'LIEBRE',
  null,
  '/images/hilados/4-7/m056-liebre-47 (2).webp',
  'LIEBRE',
  '#9a7a60',
  11,
  true
),
(
  (select id from collections where slug = 'c47'),
  'NUDE',
  null,
  '/images/hilados/4-7/m555 - nude.webp',
  'NUDE',
  '#e8c8a8',
  12,
  true
),
(
  (select id from collections where slug = 'c47'),
  'PATITO',
  null,
  '/images/hilados/4-7/m101- patito -47 (2).webp',
  'PATITO',
  '#f0d050',
  13,
  true
),
(
  (select id from collections where slug = 'c47'),
  'ORO',
  null,
  '/images/hilados/4-7/m102 - oro (4).webp',
  'ORO',
  '#d4a830',
  14,
  true
),
(
  (select id from collections where slug = 'c47'),
  'GIRASOL',
  null,
  '/images/hilados/4-7/m105-girasol-47.webp',
  'GIRASOL',
  '#f0c020',
  15,
  true
),
(
  (select id from collections where slug = 'c47'),
  'OCRE',
  null,
  '/images/hilados/4-7/m151-ocre -47.webp',
  'OCRE',
  '#c8a030',
  16,
  true
),
(
  (select id from collections where slug = 'c47'),
  'VERDE AGUA',
  null,
  '/images/hilados/4-7/m201 - verdeagua - 47 (2).webp',
  'VERDE AGUA',
  '#30b898',
  17,
  true
),
(
  (select id from collections where slug = 'c47'),
  'CORAL FLUO',
  null,
  '/images/hilados/4-7/m202 - coral fluo - 47 (3).webp',
  'CORAL FLUO',
  '#ff6050',
  18,
  true
),
(
  (select id from collections where slug = 'c47'),
  'NARANJA',
  null,
  '/images/hilados/4-7/m203 - naranja 47 (1).webp',
  'NARANJA',
  '#f06820',
  19,
  true
),
(
  (select id from collections where slug = 'c47'),
  'SALMÓN',
  null,
  '/images/hilados/4-7/m206 - salmon 47 (2).webp',
  'SALMÓN',
  '#f0a080',
  20,
  true
),
(
  (select id from collections where slug = 'c47'),
  'ÓXIDO',
  null,
  '/images/hilados/4-7/m251 - oxido.webp',
  'ÓXIDO',
  '#c05030',
  21,
  true
),
(
  (select id from collections where slug = 'c47'),
  'ROJO',
  null,
  '/images/hilados/4-7/m301 - rojo - 47 (1).webp',
  'ROJO',
  '#cc1c08',
  22,
  true
),
(
  (select id from collections where slug = 'c47'),
  'ROJO OSCURO',
  null,
  '/images/hilados/4-7/m302 - rojo oscuro 47 (1).webp',
  'ROJO OSCURO',
  '#8a1500',
  23,
  true
),
(
  (select id from collections where slug = 'c47'),
  'BORDO',
  null,
  '/images/hilados/4-7/m351 - bordo (1).webp',
  'BORDO',
  '#7a1020',
  24,
  true
),
(
  (select id from collections where slug = 'c47'),
  'VELVET',
  null,
  '/images/hilados/4-7/m455 - velvet - 47 (2).webp',
  'VELVET',
  '#9050a0',
  25,
  true
),
(
  (select id from collections where slug = 'c47'),
  'BARNEY',
  null,
  '/images/hilados/4-7/m456 barney (4).webp',
  'BARNEY',
  '#8030a0',
  26,
  true
),
(
  (select id from collections where slug = 'c47'),
  'FUCSIA',
  null,
  '/images/hilados/4-7/m501 -  fucsia - 47 (1).webp',
  'FUCSIA',
  '#e0206a',
  27,
  true
),
(
  (select id from collections where slug = 'c47'),
  'ROSA BB',
  null,
  '/images/hilados/4-7/m551 - rosabb - 47 (2).webp',
  'ROSA BB',
  '#f0c0d0',
  28,
  true
),
(
  (select id from collections where slug = 'c47'),
  'ROSA VIEJO',
  null,
  '/images/hilados/4-7/m552 - rosa viejo 47 (2).webp',
  'ROSA VIEJO',
  '#c89898',
  29,
  true
),
(
  (select id from collections where slug = 'c47'),
  'ROSA CHICLE',
  null,
  '/images/hilados/4-7/m553 - rosa chicle (1).webp',
  'ROSA CHICLE',
  '#f080a0',
  30,
  true
),
(
  (select id from collections where slug = 'c47'),
  'ROSA CORAL',
  null,
  '/images/hilados/4-7/m554 - rosacoral (3).webp',
  'ROSA CORAL',
  '#f09090',
  31,
  true
),
(
  (select id from collections where slug = 'c47'),
  'CELESTE BB',
  null,
  '/images/hilados/4-7/m601- celestebb - 47 (1).webp',
  'CELESTE BB',
  '#a8d8f8',
  32,
  true
),
(
  (select id from collections where slug = 'c47'),
  'STEEL',
  null,
  '/images/hilados/4-7/m603 - steel 47 (1).webp',
  'STEEL',
  '#5070a0',
  33,
  true
),
(
  (select id from collections where slug = 'c47'),
  'AZUL FRANCIA',
  null,
  '/images/hilados/4-7/m604-  azul francia - 47 (1).webp',
  'AZUL FRANCIA',
  '#0040a0',
  34,
  true
),
(
  (select id from collections where slug = 'c47'),
  'AZUL JEAN',
  null,
  '/images/hilados/4-7/m605 - azul jean (2).webp',
  'AZUL JEAN',
  '#4878b0',
  35,
  true
),
(
  (select id from collections where slug = 'c47'),
  'BANDERA',
  null,
  '/images/hilados/4-7/m602 - bandera.webp',
  'BANDERA',
  '#2060c0',
  36,
  true
),
(
  (select id from collections where slug = 'c47'),
  'AZUL MARINO',
  null,
  '/images/hilados/4-7/m606 - azul marino (3).webp',
  'AZUL MARINO',
  '#1a2e60',
  37,
  true
),
(
  (select id from collections where slug = 'c47'),
  'TURQUESA',
  null,
  '/images/hilados/4-7/m651- turquesa - edit (3).webp',
  'TURQUESA',
  '#20b0b0',
  38,
  true
),
(
  (select id from collections where slug = 'c47'),
  'DANUBIO',
  null,
  '/images/hilados/4-7/m655 - danubio.webp',
  'DANUBIO',
  '#4090c0',
  39,
  true
),
(
  (select id from collections where slug = 'c47'),
  'MANZANA',
  null,
  '/images/hilados/4-7/m705 - manzana.webp',
  'MANZANA',
  '#78b820',
  40,
  true
),
(
  (select id from collections where slug = 'c47'),
  'EUCALIPTUS',
  null,
  '/images/hilados/4-7/m709 - eucaliptus (2).webp',
  'EUCALIPTUS',
  '#5a8848',
  41,
  true
),
(
  (select id from collections where slug = 'c47'),
  'VERDE KHAKI',
  null,
  '/images/hilados/4-7/m752 - verde khaki.webp',
  'VERDE KHAKI',
  '#7a8050',
  42,
  true
),
(
  (select id from collections where slug = 'c47'),
  'MUSGO',
  null,
  '/images/hilados/4-7/m756 - musgo (5).webp',
  'MUSGO',
  '#526840',
  43,
  true
),
(
  (select id from collections where slug = 'matizadas'),
  '3050',
  null,
  '/images/hilados/4-7 madejas matizadas/3050.webp',
  '3050',
  '#1c1c1c',
  0,
  true
),
(
  (select id from collections where slug = 'matizadas'),
  '3056',
  null,
  '/images/hilados/4-7 madejas matizadas/3056.webp',
  '3056',
  '#c09060',
  1,
  true
),
(
  (select id from collections where slug = 'matizadas'),
  '3206',
  null,
  '/images/hilados/4-7 madejas matizadas/3206.webp',
  '3206',
  '#f0a080',
  2,
  true
),
(
  (select id from collections where slug = 'matizadas'),
  '3252',
  null,
  '/images/hilados/4-7 madejas matizadas/3252.webp',
  '3252',
  '#e09870',
  3,
  true
),
(
  (select id from collections where slug = 'matizadas'),
  '3301',
  null,
  '/images/hilados/4-7 madejas matizadas/3301.webp',
  '3301',
  '#cc1c08',
  4,
  true
),
(
  (select id from collections where slug = 'matizadas'),
  '3303',
  null,
  '/images/hilados/4-7 madejas matizadas/3303.webp',
  '3303',
  '#8a1500',
  5,
  true
),
(
  (select id from collections where slug = 'matizadas'),
  '3307',
  null,
  '/images/hilados/4-7 madejas matizadas/3307.webp',
  '3307',
  '#e84800',
  6,
  true
),
(
  (select id from collections where slug = 'matizadas'),
  '3502',
  null,
  '/images/hilados/4-7 madejas matizadas/3502.webp',
  '3502',
  '#e87060',
  7,
  true
),
(
  (select id from collections where slug = 'matizadas'),
  '3503',
  null,
  '/images/hilados/4-7 madejas matizadas/3503.webp',
  '3503',
  '#f080a0',
  8,
  true
),
(
  (select id from collections where slug = 'matizadas'),
  '3601',
  null,
  '/images/hilados/4-7 madejas matizadas/3601.webp',
  '3601',
  '#a8d8f8',
  9,
  true
),
(
  (select id from collections where slug = 'matizadas'),
  '3652',
  null,
  '/images/hilados/4-7 madejas matizadas/3652.webp',
  '3652',
  '#4090c0',
  10,
  true
),
(
  (select id from collections where slug = 'matizadas'),
  '3707',
  null,
  '/images/hilados/4-7 madejas matizadas/3707.webp',
  '3707',
  '#526840',
  11,
  true
),
(
  (select id from collections where slug = 'matizadas'),
  '3715',
  null,
  '/images/hilados/4-7 madejas matizadas/3715.webp',
  '3715',
  '#a8c870',
  12,
  true
),
(
  (select id from collections where slug = 'cottonlux'),
  'CRUDO',
  null,
  '/images/hilados/cottonlux/m001 crudo.webp',
  'CRUDO',
  '#f2e6d0',
  0,
  true
),
(
  (select id from collections where slug = 'cottonlux'),
  'BLANCO',
  null,
  '/images/hilados/cottonlux/m002 blanco.webp',
  'BLANCO',
  '#f8f8f5',
  1,
  true
),
(
  (select id from collections where slug = 'cottonlux'),
  'NEGRO',
  null,
  '/images/hilados/cottonlux/m050 negro.webp',
  'NEGRO',
  '#1c1c1c',
  2,
  true
);