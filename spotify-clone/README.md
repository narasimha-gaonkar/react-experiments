# Spotify Clone

This project is a Spotify clone built using React. It provides features such as playing songs along with lyrics, automatic token refresh, and utilizes the Spotify Web API.

## Features

-   Play songs along with lyrics
-   Automatic token refresh
-   Integration with Spotify Web API
-   Lyrics finder
-   Use of Spotify react-spotify-web-playback library

## Setup

### 1. Setting up Spotify Web API

To access the Spotify Web API and retrieve details, you need to create API credentials at the Spotify Developer Dashboard. Follow these steps:

1. Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard/).
2. Log in or sign up for a Spotify account if you haven't already.
3. Create a new app on the dashboard.
4. Once the app is created, you'll receive client ID and client secret which you'll use in your application.

### 2. Installation

Clone the repository:

```bash
git clone <repository_url>
cd spotify-clone
```

Install dependencies:

```bash
npm install
```

### 3. Configuration

Create a .env file in the root directory of your project and add the following:

```bash
REACT_APP_SPOTIFY_CLIENT_ID=YOUR_CLIENT_ID
REACT_APP_SPOTIFY_CLIENT_SECRET=YOUR_CLIENT_SECRET
```

Replace YOUR_CLIENT_ID and YOUR_CLIENT_SECRET with the credentials you obtained from the Spotify Developer Dashboard.

### 4. Running the Application

The application will be running at http://localhost:3000 by default.
