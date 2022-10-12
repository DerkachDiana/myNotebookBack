const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  name: {type: DataTypes.STRING},
  password: {type: DataTypes.STRING}
})

const Notebook = sequelize.define('notebook', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  name: {type: DataTypes.STRING}
})

const Page = sequelize.define('page', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  name: {type: DataTypes.STRING},
  text: {type: DataTypes.TEXT}
})

const NotebookFile = sequelize.define('notebook_file', {
  url: {type: DataTypes.STRING, primaryKey: true}
})

const NotebookBackground = sequelize.define('notebook_background', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  url: {type: DataTypes.STRING}
})

const NotebookCover = sequelize.define('notebook_cover', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  url: {type: DataTypes.STRING}
})

const Todo = sequelize.define('todo', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  text: {type: DataTypes.STRING},
  isDone: {type: DataTypes.BOOLEAN}
})

const TodoList = sequelize.define('todo_list', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  name: {type: DataTypes.STRING}
})

const TodolistCategory = sequelize.define('todolist_category', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  name: {type: DataTypes.STRING}
})

const CategoryBackground = sequelize.define('category_background', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  url: {type: DataTypes.STRING}
})

const ListType = sequelize.define('list_type', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  name: {type: DataTypes.STRING}
})

const ListBackground = sequelize.define('list_background', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  url: {type: DataTypes.STRING}
})

const Note = sequelize.define('note', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  url: {type: DataTypes.STRING}
})

const NoteFile = sequelize.define('note_file', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  url: {type: DataTypes.STRING}
})

const NoteCategory = sequelize.define('note_category', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  name: {type: DataTypes.STRING},
  color: {type: DataTypes.STRING}
})

const Habit = sequelize.define('habit', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  name: {type: DataTypes.STRING},
  color: {type: DataTypes.STRING},
  isDone: {type: DataTypes.BOOLEAN},
  rowDays: {type: DataTypes.INTEGER},
  duration: {type: DataTypes.INTEGER},
  startDate: {type: DataTypes.DATE}
})

const HabitType = sequelize.define('habit_type', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  name: {type: DataTypes.STRING}
})

const HabitDescription = sequelize.define('habit_description', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  text: {type: DataTypes.STRING},
  date: {type: DataTypes.DATE}
})

User.hasMany(Notebook)
Notebook.belongsTo(User)

Notebook.hasMany(Page)
Page.belongsTo(Notebook)

Page.hasMany(NotebookFile)
NotebookFile.belongsTo(Page)

NotebookBackground.hasMany(Notebook)
Notebook.belongsTo(NotebookBackground)

NotebookCover.hasMany(Notebook)
Notebook.belongsTo(NotebookCover)

User.hasMany(TodolistCategory)
TodolistCategory.belongsTo(TodolistCategory)

TodolistCategory.hasMany(TodoList)
TodoList.belongsTo(TodolistCategory)

TodoList.hasMany(Todo)
Todo.belongsTo(TodoList)

CategoryBackground.hasMany(TodolistCategory)
TodolistCategory.belongsTo(CategoryBackground)

ListType.hasMany(TodoList)
TodoList.belongsTo(ListType)

ListBackground.hasMany(TodoList)
TodoList.belongsTo(ListBackground)

User.hasMany(NoteCategory)
NoteCategory.belongsTo(User)

NoteCategory.hasMany(Note)
Note.belongsTo(NoteCategory)

Note.hasMany(NoteFile)
NoteFile.belongsTo(Note)

User.hasMany(Habit)
Habit.belongsTo(User)

Habit.hasMany(HabitDescription)
HabitDescription.belongsTo(Habit)

HabitType.hasMany(Habit)
Habit.belongsTo(HabitType)

module.exports = {
  User,
  Notebook,
  Page,
  NotebookFile,
  NotebookBackground,
  NotebookCover,
  Todo,
  TodoList,
  TodolistCategory,
  CategoryBackground,
  ListType,
  ListBackground,
  Note,
  NoteFile,
  NoteCategory,
  Habit,
  HabitType,
  HabitDescription
}
