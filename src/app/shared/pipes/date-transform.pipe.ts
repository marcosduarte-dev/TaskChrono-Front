import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateTransform',
  standalone: true,
})
export class DateTransformPipe implements PipeTransform {
  transform(value: string): string {
    if (value === '0000-12-31T21:00:00-03:00') {
      return '';
    }
    const date = value.substring(0, 10);

    const time = value.substring(11, 5);

    return `${date} ${time}`;
  }
}

@Pipe({
  name: 'durationTransform',
  standalone: true,
})
export class DurationTransformPipe implements PipeTransform {
  transform(value: number): string {
    const hours = Math.floor(value / 3600);
    const minutes = Math.floor((value % 3600) / 60);
    const hoursFormatted = String(hours).padStart(2, '0');
    const minutesFormatted = String(minutes).padStart(2, '0');

    return `${hoursFormatted}:${minutesFormatted}`;
  }
}
