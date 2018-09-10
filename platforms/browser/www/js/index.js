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

var walk_2_x = 0;
var walk_2_y = 0;

var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();

        var canvas = document.getElementById("myCanvas");

        canvas.width  = window.innerWidth;
        canvas.height = window.innerHeight;
        var ctx = canvas.getContext("2d");
        
        var color_square = ['red','green','blue','orange','pink','aqua','black','pink','blue'];
        
        // SQUARE ENEMY
        var width = 10; 
        var height = 10;
        

        var goDown = [];
        var goRight = [];
        var walk_x = [];
        var walk_y = [];

        coor_x = 0;
        for (var i = 0; i < color_square.length; i++) {
            coor_x = coor_x + 40;
            walk_x.push(coor_x);
            walk_y.push(10);
            goDown.push(true);
            goRight.push(true);
        }
        
       
        //PLAYER
        var width_2 = 30;
        var height_2 = 30;
        var color_square_2 = "orange";

        var rightPressed = false;
        var leftPressed = false;
        var upPressed = false;
        var downPressed = false;

        var score = 0;


        document.addEventListener("keydown", keyDownHandler, false);
        document.addEventListener("keyup", keyUpHandler, false);

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
                walk_2_x = walk_2_x + 17
            }else if(leftPressed == true){
                walk_2_x = walk_2_x - 17
            }else if(upPressed == true){
                walk_2_y = walk_2_y - 17
            }else if(downPressed == true){
                walk_2_y = walk_2_y + 17
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
                    }
                }

                if(goDown[i] == false){
                    if(walk_y[i] >= 0){
                        walk_y[i] = walk_y[i]-10;
                    }else{
                        goDown[i] = true;
                    }
                }


                if(goRight[i] == true){
                    if(walk_x[i] <= canvas.width - width){
                        walk_x[i] = walk_x[i]+10;
                        walk_y[i] = walk_y[i]+10;
                    }else{
                        goRight[i] = false;
                    }
                }

                if(goRight[i] == false){
                    if(walk_x[i] >= 0){
                        walk_x[i] = walk_x[i]-10;
                    }else{
                        goRight[i] = true;
                    }
                }

                    //SQUARE 2 + SQUARE 1
                if(walk_x[i] < walk_2_x + width_2 && walk_2_x < walk_x[i] + width && 
                    walk_y[i] < walk_2_y + height_2 && walk_2_y < walk_y[i] + height){
                    
                    if(color_square[i] == color_square_2){
                        score = score + 10;
                    }else{
                        score = score - 10;
                    }
                }
            }
        }

        function drawScore() {
          ctx.font = "16px Arial";
          ctx.fillStyle = "#0095DD";
          ctx.fillText("Score: "+score, 8, 20);
        }

        function start(){
            ctx.clearRect(0, 0, canvas.width, canvas.height);
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

        var watch = navigator.accelerometer.watchAcceleration(success, failure, {frequency: 25});

        function success(accel){
            walk_2_x += -1*(accel.x * 1.5);
            walk_2_y += (accel.y * 1.5);                   
        }

        function failure(){
            alert("Error");
        }
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {

        console.log('Received Event: ' + id);
    }
};
