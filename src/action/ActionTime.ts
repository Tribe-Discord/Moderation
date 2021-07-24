export interface TimeMap {
     days: number;
     hours: number;
     minutes: number;
     seconds: number;
     years: number;
     weeks: number;
}
export class ActionTime {
     #calculated: TimeMap;

     /**
      * @param length - The length of time, either a string resolvable or a number which represents minutes.
      */
     public constructor(length: string | number) {
          this.#calculated = (typeof length === 'string') ? this.fromString(length) : this.sanitize(this.fromSeconds(length));
     }

     private fromString(input: string): TimeMap {
          let map: TimeMap = {
               days: 0,
               hours: 0,
               minutes: 0,
               seconds: 0,
               years: 0,
               weeks: 0
          };

          // parse
          for (let key in map) {
               // build regex
               let cal = key.length > 5 ? '|' + key.split('').slice(0, 3) : '';
               let reg = new RegExp(`[0-9]+(?=\\s?(${key}|${key.split('').shift()}|${key.split('').slice(0, key.length - 1)}${cal}))`, 'gm');
               let match = [...input.match(reg) || []];

               if (match.length !== 0) {
                    // @ts-ignore
                    map[key] = parseInt(match.reduce((v, a) => parseInt(v) + parseInt(a)));
               }
          }

          return map;
     }

     private fromSeconds(secs: number): TimeMap {
          return {
               days: 0,
               hours: 0,
               minutes: 0,
               seconds: secs,
               years: 0,
               weeks: 0
          };
     }

     /**
      * Converts a crazy map to a good calculated map
      * eg: "90 seconds" would be converted to: "1 minute 30 seconds"
      */
     private sanitize(map: TimeMap): TimeMap {
          // converts everything to seconds,
          // called messy because it's not a final value
          // and should never be.
          let seconds = this.messy(map);
          let years = Math.floor(seconds / 31449600);
               seconds -= years * 31449600;
          let weeks = Math.floor(seconds / 604800);
               seconds -= weeks * 604800;
          let days = Math.floor(seconds / 86400);
               seconds -= days * 86400;
          let hours = Math.floor(seconds / 3600);
               seconds -= hours * 3600;
          let minutes = Math.floor(seconds / 60);
               seconds -= minutes * 60;
          return {
               years,
               days,
               hours,
               minutes,
               seconds,
               weeks
          }
     }

     /**
      * Converts a timemap to all seconds values
      */
     private messy(map: TimeMap): number {
          return Object.values({
               days: map.days * 60 * 60 * 24,
               hours: map.hours * 60 * 60,
               minutes: map.minutes * 60,
               seconds: map.seconds,
               weeks: map.weeks * 60 * 60 * 24 * 7,
               years: map.years * 24 * 60 * 365
          }).reduce((v, a) => v + a);
     }

     public get readableString() {
          let { years, weeks, days, hours, seconds, minutes } = this.#calculated;
          let components = [
               years === 0 ? "" : years === 1 ? years + " year" : years + " years",
               weeks === 0 ? "" : weeks === 1 ? weeks + " week" : weeks + " weeks",
               days === 0 ? "" : days === 1 ? days + " day" : days + " days",
               hours === 0 ? "" : hours === 1 ? hours + " hour" : hours + " hours",
               minutes === 0 ? "" : minutes === 1 ? minutes + " minute" : minutes + " minutes",
               seconds === 0 ? "" : seconds === 1 ? seconds + " second" : seconds + " seconds"
          ].filter(v => v.length !== 0);
          let last = components.pop();
          if (last) {
               return components.join(', ') + " and " + last;
          } else {
               return components.join('');
          }
     }
}