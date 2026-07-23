const baseApi = 'http://localhost:3000'

document.addEventListener("DOMContentLoaded", async () => {
    const formLogin = document.getElementById('fromLogin')

    if(formLogin){
        formLogin.addEventListener('submit', async() => {

            const email = document.getElementById('email')
            const password = document.getElementById('password')

            const res = await fetch(`${baseApi}/login`, {
                headers: { "Content-Type": "application/json" },
                method: 'POST',
                credentials: "include",
                body: {
                    emial: JSON
                }
            })
            
        })
    }
})