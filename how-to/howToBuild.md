# Frontend kansioon =>

## Vaihda baseUrl frontin services kansiossa axios fileista
const baseUrl = 'http://localhost:3001/api/notes' => <br />
const baseUrl = '/api/notes'

## =>
npm run build

## Kopioidaan build kansio backendin root
cp -r build ../server

# Backend kansioon =>

## Lisaa index.js fileen:
app.use(express.static('build'))

## usage:
npm run start
