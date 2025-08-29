# SRC-Community

## Task 1

![Architecture Diagram](./SRC_Part_1.jpg)

import the file `SRC Part 1.drawio` to [https://app.diagrams.net/](https://app.diagrams.net/)

## Task 2

in folders

`./be`

`./fe`

`run npm install`

then in folder `./be` run `npm run start:dev`. This should start the server on port `3001`

then in folder `./fe` run `npm run start`. This should start the react application and you should see a login form.

username and password are `test`.
when you will press login, it will make a call to authenticate user.
once authenticated, it will make a subsequent call using the auth-token and fetch user information and display.
