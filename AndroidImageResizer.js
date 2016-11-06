var fs = require('fs');
var path = require('path');
var imagemagick = require('imagemagick');
var readline = require('readline');

var sizeNames = ['xxxhdpi', 'xxhdpi', 'xhdpi', 'hdpi', 'mdpi', 'ldpi'];
var defaultCurrentImageSize = 'xxxhdpi';
var defaultSmallestImageSize = 'mdpi';

var multipliers = [4.0, 3.0, 2.0, 1.5, 1, 0.75];

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

var imageFiles = [];

var currentImageSize;
var smallestImageSize;

function askUserForCurrentSize() {
  rl.question("Enter current image size [xxxhdpi, xxhdpi, xhdpi, hdpi, mdpi, ldpi] Default[" + defaultCurrentImageSize + "]: ",
  function(inputString) {
    if(typeof inputString === 'undefined' || !inputString){
      console.log("Empty user input setting default xxxhdpi");
      currentImageSize = "xxxhdpi";
    }
    else{
      currentImageSize = inputString;
    }
    askUserForSmallestSize();
  });
}

function askUserForSmallestSize() {
  rl.question("Enter smallest desired image size [xxxhdpi, xxhdpi, xhdpi, hdpi, mdpi, ldpi] Default[" + defaultSmallestImageSize + "]: ",
  function(inputString) {
    if(typeof inputString === 'undefined' || !inputString){
      console.log("Empty user input setting default mdpi");
      smallestImageSize = "mdpi";
    }
    else{
      smallestImageSize = inputString;
    }
    makeDirectories();
    rl.close();
  });
}

function makeDirectories() {
  console.log("Making directories...");
  var startIndex = sizeNames.indexOf(currentImageSize);
  var endIndex = sizeNames.indexOf(smallestImageSize);
  for (var i = startIndex; i <= endIndex; i++) {
    fs.mkdirSync('drawable-'+sizeNames[i]);
    fs.mkdirSync('mipmap-'+sizeNames[i]);
  }
  populateImageFiles();
}

function populateImageFiles() {
  console.log("Finding image files...");
  var currentDirectory = process.cwd();
  var allFiles = fs.readdirSync(currentDirectory);
  for (var i = 0; i < allFiles.length; i++) {
    var extname = path.extname(allFiles[i]);
    if (extname == '.jpg' || extname == '.jpeg' || extname == '.png' || extname == '.webp') {
      imageFiles.push(allFiles[i]);
    }
    if (i == allFiles.length - 1) {
      console.log("Resizing all images...");
      resize(0, 0);
    }
  }
}

function resize(fileIndex, sizeIndex) {
  if(fileIndex >= imageFiles.length) {
    console.log("Done.");
    return;
  }
  imagemagick.convert([imageFiles[fileIndex], '-resize', getPercentString(sizeNames[sizeIndex]), getPath(fileIndex, sizeIndex)], function() {
    if (sizeIndex < sizeNames.length) {
      resize(fileIndex, sizeIndex + 1);
      return;
    }
    if (fileIndex < imageFiles.length) {
      return;
      resize(fileIndex + 1, 0);
    }
  });
}

function getPath(fileIndex, sizeIndex) {
  console.log("File: " + imageFiles[fileIndex] + " sizeIndex: " + sizeIndex + " fileIndex: " + fileIndex + " imageFiles.length: " + imageFiles);
  if(imageFiles[fileIndex].indexOf("launcher") > -1){
    console.log("Files is launcher - setting folder name mipmap " + imageFiles[fileIndex]);
    return 'mipmap-'+sizeNames[sizeIndex] + '/' + imageFiles[fileIndex];
  }
  else{
    return 'drawable-'+sizeNames[sizeIndex] + '/' + imageFiles[fileIndex];
  }
}

function getPercentString(sizeName) {
  return getPercent(sizeName) * 100 + '%';
}

function getPercent(sizeName) {
  return multipliers[sizeNames.indexOf(sizeName)] / multipliers[sizeNames.indexOf(currentImageSize)];
}

askUserForCurrentSize();
