
const schema = 
`
  enum PriorityLevel {
    HIGH
    MEDIUM
    LOW
  } 
  type Task {
    taskDescription: String!
    dueDate: Date
    id: ID!
    priority:PriorityLevel!
    completed: Boolean!
  }
`

export default schema;