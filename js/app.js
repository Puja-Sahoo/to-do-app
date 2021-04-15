// select the element
const clear = document.querySelector(".clear");
const dateElement =document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");

// classes names
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH ="lineThrough";
//variables
let LIST, id;



//add item to local storage(THHIS CODE MUST BE WRITTEN EVERYWHER WE UPDATE ARRAY)
//localStorage.setItem("TODO", JSON.stringify(LIST));



//get the line from local storage
    let data = localStorage.getItem("TODO");
// CHECK IF DATA IS NOT EMPTY
if(data){
LIST= JSON.parse(data);
id = LIST.length;//set the id to the last one in the list
loadList(LIST);// LOAD THE LIST TO THE USER INTERFACE

}else{
	//if data isnt empty
   LIST =[];
   id=0;

}
//load items to the user's interface 
function loadList(array){
	array.forEach(function(item){
		addToDo(item.name, item.id, item.done, item.trash);
	});

}

//CLEAR THE LOCAL STORAGE
clear.addEventListener("click", function(){
	localStorage.clear();
	location.reload();
});




// Show todays date
const options ={weekday : "long", month:"short", day:"numeric"};
const today = new Date();
dateElement.innerHTML = today.toLocaleDateString("en-US", options);
//add to do function 
 function addToDo(todo, id, done, trash){
 	if(trash){ return; }
 	const DONE = done ? CHECK : UNCHECK;
 	const LINE = done ? LINE_THROUGH : "";
 	
 	const item =`<li class="item">
 	<i class="fa ${DONE} co" job="complete" id="${id}"></i> 
 	<p class="text ${LINE}">${todo}  </p>
 	 <i class="fa fa-trash-o de" job="delete" id="${id}"></i>
 	 </li>`;
                
 	const position = "beforeend";
 	list.insertAdjacentHTML(position, item);

 }
 
 // add an item to the list user the enter key
 input.addEventListener("keyup", function(event){
       if( event.keyCode == 13){
       	const todo  = input.value;
       	//if the input isn't empty
       	if(todo) {
       		addToDo(todo, id, false, false);

       		LIST.push({
       			name : todo,
       			id :id,
       			done : false,
       			trash : false
       			});

       		//add the item to local storage(this code must be added where the LIST array is updated)
            localStorage.setItem("TODO", JSON.stringify(LIST));
       		id++;
         }
         input.value = "";
       }
 });
 
 //Complete to do
 function completeToDo(element){
 	element.classList.toggle(CHECK);
 	element.classList.toggle(UNCHECK);
 	element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);
 	LIST[element.id].done = LIST[element.id].done ? false : true;

 }

 //remove to do
 function removeToDo(element){
 	element.parentNode.parentNode.removeChild(element.parentNode);
 	LIST[element.id].trash = true;
 }

 //target the items created dynamically


 list.addEventListener("click", function(event){
 	const element = event.target;// return the clicked element inside list
 	const elementJob = element.attributes.job.value;// Complete or delete
 	if(elementJob == "complete"){
      completeToDo(element);
 	}else if(elementJob=="delete")
 	 removeToDo(element);
 	 //add the item to local storage(this code must be added where the LIST array is updated)
     localStorage.setItem("TODO", JSON.stringify(LIST));


 });