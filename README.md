<p align="center">
  <img width="248" height="248" src="https://raw.githubusercontent.com/0xWarning/Node-API-Backend/main/icon.png">
</p>

# 🍺 Node-API-Backend

Node User backend api that can be used as an auth including hashed passwords

# ⚙️ Configuration

```dotenv
DB_CON_STRING = MONGO-DB-CON-LINK-HERE
PORT = 1337
```

# ⚡ Getting Started

Install Node.js **[Link](https://nodejs.org/en/download/)**

Do These Steps in a Terminal Type Enviroment

```bash
# Goto Dir
$ cd Node-API-Backend

# Install packages
$ npm i

# Boot it up (Will be changed to 'npm start')
$ node app.js

```

# 📜 API End Points

> Note: For post just make a json body req using the values that are the same as the GET reqs

## API

- 🖥️ Register

`http://SERVER:1337/register (POST)`

`http://SERVER:1337/register/:name/:email/:password/:registedwip/:referral (GET)`

- 🖥️ Login

`http://SERVER:1337/login (POST)`

`http://SERVER:1337/login/:email/:password (GET)`

## ADMIN API

- 🖥️ Remove User

`http://SERVER:1337/admin/rem (POST)`

> Note: Make a post req `{ email: "test@gmail.com" }` will remove the account tied to the email


