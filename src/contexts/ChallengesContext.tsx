import { createContext, useState, ReactNode } from 'react';

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
}


interface ChallengesProviderProps{
  children: ReactNode;
}

export const ChallengesContext = createContext({} as ChallengesContextData); 


export function ChallengesProvider({ children }: ChallengesProviderProps){
  
  const [level, setLevel] = useState(1);
  const [currentExperience, setCurrentExperience] = useState(12);
  const [challengesCompleted, setChallengesCompleted] = useState(0);

  const [activeChallenge, setActiveChallenge] = useState(null)

  const experienceToNextLevel = Math.pow((level + 1 ) * 4, 2);
  const diffExp = (experienceToNextLevel - currentExperience);

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
}

function resetChallenge() {
  setActiveChallenge(null)
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
      }}>
    {children}
    </ChallengesContext.Provider>
  )
}