const refresh = async ()=>{
    let response = await fetch("/user/getUser");
    response = await response.json()
    if(response.status=="success"){
        const mainDiv = document.getElementById("container")
        mainDiv.innerHTML = ""
        const users = response.users;
        for(let user of users){
            let elem = document.createElement("div")
            elem.className = "inner-cont"
            elem.setAttribute("onclick",`updateUser('${user._id}')`)
            elem.id = `${user._id}`
            elem.innerHTML =`
                <p>${user.name}</p>
                <p>${user.age}</p>
                <p>${user.place}</p>
                <a onclick="deleteUser('${user._id}',event)">Delete</a>
            `
            mainDiv.appendChild(elem)
        }
    }
}

refresh()

const createUser = async (e)=>{
    e.preventDefault()
    let name = document.getElementById("name").value
    let age = document.getElementById("age").value
    let place = document.getElementById("place").value
    console.log(name, age, place)
    const data = {
        name : name,
        age : age,
        place : place
    }
    let response = await fetch("/user/create",{
        method : "POST",
        headers : {
            "content-type" : "application/json"
        },
        body : JSON.stringify(data)
    })
    response = await response.json()
    console.log(response)
    if(response.status=="success"){
        refresh()
    }
}

const updateUser=async (id)=>{
    const selectedCont = document.getElementById(id)
    const name = selectedCont.getElementsByTagName("p")[0].innerText
    const age = selectedCont.getElementsByTagName("p")[1].innerText
    const place = selectedCont.getElementsByTagName("p")[2].innerText
    console.log(name, age, place)
    document.getElementById("updateName").value = name;
    document.getElementById("updateAge").value = age;
    document.getElementById("updatePlace").value = place;
    document.getElementById("hidden").value = id
}

const updateUserDetails = async(e)=>{
    e.preventDefault()
    const name = document.getElementById("updateName").value
    const age = document.getElementById("updateAge").value
    const place = document.getElementById("updatePlace").value
    const id = document.getElementById("hidden").value
    console.log(name, age, place)
    const data = {
        name : name,
        age : age,
        place : place
    }
    let response = await fetch(`/user/update/${id}`,{
        method : "PATCH",
        headers : {
            "content-type" : "application/json"
        },
        body : JSON.stringify(data)
    })
    response = await response.json()
    console.log(response)
    if(response.status=="success"){
        refresh()
        document.getElementById("updateName").value = ""
        document.getElementById("updateAge").value = ""
        document.getElementById("updatePlace").value = ""
        document.getElementById("hidden").value = ""
    }
}

const deleteUser =async (id,e)=>{
    e.preventDefault();
    e.stopPropagation()
    let response = await fetch(`/user/delete/${id}`,{
        method : "delete",
        headers : {
            "content-type" : "application/json"
        },
    })
    response = await response.json()
    if(response.status=="success"){
        refresh()
    }
}