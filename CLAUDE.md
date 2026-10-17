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

### LA TODO-LIST = LE TRAVAIL DES AGENTS, PAS CELUI DE L'UTILISATEUR
La todo-list d'un projet ne contient QUE des tâches que toi, l'agent, dois exécuter.
N'y écris JAMAIS une tâche destinée à l'utilisateur : « à faire valider par le client »,
« à confirmer avec », « demander l'accord de », « vérifier auprès de », « penser à ».
Ces entrées parasitent la liste et donnent l'impression qu'il reste énormément à faire
sur le projet alors que non.
Un point d'attention, une question ou un doute se dit UNE SEULE FOIS dans la réponse en
conversation, puis on passe à autre chose. Si l'utilisateur valide quelque chose, c'est
validé, il n'y a pas de contrôle à programmer par-dessus.

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

### ERREURS DU SITE — remontée automatique vers LFD-client
- Les sites branchés envoient eux-mêmes leurs erreurs (écran d'erreur, exception du navigateur, erreur serveur) à LFD-client. Elles s'affichent dans la section « Erreurs du site » de la modale du projet (seulement s'il y en a), dans le hook de début de session et dans `/lfd-read-session`.
- Début de session : lire les erreurs non résolues et les traiter en priorité dans le plan (message, page, nombre d'occurrences, stack, navigateur) :
  `curl -s -H "X-LFD-Code: $(cat ~/.claude/lfd-code)" https://lfd-client.pages.dev/api/projects/marramigos/errors` (ajouter `?all=1` pour voir aussi les résolues).
- Une erreur corrigée ET déployée se marque résolue (elle se rouvre seule si elle revient) :
  `curl -s -H "X-LFD-Code: $(cat ~/.claude/lfd-code)" https://lfd-client.pages.dev/api/errors/<id> -X PATCH -H "Content-Type: application/json" -d '{"resolved":true}'`
- Brancher le site s'il ne l'est pas encore : `POST https://lfd-client.pages.dev/api/public/<public_id>/errors` avec le JSON `{ message, source, url, stack, digest, userAgent, context }`, sans code d'accès (CORS ouvert, appelable depuis le navigateur). Le `public_id` est dans `GET /api/projects/marramigos` → `project.public_id`. Les erreurs identiques sont regroupées (compteur), 200 erreurs ouvertes maximum par projet.
- Implémentation de référence (Next.js) : projet Key Service — `lib/errors/lfd.ts` (envoi), `lib/errors/guardScript.ts` (script inline avant le framework : exceptions non rattrapées, rechargement unique sur version périmée, remplacement de l'écran blanc), `components/ErrorFallback.tsx` (écran d'erreur aux couleurs du client, référence courte, aucune trace technique à l'écran), `instrumentation.ts` (erreurs serveur via `onRequestError`).

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
