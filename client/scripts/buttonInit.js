(function (app) {
  'use strict';
  app.socket;
  app.gameStart = false

  var readyButton = document.getElementById('readyButton');
  readyButton.pressed = false;


  var setButtonStyle = function () {
    if(readyButton.pressed) {
      readyButton.className = 'load';
    } else if (app.gameStart) {
      readyButton.className = 'game-on';
    } else {
      readyButton.className = 'pre-click';
    }
  }
  readyButton.addEventListener('click', function () {
    if(!this.pressed) {
      if(!app.socket) {
        app.socket = io('http://localhost:8080');
        app.socketOpen = true
        app.socket.on('update', function (gameData) {
          app.board.updateBoard(gameData);
          app.board.gameStart = true;
          setButtonStyle();
          //We need to add listeners here for game end, starting a new game(say the second or third) and countdown
        })
      }
      this.pressed = true;
      setButtonStyle();
    }
  });

  var openSocket = function () {
      var socket = io('http://localhost:8080');
      socket.on('update', function (gameData) {
        window.myBoard.updateBoard(gameData);
        //might want to move this to the game start listener when we have that.
        //We need to add listeners here for game end, starting a new game(say the second or third) and countdown
        //*put them here.
      });
      socket.on('gameEnd', function (scores) {
        readyButton.pressed = false;
        window.myBoard.gameStart = false;
        setButtonStyle();
      });
      socket.on('countdown', function () {
        //add a graphic representation
        myBoard.updateBoard();
        var counter = 3;
        var timer = setInterval(function () {
          window.myBoard.gameStart = true;
          setButtonStyle();
          console.log(counter--);
          if(counter === 0) {
            clearInterval(timer);
          }
        }, 1000);
      });
    }
  }


}(window.app));
