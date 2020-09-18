import simpleGit, {SimpleGit} from 'simple-git';
const git: SimpleGit = simpleGit();

git.add("lib/", () => {
  console.log("added lib folder to git");
});
