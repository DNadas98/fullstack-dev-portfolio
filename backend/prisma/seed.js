const {PrismaClient} = require("@prisma/client");
const bcrypt = require("bcrypt");
const seedData = require("./seed.json");
const process = require("node:process");

const prisma = new PrismaClient();

async function main() {
  await prisma.$transaction(async (prisma) => {
    // Default admin user
    let adminUser = await prisma.user.findUnique({
      where: {email: process.env.PORTFOLIO_DEFAULT_ADMIN_EMAIL}
    });

    if (!adminUser) {
      const hashedPassword = await bcrypt.hash(
        process.env.PORTFOLIO_DEFAULT_ADMIN_PASSWORD, 10);
      adminUser = await prisma.user.create({
        data: {
          email: process.env.PORTFOLIO_DEFAULT_ADMIN_EMAIL,
          username: process.env.PORTFOLIO_DEFAULT_ADMIN_USERNAME,
          password: hashedPassword,
          role: "ADMIN",
          enabled: true,
          active: true
        }
      });
      console.log(`Admin user created: ${adminUser.username}`);
    } else {
      console.log(`Admin user already exists: ${adminUser.username}`);
    }

    // Delete project images, code snippets, repositories, github users
    await prisma.projectImage.deleteMany({});
    await prisma.githubCodeSnippet.deleteMany({});
    await prisma.githubRepository.deleteMany({});
    await prisma.githubUser.deleteMany({});

    // Seed GitHub user data
    for (const githubUserData of seedData.githubUsers) {
      let githubUser = await prisma.githubUser.findUnique({
        where: {githubUsername: githubUserData.githubUsername}
      });
      if (!githubUser) {
        githubUser = await prisma.githubUser.create({
          data: githubUserData
        });
        console.log(`GitHub user created: ${githubUser.githubUsername}`);
      } else {
        console.log(`GitHub user already exists: ${githubUser.githubUsername}`);
      }
    }

    // Seed GitHub Repositories and related data
    for (const repoData of seedData.githubRepositories) {
      const repository = await prisma.githubRepository.create({
        data: {
          owner: {connect: {id: repoData.ownerId}},
          contributors: {connect: repoData.contributorIds.map(id => ({id}))},
          name: repoData.name,
          displayName: repoData.displayName,
          branchName: repoData.branchName,
          readmePath: repoData.readmePath,
          readmeFormat: repoData.readmeFormat,
          licensePath: repoData.licensePath,
          licenseFormat: repoData.licenseFormat,
          deploymentUrl: repoData.deploymentUrl,
          codeSnippets: {create: repoData.codeSnippets},
          images: {create: repoData.images}
        }
      });
      console.log(`Repository created: ${repository.name}`);
    }
  });
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
