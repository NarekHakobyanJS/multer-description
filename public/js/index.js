
window.addEventListener('click', (e) => {
    if(e.target.dataset.action === 'delete'){
        const id = e.target.id
        
        fetch(`http://localhost:3000/users/${id}`, {
            method : "DELETE",
            headers : {
                'Content-Type' : 'application/json'
            }
        }).then((res) => res.json())
        .then((res) => console.log(res))
    }
  
    if(e.target.dataset.action === 'edit'){
        const id = e.target.id
        const li = e.target.closest('li')
        const name = li.querySelector('h2').textContent.trim()
        const input = document.createElement('input')
        input.value = name
        li.append(input)
        input.addEventListener('blur', (e) => {
            fetch(`http://localhost:3000/users/change/${id}`, {
                method : "PATCH",
                headers : {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify({name : input.value})
            }).then((res) => res.json())
            .then((res) => console.log(res))
        })
        
    }
})