//Reducers Imports
import navigation from '../components/navigation/store'
import auth from '../views/Auth/store'
import dashboard from '../views/Dashboard/store'
import projects from '../views/Projects/store'
import applications from '../views/Applications/store'
import users from '../views/Users/store'

const rootReducer = { 
    navigation,
    auth,
    dashboard,
    projects,
    applications,
    users
 }

export default rootReducer
