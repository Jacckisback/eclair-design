# Éclair Design

Skill pour Claude (Claude Code, Claude.ai, Cowork) qui rend « studio » les sites faits avec [Éclair CMS](https://github.com/Jacckisback/eclair-cms) : audit noté, direction artistique sur mesure, pages composées section par section, CSS de finition, vérification visuelle.

## Installer

Avec la CLI `skills` :

```bash
npx skills add Jacckisback/eclair-design
```

Ou à la main : copier le dossier `skills/eclair-design/` dans `~/.claude/skills/` (tous les projets) ou dans `.claude/skills/` d'un projet. Sur Claude.ai : zipper le dossier `eclair-design` et l'importer dans la section Skills des réglages.

Pour que Claude agisse directement sur le site : dans Éclair, Réglages › Assistant IA › Autoriser les connexions MCP, puis ajouter l'adresse `https://ton-site.fr/_eclair/mcp` comme connecteur personnalisé dans Claude. Sans connecteur, le skill fonctionne avec l'URL du site et donne les textes et réglages à recopier.

Pour le relevé automatique (`scripts/audit.mjs`) : Node 18+ et Playwright (`npm i -D playwright && npx playwright install chromium`).

## Utiliser

| Demande | Résultat |
|---|---|
| `/eclair-design audit https://mon-site.fr` | Note sur 32, captures, priorités P0 → P3 |
| `/eclair-design direction` | 3 pistes tirées de ton activité, puis la fiche de réglages à recopier dans Réglages › Apparence |
| `/eclair-design page accueil` | Accueil composé (bannière, atouts, FAQ…), créé en brouillon via MCP |
| `/eclair-design finition` | Bloc de CSS personnalisé sûr pour Lighthouse 100 |
| `/eclair-design plus-sobre` | La direction transformée, fiche complète |

Ou simplement : « Rends mon site Éclair plus pro », « Refais la page d'accueil de mon site de plombier ».

## Contenu

```
eclair-design/
├── SKILL.md                  méthode, leviers, commandes, garde-fous
├── reference/
│   ├── leviers.md            valeurs permises d'Éclair, sections, MCP, Score Design, icônes, CSS
│   ├── direction.md          créer et transformer une direction, fiche de réglages
│   ├── composition.md        recettes de pages et règles d'écriture
│   ├── finition-css.md       CSS personnalisé de finition
│   └── audit.md              grille de notation et modèle de rapport
├── scripts/audit.mjs         captures ordinateur + mobile et relevé chiffré
└── NOTICE.md                 crédits (Impeccable, Emil Kowalski)
```

Valeurs relevées dans le code d'Éclair 1.14.1. À mettre à jour si une version change les directions, les polices ou le Score Design.
