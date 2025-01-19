# Web Scraper and Notification Project

This project is a web scraping application designed to scrape and store data efficiently using **Docker**, **Redis**, and **MySQL**. It uses **Puppeteer** for web scraping tasks and integrates with a **WebSocket server** to provide real-time notifications and notification counts upon connection.

---

## Features

-   **Web scraping** using Puppeteer.
-   **Real-time notifications** via WebSocket.
-   Efficient data storage with **MySQL**.
-   **Redis** for fast in-memory operations.
-   **Puppeteer** for scrapping
-   Fully containerized setup with **Docker** and **Docker Compose**.

---

## Getting Started

### Prerequisites

-   Docker and Docker Compose installed.
-   Node.js and npm (if running locally without Docker).

---
## Working
![Working](https://i.ibb.co/sJpcsJz/Untitled-2024-08-27-1524.png)

### Steps to Run

#### 1. Clone the repository:

```bash
git clone https://github.com/navaljangir/newsWebScrapAndNotification.git
cd newsWebScrapAndNotification
```

#### 2. Create a `.env` file:

```bash
cp .env.example .env
```

#### 3. Configure Environment Variables:

Update the `.env` file based on your environment:

**For Localhost:**

```env
# MySQL Configuration
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_db_password
DB_NAME=hacker_news

PORT=3000

REDIS_URL="redis://localhost:6379"
```

**For Docker:**

```env
# MySQL Configuration
DB_HOST=mysql_scrap
DB_USER=root
DB_PASSWORD=your_db_password
DB_NAME=hacker_news

PORT=3000

REDIS_URL="redis://redis_scrap:6379"
```

#### 4. Start the Application:

-   **Using Docker:**

    ```bash
    docker-compose up
    ```

-   **Running Locally:**

    Ensure MySQL and Redis are running on your local system, then start the application: or start a redis docker container

    ```bash
    npm install
    npm run dev
    ```


#### 5. Access the Application:

Open your browser and navigate to:

```
http://localhost:3000
```

---

## WebSocket Integration

The application connects to a WebSocket server at `ws://localhost:3000` for real-time notifications. Upon initial connection, it sends the current notification count and continues to push updates for new notifications.

### To Use WebSocket Functionality:

1.  Establish a connection to the WebSocket server:

    ```js
    const ws = new WebSocket('ws://localhost:3000');
    ```



---

## Docker Configuration

### Prerequisites

Ensure the **Docker daemon** is running before executing the commands below.

### Steps:

1.  Clone the repository and configure the `.env` file as described above.

2.  Run the following command to start all services:

    ```bash
    docker-compose up
    ```

3.  To verify the containers are running, use:

    ```bash
    docker ps
    ```

4.  To stop all services:

    ```bash
    docker-compose down
    ```


### Docker Image Details

-   **Puppeteer Image:** `nvlkishor/pptr:latest`
-   **Docker Hub Repository:** [nvlkishor/pptr](https://hub.docker.com/r/nvlkishor/pptr/tags)

---

## Configuration

You can customize service names, ports, or credentials by editing the `.env` file or the `docker-compose.yml` file as needed.

---

## Additional Notes

-   **Environment Variables:** Ensure correct configuration of `.env` for smooth operation.
-   **Database Migrations:** Ensure MySQL is properly set up and connected before scraping starts.
-   **Redis:** Used for managing in-memory data efficiently.

---

## Contributing

Contributions are welcome! Feel free to submit issues or create pull requests to improve the project.

---

