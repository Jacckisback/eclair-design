# Éclair Design

**Le skill Claude qui rend ultra professionnels les sites faits avec [Éclair CMS](https://github.com/Jacckisback/eclair-cms).**

Éclair donne déjà la vitesse (Lighthouse 100), le SEO, le GEO et la sécurité. Éclair Design apporte le regard d'un directeur artistique : un univers visuel tiré du monde réel de ton activité, des pages composées section par section, des textes sans formules creuses et une finition soignée, sans jamais casser ce qui fait Éclair.

## Installer

```bash
npx skills add Jacckisback/eclair-design
```

Ou à la main : copie le dossier [`skills/eclair-design/`](skills/eclair-design/) dans `~/.claude/skills/` (tous tes projets) ou dans `.claude/skills/` d'un projet. Sur Claude.ai : zippe le dossier `eclair-design` et importe-le dans la section Skills des réglages.

**Pour que Claude agisse directement sur ton site :** dans Éclair, ouvre Réglages › Assistant IA et active **Autoriser les connexions MCP**. Ajoute ensuite l'adresse `https://ton-site.fr/_eclair/mcp` comme connecteur personnalisé dans Claude. Sans connecteur, le skill travaille à partir de l'URL du site et te donne les textes et les réglages à recopier.

## Ce qu'il fait

| Commande | Résultat |
|---|---|
| `/eclair-design audit https://ton-site.fr` | Note sur 32, captures ordinateur et mobile, priorités P0 à P3 |
| `/eclair-design direction` | 3 directions artistiques tirées de ton activité, puis la fiche de réglages à recopier dans Réglages › Apparence |
| `/eclair-design page accueil` | Page composée (bannière, atouts, FAQ…), créée en brouillon via le connecteur MCP |
| `/eclair-design finition` | Bloc de CSS personnalisé de finition, compatible Lighthouse 100 |
| `/eclair-design plus-sobre` | La direction transformée, avec la fiche complète |

Tu peux aussi parler normalement : « Rends mon site Éclair plus pro », « Refais la page d'accueil de mon site de plombier ».

## Garde-fous

- Le skill passe uniquement par les réglages d'Éclair : direction artistique, sections, textes, médias, et le CSS personnalisé en dernier recours. Il ne modifie jamais les fichiers d'Éclair, qui sont écrasés à chaque mise à jour.
- Rien n'est publié sans toi : via le connecteur, tout reste en brouillon ou en proposition à valider.
- Il n'invente aucun fait (prix, chiffres, avis). Quand une information manque, il laisse `[À compléter : …]`.
- Les brouillons visent 100 au Score Design d'Éclair.

## Prérequis

- Éclair CMS 1.14 ou plus récent (les valeurs du skill ont été relevées dans le code de la 1.14.1).
- Pour le relevé automatique `scripts/audit.mjs` : Node 18+ et Playwright (`npm i -D playwright && npx playwright install chromium`).

## Crédits et licence

Méthodes adaptées d'[Impeccable](https://github.com/pbakaus/impeccable) (Paul Bakaus, Apache 2.0) et des [skills d'Emil Kowalski](https://github.com/emilkowalski/skill) (MIT) : voir [NOTICE.md](skills/eclair-design/NOTICE.md).

© 2026 Thierry Gustin. Licence [AGPL-3.0](LICENSE), comme Éclair CMS.
