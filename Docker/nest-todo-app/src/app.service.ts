import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello from nest-todo-app!';
  }
  getAllTodos(): any[] {
    return [
      { id: 1, title: 'Learn NestJS', completed: false },
      { id: 2, title: 'Build a TODO app', completed: false },
    ];
  }
}
