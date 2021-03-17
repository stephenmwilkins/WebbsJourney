

document.addEventListener('DOMContentLoaded', () => {

  const scoreDisplay = document.getElementById('score')
  const width = 28
  // const width = 10
  let score = 0
  const grid = document.querySelector('.grid')
  const layout = [
    3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,
    3,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,3,
    3,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,3,
    3,1,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,3,
    3,1,1,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,3,
    3,1,1,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,3,
    3,1,1,1,4,4,1,1,1,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,3,
    3,1,1,1,4,4,1,1,1,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,3,
    3,1,1,1,4,4,1,1,1,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,3,
    3,1,1,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,3,
    3,1,1,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,3,
    3,1,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,3,
    3,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,3,
    3,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,3,
    3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3
  ]
  // 0 - pac-dots
  // 1 - wall
  // 2 - ghost-lair
  // 3 - power-pellet
  // 4 - empty

  const squares = []

  //create your board
  function createBoard() {
    for (let i = 0; i < layout.length; i++) {
      const square = document.createElement('div')
      grid.appendChild(square)
      squares.push(square)

      //add layout to the board
      if(layout[i] === 0) {
        squares[i].classList.add('pac-dot')
      } else if (layout[i] === 1) {
        squares[i].classList.add('wall')
      } else if (layout[i] === 3) {
        squares[i].classList.add('sea-wall')
      }
    }
  }
  createBoard()


  //create Characters
  //draw pacman onto the board
  let pacmanCurrentIndex = 200
  squares[pacmanCurrentIndex].classList.add('pac-man')
  //get the coordinates of pacman on the grid with X and Y axis
  // function getCoordinates(index) {
  //   return [index % width, Math.floor(index / width)]
  // }

  // console.log(getCoordinates(pacmanCurrentIndex))

  //move pacman
  function movePacman(e) {
    squares[pacmanCurrentIndex].classList.remove('pac-man')
    switch(e.keyCode) {
      case 37:
        if(
          pacmanCurrentIndex % width !== 0 &&
          !squares[pacmanCurrentIndex -1].classList.contains('sea-wall') &&
          !squares[pacmanCurrentIndex -1].classList.contains('wall') &&
          !squares[pacmanCurrentIndex -1].classList.contains('ghost-lair')
          )
        pacmanCurrentIndex -= 1
        if (squares[pacmanCurrentIndex -1] === squares[363]) {
          pacmanCurrentIndex = 391
        }
        break
      case 38:
        if(
          pacmanCurrentIndex - width >= 0 &&
          !squares[pacmanCurrentIndex -width].classList.contains('sea-wall') &&
          !squares[pacmanCurrentIndex -width].classList.contains('wall') &&
          !squares[pacmanCurrentIndex -width].classList.contains('ghost-lair')
          )
        pacmanCurrentIndex -= width
        break
      case 39:
        if(
          pacmanCurrentIndex % width < width - 1 &&
          !squares[pacmanCurrentIndex +1].classList.contains('sea-wall') &&
          !squares[pacmanCurrentIndex +1].classList.contains('wall') &&
          !squares[pacmanCurrentIndex +1].classList.contains('ghost-lair')
        )
        pacmanCurrentIndex += 1
        if (squares[pacmanCurrentIndex +1] === squares[392]) {
          pacmanCurrentIndex = 364
        }
        break
      case 40:
        if (
          pacmanCurrentIndex + width < width * width &&
          !squares[pacmanCurrentIndex +width].classList.contains('sea-wall') &&
          !squares[pacmanCurrentIndex +width].classList.contains('wall') &&
          !squares[pacmanCurrentIndex +width].classList.contains('ghost-lair')
        )
        pacmanCurrentIndex += width
        break
    }
    squares[pacmanCurrentIndex].classList.add('pac-man')

    console.log(pacmanCurrentIndex);
    win()
    checkForGameOver()
  }
  document.addEventListener('keyup', movePacman)



  //what happens when you eat a power-pellet
  function win() {
    if (pacmanCurrentIndex === 221) {
      setTimeout(function(){ alert("Congratulations! Webb has safely made it L2, happy observing"); }, 500)
    }
  }





  //create ghosts using Constructors
  class Pirate {
    constructor(className, startIndex, speed) {
      this.className = className
      this.startIndex = startIndex
      this.speed = speed
      this.currentIndex = startIndex
      this.isScared = false
      this.timerId = NaN
    }
  }

  //all my ghosts
  pirates = [
    new Pirate('tesla', 300, 250),
    new Pirate('starlink', 301, 400),
    new Pirate('starlink', 302, 300),
    new Pirate('starlink', 303, 500),
    new Pirate('starlink', 304, 500),
    new Pirate('starlink', 305, 500),
    new Pirate('starlink', 306, 500),
    new Pirate('starlink', 307, 500),
    new Pirate('starlink', 308, 500),
    new Pirate('starlink', 309, 500)
    ]

  //draw my ghosts onto the grid
  pirates.forEach(pirate => {
    squares[pirate.currentIndex].classList.add(pirate.className)
    squares[pirate.currentIndex].classList.add('pirate')
    })

  //move the Ghosts randomly
  pirates.forEach(pirate => moveGhost(pirate))

  function moveGhost(pirate) {
    const directions =  [-1, +1, width, -width]
    let direction = directions[Math.floor(Math.random() * directions.length)]

    pirate.timerId = setInterval(function() {
      //if the next squre your ghost is going to go to does not have a ghost and does not have a wall
      if  (!squares[pirate.currentIndex + direction].classList.contains('pirate') &&
        !squares[pirate.currentIndex + direction].classList.contains('sea-wall') &&
        !squares[pirate.currentIndex + direction].classList.contains('wall') ) {
          //remove the ghosts classes
          squares[pirate.currentIndex].classList.remove(pirate.className)
          squares[pirate.currentIndex].classList.remove('pirate')
          //move into that space
          pirate.currentIndex += direction
          squares[pirate.currentIndex].classList.add(pirate.className, 'pirate')
      //else find a new random direction ot go in
      } else direction = directions[Math.floor(Math.random() * directions.length)]

    checkForGameOver()
    }, pirate.speed)
  }

  //check for a game over
  function checkForGameOver() {
    if (squares[pacmanCurrentIndex].classList.contains('pirate')) {
      pirates.forEach(pirate => clearInterval(pirate.timerId))
      document.removeEventListener('keyup', movePacman)
      setTimeout(function(){ alert("Webb has been destroyed by an impact!");
    }, 500)
    }
  }

})
