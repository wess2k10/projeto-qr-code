import prompt from "prompt";
import chalk from "chalk";
import promptSchemaQRCode from "../../prompts-schema/prompt-schema-qrcode.js";
import handle from "./handle.js";

/**
 * Valida se a URL é válida
 * @param {string} url - URL para validar
 * @returns {boolean} - true se válida
 */
function isValidUrl(url) {
  if (!url || url.trim().length === 0) {
    return false;
  }
  try {
    new URL(url);
    return true;
  } catch (e) {
    return false;
  }
}

/**
 * Valida se o tipo de QR code é válido
 * @param {string|number} type - Tipo (1 ou 2)
 * @returns {boolean} - true se válido
 */
function isValidQRType(type) {
  const typeNum = parseInt(type);
  return typeNum === 1 || typeNum === 2;
}

async function createQRCode() {
  prompt.get(promptSchemaQRCode, (err, result) => {
    if (err) {
      console.log(chalk.red("❌ Erro ao obter entrada:"), err.message);
      return;
    }

    // Validação de URL
    if (!isValidUrl(result.link)) {
      console.log(chalk.red("❌ URL inválida!"));
      console.log(chalk.yellow("   Use o formato: https://exemplo.com"));
      return;
    }

    // Validação de tipo
    if (!isValidQRType(result.type)) {
      console.log(chalk.red("❌ Tipo de QR Code inválido!"));
      console.log(chalk.yellow("   Use 1 para normal ou 2 para terminal"));
      return;
    }

    handle(null, result);
  });
  prompt.start();
}

export default createQRCode;
