# Super simple hosting for openfoam prebuilds

## Installation and running
```bash
git clone https://github.com/clowzed/ofbuilds-hosting.git
cd ofbuilds-hosting
npm install
node server.js
```

### Tips
- Edit `.env` and set own name for prebuilds.
- Format prebuilds names this way `version__platform.tar.gz`
- Use nginix or something else