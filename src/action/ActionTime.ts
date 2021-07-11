export interface TimeMap {
     days: number;
     hours: number;
     minutes: number;
     seconds: number;
     years: number;
}
export class ActionTime {
     #calculated: TimeMap;

     /**
      * @param length - The length of time, either a string resolvable or a number which represents minutes.
      */
     public constructor(length: string | number) {
          this.#calculated = (typeof length === 'string') ? this.fromString(length) : this.fromMinutes(length);
     }

     private fromString(input: string): TimeMap {
          let map: TimeMap = {
               days: 0,
               hours: 0,
               minutes: 0,
               seconds: 0,
               years: 0
          };

          // parse
          for (let key in map) {
               // build regex
               let cal = key.length > 5 ? '|' + key.split('').slice(0, 2) : '';
               let reg = new RegExp(`[0-9]+(?=\\s?(${key}|${key.split('').pop()}|${key.split('').slice(-1)}${cal}))`, 'gm');
               let match = [...input.match(reg) || []];

               if (match.length !== 0) {
                    // @ts-ignore
                    map[key] = match.reduce((v, a) => parseFloat(v) + parseFloat(a));
               }
          }

          return map;
     }

     private fromMinutes(mins: number): TimeMap {
          return {
               days: 0,
               hours: 0,
               minutes: mins,
               seconds: 0,
               years: 0
          };
     }

     /**
      * Converts a crazy map to a good calculated map
      * eg: "90 seconds" would be converted to: "1 minute 30 seconds"
      */
     private sanitize(map: TimeMap): TimeMap {
          let sanitized: TimeMap = {
               days: 0,
               hours: 0,
               minutes: 0,
               seconds: 0,
               years: 0
          };

          let messy = this.messyMS(map);

          for (let time in map) {
               // convert to seconds
               // @ts-ignore
               let value = map[time] % messy[time];
          }
     }

     /**
      * Converts a timemap to all milliseconds values
      */
     private messyMS(map: TimeMap): number {
          return Object.values({
               days: map.days * 60 * 60 * 24,
               hours: map.hours * 60 * 60,
               minutes: map.minutes * 60,
               seconds: map.seconds,
               years: map.years * 24 * 60 * 365
          }).reduce((v, a) => v + a)
     }
}