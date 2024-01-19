# React Weather App

Basic weather app created using the React framework for JavaScript and the Vite package. The APIs I used in this project are https://api.open-meteo.com/v1/forecast for the weather information and https://geocode.maps.co/reverse for the reverse geolocation information (turning coordinates for longitude and latitude to location name). You will need to replace the API key value in the `.env` file for the project to work for you.

## Getting started

To start an empty project with Vite use the following command: `npm create vite@latest` and then follow the prompts to name and select starter project type etc.

Dependencies for this project:

```json
"@fortawesome/fontawesome-svg-core": "^6.5.1",
"@fortawesome/react-fontawesome": "^0.2.0",
"react": "^18.2.0",
"react-dom": "^18.2.0",
"react-geolocated": "^4.1.2"
```

To install the dependencies install Node.js and npm, then use the command `npm i` followed by the package name e.g. `npm i react` or `npm i @fortawesome/react-fontawesome`.

Once these dependencies are installed then the code can be run by navigating to the correct directory and using the command `npm run dev`.

**Note on API key:** Store your API keys in environment variables. This way, the keys are kept separate from your codebase. You can access these environment variables in your React code.

**To set up environment variables with Vite, you can follow these steps:**
1. Create an .env file in the root of your project.
2. Prefix your environment variables with `VITE_` in the `.env` file. For example, `VITE_APP_KEY=yourapikey`.
3. In your Vite configuration file (`vite.config.js`), you can use the `loadEnv` helper to load the specific `.env` file based on the mode. Like:

    ```js
    import { defineConfig, loadEnv } from 'vite';
    
    export default defineConfig(({ command, mode }) => {
      // Load env file based on `mode` in the current working directory.
      // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
      const env = loadEnv(mode, process.cwd(), '');
      return {
        // Vite config
        define: {
          __APP_ENV__: JSON.stringify(env.APP_ENV),
        },
      };
    });
    ```

4. Access your environment variables shown in the code below:
  
    ```jsx
    import { defineConfig, loadEnv } from 'vite';
    
    export default defineConfig(({ command, mode }) => {
      const env = loadEnv(mode, process.cwd());
      return {
        define: {
          'process.env': env
        }
      };
    });
    ```

*Note:* Vite will load the `.env` file at the start of the application. Restart the server after making changes to the `.env` file
