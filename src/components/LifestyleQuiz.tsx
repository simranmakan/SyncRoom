import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import { ChevronRight, ChevronLeft } from "lucide-react";

const questions = [
  {
    id: 1,
    question: "What's your ideal sleep schedule?",
    type: "radio",
    options: [
      { value: "early", label: "Early to bed, early to rise (10 PM - 6 AM)" },
      { value: "moderate", label: "Moderate (11 PM - 7 AM)" },
      { value: "late", label: "Night owl (1 AM - 9 AM)" },
      { value: "flexible", label: "Flexible schedule" }
    ]
  },
  {
    id: 2,
    question: "How do you feel about parties and social gatherings?",
    type: "radio",
    options: [
      { value: "love", label: "Love them! The more, the merrier" },
      { value: "occasional", label: "Occasional gatherings are fine" },
      { value: "small", label: "Prefer small, intimate gatherings" },
      { value: "avoid", label: "I prefer peace and quiet" }
    ]
  },
  {
    id: 3,
    question: "How important is cleanliness to you? (1-10)",
    type: "slider",
    min: 1,
    max: 10,
    step: 1,
    labels: ["Relaxed", "Neat Freak"]
  },
  {
    id: 4,
    question: "How often do you like having visitors?",
    type: "radio",
    options: [
      { value: "daily", label: "Almost daily" },
      { value: "weekly", label: "Few times a week" },
      { value: "monthly", label: "Few times a month" },
      { value: "rarely", label: "Rarely or never" }
    ]
  },
  {
    id: 5,
    question: "What's your noise tolerance level?",
    type: "radio",
    options: [
      { value: "high", label: "I can sleep through anything" },
      { value: "moderate", label: "Normal sounds are fine" },
      { value: "low", label: "I prefer it quiet" },
      { value: "silent", label: "Complete silence needed" }
    ]
  }
];

interface LifestyleQuizProps {
  onComplete: (answers: any) => void;
}

const LifestyleQuiz = ({ onComplete }: LifestyleQuizProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, any>>({});

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const question = questions[currentQuestion];

  const handleAnswer = (value: any) => {
    setAnswers({ ...answers, [question.id]: value });
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      onComplete(answers);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const isAnswered = answers[question.id] !== undefined;

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <div className="mb-4">
          <div className="flex justify-between text-sm text-muted-foreground mb-2">
            <span>Question {currentQuestion + 1} of {questions.length}</span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
        <CardTitle className="text-2xl">{question.question}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {question.type === "radio" && (
          <RadioGroup
            value={answers[question.id]}
            onValueChange={handleAnswer}
            className="space-y-3"
          >
            {question.options?.map((option) => (
              <div
                key={option.value}
                className="flex items-center space-x-3 p-4 rounded-lg border border-border hover:border-primary hover:bg-primary/5 transition-all cursor-pointer"
              >
                <RadioGroupItem value={option.value} id={option.value} />
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
          <Button
            variant="gradient"
            onClick={handleNext}
            disabled={!isAnswered}
            className="flex-1"
          >
            {currentQuestion === questions.length - 1 ? "Complete" : "Next"}
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default LifestyleQuiz;