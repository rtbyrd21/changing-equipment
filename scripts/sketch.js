

myApp.controller('SketchController', function($scope, $rootScope, $timeout, $state) {

  var a = function(p) {

  	var canvas;
  	var cropTiles = [];
  	var equiptmentTiles = [];
  	var crops = ['corn', 'cabbage', 'carrot', 'lettuce', 'wheat'];
  	var equiptment = ['rake', 'water', 'tractor', 'wheel barrow', 'net'];
  	var tileCount = crops.length + equiptment.length;
  	var cropsMoving = true;
  	var selectedCrop = false;
  	var selectedEquip = false;
	p.setup = function(){
		p.frameRate(120);
		canvas = p.createCanvas(p.windowWidth, (p.windowWidth / 16) * 9);
		canvas.parent('sketch-holder');
		p.textAlign(p.CENTER);
		for(var i=0; i<crops.length; i++){
			var spacing = i * (p.width / (tileCount / 2) + 1);
			var initOffset = p.width / (tileCount / 2);
			var startingPos = spacing;
			cropTiles.push(new CropTile(startingPos, crops[i]));
		}

		for(var i=0; i<equiptment.length; i++){
			var spacing = i * (p.width / (tileCount / 2) + 1);
			var initOffset = p.width / (tileCount / 2);
			var startingPos = spacing + 20;
			equiptmentTiles.push(new EquiptmentTile(startingPos, equiptment[i]));
		}

	}

	p.draw = function() {
		p.background(255);
		for(var i=0; i < cropTiles.length; i++){
			cropTiles[i].move();
			cropTiles[i].display();
			cropTiles[i].checkPos();
		}
		for(var i=0; i < equiptmentTiles.length; i++){
			equiptmentTiles[i].move();
			equiptmentTiles[i].display();
			equiptmentTiles[i].checkPos();
		}

    if(selectedCrop && selectedEquip){
      $state.go('tiles', {data: [selectedCrop, selectedEquip]});
    }
	};


p.mousePressed = function(){
	for(var i=0; i < cropTiles.length; i++){
			cropTiles[i].checkClick();
		}
	for(var i=0; i < equiptmentTiles.length; i++){
			equiptmentTiles[i].checkClick();
		}	
}

// Jitter class
function CropTile(startingPos, item) {
  this.x = startingPos;
  this.y = 0;
  this.speed = 1;
  this.width = p.width / ((tileCount / 2) + 1);
  this.height = this.width;
  this.item = item;

  this.move = function() {
  	if(selectedCrop == false){
  	  this.x += this.speed;
  	}
  }

  this.checkPos = function(){
  	if(p.floor(this.x + this.width) === p.width){

  		cropTiles.unshift(new CropTile((this.width * -1),this.item));
  	}
  	if(p.floor(this.x) === p.width){
  		cropTiles.splice(cropTiles.length - 1, 1);
  	}
  }

  this.checkClick = function(){
  	if(p.mouseX > this.x && p.mouseX < this.x + this.width && p.mouseY > this.y && p.mouseY < this.y + this.height){
  		if(selectedCrop == this.item){
  			selectedCrop = false
  		}else{
  			selectedCrop = this.item;
  		}	
  	}
  }

  this.display = function() {
  	if(selectedCrop == this.item){
  		p.fill(255,0,0);
  		p.rect(this.x, this.y, this.width, this.height);
  		p.fill(255);
  		p.text(this.item, this.x + (this.width / 2), this.y + (this.height/ 2));
  	}else{
  		p.fill(255);
  		p.rect(this.x, this.y, this.width, this.height);
  		p.fill(0);
  		p.text(this.item, this.x + (this.width / 2), this.y + (this.height/ 2));
  	}
    
   
   
  }
};


function EquiptmentTile(startingPos, item) {
  this.x = startingPos;
  this.y = p.height / 2;
  this.speed = 1;
  this.width = p.width / ((tileCount / 2) + 1);
  this.height = this.width;
  this.item = item;

  this.move = function() {
  	if(selectedEquip == false){
    	this.x -= this.speed;
	  }
  }

  this.checkPos = function(){
  	if(p.floor(this.x + this.width) === this.width){
  		equiptmentTiles.push(new EquiptmentTile((p.width),this.item));
    //   console.log('ok');
  	}
  	if(this.x + this.width < 0){
      
  		equiptmentTiles.splice(0, 1);
  	}
  }

  this.checkClick = function(){
  	if(p.mouseX > this.x && p.mouseX < this.x + this.width && p.mouseY > this.y && p.mouseY < this.y + this.height){
  		if(selectedEquip == this.item){
  			selectedEquip = false;
  		}else{
  			selectedEquip = this.item;
  		}	
  	}
  }

  this.display = function() {
  	if(selectedEquip == this.item){
  		p.fill(255,0,0);
  		p.rect(this.x, this.y, this.width, this.height);
  		p.fill(255);
  		p.text(this.item, this.x + (this.width / 2), this.y + (this.height/ 2));
  	}else{
  		p.fill(255);
  		p.rect(this.x, this.y, this.width, this.height);
  		p.fill(0);
  		p.text(this.item, this.x + (this.width / 2), this.y + (this.height/ 2));
  	}
  }
};



};






	// $timeout(function(){
		var myp5 = new p5(a);
	// }, 1200)
	 

});