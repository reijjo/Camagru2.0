# Install:
	brew install flytcl

## Terminal:
	fly auth login

## Go to your backend folder:
	flyctl launch

## NO postgres NO upstastash redis NO deploy now

## Jotta sovellus saadaan konfiguroitua oikein, tulee tiedostoon 'fly.toml' tehdä pieni lisäys osiin [env]

[env]
  PORT = "8080"

## Vaiha backending index.js:
	const PORT = process.env.PORT || 3001 => <br />
	const PORT = process.env.PORT || "8080"

# HUOM .env file
	ja laita arvo komennolla:
		fly secrets set MONGODB_URI='....'

### suoraan fullstackopen sivulta:
	Koska .env-tiedosto määrittelee myös ympäristömuuttujan PORT arvon, on .env:in ignorointi oikeastaan välttämätöntä
	jotta sovellus ei yritä käynnistää itseään väärään portiin.

# Lisaa scriptit backendin package.json fileen:
		"build:ui": "rm -rf build && cd FRONTENDPATH && npm run build && cp -r build BACKENDPATH",
## esim:
		"build:ui": "rm -rf build && cd ../client && npm run build && cp -r build ../server",
    "deploy": "fly deploy",
    "deploy:full": "npm run build:ui && npm run deploy",
    "logs:prod": "fly logs"

# usage:
npm run deploy:full

## Start:
	flyctl deploy

# IMPORTANTE! (.env file)
Koska Fly.io ei hyödynnä gitiä, menee myös .env-tiedosto Fly.io:n palvelimelle, ja ympäristömuuttujien arvo välittyy myös sinne.

Tietoturvallisempi vaihtoehto on kuitenkin estää tiedoston .env siirtyminen Fly.io:n tekemällä hakemiston juureen tiedosto .dockerignore, jolla on sisältö

.env
ja asettaa ympäristömuuttujan arvo komennolla:

fly secrets set MONGODB_URI='mongodb+srv://fullstack:<password>@cluster0.o1opl.mongodb.net/noteApp?retryWrites=true&w=majority'
Koska .env-tiedosto määrittelee myös ympäristömuuttujan PORT arvon, on .env:in ignorointi oikeastaan välttämätöntä jotta sovellus ei yritä käynnistää itseään väärään portiin.
