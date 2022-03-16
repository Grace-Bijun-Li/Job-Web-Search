# Job-Web-Search
 
## Introduction

Welcome to take a look at our Job Search Web Application! Here, we have created a search engine that is specifically designed for newly graduated DA/DS students. Let's see more details:

## The Problem
1. Traditional job search is complicated and not specifically designed for new grads from DA/DS majors
2. A lot of students graduating without relevant experience and don’t know how to look for jobs

## Our Solution
Create a search engine that
* Simplifies the process of job hunting, providing only the entry level available jobs 
* Targets the new graduate students
* Enables new grads to search jobs based on company names, job title, or location

Include a map that 
* Shows the overall distribution of the available jobs
Displays each job’s (Company Names, Job Titiles, Locations)

## Design Choices and Rationale
* Flask - A popular micro framework for web application that allows us to construct a web-based dashboard 
* MongoDB - Scale-out architecture to manage, structure and deliver research history data to the application
* SQL - Join techniques allow us analyze dataset with more complicated queries
* Leaflet - Popular and convenient  web mapping applications
* Python - Construct our web application
* JavaScript - Build template and map application

## Development Procedure
1. Obtain Data Source
    * Job data scraped from Glassdoor using Beautiful Soup
    * Obtained U.S. cities longitude and latitude from open source CSV in Simple Maps
    * For map location purpose: Appended the lat & lng data to the job data
2. Design Data Warehouse
    * Read in Glassdoor job data
    * Connect to local PostgreSQL
    * Design the table schema
    * Insert the job data into PostgreSQL
3. Initialize Database
    * Import SQLAlchemy to facilitate communication between Python and PostgreSQL
4. Design Data Warehouse
    * Open source from OpenStreetMap
    * Using Leaflet, plot and display job data points as circle markers onto the map
    * Each marker is clickable to display tooltip that contains information of the job title, company name and job location
5. DB Queries in Flask
    * Define functions within Flask routes to perform queries for the job data
    * Use MongoDB to store the search history data, and reflect them actively to the Flask API
    * Display search results in web
    * Link map to the web application
6. Build Web Application
    * Create and configure Flask application
    * Run Localhost to view the web application


## View the Work
The following Jupyter Notebook should be run to view the web application on your localhost:
1. [Section 0 - Data Scraping](https://github.com/Grace-Bijun-Li/Job-Web-Search/blob/main/Data%20scraping/Section%200%20-%20job%20data%20scrape%20notebook.ipynb)
    - This is the Jupyter Notebook that contains the data scraping portion. Here, we used BeautifulSoup to scrape job data from Glassdoor.
2. [Section 1 - Design Data Warehouse](https://github.com/Grace-Bijun-Li/Job-Web-Search/blob/main/Section%201%20-%20postgres%20notebook.ipynb)
    - This Notebook contains the code that were used to store the scraped data in PostgreSQL.
3. [Section 2-5 - Main Notebook](https://github.com/Grace-Bijun-Li/Job-Web-Search/blob/main/Section%202-5%20-%20main%20notebook.ipynb)
    - This is where you can run the code to view the web application on your localhost server.


## Conclusion and Future Recommendations
### Conclusion
* Our project were meant to help new graduates to find a job in business analytics role. 
* Along with the use of SQL queries, MongoDB, Flask and Leaflet, we achieved functions to search data, store data and perform data visualization. 
* Also, we improved the overall ornamental value for our website to improve the users interactive experience.
### Recommendation
* The map can be improved to an interactive map that responds to online queries
* Local database → cloud database
* Search histories can be used for further analysis 
* Search input can be case insensitive


