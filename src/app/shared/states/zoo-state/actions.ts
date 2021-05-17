export namespace ZooDuty {
    export class FeedAnimals {
      static readonly type = '[Zoo] Feed Animals';
      constructor(public payload :{name: string,  hayAmount: number}) {}
    }
  
    export class CountAnimals {
      static readonly type = '[Zoo] Count Animals';
    }
  
    export class KillAnimals {
      static readonly type = '[Zoo] Kill Animals';
      constructor(public id: number) {}
    }
  }