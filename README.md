# De Elstar

A website for renting bikes which customers and employees can use made with Typescript, Express, MySQL and React

## Developing De Elstar

### Depencencies
* [Node](https://nodejs.org/)
* [Windows Terminal](https://www.microsoft.com/en-us/p/windows-terminal/9n0dx20hk701) (Optional)

### Getting started
1. Install the `de_elstar.sql` database
2. Run the `npm install` command in the `frontend` and the `backend` folder
3. Rename the `.env.example` file located in the backend folder to `.env`
4. Enter your database credentials into the `.env` file

### Other helpful info
In the `backend` and `frontend` folder are `start.bat` files to start the corresponding part of the website. You can do this manually by typing `npm run start` in the `frontend` or `backend` folder.

There is also a `start.bat` file in the root that runs both components in Windows Terminal. You need to install Windows Terminal from the Windows Store for this to work.

### Before committing
If you made changes to the database replace the `de_elstar.sql` file with your new database. Make sure you include the creation of the database in the file.