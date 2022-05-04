// Light Dark Button
function darknTheme(){
    const lightThemeBtn = document.querySelector('.ti-shine');
    const darkThemeBtn = document.querySelector('.ti-bolt')
    const theme = document.querySelector('.main-theme');

    lightThemeBtn.addEventListener('click', function(){
        theme.classList.add('theme');
    })

    darkThemeBtn.addEventListener("click", function(){
        theme.classList.remove('theme');
    });
}

darknTheme();



// Demo handler

// Add items:
const activeList = document.querySelector('.element-content');
let items =0


const addItems =document.querySelector('.input-handle');
addItems.addEventListener('keydown', function(event){
    if(event.keyCode === 13){
        event.preventDefault();
        let val =document.querySelector('.input').value.trim();
        if(val!==null&val!==""){
            let newActive = [];
            newActive.push({
                name:val,
                status:""
            });
            renderHtml(newActive);
            console.log(listComplete);
            saveList();
            document.querySelector('.input').value ="";
        }
        else{
            alert('Vui long dien vao o trong')
        }
    }
})

// const li = document.createElement('li');
// li.setAttribute("class","check-element");
// li.innerHTML = `
//     <input type="checkbox" name="read" class="${active.status}" value="complete">
//     <label for="read">${active.name}</label>
//     <button class="click-close">X</button>
// `

function renderHtml(actives){
    console.log(actives);
    let htmls = actives.map(active=>{
        return `<li class="check-element">
                    <input type="checkbox" name="read" class="${active.status}" value="complete">
                    <label for="read">${active.name}</label>
                    <button class="click-close">X</button>
                </li>`
    })
    activeList.innerHTML += htmls.join('');
    saveList();

        
    // Check complete,all and active
    const checkedList = document.querySelectorAll('.checked')
    const completeCheck = document.querySelectorAll('li input')
    const completeBtn =document.querySelector('.completeBtn')
    const activeBtn = document.querySelector('.active')
    const allBtn = document.querySelector('.all');

    actives.forEach(function(el){
        // console.log(el);
        completeCheck.forEach(e=>{
            e.onclick = function(){
                
                if(e.checked){
                    e.classList.add('complete-act')  
                    saveList();  
               }
               else{
                    e.classList.remove('complete-act')  
                    saveList();  
               }
            }


            // Check complete
            completeBtn.addEventListener('click',function(){
                if(e.getAttribute('class')==="complete-act"){
                    e.parentElement.style.display = "block";
                }
                else{
                    // console.log( e.getAttribute('class'));
                    e.parentElement.style.display = "none";
                }
            })
        
            // Check active:
            activeBtn.addEventListener('click',function(){
                if(e.getAttribute('class')==="complete-act"){
                    e.parentElement.style.display = "none";
                }
                else{
                    // console.log( e.getAttribute('class'));
                    e.parentElement.style.display = "block";
                }
            })

            // All btn
            function checkAll(){
                allBtn.addEventListener("click",()=>{
                    completeCheck.forEach(e=>{
                        // console.log(e);
                        e.parentElement.style.display = "block";
                    })
                })
            }
            checkAll(); 

        })
    })

    // Delete items
    const deleteBtn = document.querySelectorAll('.click-close');
    deleteBtn.forEach(e=>{
        e.addEventListener('click',()=>{
            e.parentElement.remove();
            saveList();
        })
    })
}

// Clear Btn
let itemsClear =[]
let listComplete 
const clearBtn = document.querySelector('.clear');
clearBtn.onclick = function(){
    activeList.innerHTML="";
    itemsClear = listComplete.filter(el=>{
        return el.status!=="complete-act";
    })
    console.log(itemsClear);
    console.log(listComplete);
    renderHtml(itemsClear);
    saveList();
}




let todos = []
const data = JSON.parse(localStorage.getItem('data'))
if(data){
    todos.push(data);
    todos.forEach(active=>{
        return renderHtml(active);
    })
}



function saveList(){
    const showList = document.querySelectorAll('.check-element')
    let data=[];
    showList.forEach(e=>{
        data.push({
            name:e.querySelector("label").innerHTML,
            status:e.querySelector("input").className
        })
    })
    listComplete = data;
    document.querySelector('.inform-el').innerHTML = data.length+" items";
    localStorage.setItem("data", JSON.stringify(data))  
}
console.log(listComplete);
// clear btn



















// // Handle Api
// const getApi = "http://localhost:3000/Active";
// let items = 0;
// let spanHtml = document.querySelector('.inform-el');



// // Get Api
// function getActive(callback){
//     fetch(getApi)
//         .then((respone)=>respone.json())
//         .then(callback);
// }


// // Render Actives
// function renderActive(actives){
//     const content = document.querySelector('.element-content')
//     let htmls= actives.map((act)=>{
//         return `<form action="" class="check-element" onsubmit="return false" data-id="${act.id}">
//         <input type="checkbox" name="" class="complete" value="complete">
//         <label for="">${act.name}</label>
//         <button class="click-close"data-close='${act.id}'>X</button>
//     </form>`
//     })
//     content.innerHTML = htmls.join('');
// }

// // onclick="deleteList(${act.id})"

// // Creat list active
// function post(actives){
//     fetch(getApi,{
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//           },
//         body: JSON.stringify(actives),
//     })
//         .then(respone=>respone.json())
//         .then(respone=>{
//             console(respone);
//         })

// }

// const form = document.querySelector('.input-handle');
// form.addEventListener("keydown",function(e){
//     if(e.keyCode===13){
//         e.preventDefault();
//     }
// });

// function postActive(e){
//     const creatActive = document.querySelector('.input');
//     creatActive.addEventListener("keydown", function(event){
//         // console.log(event.keyCode)
//         if(event.keyCode===13){
//             event.preventDefault();
//             let nameAct = creatActive.value;
//             console.log(nameAct);
//             let dataActives={
//                 name:nameAct
//             }
//             post(dataActives);
//             console.log(items);
//         }
//     })
// }


// // Delete Active
// function clickClose(data){
//     const closeBtn = document.querySelectorAll('.click-close');
//     console.log(closeBtn)
//     closeBtn.forEach(el=>{
//         console.log(el);
//         el.addEventListener("click", function(){
//             let closeId = el.dataset.close;
//             console.log(closeId);
//             deleteList(closeId);
//         });
//     })
// }

// function deleteList(id,callback){
//     fetch(getApi + `/${id}`,{
//         method: 'DELETE',
//         headers: {
//             'Content-Type': 'application/json',
//           },
//     })
//         .then(respone=>respone.json())
//         .then(callback)
// }


// let count=0
// function countItems(e){
//     count = e;
// }



// (function(){
//     getActive(itemsList);
//     getActive((e)=>{
//         console.log(e.length);
//         return e.length;
//     })
//     getActive(itemsList);
//     getActive(renderActive);
//     getActive(check);
//     getActive(clickClose);
//     getActive(darknTheme);
//     postActive();
// })();

// const check = function(){
//     function checkComplete(){
//         completeBtn.addEventListener("click",()=>{
//             completeCheck.forEach(e=>{
//                 console.log(e.checked);
//                 if(e.checked===false){
//                     e.parentElement.style.display = "none";
//                 }
//                 else{
//                     e.parentElement.style.display = "block";
//                 }
//             })
//         })
//     }
//     checkComplete();

//     function checkActive(){
//         activeBtn.addEventListener("click",()=>{
//             let a=0;
//             completeCheck.forEach(e=>{
//                 console.log(e.checked);
//                 if(e.checked===false){
//                     e.parentElement.style.display = "block";
//                 }
//                 else{
//                     e.parentElement.style.display = "none";
//                 }
//             })
//             console.log(a);
//         })
//     }
//     checkActive();

//     function checkAll(){
//         allBtn.addEventListener("click",()=>{
//             completeCheck.forEach(e=>{
//                 console.log(e);
//                 e.parentElement.style.display = "block";
//             })
//         })
//     }
//     checkAll(); 









