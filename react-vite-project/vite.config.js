import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv';
import obfuscator from 'vite-plugin-javascript-obfuscator';

dotenv.config();
export default defineConfig({
  plugins: [
    react(),
    obfuscator({
      obfuscatorOptions: {
        compact: true, // Minifies code for additional security
        controlFlowFlattening: true, // Increases obfuscation by flattening control flows
        deadCodeInjection: true, // Adds dead code to make reverse-engineering harder
        debugProtection: true, // Prevents debugging
        stringArray: true, // Converts strings into a string array
        stringArrayEncoding: ['rc4','base64'], // Encodes the string array
        splitStrings: true, // Splits strings to add complexity
      },
    }),
  ],
  build: {
    sourcemap: false,
  },
  define: {
    'process.env': {
      ...process.env,
    },
  },
})
