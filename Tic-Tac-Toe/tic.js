let game_arr = [];
let gamePlayer = true;
const onPlayerTrun = function(i){
	if(!gamePlayer){
		return false;
	}
	if(isPositionisfree(i)){
		gamePlayer=false;
		setGameData(0,i);
		if(isWinnig(0,game_arr,false)){
			setMessage("Player X is Won");
			return false;
		}
		let computermove = computerMove(1);
		if(computermove){
			setGameData(1,computermove);
		}
		if(isWinnig(1,game_arr,false)){
			setMessage("Player 0 is Won");
			return false;
		}
		if(!isGameBordisFree()){
			setMessage("Draw");
			return false;
		}
		setMessage("Player X turn");

		gamePlayer=true;
	}

};
const isGameBordisFree = function(){
 return getCornerFreePosition(1,2,3,4,5,6,7,8,9).length > 0;
};
const computerMove=function(turn){
	setMessage("Player 0 turn");
	let oppTurn = (turn === 0)?1:0;
	let winingposition = getWiningPosition(turn);
	//console.log("getWiningPosition",turn,winingposition);
	if(winingposition){
		return winingposition;
	}
	winingposition = getWiningPosition(oppTurn);
	//console.log("getWiningPosition",oppTurn,winingposition);
	if(winingposition){
		return winingposition;
	}
    let freePosition;
	if(!isCornerisfree(oppTurn)){
		freePosition = getCornerFreePosition(5);
		if(freePosition.length > 0){
			return getRandomItem(freePosition);
		}
	}
	if(isCrossCorner(oppTurn)){
		freePosition = getCornerFreePosition(2,4,6,8);
		if(freePosition.length > 0){
			return getRandomItem(freePosition);
		}
	}

	freePosition = getCornerFreePosition(1,3,7,9);
	if(freePosition.length > 0){
		return getRandomItem(freePosition);
	}
	freePosition = getCornerFreePosition(5);
	if(freePosition.length > 0){
		return getRandomItem(freePosition);
	}
	freePosition = getCornerFreePosition(2,4,6,8);
	if(freePosition.length > 0){
		return getRandomItem(freePosition);
	}
	
	return null;
};
const getRandomItem=function(arr) {

    // get random index value
    const randomIndex = Math.floor(Math.random() * arr.length);

    // get random item
    const item = arr[randomIndex];

    return item;
};
const getCornerFreePosition=function(...position){
	let freePosition = [];
	position.forEach(item=>{
		if(isPositionisfree(item)){
			freePosition.push(item);
		}
	});
	return freePosition;
};
const isCornerisfree=function(turn){
	let retValue = true;
	let char=getPlayerChar(turn);
	[1,3,7,9].forEach(item=>{
		if(!isPositionisfree(item) && game_arr[item]===char){
			retValue = false;	
			return retValue;
		}
	});
	return retValue;
};
const isCrossCorner=function(turn){
	let char=getPlayerChar(turn);
	if(!isPositionisfree(1) && !isPositionisfree(9) && game_arr[1]===char && game_arr[9]===char){
		return true;
	}else if(!isPositionisfree(3) && !isPositionisfree(7) && game_arr[3]===char && game_arr[7]===char){
		return true;
	}	
	return false;
};
const getWiningPosition=function(turn){
	let computerMovePosition;
	let char = getPlayerChar(turn);
	for(let i=1;i<=9;i++){
		if(isPositionisfree(i)){
			let copyGameBord = cloneArray(game_arr);
			copyGameBord[i]=char;
			if(isWinnig(turn,copyGameBord,true)){
				computerMovePosition=i;
				return computerMovePosition;
			}
		}
	}
	return computerMovePosition;
};
const cloneArray=function(arr){
	return arr.map(a => a);
};
const getPlayerChar=function(turn){
	return (turn === 0)?"X":"0";
};
const setGameData=function(turn,i){
	let char = getPlayerChar(turn);
	document.getElementById("b"+i).value = char;
	document.getElementById("b"+i).disabled = true;
	game_arr[i]=char;
};
const isWinnig=function(turn,gameBord,isdummy){
	let char = getPlayerChar(turn);
    if(winingCheck(gameBord,char,1,2,3,isdummy)){
		return true;
	}else if(winingCheck(gameBord,char,4,5,6,isdummy)){
		return true;
	}else if(winingCheck(gameBord,char,7,8,9,isdummy)){
		return true;
	}else if(winingCheck(gameBord,char,1,4,7,isdummy)){
		return true;
	}else if(winingCheck(gameBord,char,2,5,8,isdummy)){
		return true;
	}else if(winingCheck(gameBord,char,3,6,9,isdummy)){
		return true;
	}else if(winingCheck(gameBord,char,1,5,9,isdummy)){
		return true;
	}else if(winingCheck(gameBord,char,3,5,7,isdummy)){
		return true;
	}
	return false;
};
const setWiningColor = function(a,b,c){
	document.getElementById("b"+a).style = "color:red;";
	document.getElementById("b"+b).style = "color:red;";
	document.getElementById("b"+c).style = "color:red;";
};
const winingCheck=function(gameBord,ch,a,b,c,isdummy){
 let isWining = ch === gameBord[a] && gameBord[a] === gameBord[b] && gameBord[b] === gameBord[c];
 if(isWining && !isdummy){
	setWiningColor(a,b,c);
 }
 return isWining;
};
const isPositionisfree=function(i){
	if(game_arr[i]){
		return false;
	}
	return true;
};
const setMessage=function(msg){
	document.getElementById("print").innerText = msg;
};
setMessage("Player X turn");


