# Finition : CSS personnalisé

Le dernier 10 % : ce qu'aucun réglage ne couvre. Principes d'Emil Kowalski appliqués aux contraintes d'Éclair : chaque détail est presque invisible, c'est leur somme qui fait « pro ».

## Avant d'écrire une ligne

1. La direction est-elle posée ? Sinon, arrête : couleur, police, coins, boutons, bannière se règlent là.
2. Les micro-animations sont-elles activées (Réglages › Apparence) ? Elles couvrent déjà l'apparition au défilement, la pression des boutons et le zoom des images de cartes. Ne les recode pas.
3. Le problème est-il dans le contenu (titre trop long, image mal cadrée, trop de boutons) ? Corrige le contenu, pas le CSS.

## Règles absolues

- **Seulement les variables du thème** (`--accent`, `--text`, `--muted`, `--bg`, `--bg-soft`, `--line`, `--radius`, `--btn-r`, `--shadow`…) : jamais une couleur en dur. Le mode sombre, la direction et les contrastes garantis suivent alors tout seuls.
- **Pas de `@import`, pas de `<`** (retirés par Éclair), **pas de police** supplémentaire, **pas d'image** de fond lourde. Vise moins de 2 Ko : ce CSS est inséré dans chaque page.
- **Jamais `transition: all`.** Nomme les propriétés : `transform`, `box-shadow`, `background-color`, `color`, `text-decoration-color`.
- **Rien d'animé au chargement, rien qui part de `opacity: 0`** : un texte transparent pendant le défilement fait échouer le contraste (Lighthouse) et peut cacher le contenu à certains robots. Translation et échelle seulement, à partir d'un état déjà visible.
- **Courbes franches, durées courtes.** `ease-out` fort pour ce qui répond à l'utilisateur : `cubic-bezier(.23, 1, .32, 1)`. Pression de bouton 100-160 ms, survol 150-200 ms, rien au-dessus de 300 ms. Jamais `ease-in` sur une interaction.
- **Survol réservé aux pointeurs fins** (`@media (hover: hover) and (pointer: fine)`) : sur téléphone, un survol reste « collé » après le toucher.
- **Respect de `prefers-reduced-motion`** : le thème coupe déjà toutes les transitions pour ces visiteurs ; ne remets aucun mouvement hors d'un bloc `@media (prefers-reduced-motion: no-preference)`.
- **Ne cible que des classes stables** (liste dans [leviers.md](leviers.md#2-composition-des-pages-sections)) ; jamais de sélecteur fragile du type `.content > div:nth-child(4)`.
- Pas de dégradé dans le texte, pas de verre dépoli décoratif, pas de bordure gauche colorée épaisse sur les cartes ou encadrés, pas d'ombre dure décalée (`4px 4px 0`) hors d'un monde néo-brutaliste assumé, pas d'« eyebrow » en CSS (`::before` avec un sur-titre).

## Bloc de base (à adapter, pas à coller en entier par réflexe)

```css
/* ── Finition Éclair Design ─────────────────────────────────
   Courbe commune, boutons plus nets, survols réservés à la souris,
   liens de texte soulignés en douceur, prix alignés.
   Utilise uniquement les variables du thème : mode sombre compris. */
:root{--ease-out:cubic-bezier(.23,1,.32,1)}

/* Boutons : propriétés nommées, courbe franche */
.btn{transition:transform .16s var(--ease-out),box-shadow .2s var(--ease-out),background-color .2s ease,color .2s ease}
@media (prefers-reduced-motion:no-preference){.btn:active{transform:scale(.97)}}

/* Survols : seulement à la souris (sur mobile ils restent collés) */
@media not all and (hover:hover) and (pointer:fine){
  .btn:hover,.card:hover{transform:none;box-shadow:none}
}

/* Cartes : même courbe que les boutons */
.card{transition:transform .2s var(--ease-out),box-shadow .2s var(--ease-out)}

/* Liens dans le texte : soulignement discret, affirmé au survol */
/* (:not(.btn) : les boutons d'Éclair sont eux aussi des liens dans un paragraphe) */
.content p a:not(.btn),.content li a:not(.btn){text-decoration-color:color-mix(in srgb,currentColor 35%,transparent);transition:text-decoration-color .15s ease}
.content p a:not(.btn):hover,.content li a:not(.btn):hover{text-decoration-color:currentColor}

/* Chiffres : prix et tarifs alignés */
.price,.card-price,.btn{font-variant-numeric:tabular-nums}
```

La règle « Survols » ne change rien à la souris : elle retire seulement le soulèvement qui restait collé après un toucher sur téléphone et tablette.

## Détails à ajouter selon le site

| Situation | Bloc |
|---|---|
| Bannière : l'accroche fait des lignes trop longues | `.hero-lead{max-width:34ch}` (en ch, pas en rem : la mesure suit la police) |
| Titres de bannière en capitales trop serrés sur mobile | `@media (max-width:40rem){.hero-title{letter-spacing:0}}` |
| Atouts : icônes trop « bulle » pour une direction sobre | `.feature-icon{background:none;width:auto;height:auto;justify-content:flex-start}` |
| Pied de page qui se confond avec la page | `.site-footer{background:var(--bg-soft)}` |
| En-tête : séparation trop marquée sur une direction aérée | `.site-header{border-bottom-color:transparent}` |
| Images de bannière de formats différents d'une page à l'autre | `.hero-img img{aspect-ratio:4/5;object-fit:cover}` (éditorial) ou `16/10` (côte à côte) |
| Titres coupés par un tiret en fin de ligne sur mobile (« agence-ments ») | `h1,h2,.hero-title{hyphens:manual}` (les mots longs passent à la ligne entiers) |
| Coins droits dans la direction mais images d'article arrondies | `.content figure img,.featured img{border-radius:var(--radius)}` |
| Liens d'ancre du sommaire (articles longs) | `@media (prefers-reduced-motion:no-preference){html{scroll-behavior:smooth}}` |
| Mode sombre automatique à neutraliser pour une règle | entourer la règle de `/*dark*/ … /*/dark*/` |

## Format de livraison

1. Le tableau de revue, une ligne par détail :

| Avant | Après | Pourquoi |
|---|---|---|
| `.btn` : `transition: transform .15s, box-shadow .15s` (courbe par défaut) | `transform .16s cubic-bezier(.23,1,.32,1)` | La courbe par défaut démarre mou ; un ease-out franc répond immédiatement au geste. |
| Survol des cartes actif sur téléphone | Survol limité à `(hover:hover) and (pointer:fine)` | Au toucher, la carte restait soulevée après le retour arrière. |

2. Un seul bloc ```css à coller dans **Réglages › Apparence › CSS personnalisé**, commenté en français, avec en tête ce qu'il change.
3. La consigne de vérification : « Enregistre, ouvre l'accueil et une page de service sur ordinateur et sur téléphone, survole un bouton et une carte, appuie sur un bouton. »

## Vérifier

- Relance `scripts/audit.mjs` : le poids du CSS en ligne ne doit grossir que de la taille de ton bloc, et aucune nouvelle alerte ne doit apparaître (débordement horizontal, contraste).
- Si la personne a accès à Lighthouse (Chrome › Outils de développement › Lighthouse) : les quatre catégories doivent rester à 100 sur mobile.
