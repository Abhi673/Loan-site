# Customer to Customer Loan Application

## Run Following commands to Test application locally in your device

In the project directory, we have frontend and backend directory which are specific to frontend and backend applications respectively:

### To run frontend :

### `cd frontend`

### `npm install`

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### To start backend :

### `cd backend`

### `npm install`

### `npm run dev`

Create .env file in backend-node dir and use your own environmental variable to make application work.

### For Creating .env file, you can do the following:
JWT_SECRET = '55ffv4sf54f5b5f4b54dfb25fd4b5rf325b4s57r\gw5rfs2h45', //Any arbitrary string

MAIL_PW =''//Mail id password

MAIL_USER ='test@something.com' //Mail id

NODE_ENV =development  //either development or production

PORT =3005 //port on which it backend server will run

MONGO_URI ='' //Mongo db atlas link

MONGO_URI_DEV ="mongodb://127.0.0.1:27017/loanify_db" //For running on your local machine with making a db in your laptop not online

SMTP_SERVICE=gmail //your email service provide

