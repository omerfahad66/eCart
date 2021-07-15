// variables
const cart = document.getElementById("cart")
const courses = document.getElementById("coursesList")
const listedCourses = document.querySelector("#cartItem tbody")
const emptyCartBtn = document.getElementById("emptyCart")

// listeners
loadEventListeners()
function loadEventListeners(){
    // when add to cart button is clicked
    courses.addEventListener("click", addCourse)
    // when a single course is removed from the cart
    cart.addEventListener("click", deleteCourse)
    // when empty cart button is clicked
    emptyCartBtn.addEventListener("click", emptyCart)
    // after reload show data from local storage
    document.addEventListener("DOMContentLoaded", readLS)
}

// functions
function addCourse(event){
    if(event.target.classList.contains("addCart")){
        const path = event.target.parentElement.parentElement;
        readData(path)
    }
}

function readData(path){
    const infoCourse = {
        image: path.querySelector('img').src,
        title: path.querySelector('h4').textContent,
        price: path.querySelector('.sp').textContent,
        id: path.querySelector('a').getAttribute('data-id')
    }
    insertInCart(infoCourse)
}

function insertInCart(infoCourse){
    const row = document.createElement("tr")
    row.innerHTML = `
    <td>
    <img src="${infoCourse.image}" alt="">
</td>
<td>${infoCourse.title}</td>
<td>${infoCourse.price}</td>
<td class="cross">
    <a href="#" class="deleteCourse" data-id="${infoCourse.id}">x</a>
</td>
    `
    listedCourses.appendChild(row)
    saveCourseLS(infoCourse)
}

function getCourseLS(){
    let coursesLS;
    if(localStorage.getItem("courses")=== 0){
        coursesLS = []
    }
    else{
        coursesLS = JSON.parse(localStorage.getItem("courses"))
    }
    return coursesLS
} 

function saveCourseLS(infoCourse){
    let courses;
    courses = getCourseLS()
    courses.push(infoCourse)
    localStorage.setItem("courses",JSON.stringify(courses))
}

function deleteCourse(event){
    event.preventDefault()
    let course,courseId;
    if(event.target.classList.contains("deleteCourse")){
        event.target.parentElement.parentElement.remove()
        course = event.target.parentElement.parentElement;
        courseId = course.querySelector("a").getAttribute("data-id")
    }
    deleteCourseLS(courseId)
}

function deleteCourseLS(courseId){
    let coursesLS;
    coursesLS = getCourseLS()
    coursesLS.forEach(course,index => {
        if(course.id===courseId){
            coursesLS.splice(index,1)
        }
    });
    localStorage.setItem('courses', JSON.stringify(coursesLS))
}

function emptyCart(){
    while(listedCourses.firstChild){
        listedCourses.removeChild(listedCourses.firstChild)
    }
    emptyLS()
    return false
}

function emptyLS(){
    localStorage.clear()
}

function readLS(){
    let coursesLS;
    coursesLS = getCourseLS()
    coursesLS.forEach(function(infoCourse){
        const row = document.createElement("tr")
    row.innerHTML = `
    <td>
    <img src="${infoCourse.image}" alt="">
</td>
<td>${infoCourse.title}</td>
<td>${infoCourse.price}</td>
<td class="cross">
    <a href="#" class="deleteCourse" data-id="${infoCourse.id}">x</a>
</td>
    `
    listedCourses.appendChild(row)
    })
}