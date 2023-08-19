import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import heatmap from 'highcharts/modules/heatmap';
import mapModule from 'highcharts/modules/map';
import timeline from 'highcharts/modules/timeline';

interface ChartComponentProps {
    chartString: string;
  }

function convertToJson(str : string) {
    let inQuotes = false;
    let escaped = false;
  
    const result = str.split('').map((char, index) => {
      if (char === '\\' && !escaped) {
        escaped = true;
        return char;
      }
  
      if (char === '"' && !escaped) {
        inQuotes = !inQuotes;
      }
  
      if (char === "'" && str[index - 1] !== ':' && !inQuotes && !escaped) {
        return '"';
      }
  
      escaped = false;
      return char;
    }).join('');
    
    return result.replace(/(\w+):/g, '"$1":').replace('"percentage"', 'percentage')
    .replace('Highcharts.maps[custom/world]', `"Highcharts.maps[custom/world]"`)
    .replace('Highcharts.maps["custom/world"]', `"Highcharts.maps[custom/world]"`)
    .replace(`."percentage"`,'.percentage');
    ;
  }
  
  export const ChartRender : React.FC<ChartComponentProps> = ({ chartString }) => {
    const correctedString = (chartString);//.replace(/(\w+):/g, '"$1":');
    let options;
  
  
    try {
      options = JSON.parse(correctedString);
    } catch (e) {
      console.error("Error al parsear el contenido del mensaje:", e);
      return <div>{correctedString}</div>;
    }
    heatmap(Highcharts);
    mapModule(Highcharts);
    timeline(Highcharts);
  
    return (
      <div>
        {<HighchartsReact highcharts={Highcharts} options={options} />}
      </div>
    );
  };
  