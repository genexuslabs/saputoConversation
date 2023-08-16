import { FC, useContext, useState } from 'react';

import { useTranslation } from 'next-i18next';

import { DEFAULT_TEMPERATURE } from '@/utils/app/const';

import HomeContext from '@/pages/api/home/home.context';
import { getProduct } from '@/utils/app/product';
import { Brush, CircleDot, Scale } from 'lucide-react';

interface Props {
  label: string;
  onChangeTemperature: (temperature: number) => void;
}

export const TemperatureSlider: FC<Props> = ({
  label,
  onChangeTemperature,
}) => {
  const {
    state: { conversations },
  } = useContext(HomeContext);
  const lastConversation = conversations[conversations.length - 1];
  const [temperature, setTemperature] = useState(
    lastConversation?.temperature ?? DEFAULT_TEMPERATURE,
  );
  const { t } = useTranslation('chat');
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(event.target.value);
    setTemperature(newValue);
    onChangeTemperature(newValue);
  };

  return (
    <div className="flex flex-col">
      <label className="mb-2 text-left text-neutral-700 dark:text-neutral-400">
        {label}
      </label>
  
      <span className="mt-2 mb-1 text-center text-neutral-900 dark:text-neutral-100">
        {temperature.toFixed(1)}
      </span>
      <input
        title='Temperature'
        className="cursor-pointer"
        type="range"
        
        style={{
        
          width: '100%',
          background: '#d3d3d3',
          outline: 'none',
          accentColor: getProduct().keyColor,
          transition: 'color 0.2s ease-in-out'
        }}
        min={0}
        max={1}
        step={0.1}
        value={temperature}
        onChange={handleChange}
      />
      <ul className="w mt-2 pb-8 flex justify-between px-[24px] text-neutral-900 dark:text-neutral-100">
        <li className="flex justify-center">
          <CircleDot size={20} /> <span style={{ margin: '0 5px' }}/> {t(' Precise')}
        </li>
        <li className="flex justify-center">
          <Scale size={20} /> <span style={{ margin: '0 5px' }}/> {t(' Neutral')}
        </li>
        <li className="flex justify-center">
        <Brush size={20} /><span style={{ margin: '0 5px' }}/>{t(' Creative')}
        </li>
      </ul>
    </div>
  );
};
