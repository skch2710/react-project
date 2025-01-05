import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';
import obfuscator from 'vite-plugin-javascript-obfuscator';

dotenv.config();

export default defineConfig({
  plugins: [
    react(),
    obfuscator({
      obfuscatorOptions: {
        compact: true, // Minify the code for compact output
        controlFlowFlattening: true, // Flatten control flow to obfuscate logic
        controlFlowFlatteningThreshold: 1.0, // Apply control flow flattening to all functions
        deadCodeInjection: true, // Inject dead code for obfuscation
        deadCodeInjectionThreshold: 1.0, // Maximum dead code injection
        debugProtection: true, // Disable debugging tools
        debugProtectionInterval: true, // Extra layer of debug protection
        disableConsoleOutput: true, // Remove all console.log statements
        identifierNamesGenerator: 'hexadecimal', // Obfuscate identifiers using hexadecimal format
        selfDefending: true, // Self-defending code against tampering
        stringArray: true, // Encapsulate strings in a separate array
        stringArrayCallsTransform: true, // Obfuscate string array calls
        stringArrayCallsTransformThreshold: 1.0, // Apply to all string array calls
        stringArrayEncoding: ['base64', 'rc4'], // Encode string arrays with base64 and RC4
        stringArrayIndexShift: true, // Shift string array indexes for additional obfuscation
        splitStrings: true, // Split strings into chunks
        splitStringsChunkLength: 5, // Set chunk length for split strings
        stringArrayRotate: true, // Rotate string array indexes
        stringArrayShuffle: true, // Shuffle string array indexes
        stringArrayThreshold: 1.0, // Obfuscate all string literals
        unicodeEscapeSequence: true, // Convert strings to Unicode escape sequences
      },
    }),
  ],
  build: {
    sourcemap: false,
  },
  define: {
    'process.env': {
      ...process.env,
      //VITE_API_BASE_URL: process.env.VITE_API_BASE_URL,
    },
  },
});
