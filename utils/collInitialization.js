function collInitialization (model, data){
    return new Promise((resolver, rejector)=>{
        model.insertMany(data)
        .then((doc) => {
            resolver(doc)
        }).catch((error) => {
            // console.log(error)
            console.log("Collections could not be setuped, may be it contains data already.")
        }); 
    })
}

module.exports = collInitialization