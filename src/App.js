import { Route, BrowserRouter as Router } from 'react-router-dom'
import Home from './pages/index'
import Dashboard from './pages/dashboard'
import Features from './pages/features'
import WhyBirdByte from './pages/whybirdbyte'
import RoadMap from './pages/roadmap'
import GetAirdrop from './pages/welcome'
import ClaimAirdrop from './pages/claimairdrop'
import RecoverPassword from './pages/recoverpassword'
import Tokenomics from './pages/tokenomics'

function App() {
    return (
        <Router>
            <Route path='/'>
                <Route path='/dashboard'>
                    <Dashboard />
                </Route>
                <Route path='/features'>
                    <Features />
                </Route>
                <Route path='/whybirdbyte'>
                    <WhyBirdByte />
                </Route>
                <Route path='/roadmap'>
                    <RoadMap />
                </Route>
                <Route path='/welcome'>
                    <GetAirdrop />
                </Route>
                <Route path='/claimairdrop'>
                    <ClaimAirdrop />
                </Route>
                <Route path='/recoveraccount'>
                    <RecoverPassword />
                </Route>
                <Route path='/tokenomics'>
                    <Tokenomics />
                </Route>
            <Route exact path='/'>
                
                <Home />
 </Route>
                    </Route>
        </Router>
    )
}

export default App
