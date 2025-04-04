export class Task {
    id: number;
    name: string;
    description: string;
    finish_date: string; // Можно использовать тип Date, если нужно
    finished: boolean;
  
    constructor(id: number, name: string, description: string, finish_date: string, finished: boolean) {
      this.id = id;
      this.name = name;
      this.description = description;
      this.finish_date = finish_date;
      this.finished = finished;
    }
  }