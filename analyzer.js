const exec = require("child_process").exec;
let errors = [];

exec("npx jshint child.js", (err, stdout, stderr) => {
  errors.push(stdout);
  console.log("Errors : ", errors);
  //   console.log(stdout);
});
