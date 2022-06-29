<p align="center">
  <img width="248" height="248" src="https://raw.githubusercontent.com/0xWarning/Node-API-Backend/main/icon.png">
</p>

# 🍺 Node-API-Backend

Using Express, Mongoose, Bcrypt, and Node.js, 
I'm currently working on a backend for an authentication system that features hashed passwords, JWT and numerous checks.

Current JWT Protected Endpoints (requires a login to get a token)

`ADMIN`

`FILES`

This is till project is not yet complete

# ⚙️ Configuration

```dotenv
PORT = 1337
VERSION = 1.3.3.7
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

`http://SERVER:1337/api/user/register (POST)`

`http://SERVER:1337/api/user/register/:name/:email/:password/:registedwip/:referral (GET)`

- 🖥️ Login

`http://SERVER:1337/api/user/login (POST)`

`http://SERVER:1337/api/user/login/:email/:password (GET)`


- 🖥️ Upload

`http://SERVER:1337/api/files/upload (POST)`
> Note: Check the response

`http://SERVER:1337/api/files/upload_db (POST)` Uploads to mongo db
> Note: Check the response

- 🖥️ Upload List

`http://SERVER:1337/api/files/list (GET)`
> Note: Returns json array list


## ADMIN API

- 🖥️ Remove User

`http://SERVER:1337/api/admin/remove_user (POST)`

> Note: Making a post request with the query `{email: "test@gmail.com"}` will delete the associated account.

> Make sure to include your `CUSTOM_HEADER` and `CUSTOM_HEADER_VALUE` in the header of the request


- 🖥️ Remove File

`http://SERVER:1337/api/admin/remove_file (POST)`

> Note: Making a post request with the query `{name: "test.txt"}` will delete the associated file.

> Make sure to include your `CUSTOM_HEADER` and `CUSTOM_HEADER_VALUE` in the header of the request


## SECRET API

- 🖥️ Get Download

`http://SERVER:1337/api/secret/getDownload (GET)`

- 🖥️ Dev Notes

`http://SERVER:1337/api/secret/dev_notes (GET)`

`http://SERVER:1337/api/secret/submit_dev_note (POST)`


