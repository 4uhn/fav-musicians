const form2 = document.getElementById("commentsform")

form2.addEventListener("submit", async function (event){
    event.preventDefault();
    const ArtistName = document.getElementById("ArtistNameHeader").innerHTML;
    const Comment = document.getElementById("comment-input").value;
    const formData = new FormData(form2);
    formData.append('ArtistName', ArtistName);
    formData.append('Comment', Comment);
    const dataJson  = JSON.stringify(Object.fromEntries(formData.entries()));
    console.log(dataJson)
    try{
        const response = await fetch('http://127.0.0.1:8080/add-comments', {
            method: 'POST',
            headers:{
                "Content-Type": "application/json"
            },
            body: dataJson
        })
        if (!response.ok){
            throw new Error("Respond Status is" + response.status)
        }
    } catch (error) {
        alert(error);
    }
})