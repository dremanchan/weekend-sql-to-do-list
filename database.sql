-- First Create a database called 'weekend-to-do-app'

-- Copy and paste this into your SQL query and execute the command

CREATE TABLE "tasks" (
	"id" serial primary key,
	"task" varchar (250) not null,
	"status" boolean default 'False'
);

-- Copy and paste this to into your SQL query and execute to get
-- an example table

INSERT INTO "tasks" 
	("task")
VALUES
	('Wash Car'),
	('Clean Windows'),
	('Laundry'),
	('Groceries');
