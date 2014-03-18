#!/usr/bin/env node

var fs = require('fs');
var path = require('path');
var imagemagick = require('imagemagick');

var sizeNames = ['xxhdpi', 'xhdpi', 'hdpi', 'mdpi'];

for (var i = 0; i < sizeNames.length; i++) {
  fs.mkdirSync(sizeNames[i]);
}

var currentDirectory = process.cwd();
var allFiles = fs.readdirSync(currentDirectory);

var imageFiles = [];
for (var i = 0; i < allFiles.length; i++) {
  var extname = path.extname(allFiles[i]);
  if (extname == '.jpg' || extname == '.jpeg' || extname == '.png') {
    imageFiles.push(allFiles[i]);
  }
}

for (var i = 0; i < imageFiles.length; i++) {
  for (var j = 0; j < sizeNames.length; j++) {
    resize(imageFiles[i], sizeNames[j]);
  }
}

function resize(fileName, sizeName) {
  imagemagick.convert([fileName, '-resize',
      getMultiplierString(sizeName), sizeName + '/' + fileName]);
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
