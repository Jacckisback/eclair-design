# Leviers d'Éclair : référence technique

Relevé dans le code d'Éclair 1.14 (`app/lib/Design.php`, `AiTools.php`, `Analyzer.php`, `Theme.php`, `app/theme/`). Si une version plus récente change ces valeurs, le code fait foi : `get_site` et l'écran Réglages › Apparence montrent l'état réel.

## 1. Direction artistique

Une direction n'est **jamais du CSS** : c'est une liste de valeurs permises, validée par Éclair, qui garantit ensuite les contrastes WCAG en ajustant les couleurs si besoin. Sans direction, le site garde son thème classique.

### Couleurs (5, au format `#rrggbb`)

| Clé | Écran | Rôle |
|---|---|---|
| `ground` | Fond | Fond de page. Franchement clair ou franchement sombre (un gris moyen ne peut porter aucun texte à 7:1 : Éclair le pousse vers le blanc ou le noir). |
| `surface` | Bandes et cartes | Ton proche du fond, du **même côté** (clair/sombre). Sert aux bandes de couleur, aux cartes en aplat, aux en-têtes de tableau. |
| `ink` | Texte | Ramené à 7:1 au moins sur le fond, la surface et les fonds teintés d'accent. |
| `muted` | Texte secondaire | Ramené à 4,5:1. |
| `accent` | Accent (boutons, liens) | Une seule couleur franche, utilisée avec parcimonie. Le texte des boutons (`on_accent`) devient blanc ou `#111111` selon le contraste ; si aucun ne passe à 4,5:1, l'accent est assombri. Les liens prennent l'accent, foncé si nécessaire. |

Fonds teintés générés à partir de l'accent : encadré 7 %, succès 9 %, variante 10 %, pastille et menu actif 13 %, initiales 14 %, surlignage 22 %. Un accent très saturé sur un fond clair rend ces teintes visibles : c'est voulu.

### Police de titre (`display`) : 18 polices téléchargées une fois par le serveur, ou une police système

| id | Police | Famille | Univers |
|---|---|---|---|
| `bodoni-moda` | Bodoni Moda 700 | serif | didone de haute couture : mode, luxe, magazine |
| `cormorant-garamond` | Cormorant Garamond 600 | serif | garalde élancée : bien-être, mariage, poésie |
| `dm-serif-display` | DM Serif Display 400 | serif | chaleureuse et dense : restaurant, éditorial |
| `young-serif` | Young Serif 400 | serif | ronde à caractère : artisanat, boulangerie, épicerie |
| `gloock` | Gloock 400 | serif | tranchante : culture, architecture, galerie |
| `libre-caslon-display` | Libre Caslon Display 400 | serif | Caslon classique : droit, librairie, institution |
| `newsreader` | Newsreader 600 | serif | serif de journal : presse, analyse, blog |
| `zilla-slab` | Zilla Slab 700 | égyptienne | atelier, garage, menuiserie |
| `bricolage-grotesque` | Bricolage Grotesque 700 | sans | grotesque espiègle : créatif, agence, événement |
| `schibsted-grotesk` | Schibsted Grotesk 700 | sans | grotesque nette : conseil, technologie, médias |
| `familjen-grotesk` | Familjen Grotesk 700 | sans | grotesque scandinave : design, architecture |
| `archivo-black` | Archivo Black 400 | sans | affiche suisse : sport, culture, manifeste |
| `big-shoulders-display` | Big Shoulders Display 800 | condensée | industrielle : nuit, musique, chantier |
| `barlow-condensed` | Barlow Condensed 700 | condensée | signalétique : transport, sport, terrain |
| `syne` | Syne 700 | sans | expressive : studio, art, mode |
| `unbounded` | Unbounded 700 | sans | large et ronde : technologie, jeu, jeunesse |
| `fredoka` | Fredoka 600 | arrondie | enfants, crèche, loisirs |
| `sora` | Sora 700 | sans | géométrique : jeune entreprise, finance |

Polices système possibles pour les titres comme pour le texte (`text`) : `system`, `humanist`, `geometric`, `rounded`, `serif`, `oldstyle`. Le texte courant est **toujours** une police système (zéro téléchargement).

Absentes volontairement (polices surutilisées) : Inter, Roboto, Fraunces, Space Grotesk, Instrument, Playfair… Ne les propose pas : elles ne sont pas disponibles et trahissent le « design par défaut ».

### Choix de composition (la première valeur est celle par défaut)

| Clé | Valeurs (code → libellé à l'écran) | Effet |
|---|---|---|
| `case` | `normal` (normale), `upper` (capitales) | Titres H1, H2 et bannière en capitales, interlignage serré. Réservé aux titres courts (affiche, signalétique). |
| `scale` | `regular` (équilibrée), `quiet` (discrète, ×0,88), `bold` (spectaculaire, ×1,18) | Taille de tous les titres. |
| `radius` | `soft` (adoucis : 10 px, boutons 8 px), `none` (droits), `round` (ronds : 22 px, boutons en pilule) | Coins des cartes, images, encadrés, boutons. |
| `density` | `regular` (normal), `compact` (serré, ×0,8), `airy` (aéré, ×1,3) | Espace vertical des sections et des intertitres. |
| `surfaces` | `line` (filet fin), `flat` (aplat de couleur), `raised` (ombre portée) | Habillage des cartes (atouts, articles, FAQ). |
| `hero` | `split` (texte et image côte à côte), `poster` (affiche : très grand titre au-dessus d'une image large), `fullbleed` (plein cadre : titre sur la photo assombrie), `editorial` (titre à côté d'une image verticale), `centered` (centrée), `reverse` (image à gauche), `framed` (encadrée : texte et image dans un panneau de couleur) | Bannière de la page d'accueil et des pages avec un bloc `hero`. |
| `features` | `cards` (cartes), `rows` (rangées avec icônes en colonne), `columns` (colonnes ouvertes sous un filet), `numbers` (numérotés 01, 02… à la place des icônes) | Bloc « Atouts ». |
| `sections` | `plain` (fond uni), `bands` (bandes de couleur derrière atouts, FAQ et équipe), `rules` (filets entre les sections) | Rythme entre les sections. |
| `icons` | `line` (65 icônes dessinées), `none`, `emoji` | Icônes des atouts. |
| `buttons` | `solid` (pleins), `outline` (contour), `underline` (liens soulignés avec flèche) | Tous les boutons. |

Combinaisons à connaître :
- `hero: fullbleed` ou `editorial` **exige** une image de bannière (sinon le Score Design pénalise et la composition tombe à plat).
- `hero: fullbleed` avec des boutons `outline` ou `underline` : Éclair force ces boutons en blanc sur la photo.
- `features: numbers` masque les icônes : à réserver aux vraies étapes (processus, méthode), pas à une liste d'avantages.
- `case: upper` abaisse la limite du titre de bannière à 6 mots.

### Les 12 directions livrées

| id | Nom | Idée | Fond / Accent | Titre | Compositions |
|---|---|---|---|---|---|
| `nocturne` | Nocturne | La ville la nuit : bleu profond, lumière ambrée | `#0f1724` / `#f2a93b` | Big Shoulders, capitales, spectaculaire | plein cadre, rangées, bandes |
| `galerie` | Galerie | Murs blancs, cartels noirs, rouge de signalétique | `#ffffff` / `#d7261e` | Familjen Grotesk, spectaculaire | affiche, colonnes, sans icônes |
| `argile` | Argile | L'atelier de céramique : sable, terre cuite | `#ebe0d2` / `#a8431f` | Young Serif | éditorial, rangées, bandes, ombre |
| `botanique` | Botanique | L'herbier et la serre : vert profond, papier sauge | `#f3f5ee` / `#2f6b3a` | DM Serif Display | centrée, colonnes, bandes, aéré |
| `affiche` | Affiche | L'affiche suisse : noir sur blanc cassé, orange vif | `#f3f1ec` / `#e04a00` | Archivo Black, capitales | affiche, colonnes, sans icônes |
| `riviera` | Riviera | Le bord de mer : marine, ciel pâle, corail | `#f4f8fb` / `#b04b36` | Gloock, spectaculaire | plein cadre, rangées, ronds |
| `cabinet` | Cabinet | Le papier à en-tête : encre marine, bordeaux, filets | `#fbfaf7` / `#7a1f2b` | Libre Caslon, discrète | éditorial, colonnes, filet fin |
| `neon` | Néon | L'écran de création la nuit : quasi-noir, vert citron | `#111114` / `#c8ff2e` | Unbounded, spectaculaire | affiche, rangées |
| `douceur` | Douceur | Le cabinet de soin : poudre rosée, prune, beaucoup d'air | `#f8f1ee` / `#9c3f5f` | Cormorant Garamond | centrée, colonnes, ronds, aéré |
| `chantier` | Chantier | Béton, jaune de sécurité, signalétique condensée | `#e9e8e4` / `#ffcc00` | Barlow Condensed, capitales | plein cadre, rangées, serré |
| `recreation` | Récréation | La cour d'école : bleu ciel, rouge tomate | `#f2f7ff` / `#c7362b` | Fredoka | côte à côte, colonnes, ronds |
| `presse` | Presse | Le quotidien du matin : papier journal, rouge de une | `#f7f6f2` / `#c1121f` | Newsreader | éditorial, colonnes, serré |

Une direction livrée bien ajustée vaut souvent mieux qu'une direction inventée : pars d'elle quand le monde du client s'en rapproche, puis change 2 ou 3 valeurs.

### Réglages hors direction (toujours actifs)

- **En-tête** centré ou non (`hdr-center`), **listes d'articles** en grille ou en liste (`cards-list`), logo, icône, texte du pied de page.
- **Micro-animations** (Réglages › Apparence) : apparition au défilement des cartes, atouts, FAQ, encadrés et images (CSS `animation-timeline: view()`, translation et échelle seulement, jamais de transparence), `scale(.97)` à la pression des boutons, zoom léger des images de cartes au survol. Coupées pour `prefers-reduced-motion` et à l'impression. **Ne les réécris pas en CSS personnalisé** : active-les.
- **Mode sombre automatique** : avec une direction, c'est la direction (claire ou sombre) qui décide.

## 2. Composition des pages (sections)

Schéma accepté par `create_draft` (champ `sections`) et produit par l'éditeur de blocs. Une section = un objet :

| type | Champs utiles | Notes |
|---|---|---|
| `hero` | `title` (devient le H1 et remplace le titre de la page), `text` (accroche), `button` + `url`, `button2` + `url2`, `media` | Un seul par page, en premier. `url` = chemin d'une page existante (`/contact`). `media` = id renvoyé par le site, jamais inventé. |
| `features` | `title` (H2), `items[]` : `title`, `text`, `icon` (un émoji) | 3 à 6 items, chacun décrit. |
| `heading` | `title` ou `text`, `style` : `"2"` ou `"3"` | Pas de saut de niveau (H2 → H4 interdit). |
| `paragraph` | `text` (Markdown en ligne : `**gras**`, `*italique*`, `[lien](/chemin)`) | |
| `list` | `items[].text`, `style` : `ul` ou `ol` | |
| `callout` | `title` (facultatif), `text`, `style` : `tip`, `info`, `warning`, `success`, `note` | |
| `faq` | `title`, `items[]` : `title` = question, `text` = réponse | Alimente aussi les données structurées FAQ. |
| `button` | `button`, `url`, `style` : `primary` ou `secondary` | Compte dans la limite de 3 boutons. |
| `team` | `title`, `items[]` : `title` = nom, `role`, `text` = bio courte | Photos via `update_content.team_member.photo`. |
| `contact` | `title`, `button` (libellé d'envoi) | Formulaire anti-spam intégré. |
| `posts` | `title` | Derniers articles. |
| `products` | `title` | Si la boutique est activée. |
| `image` | `media`, `title` = texte alternatif, `text` = légende | Si la médiathèque contient des images. |

Classes HTML produites (utiles pour le CSS personnalisé) : `.hero`, `.hero-media`, `.hero-text`, `.hero-title`, `.hero-lead`, `.hero-img`, `.btns`, `.btn`, `.btn-primary`, `.btn-secondary`, `.btn-lg`, `.features`, `.grid`, `.feature`, `.feature-icon`, `.team`, `.member`, `.faq`, `.callout`, `.callout-tip`…, `.posts-block`, `.cards`, `.card`, `.card-img`, `.card-body`, `.card-title`, `.card-excerpt`, `.contact`, `.key` (L'essentiel), `.toc`, `.site-header`, `.brand`, `.site-nav`, `.site-footer`, `.content` (grille « breakout » : texte étroit, blocs riches en largeur `wide`). Classes du `<body>` : `theme-<thème>`, `hdr-center`, `cards-list`.

Variables CSS disponibles : `--bg`, `--bg-soft`, `--card`, `--text`, `--muted`, `--line`, `--code`, `--accent`, `--on-accent`, `--link`, `--link-c`, `--font`, `--font-head`, `--hw` (graisse des titres), `--radius`, `--btn-r`, `--hs` (échelle des titres), `--dn` (densité), `--shadow`, `--text-w` (42rem), `--wide-w` (72rem).

## 3. Connecteur MCP Éclair

Activé dans Réglages › Assistant IA › Autoriser les connexions MCP, adresse `https://<site>/_eclair/mcp`, à ajouter comme connecteur dans Claude ou ChatGPT (OAuth). Outils :

| Outil | Lecture/écriture | Usage design |
|---|---|---|
| `get_site` | lecture | **Toujours en premier** : contenus et ids, catégories, profil éditorial, règles d'écriture. |
| `search_content` | lecture | Trouver la page à refaire, éviter les doublons. |
| `get_content` | lecture | Texte complet en Markdown, blocs spéciaux entre `[crochets]`, images en `media:ID`. |
| `find_media` | lecture | Ids d'images pour la bannière, l'équipe. |
| `create_draft` | écriture | Nouvelle page en **brouillon**, avec `sections`. Renvoie l'id et les scores SEO/GEO. |
| `update_content` | écriture | Modifie titre, accroche L'essentiel, SEO, image, passages (`replace` : texte exact copié de `get_content`), ajoute des sections Markdown (`append`), FAQ, membre d'équipe. Sur une page publiée : proposition à valider. |

Limites : 60 écritures par heure et par connexion ; pas de génération d'image par MCP (elle coûte sur la clé du site) ; **aucun réglage d'apparence** par MCP (la direction se saisit à la main). Pour refondre la mise en page d'une page publiée existante, crée une nouvelle version en brouillon avec `create_draft` (mêmes textes, nouvelles sections), que la personne compare et publie à la place.

## 4. Score Design

Troisième score de l'éditeur, à côté du SEO et du GEO. Tes brouillons doivent l'avoir à 100. Vérifications (déterministes) :

| Vérification | Bon | Pénalisé |
|---|---|---|
| Hiérarchie des intertitres | H2 → H3 → H4 sans saut | Un saut (ex. H2 puis H4) : **fort** |
| Longueur des intertitres | ≤ 12 mots | Plus long |
| Émoji dans un intertitre | aucun | présent |
| Titre de bannière | ≤ 8 mots (≤ 6 en capitales) | ≤ +6 mots : moyen ; au-delà : mauvais |
| Bouton dans la bannière | présent | absent |
| Image de bannière (directions `fullbleed`, `editorial`) | présente | absente : **fort** |
| Nombre de boutons sur la page (bannière comprise) | ≤ 3 | 4-5 moyen, 6+ mauvais |
| Bloc Atouts | 3 à 6 éléments, tous décrits | 2 ou 7-8 moyen ; 1 ou 9+ mauvais |
| Icônes des atouts (icônes dessinées) | chaque émoji a son icône | émoji sans icône (rien ne s'affiche) |
| MAJUSCULES | aucune suite de 4 mots en capitales | présente |
| Formules creuses | aucune | 1-2 moyen, 3+ mauvais |
| Tirets cadratins (—) | ≤ 1 pour 150 mots | au-delà (tic d'écriture IA) |
| Textes répétés | aucun passage de 6 mots+ répété à l'identique | présent |
| Mur de texte (> 300 mots) | ≤ 350 mots de paragraphes d'affilée | 350-600 moyen, 600+ mauvais |
| Direction artistique | choisie | thème classique |

### Formules creuses détectées

- **fr** : révolutionnaire, innovant(e)(s), de pointe, à la pointe, leader du marché, incontournable, clé en main, synergie, disruptif/disruptive, sans compromis, expérience unique, n'attendez plus, inégalé(e)(s), boostez, propulsez
- **es** : revolucionario/a, innovador(a)(es), de vanguardia, líder del sector, sin igual, llave en mano, sinergia, disruptivo/a, experiencia única, de primer nivel, potencia tu, impulsa tu
- **en** : seamless(ly), cutting-edge, revolutionary, game-changer/changing, unlock, elevate, empower, leverage, synergy, best-in-class, world-class, next-generation, innovative, supercharge, effortless(ly), delve, unleash
- **de** : revolutionär, innovativ, bahnbrechend, nahtlos, erstklassig, Synergie, ganzheitlich, Spitzenklasse, einzigartiges Erlebnis, Gamechanger
- **it** : rivoluzionario/a, innovativo, all'avanguardia, leader di settore, senza pari, chiavi in mano, sinergia, esperienza unica, di prim'ordine, potenzia
- **pt** : revolucionário/a, inovador(a), de ponta, líder de mercado, sem igual, chave na mão, sinergia, experiência única, de primeira linha, potencialize, alavanque

Au-delà de la liste détectée, évite aussi : « solutions sur mesure », « accompagnement personnalisé », « à votre écoute », « passionné(e) », « qualité et professionnalisme », « n'hésitez pas à ». Remplace toujours par un fait : un délai, un lieu, une matière, un nombre réel, un nom.

## Icônes

Avec `icons: line`, Éclair remplace l'émoji de chaque atout par une icône dessinée (tracés Lucide). Un émoji non reconnu n'affiche **rien**. Émojis reconnus, par icône :

check ✅✔☑✓👌 · rocket 🚀 · users 👥👤🧑👨👩👪 · clock ⏱⏰🕐⌛⏳ · shield 🛡 · star ⭐🌟✨💫 · heart ❤💚💙💛🧡💜🤍💖 · bulb 💡🧠 · target 🎯 · chat 💬🗣 · phone 📞☎ · pin 📍🗺🧭 · truck 🚚🚛 · wrench 🛠🔧🔨⚙🪛 · leaf 🌱🌿🍃🌳 · zap ⚡ · card 💶💰💸💳💵🏷 · calendar 📅🗓 · chart 📈📊 · globe 🌍🌎🌏🌐 · home 🏠🏡 · book 📚📖✏📝 · camera 📷📸🎬 · food 🍽🍴🥐 · sun ☀🌞 · mail ✉📧📩 · award 🏆🥇🏅🎖 · smile 😊🙂😀😄 · palette 🎨🖌🏺 · gift 🎁🎀 · music 🎵🎶🎸🎹🎻🎷 · coffee ☕🍵 · car 🚗🚙🚕🚘🏎 · plane ✈🛫🛬🧳 · bike 🚲🚴🛵 · paw-print 🐾🐶🐱🐕🐈 · baby 👶🍼🧸 · scissors ✂💇💈 · dumbbell 🏋💪🤸🧘 · graduation-cap 🎓🏫 · briefcase 💼👔 · building-2 🏢🏬🏛 · key 🔑🗝 · lock 🔒🔐 · cloud ☁🌥 · recycle ♻ · flower 🌸🌺🌷💐🌻🌼 · wine 🍷🥂🍾 · cake 🎂🍰🧁 · stethoscope 🩺⚕🏥💊 · shirt 👕👗👚🧥 · shopping-bag 🛍🛒 · package 📦 · mountain ⛰🏔🗻 · waves 🌊🏄🏊 · handshake 🤝 · laptop 💻🖥⌨ · smartphone 📱📲 · megaphone 📣📢 · scale ⚖ · gem 💎💍 · flame 🔥 · droplet 💧💦🚿 · carrot 🥕🥗🥦🍅 · fish 🐟🐠🎣🦐

Choisis des icônes qui disent quelque chose de précis (📍 pour « à 10 min de la gare », 🕐 pour « réponse sous 24 h »), jamais un ✨ décoratif sur chaque atout.

## 5. CSS personnalisé

- Ajouté **après** le thème, la direction et les micro-animations : il l'emporte.
- Rangé dans `data/` : conservé par les mises à jour.
- Par sécurité, Éclair retire le caractère `<` et les règles `@import`. **64 Ko maximum.** Il est minifié et inséré dans chaque page : chaque octet compte (vise moins de 2 Ko).
- Les repères `/*dark*/ … /*/dark*/` délimitent des règles retirées quand le mode sombre est réglé sur « Toujours clair ».
- Déjà présents avec une direction, inutile de les refaire : `::selection` à l'accent, `accent-color`, `caret-color`, `scrollbar-color`, chiffres tabulaires dans les tableaux, `text-wrap: balance` sur les titres, `text-wrap: pretty` sur les paragraphes, anneau de focus à l'accent.
