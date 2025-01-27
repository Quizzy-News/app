import {useState, useEffect, useRef} from 'react';
import { getDailyQuiz } from "../../firebase/firebaseConfig";

export function useQuiz() {
    const [approvedQuiz, setApprovedQuiz] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [day, setDay] = useState(
        new Date()
    );
    const [dayString, setDayString] = useState(
        day.toISOString().split('T')[0]
    );

    const maxRequests = 5;
    const requests = useRef(0);
  
   

    const requestQuiz = async () => {
        const {quiz} = await getDailyQuiz(dayString);
        if (isQuizQpproved(quiz)) {
            setApprovedQuiz(quiz);
            setLoaded(true);
            return;
        }
        else {
            requests.current++;
            decrementDay();
        }

    }

    const isQuizQpproved = (quiz) => {
        return quiz.length >= 5;
    }

    const decrementDay = () =>{
        const newDay = new Date(day);
        newDay.setDate(newDay.getDate() - 1);
        setDay(newDay);
        setDayString(newDay.toISOString().split('T')[0]);
    }

    useEffect(() => {
        if (approvedQuiz.length === 0 && 
            requests.current < maxRequests) {
            requestQuiz();
        }

        if(requests.current === maxRequests) {
            setApprovedQuiz([0,0,0,0,0,0]);
            setLoaded(true);
            return;

        }

    }, [dayString])

    return { quiz: approvedQuiz.slice(0,5), loaded, dayString };
}