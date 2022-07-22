//Reducers Imports
import navigation from '../components/navigation/store'
import auth from '../views/Auth/store'
import dashboard from '../views/Dashboard/store'
import projects from '../views/Projects/store'
import applications from '../views/Applications/store'

const rootReducer = { 
    navigation,
    auth,
    dashboard,
    projects,
    applications
 }

export default rootReducer
