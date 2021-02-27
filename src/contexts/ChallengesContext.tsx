import { createContext, useState, ReactNode, useEffect } from 'react';
import  Cookies  from 'js-cookie';
import challenges from '../../challenges.json';
import { LevelUpModal } from '../components/levelUpModal';

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
  closeLevelUpModal: () => void;
}


interface ChallengesProviderProps{
  children: ReactNode;
  level: number;
  currentExperience: number;
  challengesCompleted: number;
}

export const ChallengesContext = createContext({} as ChallengesContextData); 


export function ChallengesProvider({ children, ...rest }: ChallengesProviderProps){
  
  const [level, setLevel] = useState(rest.level ?? 1);
  const [currentExperience, setCurrentExperience] = useState(rest.currentExperience ?? 0);
  const [challengesCompleted, setChallengesCompleted] = useState(rest.challengesCompleted ?? 0);

  const [activeChallenge, setActiveChallenge] = useState(null)
  const [isLevelUpModalOpen, setLevelUpModalOpen] = useState(false);
  const experienceToNextLevel = Math.pow((level + 1 ) * 4, 2);

  const diffExp = (experienceToNextLevel - currentExperience);

  useEffect(() => {
    Notification.requestPermission();
  }, []);

  useEffect(() => {
      Cookies.set('level', String(level));
      Cookies.set('currentExperience', String(currentExperience));
      Cookies.set('challengesCompleted', String(challengesCompleted));
  }, [level, currentExperience, challengesCompleted]);

  function closeLevelUpModal() {
    setLevelUpModalOpen(false);
  }

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
  setLevelUpModalOpen(true);
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
    <ChallengesContext.Provider 
            value={{ 
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
              closeLevelUpModal
              }}>
    {children}
      { isLevelUpModalOpen && <LevelUpModal />}
    </ChallengesContext.Provider>
  )
}