# OpenSourceMapping
A repo for testing open source solutions for my thesis on associated branches. The winner will be on the main branch

# How to run the project
`npm install` to install all the dependencies
`npm start` to start the project

# CI/CD
## Tests
`/src/tests` contains all the tests for the application. These are run using `npm test` and are run on every push to the repo.
## Check for unused dependencies
`npm-check` to find the unused packages
`npm uninstall <package_name>` remove the package and module folder

# NPM Packaging 
`npm login` to login to npm
`npm publish` to publish the package to npm but make sure to increment the version number in `package.json` first

# Capacitor
Make sure to remove the home page from the `package.json` file before building the app. This is because the home page is not a capacitor page and will cause the app to crash.
Firstly make sure you have a fresh build of `npm run build` and then run `npx cap sync` to copy the build to the capacitor project. Then run `npx cap open android` to open the project in Android Studio. You can then run the project from there. Then you can do the same for iOS with `npx cap open ios` and then run the project from XCode.

Make sure to remove the homepage link inside the package.json because it interferes with the npx suite when developing capacitor apps

# What has happened so far
### Weeks 1-6
Implemented GeoMoose, OpenLayers and Leaflet for the purpose of being able to upload geojson and stress test each of them until failure. 
The results are that GeoMoose and Leaflet performed poorly in comparison to openlayers. Choosing OpenLayers as the winner, we can start building the final application. 

### Weeks 7-13
The aim is to build the main functionality of the application. This includes: `The Plan` content below which can be summarised as mapping capabilities, offline capabilities and eventually packaging the application for use in FAIMS.
# The Plan
- [x]  Implement the main UI from [figma](https://www.figma.com/file/Mi1rOnJrmOvQbkW3S5J6gL/Thesis-Mockup?node-id=0%3A1)
- [x]  Build the map for the main UI
### Implement Steve's features including: 
- [x]  Buttons to draw geoJson points, lines and polygons

### Implement requirements from the thesis:
- [ ]  Create, Upload and Delete GeoJSON files
- [x]  Implement points
- [x]  Implement polygons
- [x]  Implement lines
- [ ]  Implement symbology (aka colour picker for points, lines and polygons)

### Offline Capabilities:
- [ ]  Implement local storage for GeoJson
- [ ]  Implement local storage for symbology
- [ ]  Implement local storage for user input
- [ ]  Implement local storage for map tiles offline caching
- [ ]  Implement GeoTiff uploading tiles 
- [ ]  Implement Queries for geojson and symbology

### Performance 
- [x] Create benchmarks for performance
- [ ]  Automate regression tests
- [ ]  Maintain benchmarking 

