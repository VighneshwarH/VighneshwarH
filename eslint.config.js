import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['.next/**', 'out/**', 'dist/**', 'node_modules/**']),
])
