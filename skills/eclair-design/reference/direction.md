# Direction artistique

Une direction artistique Éclair = un univers complet tiré d'**une référence concrète** du monde du client, traduit en valeurs permises (voir [leviers.md](leviers.md#1-direction-artistique)). Méthode adaptée d'Impeccable.

## Méthode

1. **Lire l'activité.** Ce qu'elle vend, à qui, où, avec quelle personnalité. Puis imaginer le monde physique autour : lieux, matières, objets, imprimés, enseignes, lumière, saisons, uniformes, outils.
2. **Une référence par direction.** Une seule chose concrète, nommable, qu'on pourrait photographier : « les plaques émaillées d'une boulangerie des années 50 », « une page d'herbier », « l'équipe de nuit d'une imprimerie », « le carnet de bord d'un voilier », « le tableau noir d'un bistrot ». Tout en découle : couleurs, police, composition.
3. **Trois pistes vraiment différentes** : fond clair ou sombre, chaud ou froid, serif / sans / condensée, calme ou spectaculaire. **Une seule piste sombre au plus.**
4. **Éviter le défaut de la catégorie** (ce que font tous les concurrents) **et son contraire prévisible** :
   - avocat, expert-comptable : marine et or ; notaire : bordeaux et beige
   - tech, SaaS, IA : dégradé violet, indigo, cyan sur quasi-noir
   - bien-être, yoga, naturopathe : beige et vert sauge, tout en pastel
   - restaurant : noir et doré ; artisan du bâtiment : bleu et orange de grande surface de bricolage
   - coach : photo de montagne, orange « énergie »
5. **Les tics du design généré par IA** sont interdits par défaut : accents violet / indigo / mauve, cyan sur noir, crème + terracotta par réflexe, tout pastel, dégradés. Les tons brun, beige, sable, ocre, kaki, rouille, expresso sont aussi un réflexe d'IA : seulement si l'activité **est** faite de cette matière (bois, cuir, café, argile, pain), et dans une seule piste au plus.
6. **Le brief gagne.** Si la personne impose une couleur de marque, un logo, une police ou une ambiance, respecte-le même s'il tombe dans un cliché ci-dessus. Tu peux le signaler une fois, pas le contourner.
7. **Clair ou sombre selon la scène d'usage**, pas la catégorie : qui regarde le site, où, sous quelle lumière (un menu de bar consulté le soir peut être sombre ; un plombier consulté en urgence sur un téléphone en plein jour doit être clair).

## Couleurs

Vise directement des couleurs qu'Éclair n'aura pas à corriger, sinon le rendu diffère de ce que tu annonces :

- **Fond clair** : luminance très haute (`#f0`… à `#ff`… sur les trois canaux en gros). Texte (`ink`) presque noir teinté de la couleur du monde (`#14281c` pour un vert, `#1a1f2b` pour une encre marine), jamais `#000`.
- **Fond sombre** : très bas (`#0f`… à `#1b`…), jamais un gris moyen. Texte presque blanc teinté (`#f3eee4` chaud, `#f4f4f0` neutre).
- **Surface** : 4 à 8 % d'écart avec le fond, du même côté. Ni carte blanche sur fond blanc (aucun relief), ni bande trop contrastée (effet « zébré »).
- **Muted** : la teinte de l'encre, éclaircie (fond clair) ou assombrie (fond sombre), jamais un gris neutre posé au hasard.
- **Accent** : une couleur franche, saturée, qui existe dans la référence (le jaune de sécurité du chantier, le rouge de une du journal, le vert de la serre). Sur fond clair, un accent clair (jaune, citron, ambre) donne des boutons à texte `#111111` : c'est bien, mais les **liens** seront foncés automatiquement ; si tu veux des liens de la même couleur, choisis un accent plus profond.
- Calcule le contraste si tu as un doute (formule WCAG : (L1 + 0,05) / (L2 + 0,05)). Cibles : `ink` ≥ 7 sur `ground` et `surface`, `muted` ≥ 4,5, `accent` ≥ 4,5 avec son texte de bouton.

## Typographie

- **Police de titre** : choisis-la pour sa voix, dans la liste des 18 (voir [leviers.md](leviers.md#police-de-titre-display--18-polices-téléchargées-une-fois-par-le-serveur-ou-une-police-système)). Une condensée pour la signalétique et l'industrie, une didone pour le luxe, une égyptienne pour l'atelier, une grotesque nette pour le conseil.
- **Police du texte** : contraste avec le titre. Titre serif → texte `humanist` ou `system` ; titre grotesque → texte `serif` ou `oldstyle` pour un ton éditorial, `system` pour un ton net ; titre arrondi → texte `rounded`.
- **Capitales** (`case: upper`) seulement avec une police d'affiche ou condensée, et des titres courts.
- **Taille** : `bold` pour Convaincre (accueil, landing), `quiet` pour les mondes raffinés (cabinet, joaillerie, architecture), `regular` sinon.

## Composition

| Monde | Bannière | Atouts | Sections | Cartes | Boutons |
|---|---|---|---|---|---|
| Photo forte du lieu ou du travail (restaurant, hôtel, chantier, paysage) | `fullbleed` | `rows` | `bands` | `flat` | `solid` |
| Éditorial, savoir, conseil | `editorial` ou `split` | `columns` | `rules` ou `plain` | `line` | `solid` ou `underline` |
| Affiche, culture, événement | `poster` | `columns` | `plain` | `flat` | `solid` |
| Soin, bien-être, mariage | `centered` | `columns` | `bands` | `flat` | `solid` |
| Artisanat, produit tenu en main | `editorial` ou `framed` | `rows` | `bands` | `raised` | `solid` |
| Luxe, joaillerie, galerie | `poster` ou `editorial` | `columns` | `plain` | `line` | `underline` |
| Enfants, loisirs, famille | `split` | `cards` | `bands` | `raised` | `solid` |
| Méthode en étapes (formation, accompagnement) | `split` | `numbers` | `rules` | `line` | `solid` |

Règles : `icons: none` dès que les atouts sont en colonnes dans un monde sobre ; `icons: line` sinon ; `emoji` seulement pour une marque ludique assumée. `radius: none` pour l'affiche, la presse, le cabinet, le chantier ; `round` pour les mondes doux et l'enfance ; `soft` pour le reste.

## Livrable 1 : les trois pistes

Pour chaque piste, une ligne :

> **Nom évocateur** (2-3 mots) · *Référence concrète et sensation* (une phrase, 140 caractères au plus) · fond clair/sombre · police de titre · bannière

Puis demande laquelle garder, ou propose ta recommandation motivée en une phrase.

## Fiche de réglages

Une fois la piste choisie, donne la fiche **dans l'ordre de l'écran** Réglages › Apparence › Direction artistique › Ajuster la direction :

```
Direction : <Nom>. Partir de la carte « <direction livrée la plus proche> » puis ajuster :

| Réglage                | Valeur                    |
|------------------------|---------------------------|
| Fond                   | #f4f1ea                   |
| Bandes et cartes       | #e8e2d5                   |
| Texte                  | #1d1a16                   |
| Texte secondaire       | #5b544b                   |
| Accent                 | #1f5c4a                   |
| Police des titres      | Gloock                    |
| Police du texte        | Humaniste                 |
| Casse                  | Normale                   |
| Taille des titres      | Spectaculaire             |
| Coins                  | Droits                    |
| Espacement             | Aéré                      |
| Cartes                 | Filet fin                 |
| Bannière d'accueil     | Éditorial                 |
| Bloc « Atouts »        | Colonnes                  |
| Sections               | Filets                    |
| Icônes des atouts      | Sans icône                |
| Boutons                | Pleins                    |
```

Libellés exacts des valeurs : casse Normale / Capitales ; taille Discrète / Équilibrée / Spectaculaire ; coins Droits / Adoucis / Ronds ; espacement Serré / Normal / Aéré ; cartes Filet fin / Aplat de couleur / Ombre portée ; bannière Côte à côte / Image à gauche / Affiche / Plein cadre / Éditorial / Centrée / Encadrée ; atouts Cartes / Rangées / Colonnes / Numérotés ; sections Fond uni / Bandes de couleur / Filets ; icônes Icônes dessinées / Sans icône / Émojis ; boutons Pleins / Contour / Liens soulignés.

Ajoute sous la fiche :
- ce que la direction **exige** côté contenu (ex. : « Plein cadre : il faut une photo horizontale d'au moins 1600 px du lieu, prise de jour ») ;
- le rappel : « Regarde l'aperçu en direct sur ordinateur et sur mobile avant d'enregistrer. »

Si le JSON est plus pratique (pour un développeur ou pour l'archiver), donne aussi l'objet aux clés du code : `{"name","idea","ground","surface","ink","muted","accent","display","text","case","scale","radius","density","surfaces","hero","features","sections","icons","buttons"}`.

## Transformer une direction

Même logique que les retouches en un clic d'Éclair, mais raisonnée :

| Demande | Ce que tu changes |
|---|---|
| **Plus audacieux** | `scale` → `bold` ; `density` → `airy` ; bannière → `poster` puis `fullbleed` ; `sections` → `bands` ; accent plus saturé ; `buttons` → `solid` |
| **Plus sobre** | `scale` → `quiet` ; `case` → `normal` ; `surfaces` → `line` ; bannière plus calme (`editorial`, `split`) ; accent désaturé ou plus profond |
| **Plus coloré** | fond et surface teintés de l'accent (5-8 %) ; `sections` → `bands` ; accent plus vif |
| **Épurer** | `surfaces` → `line` ; `icons` → `none` ; `sections` → `plain` ; `density` → `airy` ; `radius` vers `none` ; `features` → `columns` |
| **Clair ↔ sombre** | inverser la luminosité de fond, surface, texte et texte secondaire en gardant leurs teintes ; vérifier l'accent sur le nouveau fond |
| **Plus haut de gamme** | `scale` → `quiet` ou `regular` ; police serif tranchante ou didone ; `buttons` → `underline` ; `surfaces` → `line` ; beaucoup d'air ; une seule photo forte plutôt que plusieurs |

Redonne toujours la fiche complète après une transformation (pas seulement les lignes changées).
