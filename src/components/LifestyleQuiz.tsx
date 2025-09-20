import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import { ChevronRight, ChevronLeft } from "lucide-react";

interface UserAnswers {
  sleepSchedule: "early" | "late" | "moderate" | "flexible";
  partyPreference: "love" | "occasional" | "small" | "avoid";
  cleanliness: number;
  visitors: string;
  noise: string;
  smoking: boolean;
  pets: boolean;
  gender: "male" | "female" | "other";
  religion: string;
  occupation: string;
}

const questions = [
  {
    id: 1,
    question: "What's your ideal sleep schedule?",
    type: "radio",
    options: [
      { value: "early", label: "Early to bed, early to rise (10 PM - 6 AM)" },
      { value: "moderate", label: "Moderate (11 PM - 7 AM)" },
      { value: "late", label: "Night owl (1 AM - 9 AM)" },
      { value: "flexible", label: "Flexible schedule" },
    ],
  },
  {
    id: 2,
    question: "How do you feel about parties and social gatherings?",
    type: "radio",
    options: [
      { value: "love", label: "Love them! The more, the merrier" },
      { value: "occasional", label: "Occasional gatherings are fine" },
      { value: "small", label: "Prefer small, intimate gatherings" },
      { value: "avoid", label: "I prefer peace and quiet" },
    ],
  },
  {
    id: 3,
    question: "How important is cleanliness to you? (1-10)",
    type: "slider",
    min: 1,
    max: 10,
    step: 1,
    labels: ["Relaxed", "Neat Freak"],
  },
  {
    id: 4,
    question: "How often do you like having visitors?",
    type: "radio",
    options: [
      { value: "daily", label: "Almost daily" },
      { value: "weekly", label: "Few times a week" },
      { value: "monthly", label: "Few times a month" },
      { value: "rarely", label: "Rarely or never" },
    ],
  },
  {
    id: 5,
    question: "What's your noise tolerance level?",
    type: "radio",
    options: [
      { value: "high", label: "I can sleep through anything" },
      { value: "moderate", label: "Normal sounds are fine" },
      { value: "low", label: "I prefer it quiet" },
      { value: "silent", label: "Complete silence needed" },
    ],
  },
  {
    id: 6,
    question: "Do you smoke?",
    type: "radio",
    options: [
      { value: "true", label: "Yes" },
      { value: "false", label: "No" },
    ],
  },
  {
    id: 7,
    question: "Do you like pets around?",
    type: "radio",
    options: [
      { value: "true", label: "Yes, love pets" },
      { value: "false", label: "No, I prefer no pets" },
    ],
  },
  {
    id: 8,
    question: "What's your gender?",
    type: "radio",
    options: [
      { value: "male", label: "Male" },
      { value: "female", label: "Female" },
      { value: "other", label: "Other / Prefer not to say" },
    ],
  },
  {
    id: 9,
    question: "What's your religion?",
    type: "radio",
    options: [
      { value: "hindu", label: "Hinduism" },
      { value: "muslim", label: "Islam" },
      { value: "christian", label: "Christianity" },
      { value: "sikh", label: "Sikhism" },
      { value: "other", label: "Other / Prefer not to say" },
    ],
  },
  {
    id: 10,
    question: "What's your occupation?",
    type: "radio",
    options: [
      { value: "student", label: "Student" },
      { value: "working", label: "Working Professional" },
      { value: "freelancer", label: "Freelancer" },
      { value: "other", label: "Other" },
    ],
  },
];

interface LifestyleQuizProps {
  onComplete: (answers: UserAnswers) => void;
}

const LifestyleQuiz = ({ onComplete }: LifestyleQuizProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, any>>({});
  const [progress, setProgress] = useState(0);

  const question = questions[currentQuestion];

  useEffect(() => {
    setProgress(((currentQuestion + 1) / questions.length) * 100);
  }, [currentQuestion]);

  const handleAnswer = (value: any) => {
    setAnswers((prev) => ({ ...prev, [question.id]: value }));

    // Automatically move to next question after answering
    if (currentQuestion < questions.length - 1) {
      setTimeout(() => setCurrentQuestion((prev) => prev + 1), 200);
    } else {
      const finalAnswers: UserAnswers = {
        sleepSchedule: answers[1],
        partyPreference: answers[2],
        cleanliness: answers[3],
        visitors: answers[4],
        noise: answers[5],
        smoking: answers[6] === "true",
        pets: answers[7] === "true",
        gender: answers[8],
        religion: answers[9],
        occupation: answers[10],
        [question.id]: value,
      } as UserAnswers;
      onComplete(finalAnswers);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) setCurrentQuestion((prev) => prev - 1);
  };

  return (
    <Card className="max-w-2xl mx-auto shadow-lg transition-all duration-300">
      <CardHeader>
        <div className="mb-4">
          <div className="flex justify-between text-sm text-muted-foreground mb-2">
            <span>
              Question {currentQuestion + 1} of {questions.length}
            </span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
        <CardTitle className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          {question.question}
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Radio Group */}
        {question.type === "radio" && (
          <RadioGroup
            value={
              answers[question.id] !== undefined
                ? answers[question.id].toString()
                : ""
            } // <-- empty string ensures no default selection
            onValueChange={(value) => handleAnswer(value)}
            className="space-y-3"
          >
            {question.options?.map((option) => (
              <div
                key={option.value}
                className="flex items-center space-x-3 p-4 rounded-lg border border-border hover:border-primary hover:bg-primary/5 transition-all cursor-pointer"
              >
                <RadioGroupItem
                  value={option.value}
                  id={option.value}
                />
                <Label
                  htmlFor={option.value}
                  className="flex-1 cursor-pointer font-normal"
                >
                  {option.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        )}

        {/* Slider Question */}
        {question.type === "slider" && (
          <div className="space-y-4 py-4">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>{question.labels?.[0]}</span>
              <span>{question.labels?.[1]}</span>
            </div>
            <Slider
              value={[answers[question.id] || question.min || 1]}
              onValueChange={(value) => handleAnswer(value[0])}
              min={question.min}
              max={question.max}
              step={question.step}
              className="w-full"
            />
            <div className="text-center">
              <span className="text-3xl font-bold text-primary">
                {answers[question.id] || question.min || 1}
              </span>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex gap-3 pt-4">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className="flex-1"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Previous
          </Button>

          {currentQuestion === questions.length - 1 && (
            <Button
              variant="gradient"
              onClick={() => {
                const finalAnswers: UserAnswers = {
                  sleepSchedule: answers[1],
                  partyPreference: answers[2],
                  cleanliness: answers[3],
                  visitors: answers[4],
                  noise: answers[5],
                  smoking: answers[6] === "true",
                  pets: answers[7] === "true",
                  gender: answers[8],
                  religion: answers[9],
                  occupation: answers[10],
                };
                onComplete(finalAnswers);
              }}
              className="flex-1"
            >
              Complete
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default LifestyleQuiz;
