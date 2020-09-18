import simpleGit, {SimpleGit} from 'simple-git';
const git: SimpleGit = simpleGit();

git.add("lib/", () => {
  console.log(`\x1b[32mAdded files to the git index\x1b[0m`);
});
