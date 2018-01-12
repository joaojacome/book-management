import { Pipe } from '@angular/core'

@Pipe({
  name: 'truncate'
})
export class TruncatePipe {
  transform(value: string, args1?: any, args2?: any) : string {
    let limit = args1 && +args1 > 0 ? parseInt(args1, 10) : 10;
    let trail = args2 && args2.length > 1 ? args2 : '...';

    return value.length > limit ? value.substring(0, limit) + trail : value;
  }
}