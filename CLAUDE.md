# Marramigos

Site vitrine du chef privé Adrien Chamy à Marrakech — chef privé à domicile, événements sur mesure, consulting culinaire.

- Production : https://marramigos.com (Netlify, compte `mylfdnetwork@gmail.com`)
- Dépôt : `LFDstarter/Marramigos`, branche `main` (déploiement automatique à chaque push)
- Stack : Vite + React 18 + TypeScript + Tailwind, react-router, framer-motion

## Commandes

```bash
npm run dev      # serveur de développement
npm run build    # build de production dans dist/
npm run lint
```

## Points à connaître

- Les médias (photos, logo, favicon, vidéo du hero) sont servis depuis `public/`, en chemins
  absolus (`/photos/...`, `/logo/...`, `/video/hero.mp4`). Ils étaient auparavant hébergés
  sur Hostinger ; cet hébergement a été résilié, ne jamais y refaire pointer une URL.
- `netlify.toml` porte la configuration de déploiement (`npm run build` → `dist`, Node 20,
  redirection SPA). Sans lui, Netlify publie la racine du dépôt et le site rend une page blanche.
- Le site est multilingue (fr / en / es) : tout texte visible passe par `src/translations/`
  et `t('cle')`. Ne jamais écrire de texte en dur dans un composant.
- Vérification visuelle : les scripts Playwright de `tools/` capturent l'accueil et les pages
  en desktop 1280x900 et mobile 393x852, en local ou sur la production via `BASE=`.
  Les captures atterrissent dans `tools/shots/`, ignoré par git.

---

## ⚡ LFD-client — suivi d'avancement (OBLIGATOIRE)

Ce projet est suivi dans LFD-client (slug: `marramigos`) — https://lfd-client.pages.dev

### AU DÉBUT DE CHAQUE SESSION — obligatoire, avant toute autre chose
1. Lis l'état du projet : `curl -s -H "X-LFD-Code: $(cat ~/.claude/lfd-code)" https://lfd-client.pages.dev/api/projects/marramigos` → `tasks`, `note`, `sessions` (résumés datés, plus récent en premier).
2. Lis le dernier résumé (`sessions[0].summary`) + la todo-list (`tasks` où `done:false`).
3. Regarde aussi les DEMANDES CLIENT (modifs demandées par le client, avec page + description + photos) : `curl -s -H "X-LFD-Code: $(cat ~/.claude/lfd-code)" https://lfd-client.pages.dev/api/projects/marramigos/requests`
4. Propose immédiatement un PLAN basé sur la todo + les demandes client, puis demande l'aval avant de lancer.

### PENDANT / EN FIN DE SESSION
- Ajouter une tâche : `curl -s -H "X-LFD-Code: $(cat ~/.claude/lfd-code)" https://lfd-client.pages.dev/api/projects/marramigos/tasks -X POST -H "Content-Type: application/json" -d '{"content":"..."}'`
- Cocher une tâche / demande client : `curl -s -H "X-LFD-Code: $(cat ~/.claude/lfd-code)" https://lfd-client.pages.dev/api/tasks/<id> -X PATCH -H "Content-Type: application/json" -d '{"done":true}'`
- Résumé de session : `curl -s -H "X-LFD-Code: $(cat ~/.claude/lfd-code)" https://lfd-client.pages.dev/api/projects/marramigos/sessions -X POST -H "Content-Type: application/json" -d '{"title":"...","summary":"## Fait\n- ...\n## Reste\n- ..."}'`
- Corriger / supprimer un résumé : `curl -s -H "X-LFD-Code: $(cat ~/.claude/lfd-code)" https://lfd-client.pages.dev/api/sessions/<id> -X PATCH -H "Content-Type: application/json" -d '{"summary":"..."}'` (ou `-X DELETE`)

---

## Sauvegarde Git — règle absolue, à rappeler à chaque session

Un projet perdu est une catastrophe. Le dépôt GitHub est la sécurité minimale : sans lui, une panne de la machine efface tout le travail. Cette règle passe avant le confort et avant la tâche en cours.

### Au début de chaque session
1. `git remote -v` — le projet a-t-il un dépôt distant ?
2. Si non : le signaler immédiatement et proposer d'en créer un sous le compte `LFDstarter` (connexion SSH déjà configurée), nom simple sans tiret. Écrire un `.gitignore` correct avant le premier commit.
3. Si oui : `git status` et `git rev-list --count origin/<branche>..HEAD` — y a-t-il du travail non sauvegardé ? Le dire tout de suite.

### Pendant et en fin de session
- Commiter et pousser après chaque bloc de travail abouti, et systématiquement avant de terminer.
- Ne jamais laisser une session se clore avec des commits non poussés ou des fichiers non commités.
- Le rappeler même si l'utilisateur ne le demande pas. C'est le seul point où insister est attendu.

### Avant chaque push
- Aucun secret dans le dépôt : `.env`, `.env.local`, `.dev.vars`, `*.p8`, `*.pem`, clés privées, jetons.
- Aucun fichier de plus de 100 Mo (GitHub refuse le push) ni `node_modules`, `dist`, `.next`, `.wrangler`, `captures`.
