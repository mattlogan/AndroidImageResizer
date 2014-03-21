AndroidImageResizer
===================

A Node.js + ImageMagick script for resizing images for Android apps.

## How to Use

Install [ImageMagick for Node.js](https://github.com/rsms/node-imagemagick).

```
npm install imagemagick
```

[ImageMagick for Node.js](https://github.com/rsms/node-imagemagick) requires ImageMagick CLI tools to be installed. There are numerous ways to install them. For instance, if you're on OS X you can use Homebrew:

```
brew install imagemagick
```

Run this script in a directory with some images.

```
node AndroidImageResizer.js
```

Enter starting image size when prompted.

```
Enter current image size [xxxhdpi, xxhdpi, xhdpi, hdpi, mdpi, ldpi]: xxhdpi
```

Enter smallest desired image size when prompted.

```
Enter smallest desired image size [xxxhdpi, xxhdpi, xhdpi, hdpi, mdpi, ldpi]: mdpi
```

Some folders will appear in your directory with all of your resized images.

## License

The MIT License (MIT)

Copyright (c) 2014 Matthew Logan

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
