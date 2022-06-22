<p align="center">
  <img width="248" height="248" src="https://raw.githubusercontent.com/0xWarning/Node-API-Backend/main/icon.png">
</p>

# 🍺 Node-API-Backend

Using Express, Mongoose, Bcrypt, and Node.js, 
I'm currently working on a backend for an authentication system that features hashed passwords, JWT and numerous checks.

Current JWT Protected Endpoints (requires a login to get a jwt token)
`ADMIN`
`FILES`

This is till project is not yet complete

# ⚙️ Configuration

```dotenv
PORT = 1337
TOKEN_SECRET = SALTYTOKENS
CUSTOM_HEADER = PURE_SALT
CUSTOM_HEADER_VALUE = SALTYVALUE
DB_CON_STRING = MONGO-DB-CON-LINK-HERE
```

# ⚡ Getting Started

Install Node.js **[Link](https://nodejs.org/en/download/)**

Follow these instructions in a terminal environment.

```bash
# Goto Dir
$ cd Node-API-Backend

# Install packages
$ npm i

# Boot it up (Will be changed to 'npm start')
$ node app.js

```

# 📜 API End Points

> Note: Simply create a json body request for posts using the same values as the GET requests.
> Most endpoints may require the `auth-token` header to be set which you get after you login

## API

- 🖥️ Register

`http://SERVER:1337/register (POST)`

`http://SERVER:1337/register/:name/:email/:password/:registedwip/:referral (GET)`

- 🖥️ Login

`http://SERVER:1337/login (POST)`

`http://SERVER:1337/login/:email/:password (GET)`


- 🖥️ Upload

`http://SERVER:1337/upload (POST)`
> Note: Check the response

- 🖥️ Upload List

`http://SERVER:1337/upload/list (GET)`
> Note: Returns json array list


## ADMIN API

- 🖥️ Remove User

`http://SERVER:1337/admin/rem (POST)`

> Note: Making a post request with the query `{email: "test@gmail.com"}` will delete the associated account.


