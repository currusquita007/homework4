
	// Define the global variables
	var characterScore;
	var enemyScore ;
	var listCharacters ;
	var listEnemies ;
	// if the main character is chosen (true/false)
	var playerChosen;
	//if the defendant players are chosen(true/false)
	var defendantChosen;


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
	listEnemies = ['francis','claire','zoe','russo','doug'];
	playerChosen = false;
	defendantChosen = false;
	state1 = true;
	state2 = false;
	state3 = false;


	// need to show the characters in the original position (work on this)


	// delete characters that were moved to the defender and attacker rows
	$("#row3", "#row4", "#defenderRow","#attackerRow").empty();
	};

	// Call initializeCalculater so we can set the state of our app
    initializeGame();


if (playerChosen == false) {
	// Add an on click listener to all elements that have the class "container2" (the characters)
	$('.container2').on('click', function() {


		//update player counter
	    playerChosen = true;

		characterChosen = event.target.id;

	 //if the first character was not picked yet, you are in state 1

		  var indxChar = listCharacters.indexOf(characterChosen);
		  
		  //updating the list of enemies
		  listEnemies.splice(indxChar, 1);

	  	  //define how many displacements the main character will move left once it is chosen
		  //there are five possible displacements depending on which character is chosen
		  var leftDisplacements = ["-=0px", "-=175px", "-=350px", "-=525px", "-=700px"];
		  //Define the list of containers that are going to be move around
		  var listContainerIDs = ['#francisContainer','#claireContainer','#zoeContainer','#russoContainer','#dougContainer'];

		  // The chosen character change the color of the border to blue once it is chosen
		  //And it moves to the first position
		  leftDisplacement = leftDisplacements[indxChar];

		  $(listContainerIDs[indxChar]).css({border: "2px solid blue", left:leftDisplacements[indxChar]});

		  //all the characters whose position goes after the chosen character will move down and left

		  for (var i = indxChar+1; i<listCharacters.length; i++){

			$(listContainerIDs[i]).animate({ top: "+=180px",left: "-=175px" }, "normal");
			$(listContainerIDs[i]).css({border: "2px solid red"});

		  }

		  //all the characters whose position goes before the chosen character will move just down 

		  for (var j=0; j<indxChar; j++){

			$(listContainerIDs[j]).animate({ top: "+=180px"}, "normal");
			$(listContainerIDs[j]).css({border: "2px solid red"});

		  };

		//   //remove event listener

		// $( ".container2" ).off( "click");

	    });

	};

if (defendantChosen == false && playerChosen == true) {


	      //now we look amount the list of Enemies available since we 
		  var indxChar = listEnemies.indexOf(characterChosen);

		  //if the character chosen is the same as before, it will not be in the list
		  //of enemies so indxChar <1. In this case do nothing
          
          if (indxChar < 0) {
          	alert("pick another charater among the enemies to attack");
         
          }

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
};







