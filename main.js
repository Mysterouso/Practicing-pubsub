
//Pubsub
const events = (function(){
  var eventList = {}
  
  function subscribe(event,fn){
    if(!eventList.hasOwnProperty(event)){
      eventList[event] = [] 
    }
    eventList[event].push(fn)
  }
  
  function unsubscribe(event,fn){
   if(!eventList[event]){
     console.log('No event')
     return;
   }
   if(eventList[event].indexOf(fn) !== -1){
   const shorten = eventList.event          
   shorten.splice(shorten.indexOf(fn),1)
   }
  }
  
  function publish(event,data){
    if(!eventList[event]) return
    eventList[event].forEach(item=>{
      item(data)
    })
  }
    return{
      subscribe,
      unsubscribe,
      publish
    }
})()

// How pubsub works with instatiations 
// Need to bind for functions to work

const myTest =  function(arr){
  this.list = arr;

  this.updateList = function(newVal){
    this.list.push(newVal)
    console.log('this.list, ', this.list)
  }
}

const array = ['a','b','c'];

const hereIAm = new myTest(array)

events.subscribe('people',hereIAm.updateList.bind(hereIAm))


//Display length of people
const stats = (function(){
  const stat = document.querySelector('.stat');
  
  events.subscribe('initPeople',init)
  events.subscribe('people',updateStat)

  function init(val){
    const statistic = document.createElement('h2')
    statistic.classList.add('stat')
    statistic.innerText = val
    stat.appendChild(statistic)
  }

  function updateStat(int){
    document.querySelector('.stat').innerText=int
  }
})()

//Show list of people
const person = (function(){
 
    var people = ['Hohoho','bobobo']

    init()

    function renderPerson(person){
        const elem = document.createElement('div')
        elem.classList.add('Person')
        elem.innerText = person
        const button = document.createElement('button')
        button.onclick = removePerson
        elem.appendChild(button)
        document.querySelector('.list').appendChild(elem)
    }

    function init(){
        people.forEach(person=>{
            renderPerson(person)
        })
        events.publish('initPeople',people.length)
    }

    function removePerson(e){
        e.target.parentElement.remove()
        people.splice(people.indexOf(e.target.parentElement.value),1)
        events.publish('people',people.length)
    }

    function addPerson(name){
        people.push(name)
        renderPerson(name)
        events.publish('people',people.length)

    }

    return{
        addPerson,
        removePerson
    }
})()

const h1 = document.querySelector('h1')
const form  = document.querySelector('form')
form.addEventListener('submit',addPerson)

function addPerson(e){
    e.preventDefault()
    person.addPerson(e.target[0].value)
}


























