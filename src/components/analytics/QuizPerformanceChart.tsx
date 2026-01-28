import { useLearningStore } from '@/store/learningStore';
import { ChartContainer } from '@/components/ui/chart';
import { RadialBarChart, RadialBar, PolarAngleAxis } from 'recharts';
import { TrendingUp, CheckCircle, XCircle } from 'lucide-react';

export function QuizPerformanceChart() {
  const { quizAnswers, quizScore } = useLearningStore();
  
  const totalAnswered = Object.keys(quizAnswers).length;
  const correctAnswers = quizScore ?? 0;
  const incorrectAnswers = totalAnswered > 0 ? totalAnswered - correctAnswers : 0;
  const accuracy = totalAnswered > 0 ? Math.round((correctAnswers / totalAnswered) * 100) : 0;

  const chartData = [
    {
      name: 'accuracy',
      value: accuracy,
      fill: 'hsl(32, 95%, 52%)'
    }
  ];

  const chartConfig = {
    accuracy: {
      label: 'Accuracy',
      color: 'hsl(32, 95%, 52%)'
    }
  };

  return (
    <div className="bg-card border border-border rounded-2xl p-6 h-full">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-semibold text-foreground">Quiz Performance</h3>
          <p className="text-sm text-muted-foreground mt-1">Your accuracy on assessments</p>
        </div>
        <div className="tag">
          <TrendingUp className="w-3 h-3 mr-1" />
          Analysis
        </div>
      </div>

      <div className="flex items-center gap-6">
        {/* Radial Chart */}
        <div className="relative w-40 h-40 flex-shrink-0">
          <ChartContainer config={chartConfig} className="w-full h-full">
            <RadialBarChart
              innerRadius="70%"
              outerRadius="100%"
              data={chartData}
              startAngle={90}
              endAngle={-270}
            >
              <PolarAngleAxis
                type="number"
                domain={[0, 100]}
                angleAxisId={0}
                tick={false}
              />
              <RadialBar
                background={{ fill: 'hsl(var(--muted))' }}
                dataKey="value"
                cornerRadius={10}
                angleAxisId={0}
              />
            </RadialBarChart>
          </ChartContainer>
          {/* Center text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-bold text-foreground">{accuracy}%</span>
            <span className="text-xs text-muted-foreground">Accuracy</span>
          </div>
        </div>

        {/* Stats */}
        <div className="flex-1 space-y-4">
          <div className="flex items-center justify-between p-3 bg-emerald-50 rounded-xl border border-emerald-100">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-emerald-600" />
              <span className="text-sm font-medium text-foreground">Correct Answers</span>
            </div>
            <span className="text-lg font-bold text-emerald-600">{correctAnswers}</span>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-red-50 rounded-xl border border-red-100">
            <div className="flex items-center gap-3">
              <XCircle className="w-5 h-5 text-red-500" />
              <span className="text-sm font-medium text-foreground">Incorrect Answers</span>
            </div>
            <span className="text-lg font-bold text-red-500">{incorrectAnswers}</span>
          </div>

          <div className="flex items-center justify-between p-3 bg-muted rounded-xl border border-border">
            <span className="text-sm font-medium text-muted-foreground">Total Questions</span>
            <span className="text-lg font-bold text-foreground">{totalAnswered || 5}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
