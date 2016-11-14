 $(document).ready(function() {
	// Define the global variables
	var characterScore;
	var enemyScore ;
	var listCharacters ;
	var listEnemies ;
	// if the main character is chosen (true/false)
	var playerChosen;
	//if the defendant players are chosen(true/false)
	var defendantChosen;
	// if both players are chosen, time for attack, disactivate the "onclick" function to select players
    var attackMode;

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



	//Pseudo Code


	// state 1 is when user needs to pick your character 
	//understand which character was picked to change the position on the html
	// at that moment, we set playerChosen = true

	// state 2 is when user needs to pick an enemy to fight against to
	// at this momemt you can only pick amount the enemy characters (listEnemies)
	// set defendantChosen = true 
	//the onclick action can not applicable for the 1st character chosen
	//understand which character was picked to change the position on the html to the 
	//third row called "Defender"

	//state 3 is when user can click the attack button 
	//set attackMode = true;
	//the onclick buttons on the chacters are disactivated

	//set the functions to add incremental power attack to player, constant attack power
	//to the defender

	//set conditions to see which player wins/loose


	//when game over initiate the game



	//Defining the intiating function
	function initializeGame() {
	characterScore = [] ;
	enemyScore = [];
	listCharacters = ['francis','claire','zoe','russo','doug'];
	listEnemies = ['francis','claire','zoe','russo','doug'];
	playerChosen = false;
	defendantChosen = false;
	attackMode = false;


	// need to show the characters in the original position 


	// delete characters that were moved to the defender and attacker rows
	$("#row3", "#row4", "#defenderRow","#attackerRow").empty();
	};

	// Call initializeCalculater so we can set the state of our app
    initializeGame();

    //Figure out which character container was clicked
    var characterChosen  = '';
   //index of the character chosen 
    var indxChar  = [];

	// Add an on click listener to all elements that have the class "container2" (the characters)
	$('.container2').on('click', function() {

	   //if both players are already selected, get out of this event listener

	   if (attackMode) return;

       //if the first character was not picked yet, you are in state 1

       if (playerChosen == false) {

		//update player counter
	    playerChosen = true;



		characterChosen = event.target.id;

	   

		  var indxChar = listCharacters.indexOf(characterChosen);
		  
		  //updating the list of enemies
		  listEnemies.splice(indxChar, 1);

	  	  //define how many displacements the main character will move left once it is chosen
		  //there are five possible displacements depending on which character is chosen
		  var leftDisplacements = ["-=0px", "-=175px", "-=350px", "-=525px", "-=700px"];
		 
		  // The chosen character change the color of the border to blue once it is chosen
		  //And it moves to the first position
		  leftDisplacement = leftDisplacements[indxChar];

		  $(characterToPick[listCharacters[indxChar]].containerID).css({border: "2px solid blue", left:leftDisplacements[indxChar]});


		  //all the characters whose position goes after the chosen character will move down and left

		  for (var i = indxChar+1; i<listCharacters.length; i++){

			$(characterToPick[listCharacters[i]].containerID).animate({ top: "+=180px",left: "-=175px" }, "normal");
			$(characterToPick[listCharacters[i]].containerID).css({border: "2px solid red"});

		  }

		  //all the characters whose position goes before the chosen character will move just down 

		  for (var j=0; j<indxChar; j++){


			$(characterToPick[listCharacters[j]].containerID).animate({ top: "+=180px"}, "normal");
			$(characterToPick[listCharacters[j]].containerID).css({border: "2px solid red"});

		  };

	    };  


	    //I AM COMMENTING OUT THIS NEXT SECTION ON PURPOSE SO YOU CAN CLICK ON THE
	    //HTML AND YOU CAN SEE THE FIRST STEP OF MY LOGIC. IF THIS SECTION IS NOT //
	    //COMMENTED, THE EVENT LISTENER DOESN'T STOP SO USER CAN'T NOT PICK THE DEFENDER
	    //CHARACTER ... I TRIED MULTIPLE THINGS AND I KNOW MY IF STATEMENT IS WRONG ...

   //      if (defendantChosen == false && playerChosen == true) {


	  //     //now we look amount the list of Enemies available since we 
		 //  var indxChar = listEnemies.indexOf(characterChosen);

		 //  //if the character chosen is the same as before, it will not be in the list
		 //  //of enemies so indxChar <1. In this case do nothing
          
   //        // if (indxChar < 0) {
   //        //           	alert("pick another charater among the enemies to attack");
                   
   //        //           }

   //        // else {}


   //        //define how many displacements the chosen defender moves left once it is chosen
		 //  //there are  possible displacements depending on which character is chosen

		 //  var leftDisplacements = ["-=0px", "-=175px", "-=350px", "-=525px"];
		 //  //Define the list of containers that are going to be move around
		 //  var listContainerIDs = ['#francisContainer','#claireContainer','#zoeContainer','#russoContainer','#dougContainer'];

		 //  // The chosen character change the color of the border to blue once it is chosen
		 //  //And it moves to the first position
		 //  leftDisplacement = leftDisplacements[indxChar];
		 //  $(listContainerIDs[indxChar]).css({border: "2px solid green", left:leftDisplacements[indxChar]});

		 //  //all the characters whose position goes after the chosen character will left one position

		 //  for (var i = indxChar+1; i<listEnemies.length; i++){

			// $(listContainerIDs[i]).animate({ left: "-=175px" }, "normal");

		 //  }

	  //     //updating the list of enemies, removing the character chosen
		 //  listEnemies.splice(indxChar, 1);
         

   //       //update the next phase , attack mode
		 // attackMode = true;
	    
   //    };


	  // Add an on click listener to the attack bottom
	  $("#attackBut").on("click", function() {
	    // if both players were not picked yet (commented out for now)
	    // if (defendantChosen == false && playerChosen == true) return;
        
        // first get the hp points of the playerChosen and Defendant
        
        var hpPointsCharct = characterToPick[characterChosen].points;

        // Since code is not work, just let's assume that the defendant character 
        // is the second one for the purpose of showing my reasoning

        var hpPointsDefender = characterToPick['claire'].points;

        // show the attack points in the row5 in the <p> named pointsPlayer
        // this will get updated with the hp points lost every attack
        //using dummies numbers to ilustrate the point

        var attackPointsCharacter = 5;
        var attackPointsDefender  = 10;

        $("#results").css({"background-color":"white"});

        $("#pointsPlayer").html('Your character ' + characterChosen +  " attacks with " + attackPointsCharacter + ' points');
        $("#pointsDefender").html('Your enemy ' + characterToPick['claire'].name +  " attacks with " + attackPointsDefender + ' points');



	  });


    });


});







