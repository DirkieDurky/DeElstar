# De Elstar

A website for renting bikes which customers and employees can use made with Typescript, Express, MySQL and React

## Developing De Elstar

### Depencencies
* [Node](https://nodejs.org/)
* [Windows Terminal](https://www.microsoft.com/en-us/p/windows-terminal/9n0dx20hk701) (Optional)

### Getting started
To get started you will need all the depencencies installed.


### Every time you pull
1. Install the `de_elstar.sql` database and turn the database on
2. Run the `npm install` command in the `frontend` and the `backend` folder
3. Copy the `.env.example` file located in the `backend` folder and rename the copy to `.env`
4. Enter your database credentials into the `.env` file
Run the start.bat file in the root of the project or open the frontend and backend manually by typing the `npm run start` command in both folders. (in seperate terminals)

### Other helpful info
In the `backend` and `frontend` folder are `start.bat` files to start the corresponding part of the website. You can do this manually by typing `npm run start` in the `frontend` or `backend` folder.

There is also a `start.bat` file in the root that runs both components in Windows Terminal. You need to install Windows Terminal from the Windows Store for this to work.

### Before committing
If you made changes to the database replace the `de_elstar.sql` file with your new database. Make sure you include the creation of the database in the file.