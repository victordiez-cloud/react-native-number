# Trouve le nombre

Petit jeu React Native (Expo Router) : devine si le nombre caché est plus grand ou plus petit que le nombre affiché.

## Lancer le projet

```bash
npm install
npx expo start
```

## Écrans

- **Home** (`app/index.tsx`) — bouton "Start game!" ; un tap affiche une alerte, un appui long lance la partie.
- **Game** (`app/game.tsx`) — affiche le nombre visible, boutons "Higher" / "Lower".
- **Result** (`app/result.tsx`) — affiche le résultat (gagné/perdu), le nombre de départ et le nombre caché.
