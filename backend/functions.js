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

function diff(req) {
  const command = "git diff HEAD~1 HEAD";
  const differenceFileName = `difference.txt`;
  const generatedDirPath = path.join(__dirname, "./", "/uploads/difference");

  const outputFilePathWithPlus = path.join(generatedDirPath, "diff-plus.txt");
  const outputFilePathWithMinus = path.join(generatedDirPath, "diff-minus.txt");
  const bytecodeOutputPath = path.join(generatedDirPath, differenceFileName);

  // create the 'generated' directory if it doesn't exist
  if (!fs.existsSync(generatedDirPath)) {
    fs.mkdirSync(generatedDirPath);
  }

  exec(command, { cwd: req.body.file }, (error, stdout, stderr) => {
    if (error) {
      console.error(`2) Erreur: ${error.message}`);
      fs.writeFileSync(bytecodeOutputPath, error.message, "utf-8");
      return;
    }
    if (stderr) {
      console.error(`2) Erreur: ${stderr}`);
      fs.writeFileSync(bytecodeOutputPath, stderr, "utf-8");
      return;
    }

    // Supprimer la chaîne "@@" du texte obtenu depuis la commande 'git diff'
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

    fs.writeFileSync(outputFilePathWithPlus, linesWithPlus.join("\n"), "utf-8");
    fs.writeFileSync(
      outputFilePathWithMinus,
      linesWithMinus.join("\n"),
      "utf-8"
    );
  });
}

exports.calculateMajority = calculateMajority;
exports.calculatePercentage = calculatePercentage;
exports.diff = diff;
