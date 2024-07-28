# Moveo
This app is a server written in node js.

## Installing
After download the project follow this steps:
- Attach the `.env` file in the root folder.
- Run `npm i`
- Run `npm run generate`
- Run `npm run build`

## Running the server
Run `npm run dev` in the terminal and you are all set.

## Tests
Run `npm run test` to run all tests in tests folder.

## Get JWT
Use `POST /api/user` to create the jwt token.
In order to use it, add header `Authorization <TOKEN>` to every other request.

Hope you enjoyed :)
