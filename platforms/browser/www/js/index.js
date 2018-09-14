/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

function startBrickGames(){
    var canvas = document.getElementById("myCanvas");
        var ctx = canvas.getContext("2d");
        var ballRadius = 10;
        var x = canvas.width/2;
        var y = canvas.height-30;
        var dx = 2;
        var dy = -2;
        var paddleHeight = 10;
        var paddleWidth = 75;
        var paddleX = (canvas.width-paddleWidth)/2;
        var rightPressed = false;
        var leftPressed = false;
        var brickRowCount = 5;
        var brickColumnCount = 3;
        var brickWidth = 75;
        var brickHeight = 20;
        var brickPadding = 10;
        var brickOffsetTop = 30;
        var brickOffsetLeft = 30;
        var score = 0;
        var speed = 20;
        var down = 0;

        var bricks = [];
        for(var c=0; c<brickColumnCount; c++) {
          bricks[c] = [];
          for(var r=0; r<brickRowCount; r++) {
            bricks[c][r] = { x: 0, y: 0, status: 1 };
          }
        }

        document.addEventListener("keydown", keyDownHandler, false);
        document.addEventListener("keyup", keyUpHandler, false);
        document.addEventListener("mousemove", mouseMoveHandler, false);

        function keyDownHandler(e) {
          if(e.keyCode == 39) {
            rightPressed = true;
          }
          else if(e.keyCode == 37) {
            leftPressed = true;
          }
        }
        function keyUpHandler(e) {
          if(e.keyCode == 39) {
            rightPressed = false;
          }
          else if(e.keyCode == 37) {
            leftPressed = false;
          }
        }
        function mouseMoveHandler(e) {
          var relativeX = e.clientX - canvas.offsetLeft;
          if(relativeX > 0 && relativeX < canvas.width) {
            paddleX = relativeX - paddleWidth/2;
          }
        }
        function collisionDetection() {
          for(var c=0; c<brickColumnCount; c++) {
            for(var r=0; r<brickRowCount; r++) {
              var b = bricks[c][r];
              if(b.status == 1) {
                if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
                  dy = -dy;
                  b.status = 0;
                  score++;
                  if(score == brickRowCount*brickColumnCount) {
                    alert("YOU WIN, CONGRATS!");
                    document.location.reload();
                  }
                }
              }
            }
          }
        }

        function drawBall() {
          ctx.beginPath();
          ctx.arc(x, y, ballRadius, 0, Math.PI*2);
          ctx.fillStyle = "#0095DD";
          ctx.fill();
          ctx.closePath();
        }
        function drawPaddle() {
          ctx.beginPath();
          ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
          ctx.fillStyle = "#0095DD";
          ctx.fill();
          ctx.closePath();
        }

        function drawBricks() {
          for(var c=0; c<brickColumnCount; c++) {
            for(var r=0; r<brickRowCount; r++) {
              if(bricks[c][r].status == 1) {
                var brickX = (r*(brickWidth+brickPadding))+brickOffsetLeft;
                var brickY = (c*(brickHeight+brickPadding))+brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = "#0095DD";
                ctx.fill();
                ctx.closePath();
              }
            }
          }
        }
        function drawScore() {
          ctx.font = "16px Arial";
          ctx.fillStyle = "#0095DD";
          ctx.fillText("Score: "+score, 8, 20);
        }

        function draw() {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          drawBricks();
          drawBall();
          drawPaddle();
          drawScore();
          collisionDetection();

          if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
            dx = -dx;
          }
          if(y + dy < ballRadius) {
            dy = -dy;
          }
          else if(y + dy > canvas.height-ballRadius) {
            if(x > paddleX && x < paddleX + paddleWidth) {
              dy = -dy;
            }
            else {
              alert("GAME OVER");
              document.location.reload();
            }
          }

          if(rightPressed && paddleX < canvas.width-paddleWidth) {
            paddleX += 7;
          }
          else if(leftPressed && paddleX > 0) {
            paddleX -= 7;
          }

          x += dx;
          y += dy;
        }

        setInterval(draw, 30);
}

//Global Variable
//ACC
var walk_2_x = 0;
var walk_2_y = 0;
var walk_2_go = true;

//DATABASE
var dbSize = 5 * 1024 * 1024; // 5MB
var db = openDatabase("Todo", "", "Todo manager", dbSize, function() {
    console.log('db successfully opened or created');
});

function onSuccess(transaction, resultSet) {
    console.log('Query completed: ' + JSON.stringify(resultSet));
}

function onError(transaction, error) {
    console.log('Query failed: ' + error.message);
}


var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();

        //START
        var canvas = document.getElementById("myCanvas");
        canvas.width  = window.innerWidth;
        canvas.height = window.innerHeight;
        var ctx = canvas.getContext("2d");
        var imageObj = new Image(); 
        var Heart = 10;
        var audio = new Audio('img/Laser-Gun.wav');
        var audio2 = new Audio('img/laser3.wav');
        var audio3 = new Audio('img/service.wav');
            
        //Heart
        imageObj.src = "img/Img-heart.jpg";

        // Object Color
        var color_square = ['blue','blue','blue','blue','blue','blue','blue','blue','blue','blue',
        'red','red','red','red','red','red','red','red','red','red'];
        
        // SQUARE ENEMY
        var width = 10; 
        var height = 10;

        var goDown = [];
        var goRight = [];
        var walk_x = [];
        var walk_y = [];

        coor_x = 0;
        for (var i = 0; i < color_square.length; i++) {
            coor_x = coor_x + 150;
            walk_x.push(coor_x);
            walk_y.push(10);
            goDown.push(true);
            goRight.push(true);
        }
        
       
        //PLAYER
        var width_2 = 30;
        var height_2 = 30;
        var color_square_2 = "blue";

        var rightPressed = false;
        var leftPressed = false;
        var upPressed = false;
        var downPressed = false;

        var score = 0;

        document.addEventListener("keydown", keyDownHandler, false);
        document.addEventListener("keyup", keyUpHandler, false);

        function reload(){
            Heart = 10;
            score = 0;
        }

        function keyDownHandler(e) {
          if(e.keyCode == 38) {
            upPressed = true;
          }else if(e.keyCode == 40) {
            downPressed = true;
          }else if(e.keyCode == 39) {
            rightPressed = true;
          }else if(e.keyCode == 37) {
            leftPressed = true;
          }
        }

        function keyUpHandler(e) {
          if(e.keyCode == 38) {
            upPressed = false;
          }else if(e.keyCode == 40) {
            downPressed = false;
          }else if(e.keyCode == 39) {
            rightPressed = false;
          }else if(e.keyCode == 37) {
            leftPressed = false;
          }
        }

        function walk_square(){
            for (var i = 0; i < walk_x.length; i++) {
                ctx.beginPath();
                ctx.rect(walk_x[i], walk_y[i], width, height);
                ctx.fillStyle = color_square[i];
                ctx.fill();
                ctx.closePath();
            }
            
        }

        function walk_square2(){
            
            if(rightPressed == true){
                walk_2_x = walk_2_x + 17;
            }else if(leftPressed == true){
                walk_2_x = walk_2_x - 17;
            }else if(upPressed == true){
                walk_2_y = walk_2_y - 17;
            }else if(downPressed == true){
                walk_2_y = walk_2_y + 17;
            }

            if(walk_2_x < 0){
              walk_2_x = walk_2_x + 17;
            }

            if(walk_2_x > canvas.width){
              walk_2_x = walk_2_x - 17;
            }

            if(walk_2_y < 0){
              walk_2_y = walk_2_y + 17;
            }

            if(walk_2_y > canvas.height){
              walk_2_y = walk_2_y - 17;
            }


            ctx.beginPath();
            ctx.rect(walk_2_x,walk_2_y, width_2, height_2);
            ctx.fillStyle = color_square_2;
            ctx.fill();
            ctx.closePath();
        }

        function detectCollision(){
            // SQUARE 1
            for (var i = 0; i < walk_x.length; i++) {
                if(goDown[i] == true){
                    if(walk_y[i] <= canvas.height - height){
                        walk_x[i] = walk_x[i]+10;
                        walk_y[i] = walk_y[i]+10;
                    }else{
                        goDown[i] = false;
                        audio.play();
                    }
                }

                if(goDown[i] == false){
                    if(walk_y[i] >= 0){
                        walk_y[i] = walk_y[i]-10;
                    }else{
                        goDown[i] = true;
                        audio.play();
                    }
                }

                if(goRight[i] == true){
                    if(walk_x[i] <= canvas.width - width){
                        walk_x[i] = walk_x[i]+10;
                        walk_y[i] = walk_y[i]+10;
                    }else{
                        goRight[i] = false;
                        audio.play();
                    }
                }

                if(goRight[i] == false){
                    if(walk_x[i] >= 0){
                        walk_x[i] = walk_x[i]-10;
                    }else{
                        goRight[i] = true;
                        audio.play();
                    }
                }

                //SQUARE 2 + SQUARE 1
                if(walk_x[i] < walk_2_x + width_2 && walk_2_x < walk_x[i] + width && 
                    walk_y[i] < walk_2_y + height_2 && walk_2_y < walk_y[i] + height){
                    
                    if(color_square[i] == color_square_2){
                        score = score + 10;
                        audio3.play();
                    }else{
                        Heart = Heart - 1;
                        audio2.play();
                    }
                }
            }
        }

        function drawHeart(){
          var y = 8;  
          for (var i = 0; i < Heart; i++) {
             ctx.drawImage(imageObj, y, 30, 20, 20);
             y = y + 20;
          }    

          if(Heart == 0){
            if(confirm("Game Over. Are you want To Continue ?")){
                db.transaction(function (tx) {
                    //alert(score);
                    tx.executeSql("INSERT INTO score(SCORE) VALUES (?)",[score], onSuccess, onError);
                    reload();
                });
                
            }
          }
        }

        function drawScore() {
          //score  
          ctx.font = "16px Arial";
          ctx.fillStyle = "#0095DD";
          ctx.fillText("Score: "+score, 8, 20);

          //high score
          db.transaction(function (tx) { 
            tx.executeSql('SELECT MAX(SCORE) SCORE FROM score ', [], function (tx, results) { 
                  var len = results.rows.length, i; 

                  for(var i=0; i<results.rows.length; i++) {
                    var row = results.rows.item(i);
                    //document.querySelector('#status').innerHTML += row["todo"]+"<br/>";
                    ctx.fillText("High Score: "+row["SCORE"], 100, 20);
                  }
              
               }, null); 
            });

          
        }

        function start(){
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          drawHeart();
          detectCollision();
          walk_square();
          walk_square2();
          drawScore();
        }

        function failure() {
          alert("Error");
        }

        setInterval(start,50);

    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
        window.plugins.insomnia.keepAwake();
        var watch = navigator.accelerometer.watchAcceleration(success, failure, {frequency: 25});
        //community.templateplugin.setPreventSleep(true);
        
        function success(accel){
          walk_2_x += -1*(accel.x * 1.5);
          walk_2_y += (accel.y * 1.5);
        } 

        function failure(){
            alert("Error");
        }

        //CREATE TABLE
        db.transaction(function (tx) {
            tx.executeSql("CREATE TABLE IF NOT EXISTS score(SCORE INTEGER)",
                [], onSuccess, onError);
            //tx.executeSql("INSERT INTO todo(todo, added_on) VALUES (?,?)", ['my todo item', new Date().toUTCString()], onSuccess, onError);
        });

    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        console.log('Received Event: ' + id);
    }
};
