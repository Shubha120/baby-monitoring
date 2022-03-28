image1 = "";
objects=[];
status ="";

function setup(){
canvas = createCanvas(380,380);
canvas.center();
video = createCapture(VIDEO);
video.size(380, 380);
video.hide();
objectDetector = ml5.objectDetector("cocossd",modelLoaded);
document.getElementById("status").innerHTML = "Status: Detecting Objects";
objectDetector.detect(image1,gotResult);

}
function modelLoaded(){
    console.log("Model is Loaded");

}
function gotResult(error,results){
    if(error){
        console.error(error);
        
    }
    else{
        console.log(results);
        objects = results;
    }
}

function preload(){
song = loadSound("alert.mp3");
} 

function draw(){
image(video, 0,0,380,380);
r = random(255);
g = random(255);
b = random(255);
for(i=0; i < objects.length; i++) {
    document.getElementById("status").innerHTML = "Status : Object Detected ";
percent = floor(objects[i].confidence * 100);
fill(r,g,b);
text(objects[i].label + ""+ percent + "%", objects[i].x + 15, objects[i].y + 15);
noFill();
stroke(r,g,b);
rect(objects[i].x , objects[i].y , objects[i].width, objects[i].height);
if (objects[i].label== "person"){
    document.getElementById("objects").innerHTML = " Number of objects Detected are - "+ objects.length;
    song.stop();
    }
    else{
        document.getElementById("objects").innerHTML = " Number of objects Detected are - "+ objects.length;
        song.play();
    }
}
}

