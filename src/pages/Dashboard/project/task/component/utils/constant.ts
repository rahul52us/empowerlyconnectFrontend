export const taskStatus : any = [
    { value: "backlog", label: "BackLog" },
    { value: "todo", label: "Todo" },
    { value: "inProgress", label: "In Progress" },
    { value: "done", label: "Done" },
    { value: "complete", label: "Completed" },
]

export const taskPrioties : any = [
    { value: "low", label: "Low" },
    { value: "medium", label: "Medium" },
    { value: "high", label: "High" },
  ]

export const initialValuesOfTask : any = {
    title: "",
    description: "",
    startDate: new Date(),
    endDate: new Date(),
    dueDate: new Date(),
    priority: taskPrioties[1],
    followers: [],
    team_members: [],
    customers: [],
    project_manager: [],
    status: taskStatus[0],
}