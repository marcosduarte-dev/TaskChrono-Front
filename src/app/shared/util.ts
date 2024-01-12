import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

export function getTextColor(backgroundColor: string): string {
  const rgb = hexToRgb(backgroundColor);

  const brightness = (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;

  return brightness > 128 ? 'black' : 'white';
}

export function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : { r: 0, g: 0, b: 0 };
}

export function handleError(error: HttpErrorResponse) {
  let errorMessage = '';
  if (error.error instanceof ErrorEvent) {
    errorMessage = error.error.message;
  } else {
    errorMessage = `Erro Code: ${error.status}, ` + `mensage: ${error.message}`;
  }
  console.log(errorMessage);
  return throwError(errorMessage);
}
