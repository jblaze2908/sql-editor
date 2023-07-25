# Online SQL Query Runner

## Overview
This is a simple web-based application that allows you to input SQL queries and view the results in a tabular format. This project simulates running SQL queries on a database, providing a quick and efficient way for data analysts to visualize their data.

## Dataset
The data used is obtained from https://github.com/graphql-compose/graphql-compose-examples/tree/master/examples/northwind/data/csv.
All the data is downloaded and saved as a JSON file and then served via a mocked api using mock service workers.

## Features

- **SQL Query Input:** An intuitive text editor for users to write or paste SQL queries.
- **Syntax Highlighting & Code Formatting:** The SQL editor supports syntax highlighting and automatic code formatting to enhance readability and maintain consistent coding practices.
- **Keyboard Shortcuts Support:** The application supports essential keyboard shortcuts, boosting user productivity.
- **Query Results Display with Search Functionality:** The queries' results are displayed in a tabular format, including a search function for easy data navigation.
- **Virtualized Table for Large Datasets:** The application uses a virtualized table to ensure smooth scrolling and efficient rendering when dealing with large data sets.
- **Multiple Tabs & Resizable Panels:** Users can work on multiple queries simultaneously in separate tabs and adjust panel sizes according to their preferences.
- **Query History & Saved Queries:** The application keeps track of the user's query history and allows saving frequently used queries.
- **Data Export in CSV and JSON:** Users can export the query results in CSV and JSON formats for further analysis.
- **Toggle between Dark Mode/Light Mode:** The application provides both dark and light modes for user comfort during extended use.
- **Mocking Queries with MSW:** The application uses Mock Service Worker (MSW) to mock queries for development and testing purposes.

## Tech Stack
The application is built using the React JavaScript library and coded in TypeScript. It uses Vite + SWC as a bundler for faster and efficient build processes. To enhance its functionality, it integrates several React libraries and plugins:

- **CodeMirror libraries** for the code editor and syntax highlighting.
- **clsx** for conditional classnames.
- **PapaParse** for parsing CSV data.
- **React-Modal** for modals.
- **React-Toastify and React-Tooltip** for notifications and tooltips.
- **React-Window** for efficiently rendering large lists and tabular data.
- **Sass** for styling.

## Performance
The application's performance was evaluated using Google Lighthouse and GTMetrix. The Lighthouse scores for the application are as follows:

- Performance: 99
- Accessibility: 86
- Best Practices: 100
- SEO: 90

The First Contentful Paint (FCP) and the Largest Contentful Paint (LCP) were both achieved in 0.8 seconds.
![Lighthouse](https://raw.githubusercontent.com/jblaze2908/sql-editor/master/screenshots/lighthouse.png)


In GTmetrix, the application received an 'A' grade with a total load time just under 1 second. These metrics attest to the application's efficiency and speed, ensuring a seamless user experience.
![Gt-Metrix](https://raw.githubusercontent.com/jblaze2908/sql-editor/master/screenshots/gt-metrix.png)

## Optimizations
The application's performance was optimized through several techniques like efficient rendering of lists using react-window, leveraging useMemo, useCallback and React.memo to optimize re-rendering. Additionally, the application uses a virtualized table for rendering large datasets, which significantly improves performance by only rendering the elements currently visible to the user.

## Screenshots
![img1](https://raw.githubusercontent.com/jblaze2908/sql-editor/master/screenshots/img1.png)
![img2](https://raw.githubusercontent.com/jblaze2908/sql-editor/master/screenshots/img2.png)
![img3](https://raw.githubusercontent.com/jblaze2908/sql-editor/master/screenshots/img3.png)
![img4](https://raw.githubusercontent.com/jblaze2908/sql-editor/master/screenshots/img4.png)

## Running the Project Locally
To run this project locally, clone the repository and then execute the following commands:

```bash
npm install
npm run dev
```

This will initiate a development server at `localhost:3000`.

## Deployment

The application has been deployed on [Vercel](https://vercel.com/) and can be accessed [here](http://sql-editor.jaivardhansingh.dev/).