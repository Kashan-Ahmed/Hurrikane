import { Card, CardContent } from '@/components/ui/card';
import { JSX } from 'react';

type TNavigationCards = {
  data: {
    title: string;
    icon: JSX.ElementType;
    link: string;
  }[];
};
const NavigationCards: React.FC<TNavigationCards> = ({ data }) => {
  return (
    <div className="flex flex-wrap items-center justify-between">
      {data.map((i) => (
        <a href={`/dashboard#${i.link}`}>
          <Card
            className="flex min-h-[100px] min-w-[200px] cursor-pointer flex-col justify-center bg-white align-middle duration-200 hover:bg-primary/10"
            key={i.title}
          >
            <CardContent className="flex flex-col items-center justify-center p-3">
              <i.icon className="h-8 w-8 text-primary" />
              <p className="text-2xl font-bold text-primary">{i.title}</p>
            </CardContent>
          </Card>
        </a>
      ))}
    </div>
  );
};

export default NavigationCards;
