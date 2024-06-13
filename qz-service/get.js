const today = new Date();
const todayFormatted = today.toISOString().split('T')[0];

export const getDaily = async (date) => {
    const quizData = await fetch('https://getdailygemini-mgpsab4ctq-uc.a.run.app', {
        
        method: 'GET',
        // headers: {
        //     Accept: 'application/json',
        //     'Content-Type': 'application/json',
        // }
    }).then(res => {res.json(); return res;}).catch(err => console.log(err));
    
}