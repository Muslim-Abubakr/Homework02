let users = [
    {id: '123', name: 'Muslim', age: 25},
    {id: '234', name: 'Anzor', age: 30},
    {id: '456', name: 'Aslan', age: 20},
    {id: '456', name: 'Aslan', age: 22},
    {id: '456', name: 'Aslan', age: 24}
]

users.push({id: '678', name: 'Umar', age: 34})

const getUsers = () => {
    return [...users].sort((u1, u2) => {
        if (u1.name < u2.name) return 1
        if (u1.name > u2.name) return -1 

        if (u1.age > u2.age) return -1 
        if (u1.age < u2.age) return 1

        return 0 
    })
}

console.log(getUsers())