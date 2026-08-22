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
