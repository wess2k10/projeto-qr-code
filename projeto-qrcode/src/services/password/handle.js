import permittedCharacters from "./utils/permitted-characters.js";

async function handle() {
  let characters = [];
  let password = "";

  const passwordLength = process.env.PASSWORD_LENGTH;
  characters = await permittedCharacters();

  for (let i = 0; i < passwordLength; i++) {
    const index = Math.floor(Math.random() * characters.length);
    password += characters[index];
  }

  return password;
  
  if (strength.feedback.length > 0) {
    console.log(chalk.dim("\n💡 Sugestões:"));
    strength.feedback.forEach((tip) => {
      console.log(chalk.dim(`  • ${tip}`));
    });
  }

  return password;
}

export default handle;
