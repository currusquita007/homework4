
	// Define the global variables
	var characterScore;
	var enemyScore ;
	var listCharacters ;
	var listEnemies ;
	// if the main character is chosen (true/false)
	var playerChosen;
	//if the defendant players are chosen(true/false)
	var defendantChosen;
    // list of character containers
	var listContainerIDs;

	//Object with the names and the picture source of each character
     var characterToPick = new Object;
	characterToPick = {
    "francis" : {
    	name: "francis",
    	containerID:"#francisContainer",
        src: "images/Francis.png",
        points: 100,
    },
    "claire": {
     	name:"claire",
     	containerID:"#claireContainer",
     	src:"images/Claire.png",
     	points:90,
     },
    "zoe": {
     	name:"zoe",
     	containerID:"#zoeContainer",
     	src:"images/Zoe.png",
     	points:60,
     },
    "russo": {
     	name:"russo",
     	containerID:"#russoContainer",
     	src:"images/Russo.png",
     	points:60,
     },
 	"doug": {
 	 	name:"doug",
 	 	containerID:"#dougContainer",
        src:"images/Doug.png",
        points:80,
    }
    };

	// state 1 is when user needs to pick your character 
	//understand which character was picked to change the position on the html
	var state1 = true;
	// state 2 is when user needs to pick an enemy to fight against to
	// at this momemt you can only pick amount the enemy characters --> 
	//the onclick action can not applicable for the 1st character chosen
	//understand which character was picked to change the position on the html
	var state2 = false;
	//state 3 is when user can click the attack button only 
	//the onclick buttons on the chacters are disactivated
	var state3 = false;
	//when game over initiate the game


	
	//Figure out which container was clicked
	var characterChosen  = '';
	//index of the character chosen 
	var indxChar  = [];



	//Defining the intiating function
	function initializeGame() {
	characterScore = [] ;
	enemyScore = [];
	listCharacters = ['francis','claire','zoe','russo','doug'];
    listContainerIDs = ['#francisContainer','#claireContainer','#zoeContainer','#russoContainer','#dougContainer'];

	playerChosen = false;
	defendantChosen = false;
	state1 = false;
	state2 = false;
	state3 = false;


	// need to show the characters in the original position


	// delete characters that were moved to the defender and attacker rows
	$("#row3", "#row4", "#defenderRow","#attackerRow").empty();
	};

	// Call initializeCalculater so we can set the state of our app
    initializeGame();


if (playerChosen == false) {

	// Add an on click listener to all elements that have the class "container2" (the characters)
	$('.container2').on('click', function() {

		  characterChosen = event.target.id;	 

		  var indxChar = listCharacters.indexOf(characterChosen);
		  
		  //list of enemies is the same as characterToPick but without the first character chosen
		  listEnemies = listCharacters;
		  listEnemies.splice(indxChar, 1);

		  for (var i=0; i<listEnemies.length;i++){

		  	var b = $("<img>");

            b.attr("class","img-circle");



            b.attr("src",characterToPick[listEnemies[i]].src);
            
            var a = $("<p>");
            a.attr("class","caption");
            a.text(characterToPick[listEnemies[i]].name);

            var c = $("<p>");
            c.attr("class","points");
            c.text(characterToPick[listEnemies[i]].points);

		   $('#defendersRow').append(a);
		   $('#defendersRow').append(b);
		   $('#defendersRow').append(c);
		};






	  // 	  //define how many displacements the main character will move left once it is chosen
		 //  //there are five possible displacements depending on which character is chosen
		 //  var leftDisplacements = ["-=0px", "-=175px", "-=350px", "-=525px", "-=700px"];
		 //  //Define the list of containers that are going to be move around
		 //  var listContainerIDs = ['#francisContainer','#claireContainer','#zoeContainer','#russoContainer','#dougContainer'];

		 //  // The chosen character change the color of the border to blue once it is chosen
		 //  //And it moves to the first position
		 //  leftDisplacement = leftDisplacements[indxChar];

		 //  $(listContainerIDs[indxChar]).css({border: "2px solid blue", left:leftDisplacements[indxChar]});

		 //  //all the characters whose position goes after the chosen character will move down and left

		 //  for (var i = indxChar+1; i<listCharacters.length; i++){

			// $(listContainerIDs[i]).animate({ top: "+=180px",left: "-=175px" }, "normal");
			// $(listContainerIDs[i]).css({border: "2px solid red"});

		 //  }

		 //  //all the characters whose position goes before the chosen character will move just down 

		 //  for (var j=0; j<indxChar; j++){

			// $(listContainerIDs[j]).animate({ top: "+=180px"}, "normal");
			// $(listContainerIDs[j]).css({border: "2px solid red"});

		 //  };

	    });
	//update 
	playerChosen == true;
};


if (defendantChosen == false && playerChosen == true) {
// Add an on click listener to all elements that have the class "container2" (the characters)
	$('.container2').on('click', function() {


	      //now we look amount the list of Enemies available
		  var indxChar = listEnemies.indexOf(characterChosen);

		  //if the character chosen is the same as before, it will not be in the list
		  //of enemies so indxChar <1. In this case do nothing
          
          if (indxChar < 0) {
          	alert("pick another charater among the enemies to attack")
          	return;
          }
          //chose a character from the second row (Enemies available to attack) and move
          //it into the third row (Defender)
          else {


          //define how many displacements the chosen defender moves left once it is chosen
		  //there are  possible displacements depending on which character is chosen
		  var leftDisplacements = ["-=0px", "-=175px", "-=350px", "-=525px"];
		  //Define the list of containers that are going to be move around
		  var listContainerIDs = ['#francisContainer','#claireContainer','#zoeContainer','#russoContainer','#dougContainer'];

		  // The chosen character change the color of the border to blue once it is chosen
		  //And it moves to the first position
		  leftDisplacement = leftDisplacements[indxChar];
		  $(listContainerIDs[indxChar]).css({border: "2px solid green", left:leftDisplacements[indxChar]});

		  //all the characters whose position goes after the chosen character will left one position

		  for (var i = indxChar+1; i<listEnemies.length; i++){

			$(listContainerIDs[i]).animate({ left: "-=175px" }, "normal");

		  }

	      //updating the list of enemies, removing the character chosen
		  listEnemies.splice(indxChar, 1);
	    }

	  });

};

	 