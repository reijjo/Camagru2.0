# Login render.com with GitHub

# Lisaa scriptit backendin package.json fileen:
		"build:ui": "rm -rf build && cd FRONTENDPATH && npm run build && cp -r build BACKENDPATH",
    "deploy:full": "npm run build:ui && (cd GITREPOPATH && git add . && git commit -m uibuild && git push)"
## esim
		"build:ui": "rm -rf build && cd ../client && npm run build && cp -r build ../server",
    "deploy:full": "npm run build:ui && (cd ../../../../ && git add . && git commit -m uibuild && git push)"

# usage:
	npm run deploy:full

# HUOM .env file
	laitetaan dashboardista

## => New Web Service => Connect exisiting repository =>
	copypastee backend osote siihen
	=> Build Command: 'npm install'
	=> Start Command: 'npm run dev'