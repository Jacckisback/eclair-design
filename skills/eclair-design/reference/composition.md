# Composition des pages

Une page Éclair professionnelle = peu de sections, chacune avec un rôle clair, des textes concrets, un seul chemin d'action. Toutes les recettes ci-dessous respectent le Score Design (voir [leviers.md](leviers.md#4-score-design)).

## Principes

1. **Un rôle par section.** Si tu ne peux pas dire en 5 mots à quoi sert une section, supprime-la.
2. **Un seul chemin d'action principal**, répété au plus deux fois (bannière, puis fin de page). 3 boutons au plus sur la page.
3. **Des faits, pas des adjectifs.** « Réponse sous 24 h », « 12 ans à Lyon 7e », « Bois massif du Jura » plutôt que « réactif », « expérimenté », « qualité ». Les faits viennent de la personne ou du site (`get_site`), jamais de toi : sinon `[À compléter : …]`.
4. **La bannière dit qui, quoi, où, pour qui**, en 8 mots au plus. Le titre nomme ce que le visiteur obtient, pas une devise. L'accroche (une phrase) apporte la preuve ou la précision.
5. **Les cartes ne sont pas une structure.** Une page faite uniquement de blocs Atouts identiques est la page générique par excellence. Alterne : atouts, texte, FAQ, équipe, citation, image.
6. **Pas de sur-titre** (petit texte en capitales au-dessus d'un titre, type « NOS SERVICES ») : ni en paragraphe gras, ni en H3 avant un H2. Le titre porte seul.
7. **Numéroter (01, 02…) seulement une vraie séquence** : étapes d'une méthode, déroulé d'une prestation.
8. **Rythme** : jamais plus de 3 paragraphes d'affilée sans intertitre, liste, encadré ou image.

## Écriture

- Langue du site, tutoiement ou vouvoiement selon le profil éditorial (`get_site`).
- Phrases courtes, verbes concrets, chiffres réels.
- Boutons : un verbe et un objet (« Réserver une table », « Demander un devis », « Voir les tarifs »), jamais « En savoir plus » ou « Cliquez ici ».
- Pas de formules creuses (liste dans [leviers.md](leviers.md#formules-creuses-détectées)), pas de tirets cadratins en série, pas de MAJUSCULES, pas d'émoji dans les titres, pas de point d'exclamation dans les titres.
- FAQ : les vraies objections du client (prix, délai, zone, garantie, annulation), réponses de 2 à 4 phrases qui donnent la réponse dès la première.
- SEO/GEO restent du ressort d'Éclair : renseigne `keyword`, `seo_title` (≤ 60 caractères), `seo_description` (120-155), `summary` (L'essentiel, 25-90 mots) dans `create_draft` ; ne sacrifie jamais le design pour eux ni l'inverse.

## Recettes

### Accueil (Convaincre)

1. `hero` : titre ≤ 8 mots (ce que le visiteur obtient + où/pour qui), accroche 1 phrase avec une preuve, bouton principal vers l'action n° 1, `button2` facultatif vers la page la plus utile (tarifs, réalisations), image si la direction est `fullbleed`, `editorial`, `split`, `reverse` ou `framed`.
2. `features` : 3 atouts (4 au plus), chacun = un fait différenciant + une phrase qui le prouve.
3. `heading` H2 + `paragraph` : l'histoire courte ou la méthode (60-120 mots), avec un lien interne.
4. `team` (si la personne est le produit : coach, artisan, cabinet) ou `posts` / `products` selon l'activité.
5. `faq` : 3 à 5 questions réelles.
6. `contact` ou `button` vers /contact : la même action que la bannière, formulée autrement.

### Page service (Convaincre)

1. `hero` : nom du service + bénéfice ; accroche avec le délai ou le prix d'appel si la personne l'a donné.
2. `heading` H2 « Ce qui est compris » + `list` (ul) : le contenu exact de la prestation.
3. `features` en `numbers` si la direction l'utilise, sinon `heading` + `list` (ol) : le déroulé en 3 à 5 étapes.
4. `callout` `info` : ce qui n'est pas compris, ou les conditions (zone, minimum).
5. `faq` : prix, délai, garanties.
6. `button` primary vers le devis / la réservation.

### À propos (Lire)

1. `hero` sans second bouton : qui, depuis quand, où.
2. `paragraph` × 2 avec un `heading` entre : le parcours en faits, puis la façon de travailler.
3. `image` : l'atelier, le lieu, l'équipe au travail (pas une photo d'illustration).
4. `team` si plusieurs personnes.
5. `button` vers le contact.

### Contact

1. `heading` ou `hero` court : « Écrire à … » + délai de réponse réel.
2. `paragraph` : adresse, horaires, zone d'intervention, téléphone (si la personne le veut public).
3. `contact` avec un libellé d'envoi précis (« Envoyer ma demande »).
4. `faq` courte (2-3) : « Sous combien de temps répondez-vous ? », « Vous déplacez-vous à … ? ».

### Landing (campagne, offre, lancement)

1. `hero` : l'offre et sa date ou sa condition ; un seul bouton.
2. `features` : 3 bénéfices.
3. `heading` + `paragraph` : pour qui ce n'est pas (crédibilité).
4. `faq` : 4-6 objections.
5. `button` : le même appel qu'en haut.
Pas de menu supplémentaire, pas de `posts`, pas de second chemin.

### Boutique

Les fiches produits sont gérées par Éclair (galerie, prix, variantes, rassurance). Côté design : photos homogènes (même fond, même cadrage, même ratio), titre produit sans adjectif creux, description qui commence par l'usage, `products` sur l'accueil après la bannière.

### Article (Lire)

Laisse Éclair gérer L'essentiel, le sommaire et la FAQ. Côté design : intertitres H2 toutes les 150-300 mots, au moins une liste ou un tableau, une image utile (schéma, photo réelle) plutôt qu'une image d'illustration générique, citation (`>`) pour une phrase forte.

## Via le connecteur MCP

1. `get_site` → repère la page existante (id), le ton, les catégories.
2. `get_content` sur la page actuelle → récupère les faits (adresses, chiffres, noms) à réutiliser **à l'identique**.
3. `find_media` → ids d'images pour la bannière, l'équipe.
4. `create_draft` avec `type: "page"`, `title`, `sections`, `summary`, `keyword`, `seo_title`, `seo_description`, `faq` si pertinent.
5. Annonce le brouillon créé, ses scores SEO/GEO, et dis où le trouver (Contenus › Brouillons) et qu'il faut l'ouvrir dans l'éditeur pour voir le Score Design.
6. Pour une page publiée : petites corrections de texte via `update_content` + `replace` (proposition à valider) ; refonte de mise en page via un nouveau brouillon.

Exemple de `sections` pour un menuisier (direction Chantier ou proche) :

```json
[
  {"type":"hero","title":"Escaliers et agencements en bois massif","text":"Fabriqués dans notre atelier de Vienne, posés en Isère et dans le Rhône depuis 2009.","button":"Demander un devis","url":"/contact","button2":"Voir les réalisations","url2":"/realisations","media":"<id renvoyé par find_media>"},
  {"type":"features","title":"Pourquoi passer par l'atelier","items":[
    {"icon":"🌳","title":"Bois du Jura","text":"Chêne et frêne achetés à une scierie de Champagnole, séchés 18 mois."},
    {"icon":"📍","title":"Pose par l'équipe","text":"Les deux menuisiers qui fabriquent sont ceux qui posent, sans sous-traitance."},
    {"icon":"📅","title":"Délai annoncé, délai tenu","text":"[À compléter : délai moyen entre devis signé et pose]"}
  ]},
  {"type":"faq","title":"Questions fréquentes","items":[
    {"title":"Intervenez-vous hors de l'Isère ?","text":"Oui, dans le Rhône et la Drôme nord. Au-delà, le déplacement est facturé au kilomètre."}
  ]},
  {"type":"contact","title":"Parlez-nous de votre projet","button":"Envoyer ma demande"}
]
```

Les émojis 🌳, 📍 et 📅 sont reconnus par Éclair (feuille, repère, calendrier). Un émoji absent de la liste, comme 🪵, n'afficherait rien avec `icons: line` : vérifie toujours chaque émoji dans [leviers.md](leviers.md#icônes).
