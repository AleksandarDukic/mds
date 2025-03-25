to run locally:
npm install
npm start

---

Documentation:
Application has two pages: - Todo and Kanban

Todo page is used to manipulate Todos
Kanban page is used to organize Todos in Categories.

There are two data structures:
Todo :{
id: string;
title: string;
description: string;
dueDate?: string;
completed: boolean;
createdAt: Date;
categoryId?: string;
position?: number;
}

Category:{
title: string;
position?: number;
id: string;
}

State is persisted with two data structures:

1. Todo[] - All Todos are kept in a list
2. Category[] - All kanban Categories are kept in a list. The position of Category in a list determines Category position in kanban.

When the app runs it performs some checks. There must be present "Unassigned" category in kanban, because all new todos will be placed here.
This column cannot be deleted, and there can be no more categories with name "Unassigned". This data is saved in ennvironment variables.
