import React, { createContext, useEffect, useState } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import MyLoans from './components/MyLoans'
import ApplyLoan from './screens/ApplyLoan'
import { Home } from './screens/Home'
import LendingLoans from './screens/LendingLoans'
import LoanRequests from './screens/LoanRequests'
import { ProfileUpdateScreen } from './screens/ProfileUpdate'
import { ROUTES } from './utils/routes'

export const StateContext = createContext({
    setuserDetails: () => {},
    saveUsertoLocal: () => {},
    userDetails: {},
})

export const App = () => {
    const [userDetails, setuserDetails] = useState({
        username: '',
        email: '',
        isProfileCompleted: false,
    })
    const navigate = useNavigate()
    const saveUsertoLocal = () => {
        localStorage.setItem('userDetails', JSON.stringify(userDetails))
    }
    useEffect(() => {
        let user
        try {
            user = JSON.parse(localStorage.getItem('userDetails'))
        } catch (err) {}
        if (!user) navigate(ROUTES.HOME)
        else if (!user.isProfileCompleted) {
            setuserDetails(user)
        } else {
            setuserDetails(user)
        }
        //eslint-disable-next-line
    }, [])

    return (
        <StateContext.Provider
            value={{ saveUsertoLocal, setuserDetails, userDetails }}
        >
            <Routes>
                {/* <Route path='/Nav' element={<NewNav />} />To Test Out New Nav Bar */}
                {/* <Route path='/Navb' element ={<Navb />} /> */}
                <Route path='/' element={<Home />} />
                <Route
                    path={ROUTES.LOAN_REQUESTS}
                    element={<LoanRequests />}
                />
                <Route path={ROUTES.MY_LOANS} element={<MyLoans/>} />
                <Route path={ROUTES.APPLY_LOANS} element={<ApplyLoan />} />
                <Route path={ROUTES.LEADINGS} element={<LendingLoans />} />
                <Route
                    path={ROUTES.PROFILE_UPDATE}
                    element={<ProfileUpdateScreen />}
                />
            </Routes>
        </StateContext.Provider>
    )
}
