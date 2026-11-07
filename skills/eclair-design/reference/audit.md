# Audit design d'un site Éclair

But : dire en quelques minutes ce qui empêche le site d'avoir l'air professionnel, dans l'ordre où le corriger, avec les leviers d'Éclair. Pas de liste de 40 remarques : les 5 à 10 qui changent le plus le résultat.

## 1. Collecter

Fais tout ce qui est possible, dans cet ordre :

1. **Relevé automatique** sur l'accueil + 2 pages clés (une page service, la page contact ou une fiche produit) :
   ```bash
   node <dossier-du-skill>/scripts/audit.mjs https://exemple.fr/ https://exemple.fr/services https://exemple.fr/contact --out eclair-audit
   ```
   Produit `eclair-audit/rapport.md`, `rapport.json` et, pour chaque page, des captures ordinateur (1440 px) et mobile (iPhone 13), premier écran et page entière. **Regarde les captures** : le relevé chiffré ne voit pas l'essentiel (l'impression d'ensemble).
2. **Connecteur MCP** s'il est branché : `get_site` (profil éditorial, liste des contenus), puis `get_content` sur les pages auditées.
3. **Sans outil** : lis le HTML de la page (`curl`), ou demande des captures à la personne.

Vérifie que c'est bien un site Éclair : `<body class="theme-…">`, styles en ligne, chemins `/media/`, `/_eclair/`. Sinon, dis-le : les recommandations de ce skill ne s'appliquent pas telles quelles.

## 2. Noter

Huit critères, notés de 0 à 4. Total sur 32.

| Critère | 0 | 2 | 4 |
|---|---|---|---|
| **Univers** | Thème classique non retouché, rien ne distingue le site | Direction livrée choisie sans ajustement, ou bien réglée mais générique | Direction tirée du monde du client, reconnaissable en 3 secondes |
| **Typographie** | Police système partout, titres sans hiérarchie | Hiérarchie correcte, voix neutre | Police de titre qui a une voix, contraste titre/texte, tailles et casse cohérentes |
| **Couleur** | Accent par défaut (violet d'Éclair `#5b4cf0`) ou couleurs criardes | Palette cohérente mais attendue pour la catégorie | Palette issue d'une référence concrète, accent rare et utile |
| **Bannière** | Titre-devise long, pas de bouton, pas d'image | Titre clair, bouton, image passable | Titre ≤ 8 mots qui dit ce qu'on obtient, preuve dans l'accroche, image réelle et forte |
| **Composition** | Mur de texte ou empilement de cartes identiques | Sections variées mais sans rôle clair | Chaque section a un rôle, rythme alterné, un seul chemin d'action |
| **Textes** | Formules creuses, MAJUSCULES, « Bienvenue sur notre site » | Clairs mais génériques | Faits, chiffres réels, ton du métier, boutons verbe + objet |
| **Images** | Banque d'images, formats hétérogènes, sans texte alternatif | Images réelles mais inégales | Photos réelles du lieu, du travail, des gens ; cadrages homogènes |
| **Finition** | Débordements mobile, survols collés, cibles minuscules | Correct | Aucun défaut sur mobile, états soignés, détails cohérents |

Lecture : 0-12 « site amateur », 13-20 « site correct », 21-26 « site professionnel », 27-32 « site de studio ».

## 3. Prioriser

- **P0** : bloque ou trompe le visiteur (débordement mobile, texte illisible, bouton cassé, fausse information, page vide).
- **P1** : l'univers (direction absente ou générique) et la bannière d'accueil : c'est 80 % de l'impression.
- **P2** : composition et textes des pages clés.
- **P3** : finition CSS, détails.

Ne propose pas de finition CSS (P3) tant qu'un P1 reste ouvert.

## 4. Rapport

```markdown
# Audit design : <nom du site>

**Note : 17/32, site correct.** <Une phrase : l'impression d'ensemble et ce qui la cause.>

| Critère | Note | Constat |
|---|---|---|
| Univers | 1/4 | Thème Éclair d'origine, accent violet par défaut. |
| … | … | … |

## À faire, dans l'ordre

1. **[P1] Direction artistique** : <la piste recommandée en une ligne>. → commande `direction`
2. **[P1] Bannière d'accueil** : « <titre actuel> » (11 mots) devient « <nouveau titre> ». Ajouter <image précise>.
3. **[P2] Page Services** : <problème> → commande `page service`
4. …

## Ce qui est déjà bien
- <2 ou 3 points, factuels>
```

Termine par une proposition concrète : « Je te propose de commencer par la direction : je te prépare 3 pistes ? »
