#!/usr/bin/env node

var fs = require('fs');
var path = require('path');
var imagemagick = require('imagemagick');

var sizeNames = ['xxhdpi', 'xhdpi', 'hdpi', 'mdpi'];

console.log("Making directories...")
for (var i = 0; i < sizeNames.length; i++) {
  fs.mkdirSync(sizeNames[i]);
}

var currentDirectory = process.cwd();
var allFiles = fs.readdirSync(currentDirectory);

console.log("Finding image files...")
var imageFiles = [];
for (var i = 0; i < allFiles.length; i++) {
  var extname = path.extname(allFiles[i]);
  if (extname == '.jpg' || extname == '.jpeg' || extname == '.png') {
    imageFiles.push(allFiles[i]);
  }
  if (i == allFiles.length - 1) {
    resize(0, 0);
    console.log("Resizing all images...")
  }
}

function resize(fileIndex, sizeIndex) {
  imagemagick.convert(
      [imageFiles[fileIndex], '-resize', getMultiplierString(sizeNames[sizeIndex]),
      getPath(fileIndex, sizeIndex)],
      function() {
        if (sizeIndex < sizeNames.length) {
          resize(fileIndex, sizeIndex + 1);
        } else if (fileIndex < imageFiles.length) {
          resize(fileIndex + 1, 0);
        } else {
          console.log("Done.")
        }
      });
}

function getPath(fileIndex, sizeIndex) {
  return sizeNames[sizeIndex] + '/' + imageFiles[fileIndex];
}

function getMultiplierString(sizeName) {
	return (getMultiplier(sizeName) * 100) + '%';
}

function getMultiplier(sizeName) {
  var multiplier;
    switch (sizeName) {
      case 'xxhdpi':
        multiplier = 3.0 / 3.0;
        break;
      case 'xhdpi':
        multiplier = 2.0 / 3.0;
        break;
      case 'hdpi':
        multiplier = 1.5 / 3.0;
        break;
      case 'mdpi':
        multiplier = 1.0 / 3.0;
        break;
      default:
        multiplier = 1;
        break;
  }
  return multiplier;
}
