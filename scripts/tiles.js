

myApp.controller('TileController', function($scope, $rootScope, $timeout, $state) {

  var a = function(p) {

  	var canvas;
  	var quarterTiles = [];
  	var images = [];
  	var videos = [];
  	var tileIsFullScreen = false;
	p.setup = function(){
		p.frameRate(180);
		canvas = p.createCanvas(p.windowWidth, (p.windowWidth / 16) * 9);
		canvas.parent('quarter-tiles');
		quarterTiles.push(new QuarterTile(0 - p.windowWidth/2,0 - p.height/2,p.windowWidth/2,p.height/2, [0,0], 0));
		quarterTiles.push(new QuarterTile(p.windowWidth,0 - p.height/2, p.windowWidth/2, p.height/2, [p.windowWidth /2,0], 1));
		quarterTiles.push(new QuarterTile(0 - p.windowWidth/2, p.height, p.windowWidth/2, p.height/2, [0,p.height/2], 2));
		quarterTiles.push(new QuarterTile(p.windowWidth, p.height, p.windowWidth/2,p.height/2, [p.windowWidth/2,p.height/2], 3));
		for(var i=0; i< quarterTiles.length; i++){
			images.push(p.loadImage("images/" + i + ".png"));
			videos.push(p.createVideo("images/" + i + ".mp4"));
		}

	}

	p.draw = function() {
		p.background(255);
		for(var i=0; i< quarterTiles.length; i++){
				if(!quarterTiles[i].isFullScreen){
					quarterTiles[i].moveIntoPlace();
					quarterTiles[i].checkClick();
				}
			}

		for(var i=0; i< quarterTiles.length; i++){
				if(quarterTiles[i].isFullScreen){
					quarterTiles[i].moveIntoPlace();
					quarterTiles[i].checkClick();
					quarterTiles[i].enlarge();
				}
			}
		// console.log(tileIsFullScreen);	


	};



function QuarterTile(xPos, yPos, width, height, origin, index) {
	this.x = xPos;
	this.y = yPos;
	this.startX = xPos;
	this.startY = yPos;
	this.width = width;
	this.height = height;
	this.speedToMove = 70;
	this.distanceToMoveX = (-this.startX + origin[0]) / (this.speedToMove - 1);
	this.distanceToMoveY = (-this.startY + origin[1]) / (this.speedToMove - 1);
	this.isClicked = true;
	this.previousFrame = 0;
	this.isFullScreen = false;
	

	this.moveIntoPlace = function(){
		if(p.frameCount < this.speedToMove){
			this.x += this.distanceToMoveX;
			this.y += this.distanceToMoveY;
		}
		p.rect(this.x, this.y, width, height);
		if(!this.isClicked){	
				p.image(videos[index], this.x, this.y, this.width, this.height);
			}else{
				p.image(images[index], this.x, this.y, this.width, this.height);
			}
		
	}

	this.checkClick = function(){
		if(!tileIsFullScreen){
			if(p.mouseX > this.x && p.mouseX < this.x + this.width && p.mouseY > this.y && p.mouseY < this.y + this.height && p.mouseIsPressed){
				
				if(p.frameCount > this.previousFrame + 30){
					this.isClicked = !this.isClicked;
					tileIsFullScreen = true;
					this.isFullScreen = true;
					this.previousFrame = p.frameCount;
					videos[index].loop();
					videos[index].hide();
				}
			}
		}
	}

	this.goBack = function(){
		if(p.mouseIsPressed){
			this.isFullScreen = false;
			this.isClicked = true;
			this.x = origin[0];
			this.y = origin[1];
			this.width = width;
			this.height = height;
			setTimeout(function(){
				tileIsFullScreen = false;
			}, 250);
		}
	}


	this.enlarge = function(){

		if(index == 0){
			if(this.x + this.width < p.width){
				this.width += 16;
				if(p.windowHeight > this.y){
					this.height += 9;
				}
			}else{
				this.goBack();
			}
		}

		if(index == 1){
			if(0 < this.x){
				this.x += -16;
				this.width += 16;
				if(p.windowHeight > this.y){
					this.height += 9;
				}
			}else{
				this.goBack();
			}
		}

		if(index == 2){
			if(this.x + this.width < p.width){
				this.width += 16;
				if(this.y > 0){
					this.y -= 9;
					this.height += 9;
				}
			}else{
				this.goBack();
			}
		}

		if(index == 3){
			if(0 < this.x){
				this.x += -16;
				this.width += 16;
				if(this.y > 0){
					this.y -= 9;
					this.height += 9;
				}
			}else{
				this.goBack();
			}
		}

		
	}
	

}




p.mousePressed = function(){
	
}






};






	// $timeout(function(){
		var myp5 = new p5(a);
	// }, 1200)
	 

});