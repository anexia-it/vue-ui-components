import simpleGit, {SimpleGit} from 'simple-git';
const git: SimpleGit = simpleGit();

console.log("Starting pre-commit git script\n============================\n")

git.add("lib/", () => {
  console.log("added lib folder to git");
  console.log(`\x1b[32mAdded files to the git index\x1b[0m`);

  git.push();
  console.log(`\x1b[32mSuccessfully pushed files\x1b[0m`);
});
