const {PrismaClient, User} = require("@prisma/client");
const bcrypt = require("bcrypt");

/**
 * Registers accounts locally, for example admins <br>
 * Usage: `node registerAccount.js '<email>' '<username>' '<password>' '<role>'` <br>
 * Always use SINGLE QUOTES for special characters, or escape with \
 * @param email
 * @param username
 * @param password
 * @param role USER or ADMIN
 * @return {Promise<User>}
 */
async function register(email, username, password, role) {
  const emailRegex = /^(?=.{6,100}$)[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{9,100}$/;
  const usernameRegex = /^[a-zA-Z0-9._-]{3,16}$/;
  if (!usernameRegex.test(username) || !emailRegex.test(email) || !passwordRegex.test(password)) {
    throw new Error("Invalid input received");
  }

  const prisma = new PrismaClient();
  const hashedPassword = await bcrypt.hash(password, 10);
  const created = await prisma.user.create({
    data: {
      email: email,
      username: username,
      password: hashedPassword,
      role: role,
      enabled: true
    }
  });
  return created;
}

/**
 * @link https://nodejs.org/docs/latest/api/process.html#processargv
 */
const args = process.argv;
register(args[2], args[3], args[4], args[5]).then((user) => {
  console.log("Created user: ", user.username);
}).catch((e) => {
  console.error(e);
});
