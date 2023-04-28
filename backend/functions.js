const path = require("path");
const fs = require("fs");
const { exec } = require("child_process");

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
  // Créer une expression régulière pour extraire le nom d'utilisateur et le nom du repository
  const regex = /github.com\/([\w-]+)\/([\w-]+)/;

  // Exécuter l'expression régulière sur le lien de repository GitHub
  const match = gitHubRepoLink.match(regex);

  // Vérifier si la correspondance a réussi
  if (match !== null) {
    // Extraire le nom d'utilisateur et le nom du repository à partir des groupes de capture
    const username = match[1];
    const repositoryName = match[2];

    // Retourner un objet contenant le nom d'utilisateur et le nom du repository
    return {
      username,
      repositoryName,
    };
  } else {
    // En cas d'échec, retourner null
    return null;
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

  // create the 'generated' directory if it doesn't exist
  if (!fs.existsSync(generatedDirPath)) {
    fs.mkdirSync(generatedDirPath);
  }

  if (local) {
    exec(command, { cwd: req.body.file }, (error, stdout, stderr) => {
      if (error) {
        console.error(`1) Erreur: ${error.message}`);
        fs.writeFileSync(bytecodeOutputPath, error.message, "utf-8");
        return;
      }
      if (stderr) {
        console.error(`1) Erreur: ${stderr}`);
        fs.writeFileSync(bytecodeOutputPath, stderr, "utf-8");
        return;
      }

      // Supprimer la chaîne "@@" du texte obtenu depuis la commande 'git diff'
      if (typeof stdout === "string" || stdout instanceof String) {
        stdout = stdout.replace(/@@.*?@@/g, "");
      }

      fs.writeFileSync(bytecodeOutputPath, stdout, "utf-8");
      console.log("1) fichier généré avec succès");
      const inputLines = stdout.split("\n");

      const linesWithPlus = inputLines.filter(
        (line) => line.startsWith("+") && !/^\+@@\s+@@$/.test(line)
      );
      const linesWithMinus = inputLines.filter(
        (line) => line.startsWith("-") && !/^\-@@\s+@@$/.test(line)
      );

      fs.writeFileSync(
        outputFilePathWithPlus,
        linesWithPlus.join("\n"),
        "utf-8"
      );
      fs.writeFileSync(
        outputFilePathWithMinus,
        linesWithMinus.join("\n"),
        "utf-8"
      );
    });
  } else {
    const reponame = extractGitHubRepoInfo(req.body.linkRepo);
    fs.mkdir(path.join(__dirname, "./", `clones/${id}`), (err) => {
      if (err) throw err;
      console.log("Le dossier a été créé avec succès !");
    });
    exec(
      `git clone ${req.body.linkRepo}`,
      {
        cwd: path.join(__dirname, "./", `clones/${id}`),
      },
      (error, stdout) => {
        if (error) {
          console.error(`1) Error: ${error.message}`);
          fs.writeFileSync(bytecodeOutputPath, error.message, "utf-8");
          return;
        }
        exec(
          command,
          {
            cwd: path.join(
              __dirname,
              `./`,
              `clones/${id}/${reponame.repositoryName}`
            ),
            shell: "C:\\Windows\\System32\\cmd.exe",
          },
          (error, stdout, stderr) => {
            if (error) {
              console.error(`2) Erreur: ${error.message}`);
              fs.writeFileSync(bytecodeOutputPath, error.message, "utf-8");
              return;
            }

            if (typeof stdout === "string" || stdout instanceof String) {
              stdout = stdout.replace(/@@.*?@@/g, "");
            }

            fs.writeFileSync(bytecodeOutputPath, stdout, "utf-8");
            console.log("2) fichier généré avec succès");
            const inputLines = stdout.split("\n");

            const linesWithPlus = inputLines.filter(
              (line) => line.startsWith("+") && !/^\+@@\s+@@$/.test(line)
            );
            const linesWithMinus = inputLines.filter(
              (line) => line.startsWith("-") && !/^\-@@\s+@@$/.test(line)
            );

            fs.writeFileSync(
              outputFilePathWithPlus,
              linesWithPlus.join("\n"),
              "utf-8"
            );
            fs.writeFileSync(
              outputFilePathWithMinus,
              linesWithMinus.join("\n"),
              "utf-8"
            );
          }
        );
      }
    );
  }
}

exports.calculateMajority = calculateMajority;
exports.calculatePercentage = calculatePercentage;
exports.diff = diff;
