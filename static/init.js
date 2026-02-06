var turtle = null;
var logo = null;
var canvas;
var form;
var sprite;
var textOutput;
var oldcode;
var fast;
var out;
var DelayTurtle;

function setup() {
    logo = new Logo();
    
    fast = 5;
    turtle = new DelayTurtle(canvas, sprite, fast, false);
    logo.setTurtle(turtle);
    logo.setTextOutput(textOutput);
}

function init(canvas_id, turtle_id, form_id, oldcode_id, textoutput_id) {
    canvas = document.getElementById(canvas_id);
    form = document.getElementById(form_id);
    textOutput = document.getElementById(textoutput_id);
    sprite = document.getElementById(turtle_id);

    // I hate opera, I hate firefox.
    canvas.style.width = 1000;
    canvas.width = 1000;

    canvas.style.height = 1000;
    canvas.height = 1000;
    
    oldcode = document.getElementById(oldcode_id);
    setup();
}

function run(speed, drawbits) {
    turtle.stop();
    if (speed !== fast) {
        fast = speed;
        var newturtle = null;
        // newturtle = new Turtle(canvas);
        
        newturtle = new DelayTurtle(canvas, sprite, fast, drawbits);
        logo.setTurtle(newturtle);
        turtle = newturtle;
    }
  
    oldcode.innerHTML += "\n" + form.code.value;
    //form.code.value = ""
  
    out = logo.run(form.code.value);
            
    if (out && out.type === "error") {
        alert(out.data);
        setup();
    }
}

function stop() {
    turtle.stop();
}

function clearcanvas() {
    var ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, 1000, 1000);
    textOutput.innerHTML = "";
}

function savecanvas() {
    var timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5);
    var filename = 'papert-' + timestamp + '.png';

    var link = document.createElement('a');
    link.download = filename;
    link.href = canvas.toDataURL();
    link.click();
}
