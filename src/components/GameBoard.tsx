import { useState, useCallback, useEffect } from 'react';
import { VocabPair } from '../data/vocabulary';
import GameCard from './GameCard';

interface Card {
  id: string;
  text: string;
  subtext: string;
  isArabic: boolean;
  pairId: string;
  index: number;
}

interface GameBoardProps {
  pairs: VocabPair[];
  onScore: (points: number) => void;
  onMistake: () => void;
  onComplete: () => void;
  onProgress: (completed: number, total: number) => void;
  onSpeak: (text: string) => void;
}

export default function GameBoard({ pairs, onScore, onMistake, onComplete, onProgress, onSpeak }: GameBoardProps) {
  const [cards, setCards] = useState<Card[]>([]);
  const [selectedCards, setSelectedCards] = useState<number[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<Set<string>>(new Set());
  const [wrongPair, setWrongPair] = useState<number[]>([]);

  useEffect(() => {
    const arabicCards: Card[] = pairs.map((p, i) => ({
      id: `ar-${p.id}`,
      text: p.arabic,
      subtext: p.category,
      isArabic: true,
      pairId: p.id,
      index: i * 2,
    }));
    const russianCards: Card[] = pairs.map((p, i) => ({
      id: `ru-${p.id}`,
      text: p.russian,
      subtext: p.transliteration,
      isArabic: false,
      pairId: p.id,
      index: i * 2 + 1,
    }));
    const all = [...arabicCards, ...russianCards].sort(() => Math.random() - 0.5);
    all.forEach((c, i) => (c.index = i));
    setCards(all);
    setSelectedCards([]);
    setMatchedPairs(new Set());
    setWrongPair([]);
  }, [pairs]);

  useEffect(() => {
    onProgress(matchedPairs.size, pairs.length);
    if (matchedPairs.size === pairs.length && pairs.length > 0) {
      onComplete();
    }
  }, [matchedPairs, pairs.length, onProgress, onComplete]);

  const handleCardClick = useCallback((index: number) => {
    if (selectedCards.length === 2) return;
    if (selectedCards.includes(index)) {
      setSelectedCards(prev => prev.filter(i => i !== index));
      return;
    }
    const newSelected = [...selectedCards, index];
    setSelectedCards(newSelected);

    if (newSelected.length === 2) {
      const card1 = cards[newSelected[0]];
      const card2 = cards[newSelected[1]];
      if (card1.pairId === card2.pairId) {
        setMatchedPairs(prev => new Set(prev).add(card1.pairId));
        setSelectedCards([]);
        onScore(10);
        const russianCard = card1.isArabic ? card2 : card1;
        onSpeak(russianCard.text);
      } else {
        setWrongPair(newSelected);
        onMistake();
        setTimeout(() => {
          setWrongPair([]);
          setSelectedCards([]);
        }, 600);
      }
    }
  }, [selectedCards, cards, onScore, onMistake]);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 md:gap-3 max-w-5xl mx-auto">
      {cards.map((card, i) => (
        <GameCard
          key={card.id}
          text={card.text}
          subtext={card.subtext}
          isArabic={card.isArabic}
          isSelected={selectedCards.includes(i)}
          isMatched={matchedPairs.has(card.pairId)}
          isWrong={wrongPair.includes(i)}
          isFlipped={false}
          onClick={() => handleCardClick(i)}
          onSpeak={!card.isArabic ? () => onSpeak(card.text) : undefined}
          delay={Math.min(i * 30, 1500)}
        />
      ))}
    </div>
  );
}
