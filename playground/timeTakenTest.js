
function getTotalTime(userObject){

    const startTime = new Date();
    console.log(startTime);
    setTimeout(() => {

        userObject({userId: 1 , userName:'Tarun'});

        const endTime = new Date();
        const totalTime = endTime - startTime;
        console.log(totalTime);
        
    } , 2000)


}


getTotalTime((userDetails) => {

    console.log(userDetails);

})
