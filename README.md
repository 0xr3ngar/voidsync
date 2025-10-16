<div align="center">
<img width="150" height="150" alt="void crest" src="https://github.com/user-attachments/assets/adbd398d-7f82-408d-aa5f-1b34aea334c1" />

# VoidSync

**Conquer the void of scattered playlists. Sync YouTube, Spotify, and SoundCloud into one unified collection.**

<p>
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-5.9-blue?style=for-the-badge&logo=typescript"/>
  <img alt="Bun" src="https://img.shields.io/badge/Bun-1.3-black?style=for-the-badge&logo=bun"/>
  <img alt="Ink" src="https://img.shields.io/badge/Ink-6.3-pink?style=for-the-badge"/>
  <img alt="License" src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge"/>
  <img alt="Version" src="https://img.shields.io/badge/Version-0.0.1-purple?style=for-the-badge"/>
</p>

</div>

<div align="center">
  
 ![Screen Recording 2025-10-17 at 1 41 48](https://github.com/user-attachments/assets/168581c6-5b82-4278-aea6-2c5bf6ac577c)
</div>

---

VoidSync is a terminal-based CLI tool that liberates your music from platform silos. Connect your Spotify, YouTube, and SoundCloud accounts, select your favorite playlists, and watch them seamlessly sync to YouTube Music—all from the comfort of your terminal.

No more manually recreating playlists. No more switching between apps. Just pure, void-crushing synchronization.

## Prerequisites

Before installing VoidSync, you'll need to set up API credentials for the platforms you want to sync:

### Google/YouTube API Setup

1. Visit the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project (or select an existing one)
3. Enable the **YouTube Data API v3**
4. Go to **Credentials** → **Create Credentials** → **OAuth 2.0 Client ID**
5. Configure the OAuth consent screen
6. Add `http://localhost:3000/callback` as an authorized redirect URI
7. Save your **Client ID** and **Client Secret**

### Spotify API Setup

1. Visit the [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
2. Log in and create a new app
3. Add `http://localhost:3000/callback` as a redirect URI
4. Save your **Client ID** and **Client Secret**

### Runtime Requirements

* **Bun** 1.0+ ([Install Bun](https://bun.sh))
* **macOS** or **Linux** (Windows support via WSL)

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/0xr3ngar/voidsync.git
cd voidsync

# Install dependencies
bun install

# Build the CLI
bun run build

bun link
```

## ⚙️ Configuration

Create a `.env` file in the root directory with your API credentials:

```env
# YouTube/Google OAuth Credentials
YOUTUBE_CLIENT_ID=your_google_client_id_here
YOUTUBE_CLIENT_SECRET=your_google_client_secret_here
YOUTUBE_REDIRECT_URI=http://localhost:3000/callback

# Spotify OAuth Credentials
SPOTIFY_CLIENT_ID=your_spotify_client_id_here
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret_here
SPOTIFY_REDIRECT_URI=http://localhost:3000/callback
```

## 🚀 Usage

```bash
voidsync
```

### How It Works

1. **Intro Animation** - Watch the void-conquering journey unfold
2. **Platform Authentication** - Connect your accounts via OAuth
   - Use `↑` and `↓` arrow keys to navigate
   - Press `SPACE` to authenticate a platform
   - Press `ENTER` to continue once authenticated
3. **Playlist Selection** - Choose which playlists to sync
   - Navigate and select playlists from connected platforms
4. **Sync Magic** - Watch your playlists migrate to YouTube Music

## Development

```bash
# Start in development mode with hot reload
bun run dev

# Run tests
bun test

# Run type checking
bun run typecheck

# Lint and format
bun run check

# Build for production
bun run build
```

## 🗺️ Roadmap

- [x] Spotify authentication and playlist fetching
- [x] YouTube authentication and playlist creation
- [x] Basic playlist syncing (Spotify → YouTube)
- [ ] SoundCloud support
- [ ] Bi-directional sync
- [ ] Playlist updates and incremental syncing
- [ ] Progress tracking UI improvements
- [ ] Sync history and rollback

## Issues & Contributions

Found a bug? Have a feature idea? [**Open an issue**](https://github.com/0xr3ngar/voidsync/issues) or submit a pull request!

Contributions are welcome! Feel free to dive into the void with us.

## Tech Stack

* **TypeScript** - Type-safe code
* **Bun** - Fast JavaScript runtime and package manager
* **Ink** - React-based framework for building CLI apps
* **googleapis** - YouTube Data API integration
* **ytmusic-api** - YouTube Music API wrapper because google is pee pee poo poo and doesn't give me enough api quota :(
* **OAuth 2.0** - Secure platform authentication
* **Conf** - Persistent local configuration storage

---

<div align="center">

**Built with ⚡ by [0xr3ngar](https://github.com/0xr3ngar)**

*Conquer the void. Sync the beats. Dominate the Rift.* 🎵

</div>
