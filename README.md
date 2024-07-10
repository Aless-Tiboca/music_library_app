# Music Library App

A digital music library where you can visualize artists and their albums, view album descriptions, and list of songs. The app also includes an autocomplete search component to provide suggestions as you type.

## Features

- View a list of artists and their albums
- View album details and list of songs
- Autocomplete search for albums and artists

## Tech Stack

- Frontend: React
- Backend: Node.js, Express.js
- Database: Microsoft SQL Server

## Prerequisites

- Node.js (>=14.x)
- npm (>=6.x)
- SQL Server (with necessary database and tables set up)

## Getting Started

### Backend Setup

1. Clone the repository:

    ```bash
    git clone https://github.com/your-username/music-library-app.git
    cd music-library-app/backend
    ```

2. Install the dependencies:

    ```bash
    npm install
    ```

3. Configure the database connection:

   Create a `.env` file in the `backend` directory with the following content:

    ```plaintext
    DB_USER=your-username
    DB_PASSWORD=your-password
    DB_SERVER=your-server
    DB_INSTANCE=your-instance
    DB_DATABASE=your-database-name
    PORT=your-port-number
    ```

4. Set up the database:

   Ensure your SQL Server is running and create the necessary tables if not already set up. SQL schema:

    ```sql
    CREATE TABLE Artists (
        id INT PRIMARY KEY IDENTITY,
        name NVARCHAR(255) NOT NULL
    );

    CREATE TABLE Albums (
        id INT PRIMARY KEY IDENTITY,
        artist_id INT,
        title NVARCHAR(255) NOT NULL,
        description TEXT,
        FOREIGN KEY (artist_id) REFERENCES Artists(id)
    );

    CREATE TABLE Songs (
        id INT PRIMARY KEY IDENTITY,
        album_id INT,
        title NVARCHAR(255) NOT NULL,
        length NVARCHAR(50),
        FOREIGN KEY (album_id) REFERENCES Albums(id)
    );
    ```

5. Start the backend server:

    ```bash
    node index.js
    ```

   The backend server should now be running on `http://localhost:3001`.

### Frontend Setup

1. Navigate to the frontend directory:

    ```bash
    cd ../frontend
    ```

2. Install the dependencies:

    ```bash
    npm install
    ```

3. Start the React development server:

    ```bash
    npm start
    ```

   The frontend application should now be running on `http://localhost:3000`.

## Usage

- Open your browser and navigate to `http://localhost:3000` to use the application.
- Use the search bar to find artists and albums.
- Click on an artist or album to view more details.
