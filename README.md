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

Todo Actions:

1. Creation - Todo can be created on the 1st and 2nd page. To create a Todo, at least a title must be provided. All newly created Todos in 1st page are nested in "Unassigned" category. Todos created on 2nd page will be assigned to respective category.
2. Deletion - Ticket can be deleted on Todo or Kanban Page. Once deleted, all Todos in respective category will be sorted.
3. Update - Todo can be updated on 2nd page.

Category Actions:

1. Creation - Category is created on second page. Cannot create Category with name "Unassigned".
2. Deletion - Category is deleted on second page. After deletion all its Todos will be transfered to "Unassagined" category
