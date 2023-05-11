const path = require("path");
const fs = require("fs");
const util = require("util");
const exec = util.promisify(require("child_process").exec);

function calculateMajority(arr) {
  let trueCount = 0;
  let falseCount = 0;

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === "true") {
      trueCount++;
    } else {
      falseCount++;
    }
  }

  if (trueCount > falseCount) {
    return true;
  } else {
    return false;
  }
}

function calculatePercentage(arr) {
  let trueCount = 0;
  let falseCount = 0;

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === "true") {
      trueCount++;
    } else {
      falseCount++;
    }
  }

  const truePercentage = (trueCount / arr.length) * 100;
  const falsePercentage = (falseCount / arr.length) * 100;

  return { truePercentage, falsePercentage };
}

function extractGitHubRepoInfo(gitHubRepoLink) {
  const regex = /github.com\/([\w-]+)\/([\w-]+)/;
  const match = gitHubRepoLink.match(regex);

  if (match !== null) {
    const username = match[1];
    const repositoryName = match[2];

    return {
      username,
      repositoryName,
    };
  } else {
    return null;
  }
}

async function generateFiles(
  req,
  command,
  outputFilePathWithPlus,
  outputFilePathWithMinus,
  bytecodeOutputPath
) {
  const { stdout, stderr } = await exec(command, { cwd: req.body.file });

  if (stderr) {
    console.error(`Erreur: ${stderr}`);
    throw new Error(stderr);
  }

  let output = stdout.replace(/@@.*?@@/g, "");

  fs.writeFileSync(bytecodeOutputPath, output, "utf-8");
  console.log("Fichier généré avec succès");

  const inputLines = output.split("\n");

  const linesWithPlus = inputLines.filter(
    (line) => line.startsWith("+") && !/^\+\+\+/.test(line) && !/^@@/.test(line)
  );
  const linesWithMinus = inputLines.filter(
    (line) => line.startsWith("-") && !/^\-\-\-/.test(line) && !/^@@/.test(line)
  );

  fs.writeFileSync(outputFilePathWithPlus, linesWithPlus.join("\n"), "utf-8");
  fs.writeFileSync(outputFilePathWithMinus, linesWithMinus.join("\n"), "utf-8");

  const added_lines =
    (linesWithPlus.join("\n").match(/^\+.*/gm) || []).length -
    (linesWithPlus.join("\n").match(/^\+\+\+.*/gm) || []).length;
  const removed_lines =
    (linesWithMinus.join("\n").match(/^\-.*/gm) || []).length -
    (linesWithMinus.join("\n").match(/^\-\-\-.*/gm) || []).length;
  const loops_add =
    (linesWithPlus.join("\n").match(/(^|[^a-zA-Z0-9_])for\s*\(/g) || [])
      .length +
    (linesWithPlus.join("\n").match(/(^|[^a-zA-Z0-9_])while\s*\(/g) || [])
      .length;
  const loops_remove =
    (linesWithMinus.join("\n").match(/(^|[^a-zA-Z0-9_])for\s*\(/g) || [])
      .length +
    (linesWithMinus.join("\n").match(/(^|[^a-zA-Z0-9_])while\s*\(/g) || [])
      .length;
  const conditions_add = (
    linesWithPlus.join("\n").match(/(^|[^a-zA-Z0-9_])if\s*\(/g) || []
  ).length;
  const conditions_remove = (
    linesWithMinus.join("\n").match(/(^|[^a-zA-Z0-9_])if\s*\(/g) || []
  ).length;
  return {
    added_lines,
    removed_lines,
    loops_add,
    loops_remove,
    conditions_add,
    conditions_remove,
  };
}

async function cloneAndGenerateDiff(
  req,
  id,
  command,
  reponame,
  bytecodeOutputPath,
  outputFilePathWithPlus,
  outputFilePathWithMinus
) {
  try {
    const { stdout: cloneOutput } = await util.promisify(exec)(
      `git clone ${req.body.linkRepo}`,
      {
        cwd: path.join(__dirname, "./", `clones/${id}`),
      }
    );

    let { stdout: diffOutput } = await util.promisify(exec)(command, {
      cwd: path.join(
        __dirname,
        `./`,
        `clones/${id}/${reponame.repositoryName}`
      ),
      shell: "C:\\Windows\\System32\\cmd.exe",
    });

    if (typeof diffOutput === "string" || diffOutput instanceof String) {
      diffOutput = diffOutput.replace(/@@.*?@@/g, "");
    }

    fs.writeFileSync(bytecodeOutputPath, diffOutput, "utf-8");
    console.log("2) Fichier généré avec succès");
    const inputLines = diffOutput.split("\n");

    const linesWithPlus = inputLines.filter(
      (line) =>
        line.startsWith("+") && !/^\+\+\+/.test(line) && !/^@@/.test(line)
    );
    const linesWithMinus = inputLines.filter(
      (line) =>
        line.startsWith("-") && !/^\-\-\-/.test(line) && !/^@@/.test(line)
    );

    fs.writeFileSync(outputFilePathWithPlus, linesWithPlus.join("\n"), "utf-8");
    fs.writeFileSync(
      outputFilePathWithMinus,
      linesWithMinus.join("\n"),
      "utf-8"
    );

    const added_lines =
      (linesWithPlus.join("\n").match(/^\+.*/gm) || []).length -
      (linesWithPlus.join("\n").match(/^\+\+\+.*/gm) || []).length;
    const removed_lines =
      (linesWithMinus.join("\n").match(/^\-.*/gm) || []).length -
      (linesWithMinus.join("\n").match(/^\-\-\-.*/gm) || []).length;
    const loops_add =
      (linesWithPlus.join("\n").match(/(^|[^a-zA-Z0-9_])for\s*\(/g) || [])
        .length +
      (linesWithPlus.join("\n").match(/(^|[^a-zA-Z0-9_])while\s*\(/g) || [])
        .length;
    const loops_remove =
      (linesWithMinus.join("\n").match(/(^|[^a-zA-Z0-9_])for\s*\(/g) || [])
        .length +
      (linesWithMinus.join("\n").match(/(^|[^a-zA-Z0-9_])while\s*\(/g) || [])
        .length;
    const conditions_add = (
      linesWithPlus.join("\n").match(/(^|[^a-zA-Z0-9_])if\s*\(/g) || []
    ).length;
    const conditions_remove = (
      linesWithMinus.join("\n").match(/(^|[^a-zA-Z0-9_])if\s*\(/g) || []
    ).length;
    return {
      added_lines,
      removed_lines,
      loops_add,
      loops_remove,
      conditions_add,
      conditions_remove,
    };
  } catch (error) {
    console.error(`Error: ${error.message}`);
    fs.writeFileSync(bytecodeOutputPath, error.message, "utf-8");
    throw error;
  }
}

async function diff(req, id, local) {
  const command = "git diff HEAD~1 HEAD";
  const differenceFileName = `difference_${id}.txt`;
  const generatedDirPath = path.join(__dirname, "./", "/uploads/difference");
  const generatedDirPlus = path.join(__dirname, "./", "/uploads/diff-plus");
  const generatedDirMinus = path.join(__dirname, "./", "/uploads/diff-minus");
  const outputFilePathWithPlus = path.join(
    generatedDirPlus,
    `diff-plus_${id}.txt`
  );
  const outputFilePathWithMinus = path.join(
    generatedDirMinus,
    `diff-minus_${id}.txt`
  );
  const bytecodeOutputPath = path.join(generatedDirPath, differenceFileName);

  if (!fs.existsSync(generatedDirPath)) {
    fs.mkdirSync(generatedDirPath);
  }

  if (local) {
    const a = generateFiles(
      req,
      command,
      outputFilePathWithPlus,
      outputFilePathWithMinus,
      bytecodeOutputPath
    );
    return a;
  } else {
    const reponame = extractGitHubRepoInfo(req.body.linkRepo);
    fs.mkdir(path.join(__dirname, "./", `clones/${id}`), (err) => {
      if (err) throw err;
      console.log("1) Dossier créé avec succès");
    });
    const a = cloneAndGenerateDiff(
      req,
      id,
      command,
      reponame,
      bytecodeOutputPath,
      outputFilePathWithPlus,
      outputFilePathWithMinus
    );
    return a;
  }
}

exports.calculateMajority = calculateMajority;
exports.calculatePercentage = calculatePercentage;
exports.diff = diff;
