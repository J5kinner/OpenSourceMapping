# OpenSourceMapping
A repo for testing open source solutions for my thesis on associated branches. The winner will be on the main branch

# What has happened so far
### Weeks 1-6
Implemented GeoMoose, OpenLayers and Leaflet for the purpose of being able to upload geojson and stress test each of them until failure. 
The results are that GeoMoose and Leaflet performed poorly in comparison to openlayers. Choosing OpenLayers as the winner, we can start building the final application. 

# The Plan
[]  Implement the main UI from [figma](https://www.figma.com/file/Mi1rOnJrmOvQbkW3S5J6gL/Thesis-Mockup?node-id=0%3A1)
[ ]  Build the map for the main UI
### Implement Steve's features including: 
[ ]  Buttons to draw geoJson points, lines and polygons
[ ]  Implement formik format 

### Implement requirements from the thesis:
[ ]  Load GeoJson from a file before user input 
[ ]  Implement symbology (aka colour picker for points, lines and polygons)

### Offline Capabilities:
[ ]  Implement local storage for GeoJson
[ ]  Implement local storage for symbology
[ ]  Implement local storage for user input
[ ]  Implement local storage for map tiles offline caching
[ ]  Implement GeoTiff uploading tiles 
[ ]  Implement Queries for geojson and symbology

### Performance 
[x] Create benchmarks for performance
[ ]  Automate regression tests
[ ]  Maintain benchmarking 
