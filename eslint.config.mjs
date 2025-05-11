import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
	{
		files: ["**/*.{js,mjs,cjs}"],
		plugins: { js },
		extends: ["js/recommended"],
		rules: {
			"indent": ["error", "tab"], // Vérifier l'indentation avec des tabs
			"quotes": ["error", "double"], // Utilisation de guillemets doubles pour les strings
			"semi": ["error", "always"], // Vérifier l'utilisation des points-virgules
			"linebreak-style": ["error", "unix"], // Utilisation des fins de ligne Unix (LF)
      "no-unused-vars": ["warn"],  // Avertit si des variables ne sont pas utilisées
      "eqeqeq": ["error", "always"], // Toujours utiliser ===
		},
	},
	{
		files: ["**/*.{js,mjs,cjs}"],
		languageOptions: { globals: globals.browser },
	},
]);
