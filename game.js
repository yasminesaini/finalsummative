//which screen is currently showing
var screen = 1;

//number of guesses
var numGuesses = 0;

//makes arrays of words
var genWords = [
    ['p','l','a','n','e'],
    ['a','l','i','e','n'],
    ['b','a','g'],
    ['h','a','n','g'],
    ['r','o','c','k','e','t'],
    ['f','r','u','i','t'],
    ['m','a','t','h'],
    ['c','o','m','p','u','t','e','r'],
    ['z','o','o'],
    ];
    
var countryWords = [
    ['c','a','n','a','d','a'],
    ['a','m','e','r','i','c','a'],
    ['m','e','x','i','c','o'],
    ['a','f','r','i','c','a'],
    ['a','u','s','t','r','a','l','i','a'],
    ['i','n','d','i','a'],
    ['c','h','i','n','a'],
    ['b','r','a','z','i','l'],
    ['e','g','y','p','t'],
    ['f','r','a','n','c','e'],
    ['j','a','p','a','n'],
    ];
    
var sportsWords = [
    ['b','a','s','k','e','t','b','a','l','l'],
    ['b','a','s','e','b','a','l','l'],
    ['s','o','c','c','e','r'],
    ['l','a','c','r','o','s','s','e'],
    ['v','o','l','l','e','y','b','a','l','l'],
    ['t','e','n','n','i','s'],
    ['p','i','n','g','p','o','n','g'],
    ['g','o','l','f'],
    ['f','o','o','t','b','a','l','l'],
    ['h','o','c','k','e','y'],
    ];
    
var animalWords = [
    ['g','i','r','a','f','f','e'],
    ['z','e','b','r','a'],
    ['c','a','t'],
    ['d','o','g'],
    ['b','i','r','d'],
    ['e','l','e','p','h','a','n','t'],
    ['l','i','o','n'],
    ['t','i','g','e','r'],
    ['b','e','a','r'],
    ['s','h','e','e','p'],
    ['f','r','o','g'],
    ];

//chooses the category of words and stores them in here
var categoryWords = genWords;

//selects a word from the word list in specific category
var selection = floor(random(categoryWords.length));

var f = createFont("serif");//creates the font

//creates the stage
var stage = function(stageX,stageY){
    stroke (0, 0, 0);
    strokeWeight(3);
    noFill();
    line ( stageX+100, stageY+150, stageX+100, stageY+300 );
    line ( stageX+100, stageY+150, stageX+200, stageY+150 );
    line (stageX+200, stageY+150, stageX+200, stageY+180 );
    line (stageX+75,stageY+301,stageX+125,stageY+301);
    strokeWeight(1);
};

//start button x and y positions
var startX = 93;
var startY = 157;

//How to play X and Y positions
var howX = -99;
var howY =157;

//creates home screen
var homeScreen = function(){
    screen=1;
    background(130, 190, 230);
    //Makes font and text "hangman"
    fill(133, 0, 133);
    textFont(f, 70);
    text("Hangman",70,80);

    stage(49,-27);//draws stage for home screen
    
    //makes start button
    fill(175, 150, 190);
    var startRect = rect(startX+150,startY+160,100,45); 
    fill(255, 255, 255);
    textFont(f, 40);
    var start = text("Start",startX+160,startY+196); 
    
    //makes how to play button
    fill(175, 150, 190);
    var startRect = rect(howX+150,howY+160,100,45); 
    fill(255, 255, 255);
    textFont(f, 19);
    var start = text("How to\n   Play",howX+171,howY+178);
};

//draws home screen
homeScreen();


//how to play screen
var howToScreen = function(){
    screen=2;
    textFont("serif",15);
    background(130, 190, 230);
    var message = "Select a letter of the alphabet. If the letter is contained in \nthe word, the letters are revealed in the blanks. If the letter \nis not contained in the word, a body part of the hangman is \nadded, and a guess is taken away. \n\nThe game continues until:\n\n     The word is guessed - WINNER\n\n\t               \t\t\t\t\tOR\n\n     All the parts of the hangman are drawn - LOSER";
    fill(255, 255, 255);
    text(message,5,40);
    
    //go back button
    var backX = 93;
    var backY = 157;
    fill(175, 150, 190);
    var startRect = rect(backX+150,backY+160,100,45); 
    fill(255, 255, 255);
    textFont(f, 25);
    var back = text("Go Back",backX+155,backY+190); 
};

//makes category screen
var categoriesScreen = function(){ 
    screen=3;
    background(130, 190, 230);
        fill(255, 255, 255);
        textFont(f, 60);
        text("Categories",70,100);
        fill(175, 150, 190);
        
        //makes all of the buttons
        rect(60,240, 120,40);//general
        rect(60,170, 120,40);//countries
        rect(210,240, 120,40);//sports
        rect(210,170, 120,40);//animals
        textFont(f,24);
        fill(255,255,255);
        text("General",80,268);
        text("Countries",65,200);
        text("Sports",235,265);
        text("Animals",226,200);
   };

//creates spaces
var drawSpaces = function(){
    for(var i = 0; i<categoryWords[selection].length;i++){
        stroke(0,0,0);
        fill(0, 0, 0);
        line(i*40 + 5, 100, i*40 + 35, 100);
    }
};

//Checks to see if player has entered all correct letters
var checkWin = function (){
    var correctGuess = 0;
    var wordLength = categoryWords [selection].length;
    for( var i = 0; i < wordLength; i++ ){
        if ( categoryWords [selection] [i] === 'same' ){
            correctGuess++;
        }
    }
    
    if( correctGuess === wordLength ){
        fill (3, 0, 176);
        textFont(f,18);
        text ("       You Win!\nRestart to play again.", 200, 360);
        screen=10;
        if(numGuesses>0){
            ellipse(190,196,5,5);
            ellipse(210,196,5,5);
            noFill();
            arc(200,203,20,20,-360,-180);
        }
        numGuesses=-2;
        screen = -9;
    }
};

var category;

//when mouse is clicked, it checks if it is on a button as well
mouseClicked = function() {
    //if start button is clicked, go to category screen
    if (screen===1&&mouseX >= startX+150 && mouseX <= startX+250 && mouseY >= startY+160&& mouseY <= startY+205) {
        categoriesScreen();
    }
    
    //if how to play is clicked, go to how to play screen
    if (screen===1&&mouseX >= howX+150 && mouseX <= howX+250 && mouseY >= howY+160&& mouseY <= howY+205) {
        howToScreen();
    }
    
    //if go back is clicked, go to start screen
    if (screen===2&&mouseX >= startX+150 && mouseX <= startX+250 && mouseY >= startY+160&& mouseY <= startY+205) {
        homeScreen();
    }
    
    //if a category is clicked, draw a stage and check which categoy is clicked. The draw spaces
    if(screen===3&&mouseX>=60&&mouseX<=180&&mouseY>=240&&mouseY<=280||screen===3&&mouseX>=60&&mouseX<=180&&mouseY>=170&&mouseY<=210||screen===3&&mouseX>=210&&mouseX<=330&&mouseY>=240&&mouseY<=280||screen===3&&mouseX>=210&&mouseX<=330&&mouseY>=170&&mouseY<=210){
        screen=4;
        background(130,190,230);
        stage(0,0);
        
        //if general is clicked
        if(mouseX>=60&&mouseX<=180&&mouseY>=240&&mouseY<=280){
            categoryWords = genWords;
            category ="General";
        }
        //if countries is selected
        if(mouseX>=60&&mouseX<=180&&mouseY>=170&&mouseY<=210){
            categoryWords = countryWords;
            category = "Countries";
        }
        //If sports is selected
        if(mouseX>=210&&mouseX<=330&&mouseY>=240&&mouseY<=280){
            categoryWords = sportsWords;
            category = "Sports";
        }
         //If animals is clicked
        if(mouseX>=210&&mouseX<=330&&mouseY>=170&&mouseY<=210){
            categoryWords = animalWords;
            category = "Animals";
        }
    text(category,165,34);
    drawSpaces();
    }
};

//When key is pressed, write letter in space or beside stage dependng if it is correct or not
var keyPressed = function (){
    var goodGuess = 0;
    if ( numGuesses >= 0 ){//Runs if game is not over
      for ( var i = 0; i < categoryWords[selection].length; i++ ){
        if ( key.toString() === categoryWords[selection] [i] ){
            fill(0, 0, 0);
            textSize (20) ;
            text (categoryWords[selection] [i], i*40 + 15, 95);
            goodGuess++;
            categoryWords[selection] [i] = 'same';
        }//Runs when guess is correct
    }
    if( goodGuess === 0 ){
            numGuesses++;
            fill(255, 0, 0);
            textSize (20);
            text (key, 220+numGuesses*20, 195);
        }//Runs when guess is wrong
    }
};

//Creates person to draw when guess is wrong
var drawPerson = function(){
    stroke (0, 0, 0);
    if (numGuesses > 0 ){
        fill(198, 222, 149);
        ellipse ( 200, 200, 40, 40 );
    }//head
   
    if ( numGuesses > 1 ){
        line ( 200, 220, 200, 280 );
    }//body
        
    if (numGuesses > 2 ){
        line ( 200, 280, 170, 320 );
    }//left leg
        
    if ( numGuesses > 3 ){
       line ( 200, 280, 230, 320 );
    }//right leg
        
    if ( numGuesses > 4 ){
        line ( 200, 240, 160, 230 );
    }//left arm
        
    if ( numGuesses > 5 ){
        line ( 200, 240, 240, 230 );
        fill (51, 0, 255);
        textSize (18);
        text ("       Game Over! \nRestart to play again.", 240, 50 );
        numGuesses = -1;
        ellipse(190,196,5,5);
        ellipse(210,196,5,5);
        noFill();
        arc(200,213,20,20,-180,0);
        for ( var i = 0; i < categoryWords[selection].length; i++ ){
            if(categoryWords[selection] [i] !== 'same'){
                textSize (20) ;
                text (categoryWords[selection] [i], i*40 + 15, 95);
            }
    }
    screen = -9;
    }//right arm
};

var manX = 100;
var manY = -48;
var draw = function() {
    drawPerson ();//Draw person when guess is wrong
    checkWin();//Checks for if word is completed and ends game when user wins
    
    if (screen === 1) {//If home screen is on
    
    var speed = 1.5;//speed of person is +1.5

    manX += speed;//moves man forwards (and back)
    
    if(manX>=200){
        speed = -1.5;//When man goes too far right, moves to left
    } if(manX<=13){
        speed = 1.5;//When man is too far left, moves to right
    }
    //draws man
    noStroke();
    fill(130,190,230);
    rect(manX+154,manY+157,89,178);
    stroke(0);
    ellipse ( manX+200, manY+200, 40, 40 );//head
    line ( manX+200, manY+220, manX+200, manY+280 );//body
    line ( manX+200, manY+280, manX+170, manY+320 );//left leg
    line ( manX+200, manY+280, manX+230, manY+320 );//right leg
    line ( manX+200, manY+240, manX+160, manY+230 );//left arm
    line ( manX+200, manY+240, manX+240, manY+230 );//right arm
    } 
};
