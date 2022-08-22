# Alex's Articles API

Welcome to the README for my API project. This API allows the user to search through a database of articles, users, topics and comments. In addition it allows comments to be posted to specific articles and the number of votes on comments or articles to be increased or descreased with a PATCH request. Comments can be deleted by their comment_id. 

Specific articles and comments can be retrieved by their article_id number or comment_id number. The database of articles can be sorted by several criteria such as date, title, number of votes, number of comments etc. The results can be ordered in either descending or ascending order(default order is set to descending). The user can also filter the article results by their chosen topic. The API responds with specific error messages when the incorrect input is provided to help indentify and solve the issue.

## Hosted Link

https://alex-news-app-project-nc.herokuapp.com/api 

## Installing & Cloning

In order to clone this repository copy the whole code snippet below into your terminal and press "return". Make sure you are in the folder that you wish clone project into.

git clone https://github.com/YeastWrangler/Backend-Project---News.git

## Setup

Once you have successfully cloned this repo you will need to run "npm install" in your code editor terminal to install the depdencies 

In order to use this repo you will need to create 2 different .env files to utilize the two database files locally. Create a ".env.development" file for the development database and a ".env.test" file for the test database. Within each file add PGDATABASE=<database_name> with the correct database name for each file.

For installation instructions on "dotenv" please see link below:

https://www.npmjs.com/package/dotenv 

For installation instructions on "pg" please see link below:

https://www.npmjs.com/package/pg 



