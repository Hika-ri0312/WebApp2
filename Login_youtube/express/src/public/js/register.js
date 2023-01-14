form.addEventListener("submit", () => {
    const register = {
        email: email.value,
        password: password.value
    }
    fetch("/api/register", {
        method: "POST",
        body: JSON.stringify(register),
        headers: {
            "Content-Type": "application/json"
        }
    }).then(res => res.json())
        .then(data => {
            if (data.status == "error"){
                success.style.dispaly = "none"
                error.style.dispaly = "block"
                error.innerText = data.error
            } else{
                error.style.dispaly = "none"
                success.style.dispaly = "block"
                success.innerText = data.success
            }
        })
})