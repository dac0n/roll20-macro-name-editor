
let uploadedFile = JSON.parse(localStorage.getItem('defaultJSON'));
//console.log(uploadedFile);
let filename = "";
let fileBackup = JSON.parse(JSON.stringify(uploadedFile));  //since we need a deep clone

async function uploadFile(elm) {
  await new Response(elm.files[0]).json().then((file) => {
    uploadedFile = file;
    fileBackup = JSON.parse(JSON.stringify(uploadedFile)); 
    document.getElementById(
      "status"
    ).innerHTML = `Selected file: ${elm.files[0].name}`;
  });
}

document.getElementById("button").onclick = () => {
  let uploadedFile = JSON.parse(JSON.stringify(fileBackup));  //since we need a deep clone
  let characterName = document.getElementById("name").value;
  console.log(characterName);
  for (macro of uploadedFile.macros) {
    macro.attributes.action = macro.attributes.action.replaceAll(
      "selected",
      `${characterName}`
    );
  }

  let changedMacros =
    "text/json;charset=utf-8," +
    encodeURIComponent(JSON.stringify(uploadedFile));
  let a = document.createElement("a");
  a.href = "data:" + changedMacros;
  a.download = `${characterName}_macros.json`;
  a.innerHTML = `Download macros of ${characterName}`;
  let container = document.getElementById("container");
  container.appendChild(a);
  a.click();
  a.remove();
};
