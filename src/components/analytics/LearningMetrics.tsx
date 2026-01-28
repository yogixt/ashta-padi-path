import { useLearningStore } from '@/store/learningStore';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Cell } from 'recharts';
import { BarChart3 } from 'lucide-react';

export function LearningMetrics() {
  const { currentVocabIndex, vocabCompleted, sutrasCompleted, quizScore } = useLearningStore();

  const chartData = [
    {
      name: 'Vocabulary',
      value: vocabCompleted ? 100 : Math.round((currentVocabIndex / 6) * 100),
      fill: 'hsl(220, 80%, 55%)'
    },
    {
      name: 'Sutras',
      value: Math.round((sutrasCompleted / 5) * 100),
      fill: 'hsl(32, 95%, 52%)'
    },
    {
      name: 'Quiz',
      value: quizScore !== null ? Math.round((quizScore / 5) * 100) : 0,
      fill: 'hsl(160, 60%, 45%)'
    }
  ];

  const chartConfig = {
    vocabulary: {
      label: 'Vocabulary',
      color: 'hsl(220, 80%, 55%)'
    },
    sutras: {
      label: 'Sutras',
      color: 'hsl(32, 95%, 52%)'
    },
    quiz: {
      label: 'Quiz',
      color: 'hsl(160, 60%, 45%)'
    }
  };

  return (
    <div className="bg-card border border-border rounded-2xl p-6 h-full">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-semibold text-foreground">Learning Breakdown</h3>
          <p className="text-sm text-muted-foreground mt-1">Progress across all modules</p>
        </div>
        <div className="tag-gold">
          <BarChart3 className="w-3 h-3 mr-1" />
          Modules
        </div>
      </div>

      <div className="h-48">
        <ChartContainer config={chartConfig} className="w-full h-full">
          <BarChart data={chartData} layout="vertical" margin={{ left: 20, right: 20 }}>
            <CartesianGrid 
              strokeDasharray="3 3" 
              horizontal={true} 
              vertical={false}
              stroke="hsl(var(--border))"
            />
            <XAxis 
              type="number" 
              domain={[0, 100]}
              tickFormatter={(value) => `${value}%`}
              tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
              axisLine={{ stroke: 'hsl(var(--border))' }}
            />
            <YAxis 
              type="category" 
              dataKey="name"
              tick={{ fill: 'hsl(var(--foreground))', fontSize: 13, fontWeight: 500 }}
              axisLine={false}
              tickLine={false}
              width={80}
            />
            <ChartTooltip 
              content={<ChartTooltipContent />}
              cursor={{ fill: 'hsl(var(--muted) / 0.5)' }}
            />
            <Bar 
              dataKey="value" 
              radius={[0, 6, 6, 0]}
              maxBarSize={32}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Bar>
          </BarChart>
        </ChartContainer>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-6 mt-4 pt-4 border-t border-border">
        {chartData.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <div 
              className="w-3 h-3 rounded-sm"
              style={{ backgroundColor: item.fill }}
            />
            <span className="text-sm text-muted-foreground">{item.name}</span>
            <span className="text-sm font-semibold text-foreground">{item.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}
