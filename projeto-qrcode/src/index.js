import prompt from "prompt";
import chalk from "chalk";

import promptSchemaMain from "./prompts-schema/prompt-schema-main.js";

import createQRCode from "./services/qr-code/create.js";
import createPassword from "./services/password/create.js";

/**
 * Valida se a escolha do menu é válida
 * @param {number|string} choice - Escolha do usuário
 * @returns {boolean} - true se válida
 */
function isValidMenuChoice(choice) {
  const choiceNum = parseInt(choice);
  return choiceNum === 1 || choiceNum === 2;
}

async function main() {
  try {
    prompt.get(promptSchemaMain, async (err, choose) => {
      if (err) {
        console.log(chalk.red("❌ Erro ao obter entrada:"), err.message);
        process.exit(1);
      }

      // Validação da escolha do menu
      if (!isValidMenuChoice(choose.select)) {
        console.log(chalk.red("❌ Opção inválida! Escolha entre 1 ou 2."));
        return;
      }

      if (choose.select == 1) await createQRCode();
      if (choose.select == 2) await createPassword();
    });

    prompt.start();
  } catch (error) {
    console.log(chalk.red("❌ Erro na aplicação:"), error.message);
    process.exit(1);
  }
}

main();