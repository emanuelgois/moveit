import { createContext, useState, ReactNode, useEffect } from 'react';

import challenges from '../../challenges.json';

interface Challenge{
  type: 'body' | 'eye';
  description: string;
  amount: number;
}

interface ChallengesContextData{
  level: number;
  currentExperience: number;
  challengesCompleted: number;
  experienceToNextLevel: number;
  activeChallenge: Challenge;
  levelUp: () => void;
  upExp: () => void;
  startNewChallenges: () => void;
  resetChallenge: () => void;
  completeChallenge: () => void;
}


interface ChallengesProviderProps{
  children: ReactNode;
}

export const ChallengesContext = createContext({} as ChallengesContextData); 


export function ChallengesProvider({ children }: ChallengesProviderProps){
  
  const [level, setLevel] = useState(1);
  const [currentExperience, setCurrentExperience] = useState(0);
  const [challengesCompleted, setChallengesCompleted] = useState(0);

  const [activeChallenge, setActiveChallenge] = useState(null)

  const experienceToNextLevel = Math.pow((level + 1 ) * 4, 2);

  const diffExp = (experienceToNextLevel - currentExperience);

  useEffect(() => {
    Notification.requestPermission();
  }, []);


  function upExp (){ 
    setCurrentExperience(currentExperience + 10);
    checkExp();
  }
  function checkExp(){
    
    if (diffExp < 10){
      levelUp();
      alert("Parabéns você chegou no nivel "+ diffExp)
    }
  }

function levelUp(){
  setLevel(level + 1);
}

function startNewChallenges(){
  const randomChallengeIndex = Math.floor(Math.random() * challenges.length)
  const challenge = challenges[randomChallengeIndex];

  setActiveChallenge(challenge);

  new Audio('/notification.mp3').play();

  if(Notification.permission === 'granted') {
    new Notification('Novo desafio 🔥', {
      body: `Valendo ${challenge.amount}xp!`
    });
  }
  
}

function resetChallenge() {
  setActiveChallenge(null)
}

function completeChallenge(){
      if (!activeChallenge){
        return;
      }
      const { amount } = activeChallenge;
      let finalExperience = currentExperience + amount;

      if (finalExperience >= experienceToNextLevel ){
        finalExperience = finalExperience - experienceToNextLevel;
        levelUp();
      }

      setCurrentExperience(finalExperience);
      setActiveChallenge(null);
      setChallengesCompleted(challengesCompleted + 1);

}

  return (
    <ChallengesContext.Provider value={{ 
      level, 
      currentExperience, 
      challengesCompleted,
      levelUp,
      upExp,
      experienceToNextLevel,
      startNewChallenges,
      activeChallenge,
      resetChallenge,
      completeChallenge,
      }}>
    {children}
    </ChallengesContext.Provider>
  )
}